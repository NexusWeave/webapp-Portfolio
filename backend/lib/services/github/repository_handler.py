#   Standard Library
import datetime
from typing import Dict, Any, List, Sequence, Optional, Tuple, Set

#   Internal Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel, CollaboratorModel, RepoCollaboratorAssociationModel

#   Third Party Libraries
from sqlalchemy import select, Result
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

LOG = DatabaseWatcher(name="Github-Database-Handler")
LOG.file_handler()

class GithubDatabaseHandler():

    __VERSION__ = 'v1.1.0'
    def __init__(self, session: AsyncSession): self.session = session

    @staticmethod
    def format_payload(repository: Dict[str, Any]) -> Dict[str, Any]:
        """ Formats the raw repository payload into a structure suitable for the database. """
        # Extract collaborators data first
        COLLABORATORS_DATA: List[Dict[str, Any]] = GithubDatabaseHandler.prepear_collaborators(repository.get('collaborators', []))

        # Prepare helper objects without modifying the original 'repository' dict prematurely
        urls = GithubDatabaseHandler.prepear_urls(repository.get('anchor', []))
        lang_data = GithubDatabaseHandler.prepear_language_assosiations(repository.get('lang', []), COLLABORATORS_DATA)

        date_parser = lambda d: datetime.datetime.fromisoformat(d.replace('Z', '+00:00')) if isinstance(d, str) else d

        # Create the final dictionary by merging all parts
        dictionary: Dict[str, Any] = {
            **repository, 
            **urls, 
            **lang_data
        }

        # Clean up the dictionary for DB operations
        dictionary.pop('anchor', None)

        if 'updated_at' in dictionary: dictionary['updated_at'] = date_parser(dictionary['updated_at'])
        if 'created_at' in dictionary: dictionary['created_at'] = date_parser(dictionary['created_at'])

        return dictionary

    @staticmethod
    def has_data_changes(exist:RepositoryModel, dictionary: Dict[str, Any]) -> bool:
        """ Compares the existing DB model with the new dictionary to detect changes. """
        # If full sync was skipped, only check basic metadata
        needs_full_sync = dictionary.get('needs_full_sync', True)

        FIELDS_TO_CHECK = [
            'owner', 'owner_url', 'label', 'repo_url', 'description',
            'is_private', 'demo_url', 'repo_url']

        for field in FIELDS_TO_CHECK:
            if field == 'description' and dictionary.get(field) == 'No description provided.' : continue
            API_VALUE, DB_VALUE = dictionary.get(field), getattr(exist, field, None)

            if DB_VALUE != API_VALUE: 
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
        dictionary = self.format_payload(repo_data)
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
                'collaborators_data': dictionary.get('collaborators_data', [])
            })
            await self._create_repositories(repo_data)

    async def _cleanup_stale_repos(self, current_ids: Set[str], existing_repos: Dict[str, RepositoryModel]) -> None:
        """ Deletes repositories from the DB that are no longer in the API payload. """
        for existing_id, repo_obj in existing_repos.items():
            if existing_id not in current_ids:
                LOG.info(f"Deleting stale repository: {repo_obj.label} (ID: {existing_id})")
                await self.session.delete(repo_obj)

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
            LANG_OBJ: LanguageModel = await self.new_language_record(i['language'])
            self.new_association_record(repo_model, LANG_OBJ, i['bytes'])

        # Handle Collaborators
        for c in repository.get('collaborators_data', []):
            collab_obj = await self._get_or_create_collaborator(c)
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
            await self._sync_languages(DUPLICATION, dictionary.get('lang_assosiations', []))

        # Always sync collaborators
        await self._sync_collaborators(DUPLICATION, dictionary.get('collaborators_data', []))

        self.session.add(DUPLICATION)
        LOG.info(f"Updated repository: {DUPLICATION.label} (Full sync: {needs_full_sync})")

    async def _sync_languages(self, repo: RepositoryModel, new_langs_payload: List[LanguageAssosiationModel]) -> None:
        """ Synchronizes language associations for a repository. """
        new_langs = {assoc.language.language: assoc.code_bytes for assoc in new_langs_payload}
        exist_assoc_groups: Dict[str, List[LanguageAssosiationModel]] = {}
        
        for assoc in repo.lang_assosiations:
            lang_name = assoc.language.language
            exist_assoc_groups.setdefault(lang_name, []).append(assoc)

        for lang_name, code_bytes in new_langs.items():
            if lang_name in exist_assoc_groups:
                primary_assoc = exist_assoc_groups[lang_name][0]
                if primary_assoc.code_bytes != code_bytes:
                    primary_assoc.code_bytes = code_bytes
                    self.session.add(primary_assoc)
                # Cleanup duplicates
                for duplicate in exist_assoc_groups[lang_name][1:]:
                    await self.session.delete(duplicate)
            else:
                lang_obj = await self.new_language_record(lang_name)
                self.new_association_record(repo, lang_obj, code_bytes)

        for lang_name, assocs in exist_assoc_groups.items():
            if lang_name not in new_langs:
                for assoc in assocs: await self.session.delete(assoc)

    async def _sync_collaborators(self, repo: RepositoryModel, new_collabs_data: List[Dict[str, Any]]) -> None:
        """ Synchronizes collaborator associations for a repository. """
        exist_assoc_map = {assoc.collaborator.github_id: assoc for assoc in repo.collaborator_associations}
        new_collab_ids = {c['github_id'] for c in new_collabs_data}

        for c in new_collabs_data:
            collab_obj = await self._get_or_create_collaborator(c)
            if c['github_id'] not in exist_assoc_map:
                assoc = RepoCollaboratorAssociationModel(repository = repo, collaborator = collab_obj)
                self.session.add(assoc)

        for gid, assoc in exist_assoc_map.items():
            if gid not in new_collab_ids:
                await self.session.delete(assoc)

    async def _get_or_create_collaborator(self, collab_data: Dict[str, Any]) -> CollaboratorModel:
        """ Fetches or creates/updates a collaborator record. """
        gid = collab_data['github_id']
        collab_obj = await self.session.scalar(select(CollaboratorModel).where(CollaboratorModel.github_id == gid))

        if not collab_obj:
            collab_obj = CollaboratorModel(github_id = gid, name = collab_data['name'], profile_url = collab_data['profile_url'])
            self.session.add(collab_obj)
            await self.session.flush()
        else:
            if collab_obj.name != collab_data['name'] or collab_obj.profile_url != collab_data['profile_url']:
                collab_obj.name = collab_data['name']
                collab_obj.profile_url = collab_data['profile_url']
                self.session.add(collab_obj)
        return collab_obj

    async def new_language_record(self, LANG_NAME: str) -> LanguageModel:
        """ Fetches or creates a language record. """
        LANG_NAME = LANG_NAME.lower()
        lang_obj = await self.session.scalar(select(LanguageModel).where(LanguageModel.language == LANG_NAME))

        if not lang_obj:
            lang_obj = LanguageModel(language = LANG_NAME)
            self.session.add(lang_obj)
            LOG.debug(f"Initializing new language record: {LANG_NAME}")
        return lang_obj

    def new_association_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:
        """ Creates a new language association record. """
        association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
        self.session.add(association_obj)

    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:
        """ Fetches all non-secret repositories with their associations. """
        QUERY = (select(RepositoryModel)
                 .options(selectinload(RepositoryModel.lang_assosiations).selectinload(LanguageAssosiationModel.language),
                          selectinload(RepositoryModel.collaborator_associations).selectinload(RepoCollaboratorAssociationModel.collaborator))
                 .where(RepositoryModel.is_secret == False)
                 .order_by(RepositoryModel.updated_at.desc()))

        result = await self.session.execute(QUERY)
        return result.scalars().all()

    async def get_existing_timestamps(self) -> Dict[str, datetime.datetime]:
        """ Returns a mapping of repo_id to its last updated_at timestamp. """
        QUERY = select(RepositoryModel.repo_id, RepositoryModel.updated_at)
        result = await self.session.execute(QUERY)
        return {str(row[0]): row[1] for row in result.all() if row[1] is not None}

    @staticmethod
    def prepear_collaborators(collaborators: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """ Prepares collaborator data for the association model, ensuring deduplication. """
        registered_ids: Set[str] = set()
        COLLAB_DATA: List[Dict[str, Any]] = []

        for collab in collaborators:
            gid: str = str(collab.get('collab_id', ''))
            if gid and gid not in registered_ids:
                COLLAB_DATA.append({
                    "name": collab['name'],
                    "github_id": gid,
                    "profile_url": collab.get('html_url')
                })
                registered_ids.add(gid)
        return COLLAB_DATA

    @staticmethod
    def prepear_urls(urls: List[Dict[str, Any]]) -> Dict[str, str | None]:
        """ Extracts specific URLs from the anchor list. """
        repo_url, video_url, preview_url = None, None, None
        for url in urls:
            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'youtube_url': video_url = url['href']
        return {'youtube_url': video_url, 'demo_url': preview_url, 'repo_url': repo_url}

    @staticmethod
    def prepear_language_assosiations(languages: List[Dict[str, Any]], COLLABORATORS_DATA: List[Dict[str, Any]]) -> Dict[str, Any]:
        """ Prepares language associations and bundles other metadata. """
        NOW = datetime.datetime.now(datetime.timezone.utc)
        LANGUAGE_ASSOCIATION: List[LanguageAssosiationModel] = []
        for i in languages:
            LANG_NAME = str(i['language']).lower()
            LANGUAGE: LanguageModel = LanguageModel(language = LANG_NAME)
            LANGUAGE_ASSOCIATION.append(LanguageAssosiationModel(language = LANGUAGE, code_bytes = i['bytes']))
        return {'lang_assosiations': LANGUAGE_ASSOCIATION, 'collaborators_data': COLLABORATORS_DATA, 'last_check': NOW}
