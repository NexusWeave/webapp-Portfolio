#   Standard Library
from datetime import datetime
from typing import Dict, Any, List, Sequence, Optional, Tuple

#   Internal Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel, CollaboratorModel

#   Third Party Libraries
from sqlalchemy import select, Result
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

LOG = DatabaseWatcher(dir="logs", name="Github-Database-Handler")
LOG.file_handler()

class GithubDatabaseHandler():

    __VERSION__ = 'v1.0.0'
    def __init__(self, session: AsyncSession): self.session = session

    @staticmethod
    def format_payload(repository: Dict[str, Any]) -> Dict[str, Any]:
        repo_url: Optional[str] = None
        video_url: Optional[str] = None
        preview_url: Optional[str] = None

        for url in repository['anchor']:

            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'youtube_url': video_url = url['href']
                case _: continue
            
        LANGUAGE_ASSOCIATION: List[LanguageAssosiationModel] = []

        for i in repository['lang']:
            LANG_NAME = str(i['language']).lower()
            LANGUAGE: LanguageModel = LanguageModel(language = LANG_NAME)
            LANGUAGE_ASSOCIATION.append(LanguageAssosiationModel(language = LANGUAGE, code_bytes = i['bytes']))

        COLLABORATORS: List[CollaboratorModel] = []
        for c in repository.get('collaborators', []):
            COLLABORATORS.append(CollaboratorModel(name = c['name'], collab_id = c['collab_id']))

        repository.pop('anchor', None)
        repository.pop('collaborators', None)
        date_parser = lambda d: datetime.fromisoformat(d.replace('Z', '+00:00')).replace(tzinfo=None) if isinstance(d, str) else d

        dictionary: Dict[str, Any] = {**repository,
            'youtube_url': video_url, 'demo_url': preview_url, 'repo_url': repo_url,
            'lang_assosiations': LANGUAGE_ASSOCIATION, 'collaborators': COLLABORATORS, 'last_check': datetime.now()}
        
        if 'updated_at' in dictionary: dictionary['updated_at'] = date_parser(dictionary['updated_at'])
        if 'created_at' in dictionary: dictionary['created_at'] = date_parser(dictionary['created_at'])

        return dictionary

    @staticmethod
    def has_data_changes(exist:RepositoryModel, dictionary: Dict[str, Any]) -> bool:
        # If full sync was skipped, only check basic metadata
        needs_full_sync = dictionary.get('needs_full_sync', True)

        FIELDS_TO_CHECK = [
            'owner', 'label','repo_url', 'description',
            'is_private', 'demo_url', 'repo_url']

        for field in FIELDS_TO_CHECK:
            if field == 'description' and dictionary.get(field) == 'No description provided.' : continue
            API_VALUE, DB_VALUE = dictionary.get(field), getattr(exist, field, None)

            if DB_VALUE != API_VALUE: 
                #LOG.debug(f"Changes detected for label: {dictionary['label']}, field: {field}")
                return True
        
        if needs_full_sync:
            # Check for language changes
            new_langs = {assoc.language.language: assoc.code_bytes for assoc in dictionary.get('lang_assosiations', [])}
            
            # Detect duplicates in existing associations
            exist_langs = {}
            for assoc in exist.lang_assosiations:
                lang_name = assoc.language.language
                if lang_name in exist_langs:
                    return True # Found duplicate, force update for cleanup
                exist_langs[lang_name] = assoc.code_bytes

            if new_langs != exist_langs:
                #LOG.debug(f"Language changes detected for label: {dictionary['label']}")
                return True

            # Check for collaborator changes
            new_collabs = {c.collab_id: c.name for c in dictionary.get('collaborators', [])}
            exist_collabs = {c.collab_id: c.name for c in exist.collaborators}

            if new_collabs != exist_collabs:
                return True

            # Check stack flags
            for flag in ['is_backend', 'is_frontend', 'is_fullstack']:
                if getattr(exist, flag) != dictionary.get(flag):
                    return True

        return False

    def new_association_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:

        association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
        self.session.add(association_obj)
        #LOG.debug(f"Initializing new association record for repository: {repo.repo_id}")

    async def _create_repositories(self, repository: Dict[str, Any]) -> None:
        temp_repo = repository.copy()
        temp_repo.pop('lang', None)
        temp_repo.pop('collaborators', None)
        temp_repo.pop('needs_full_sync', None)
        
        #LOG.debug(f"Creating new repository record for label: {repository['label']} with data: {temp_repo}")
        repo_model = RepositoryModel( **temp_repo)

        self.session.add(repo_model)

        LANGUAGE_ASSOCIATIONS: List[Dict[str, Any]] = repository['lang']

        for i in LANGUAGE_ASSOCIATIONS:
            CODE_BYTES : int = i['bytes']       #type:ignore
            LANG_NAME : str = i['language']     #type:ignore
            LANG_OBJ: LanguageModel = await self.new_language_record(LANG_NAME)
            self.new_association_record(repo_model, LANG_OBJ, CODE_BYTES)

        COLLABORATORS: List[Dict[str, str]] = repository.get('collaborators', [])
        for c in COLLABORATORS:
            collab_obj = CollaboratorModel(repository = repo_model, name = c['name'], collab_id = c['collab_id'])
            self.session.add(collab_obj)

        #LOG.debug(f"Successfully created new repository record for label: {repository['label']}")

    async def _apply_repositories_updates(self, dictionary: Dict[str, Any], DUPLICATION: RepositoryModel) -> None:
        needs_full_sync = dictionary.get('needs_full_sync', True)
        
        EXCCLUDE_FIELDS = ['repo_id', 'created_at', 'lang_assosiations', 'collaborators', 'needs_full_sync']
        
        # If we skipped full sync, don't overwrite stack flags with default False values
        if not needs_full_sync:
            EXCCLUDE_FIELDS.extend(['is_backend', 'is_frontend', 'is_fullstack'])
            
        updated_data = {k: v for k, v in dictionary.items() if k not in EXCCLUDE_FIELDS}

        for key, value in updated_data.items():
            if hasattr(DUPLICATION, key):
                setattr(DUPLICATION, key, value)
        
        if needs_full_sync:
            # Sync languages
            new_langs = {assoc.language.language: assoc.code_bytes for assoc in dictionary.get('lang_assosiations', [])}
            
            # Group existing associations by language to handle duplicates
            exist_assoc_groups: Dict[str, List[LanguageAssosiationModel]] = {}
            for assoc in DUPLICATION.lang_assosiations:
                lang_name = assoc.language.language
                if lang_name not in exist_assoc_groups:
                    exist_assoc_groups[lang_name] = []
                exist_assoc_groups[lang_name].append(assoc)

            for lang_name, code_bytes in new_langs.items():
                if lang_name in exist_assoc_groups:
                    # Update the first association and delete the rest
                    primary_assoc = exist_assoc_groups[lang_name][0]
                    if primary_assoc.code_bytes != code_bytes:
                        primary_assoc.code_bytes = code_bytes
                        self.session.add(primary_assoc)
                    
                    # Delete duplicates
                    for duplicate in exist_assoc_groups[lang_name][1:]:
                        await self.session.delete(duplicate)
                else:
                    lang_obj = await self.new_language_record(lang_name)
                    self.new_association_record(DUPLICATION, lang_obj, code_bytes)

            # Remove languages no longer present in the payload
            for lang_name, assocs in exist_assoc_groups.items():
                if lang_name not in new_langs:
                    for assoc in assocs:
                        await self.session.delete(assoc)

            # Sync collaborators
            new_collabs = {c.collab_id: c.name for c in dictionary.get('collaborators', [])}
            exist_collabs = {c.collab_id: c for c in DUPLICATION.collaborators}

            for collab_id, name in new_collabs.items():
                if collab_id in exist_collabs:
                    if exist_collabs[collab_id].name != name:
                        exist_collabs[collab_id].name = name
                        self.session.add(exist_collabs[collab_id])
                else:
                    collab_obj = CollaboratorModel(repository = DUPLICATION, name = name, collab_id = collab_id)
                    self.session.add(collab_obj)

            for collab_id, collab in exist_collabs.items():
                if collab_id not in new_collabs:
                    await self.session.delete(collab)

        self.session.add(DUPLICATION)
        LOG.debug(f"Repository {DUPLICATION.label} was successfully updated in the database.")

    async def new_language_record(self, LANG_NAME: str) -> LanguageModel:
        LANG_NAME = LANG_NAME.lower()
        lang_obj: Result[Tuple[LanguageModel]] = await self.session.scalar(select(LanguageModel).where(LanguageModel.language == LANG_NAME))

        if not lang_obj:
            lang_obj = LanguageModel(language = LANG_NAME)

            self.session.add(lang_obj)

            LOG.debug(f"Initializing new language record for language: {LANG_NAME}")

        return lang_obj

    async def upsert_repositories(self, repository: List[Dict[str, Any]]) -> None:

        repo_ids = [repo['repo_id'] for repo in repository]
        QUERY = (select(RepositoryModel)
                 .options(selectinload(RepositoryModel.lang_assosiations)
                          .selectinload(LanguageAssosiationModel.language),
                          selectinload(RepositoryModel.collaborators)))
        
        DB_RESULTS = await self.session.execute(QUERY)
        EXISTING_REPOS_LIST = DB_RESULTS.scalars().all()
        EXISTING_REPOS = {str(repo.repo_id).strip(): repo for repo in EXISTING_REPOS_LIST}

        processed_ids = set()

        for i in range(len(repository)):
            dictionary = GithubDatabaseHandler.format_payload(repository[i])
            
            repo_id: str = str(repository[i]['repo_id']).strip()
            processed_ids.add(repo_id)
            DUPLICATION = EXISTING_REPOS.get(repo_id)

            if DUPLICATION:
                if GithubDatabaseHandler.has_data_changes(DUPLICATION, dictionary): 
                    await self._apply_repositories_updates(dictionary, DUPLICATION)
                else: 
                    #LOG.warn(f"No changes detected ! Skipping update for label: {repository[i]['label']}")
                    pass

            else:
                repository[i].update(
                    {
                        'demo_url': dictionary['demo_url'], 'repo_url': dictionary['repo_url'],
                        'youtube_url': dictionary['youtube_url'], 'last_check': datetime.now(),
                        'is_backend': dictionary['is_backend'], 'is_frontend': dictionary['is_frontend'],
                        'is_fullstack': dictionary['is_fullstack'], 'is_collaborator': dictionary['is_collaborator']
                    })

                await self._create_repositories(repository[i])
                #LOG.debug(f"Successfully inserted new repository with label: **{repository[i]['label']}**")
        
        # Delete repositories that are no longer in the GitHub payload
        # ONLY delete if we actually received repositories from the API to avoid 
        # wiping the database on API errors or temporary connectivity issues.
        if repository:
            current_api_ids = {str(rid) for rid in repo_ids}
            for existing_id, repo_obj in EXISTING_REPOS.items():
                if existing_id not in current_api_ids:
                    LOG.info(f"Deleting stale repository: {repo_obj.label} (ID: {existing_id})")
                    await self.session.delete(repo_obj)
        else:
            LOG.warn("No repositories received from API. Skipping cleanup phase to prevent accidental data loss.")

        try:
            await self.session.commit()

        except Exception as e:
            LOG.critical(f"An {e.__class__} occured during commiting the session: {e}. Rolling back to previous state.")
            await self.session.rollback()

    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:

        QUERY = (select(RepositoryModel)
                 .options(selectinload(RepositoryModel.lang_assosiations).selectinload(LanguageAssosiationModel.language),
                          selectinload(RepositoryModel.collaborators))
                 .where(RepositoryModel.is_secret == False)
                 .order_by(RepositoryModel.updated_at.desc()))

        result = await self.session.execute(QUERY)
        return result.scalars().all()

    async def get_existing_timestamps(self) -> Dict[str, datetime]:
        """ Returns a mapping of repo_id to its last updated_at timestamp. """
        QUERY = select(RepositoryModel.repo_id, RepositoryModel.updated_at)
        result = await self.session.execute(QUERY)
        return {str(row[0]): row[1] for row in result.all() if row[1] is not None}
