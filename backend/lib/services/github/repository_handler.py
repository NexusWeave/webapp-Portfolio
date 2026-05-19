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

    __VERSION__ = 'v1.0.1'
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

        # Check for collaborator changes (Many-to-Many) - Always checked as they are now always fetched
        new_collabs_data = dictionary.get('collaborators_data', [])
        new_collab_ids = {c['github_id'] for c in new_collabs_data}

        exist_collab_ids = {assoc.collaborator.github_id for assoc in exist.collaborator_associations}

        if new_collab_ids != exist_collab_ids:
            LOG.debug(f"Collaborator change detected for {exist.label}: {len(exist_collab_ids)} -> {len(new_collab_ids)} collabs")
            return True

        if needs_full_sync:
            # Check for language changes
            new_langs = {assoc.language.language: assoc.code_bytes for assoc in dictionary.get('lang_assosiations', [])}

            # Detect duplicates or changes in existing associations
            exist_langs = {}
            for assoc in exist.lang_assosiations:
                lang_name = assoc.language.language
                if lang_name in exist_langs:
                    LOG.debug(f"Duplicate language association detected for {exist.label}: {lang_name}. Forcing update.")
                    return True 
                exist_langs[lang_name] = assoc.code_bytes

            if new_langs != exist_langs:
                LOG.debug(f"Language data change detected for {exist.label}.")
                return True

            # Check stack flags
            for flag in ['is_backend', 'is_frontend', 'is_fullstack']:
                if getattr(exist, flag) != dictionary.get(flag):
                    LOG.debug(f"Stack flag change detected for {exist.label}: {flag}")
                    return True

        return False

    def new_association_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:
        """ Creates a new language association record. """
        association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
        self.session.add(association_obj)

    async def _create_repositories(self, repository: Dict[str, Any]) -> None:
        """ Creates a new repository record and its associations in the database. """
        temp_repo = repository.copy()
        # Clean up fields that don't belong to RepositoryModel columns
        temp_repo.pop('lang', None)
        temp_repo.pop('anchor', None)
        temp_repo.pop('collaborators', None)
        temp_repo.pop('collaborators_data', None)
        temp_repo.pop('lang_assosiations', None)
        temp_repo.pop('needs_full_sync', None)
        temp_repo.pop('last_check', None)

        repo_model = RepositoryModel( **temp_repo)
        self.session.add(repo_model)

        # Handle Languages
        for i in repository.get('lang', []):
            CODE_BYTES : int = i['bytes']       
            LANG_NAME : str = i['language']     
            LANG_OBJ: LanguageModel = await self.new_language_record(LANG_NAME)
            self.new_association_record(repo_model, LANG_OBJ, CODE_BYTES)

        # Handle Collaborators (Many-to-Many)
        for c in repository.get('collaborators_data', []):
            collab_query = select(CollaboratorModel).where(CollaboratorModel.github_id == c['github_id'])
            collab_result = await self.session.execute(collab_query)
            collab_obj = collab_result.scalar_one_or_none()

            if not collab_obj:
                collab_obj = CollaboratorModel(github_id = c['github_id'], name = c['name'], profile_url = c['profile_url'])
                self.session.add(collab_obj)
                await self.session.flush() 
            else:
                if collab_obj.name != c['name'] or collab_obj.profile_url != c['profile_url']:
                    collab_obj.name = c['name']
                    collab_obj.profile_url = c['profile_url']
                    self.session.add(collab_obj)

            assoc = RepoCollaboratorAssociationModel(repository = repo_model, collaborator = collab_obj)
            self.session.add(assoc)

        LOG.info(f"Successfully created new repository: {repository['label']}")

    async def _apply_repositories_updates(self, dictionary: Dict[str, Any], DUPLICATION: RepositoryModel) -> None:
        """ Updates an existing repository and its associations. """
        needs_full_sync = dictionary.get('needs_full_sync', True)

        EXCLUDE_FIELDS = ['repo_id', 'created_at', 'lang_assosiations', 'collaborators', 'collaborators_data', 'lang', 'needs_full_sync']

        if not needs_full_sync:
            EXCLUDE_FIELDS.extend(['is_backend', 'is_frontend', 'is_fullstack'])

        updated_data = {k: v for k, v in dictionary.items() if k not in EXCLUDE_FIELDS}

        for key, value in updated_data.items():
            if hasattr(DUPLICATION, key):
                setattr(DUPLICATION, key, value)

        if needs_full_sync:
            # Sync languages
            new_langs = {assoc.language.language: assoc.code_bytes for assoc in dictionary.get('lang_assosiations', [])}

            exist_assoc_groups: Dict[str, List[LanguageAssosiationModel]] = {}
            for assoc in DUPLICATION.lang_assosiations:
                lang_name = assoc.language.language
                if lang_name not in exist_assoc_groups:
                    exist_assoc_groups[lang_name] = []
                exist_assoc_groups[lang_name].append(assoc)

            for lang_name, code_bytes in new_langs.items():
                if lang_name in exist_assoc_groups:
                    primary_assoc = exist_assoc_groups[lang_name][0]
                    if primary_assoc.code_bytes != code_bytes:
                        primary_assoc.code_bytes = code_bytes
                        self.session.add(primary_assoc)
                    for duplicate in exist_assoc_groups[lang_name][1:]:
                        await self.session.delete(duplicate)
                else:
                    lang_obj = await self.new_language_record(lang_name)
                    self.new_association_record(DUPLICATION, lang_obj, code_bytes)

            for lang_name, assocs in exist_assoc_groups.items():
                if lang_name not in new_langs:
                    for assoc in assocs:
                        await self.session.delete(assoc)

            # Sync collaborators (Many-to-Many)
            new_collabs_data = dictionary.get('collaborators_data', [])

            exist_assoc_map = {assoc.collaborator.github_id: assoc for assoc in DUPLICATION.collaborator_associations}
            new_collab_ids = {c['github_id'] for c in new_collabs_data}

            for c in new_collabs_data:
                gid = c['github_id']
                collab_query = select(CollaboratorModel).where(CollaboratorModel.github_id == gid)
                collab_result = await self.session.execute(collab_query)
                collab_obj = collab_result.scalar_one_or_none()

                if not collab_obj:
                    collab_obj = CollaboratorModel(github_id = gid, name = c['name'], profile_url = c['profile_url'])
                    self.session.add(collab_obj)
                    await self.session.flush()
                else:
                    if collab_obj.name != c['name'] or collab_obj.profile_url != c['profile_url']:
                        collab_obj.name = c['name']
                        collab_obj.profile_url = c['profile_url']
                        self.session.add(collab_obj)

                if gid not in exist_assoc_map:
                    new_assoc = RepoCollaboratorAssociationModel(repository = DUPLICATION, collaborator = collab_obj)
                    self.session.add(new_assoc)

            for gid, assoc in exist_assoc_map.items():
                if gid not in new_collab_ids:
                    await self.session.delete(assoc)

        self.session.add(DUPLICATION)
        LOG.info(f"Updated repository: {DUPLICATION.label} (Needs full sync: {needs_full_sync})")

    async def new_language_record(self, LANG_NAME: str) -> LanguageModel:
        """ Fetches or creates a language record. """
        LANG_NAME = LANG_NAME.lower()
        lang_obj: Result[Tuple[LanguageModel]] = await self.session.scalar(select(LanguageModel).where(LanguageModel.language == LANG_NAME))

        if not lang_obj:
            lang_obj = LanguageModel(language = LANG_NAME)
            self.session.add(lang_obj)
            LOG.debug(f"Initializing new language record: {LANG_NAME}")

        return lang_obj

    async def upsert_repositories(self, repository: List[Dict[str, Any]]) -> None:
        """ Entry point for syncing repositories from the API payload. """
        repo_ids = [repo['repo_id'] for repo in repository]
        LOG.info(f"Starting upsert process for {len(repository)} repositories.")

        QUERY = (select(RepositoryModel)
                 .options(selectinload(RepositoryModel.lang_assosiations)
                          .selectinload(LanguageAssosiationModel.language),
                          selectinload(RepositoryModel.collaborator_associations)
                          .selectinload(RepoCollaboratorAssociationModel.collaborator)))

        DB_RESULTS = await self.session.execute(QUERY)
        EXISTING_REPOS_LIST = DB_RESULTS.scalars().all()
        EXISTING_REPOS = {str(repo.repo_id).strip(): repo for repo in EXISTING_REPOS_LIST}

        for i in range(len(repository)):
            dictionary = GithubDatabaseHandler.format_payload(repository[i])

            repo_id: str = str(repository[i]['repo_id']).strip()
            DUPLICATION = EXISTING_REPOS.get(repo_id)

            if DUPLICATION:
                if GithubDatabaseHandler.has_data_changes(DUPLICATION, dictionary): 
                    await self._apply_repositories_updates(dictionary, DUPLICATION)
                else:
                    LOG.debug(f"No changes detected for {DUPLICATION.label}. Skipping update.")
            else:
                repository[i].update({
                    'demo_url': dictionary.get('demo_url'),
                    'repo_url': dictionary.get('repo_url'),
                    'youtube_url': dictionary.get('youtube_url'),
                    'last_check': dictionary.get('last_check'),
                    'is_backend': dictionary.get('is_backend', False),
                    'is_frontend': dictionary.get('is_frontend', False),
                    'is_fullstack': dictionary.get('is_fullstack', False),
                    'is_collaborator': dictionary.get('is_collaborator', False),
                    'collaborators_data': dictionary.get('collaborators_data', [])
                })
                await self._create_repositories(repository[i])

        if repository:
            current_api_ids = {str(rid) for rid in repo_ids}
            for existing_id, repo_obj in EXISTING_REPOS.items():
                if existing_id not in current_api_ids:
                    LOG.info(f"Deleting stale repository: {repo_obj.label} (ID: {existing_id})")
                    await self.session.delete(repo_obj)

        try:
            await self.session.commit()
            LOG.info("Upsert process completed and committed.")
        except Exception as e:
            LOG.critical(f"Commit failed: {e}. Attempting rollback.")
            await self.session.rollback()


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
        repo_url: Optional[str] = None
        video_url: Optional[str] = None
        preview_url: Optional[str] = None

        for url in urls:
            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'youtube_url': video_url = url['href']
                case _: continue

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
