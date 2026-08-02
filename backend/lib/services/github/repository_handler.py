# Standard Library
import datetime
from typing import Dict, Any, List, Sequence, Set

# Internal Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.models.database_models.GithubModel import RepositoryModel, LanguageAssosiationModel, RepoCollaboratorAssociationModel
from lib.services.github.payload_formatter import GithubPayloadFormatter
from lib.services.github.language_manager import LanguageSyncManager
from lib.services.github.collaborator_manager import CollaboratorSyncManager
from lib.services.github.github_database_queries import GithubDatabaseQueries

# Third Party Libraries
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

LOG = DatabaseWatcher(name="Github-Database-Handler")
LOG.file_handler()

class GithubDatabaseHandler:

    __VERSION__ = 'v1.1.0'

    def __init__(self, session: AsyncSession): 
        self.session = session
        self.language_manager = LanguageSyncManager(session)
        self.collaborator_manager = CollaboratorSyncManager(session)
        self.queries = GithubDatabaseQueries(session)

    @staticmethod
    def has_data_changes(exist:RepositoryModel, dictionary: Dict[str, Any]) -> bool:
        """ Compares the existing DB model with the new dictionary to detect changes. """
        # If full sync was skipped, only check basic metadata
        needs_full_sync = dictionary.get('needs_full_sync', True)

        FIELDS_TO_CHECK = [
            'owner', 'owner_url', 'label', 'repo_url', 'description',
            'is_private', 'demo_url', 'repo_url', 'contribution_ratio']

        for field in FIELDS_TO_CHECK:
            if field == 'description' and dictionary.get(field) == 'No description provided.' : continue
            API_VALUE, DB_VALUE = dictionary.get(field), getattr(exist, field, None)

            if API_VALUE is not None and DB_VALUE != API_VALUE: 
                LOG.debug(f"Metadata change detected for {exist.label}: field {field}")
                return True

        # Check for collaborator changes (Many-to-Many)
        new_collabs_data = dictionary.get('collaborators_data', [])
        new_collab_ids = {c['github_id'] for c in new_collabs_data}
        exist_collab_ids = {assoc.collaborator.github_id for assoc in exist.collaborator_associations}

        if new_collab_ids != exist_collab_ids:
            LOG.debug(f"Collaborator change detected for {exist.label}")
            return True

        if needs_full_sync:
            # Check for language changes
            new_langs = {assoc.language.language: assoc.code_bytes for assoc in dictionary.get('lang_assosiations', [])}
            exist_langs = {assoc.language.language: assoc.code_bytes for assoc in exist.lang_assosiations}

            if new_langs != exist_langs:
                LOG.debug(f"Language data change detected for {exist.label}.")
                return True

            # Check stack flags
            for flag in ['is_backend', 'is_frontend', 'is_fullstack']:
                if getattr(exist, flag) != dictionary.get(flag):
                    LOG.debug(f"Stack flag change detected for {exist.label}: {flag}")
                    return True

        return False

    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:
        """ Proxy method for fetching all repositories. """
        return await self.queries.fetch_all_repositories()

    async def get_existing_timestamps(self) -> Dict[str, datetime.datetime]:
        """ Proxy method for existing timestamps. """
        return await self.queries.get_existing_timestamps()

    async def upsert_repositories(self, repository: List[Dict[str, Any]]) -> None:
        """ Entry point for syncing repositories from the API payload. """
        LOG.info(f"Starting upsert process for {len(repository)} repositories.")

        QUERY = (select(RepositoryModel)
                 .options(selectinload(RepositoryModel.lang_assosiations)
                          .selectinload(LanguageAssosiationModel.language),
                          selectinload(RepositoryModel.collaborator_associations)
                          .selectinload(RepoCollaboratorAssociationModel.collaborator)))

        DB_RESULTS = await self.session.execute(QUERY)
        EXISTING_REPOS_LIST = DB_RESULTS.scalars().all()
        EXISTING_REPOS = {str(repo.repo_id).strip(): repo for repo in EXISTING_REPOS_LIST}

        for repo_data in repository:
            await self._sync_repository(repo_data, EXISTING_REPOS)

        # Cleanup stale repositories
        current_api_ids = {str(repo['repo_id']) for repo in repository}
        await self._cleanup_stale_repos(current_api_ids, EXISTING_REPOS)

        try:
            await self.session.commit()
            LOG.info("Upsert process completed and committed.")
        except Exception as e:
            LOG.critical(f"Commit failed: {e}. Attempting rollback.")
            await self.session.rollback()

    async def _sync_repository(self, repo_data: Dict[str, Any], existing_repos: Dict[str, RepositoryModel]) -> None:
        """ Synchronizes a single repository from API data to the database. """
        dictionary = GithubPayloadFormatter.format_payload(repo_data)
        repo_id = str(repo_data['repo_id']).strip()
        existing_repo = existing_repos.get(repo_id)

        if existing_repo:
            if self.has_data_changes(existing_repo, dictionary): 
                await self._apply_repositories_updates(dictionary, existing_repo)
            else:
                LOG.debug(f"No changes detected for {existing_repo.label}. Skipping update.")
        else:
            # Update data with formatted fields before creation
            repo_data.update({
                'demo_url': dictionary.get('demo_url'),
                'repo_url': dictionary.get('repo_url'),
                'youtube_url': dictionary.get('youtube_url'),
                'is_backend': dictionary.get('is_backend', False),
                'is_frontend': dictionary.get('is_frontend', False),
                'is_fullstack': dictionary.get('is_fullstack', False),
                'is_collaborator': dictionary.get('is_collaborator', False),
                'contribution_ratio': dictionary.get('contribution_ratio', 100),
                'collaborators_data': dictionary.get('collaborators_data', [])
            })
            await self._create_repositories(repo_data)

    async def _create_repositories(self, repository: Dict[str, Any]) -> None:
        """ Creates a new repository record and its associations in the database. """
        temp_repo = repository.copy()
        # Clean up fields that don't belong to RepositoryModel columns
        fields_to_pop = ['lang', 'anchor', 'collaborators', 'collaborators_data', 'lang_assosiations', 'needs_full_sync', 'last_check']
        for field in fields_to_pop: temp_repo.pop(field, None)

        repo_model = RepositoryModel( **temp_repo)
        self.session.add(repo_model)

        # Handle Languages
        for i in repository.get('lang', []):
            LANG_OBJ = await self.language_manager.new_language_record(i['language'])
            self.language_manager.new_association_record(repo_model, LANG_OBJ, i['bytes'])

        # Handle Collaborators
        for c in repository.get('collaborators_data', []):
            collab_obj = await self.collaborator_manager._get_or_create_collaborator(c)
            assoc = RepoCollaboratorAssociationModel(repository = repo_model, collaborator = collab_obj)
            self.session.add(assoc)

        LOG.info(f"Successfully created new repository: {repository['label']}")

    async def _apply_repositories_updates(self, dictionary: Dict[str, Any], DUPLICATION: RepositoryModel) -> None:
        """ Updates an existing repository and its associations. """
        needs_full_sync = dictionary.get('needs_full_sync', True)
        EXCLUDE_FIELDS = ['repo_id', 'created_at', 'lang_assosiations', 'collaborators', 'collaborators_data', 'lang', 'needs_full_sync']
        
        if not needs_full_sync:
            EXCLUDE_FIELDS.extend(['is_backend', 'is_frontend', 'is_fullstack'])

        for key, value in dictionary.items():
            if key not in EXCLUDE_FIELDS and hasattr(DUPLICATION, key):
                setattr(DUPLICATION, key, value)

        if needs_full_sync:
            await self.language_manager.sync_languages(DUPLICATION, dictionary.get('lang_assosiations', []))

        # Always sync collaborators
        await self.collaborator_manager.sync_collaborators(DUPLICATION, dictionary.get('collaborators_data', []))

        self.session.add(DUPLICATION)
        LOG.info(f"Updated repository: {DUPLICATION.label} (Full sync: {needs_full_sync})")

    async def _cleanup_stale_repos(self, current_ids: Set[str], existing_repos: Dict[str, RepositoryModel]) -> None:
        """ Deletes repositories from the DB that are no longer in the API payload. """
        for existing_id, repo_obj in existing_repos.items():
            if existing_id not in current_ids:
                LOG.info(f"Deleting stale repository: {repo_obj.label} (ID: {existing_id})")
                await self.session.delete(repo_obj)
