#   Standard Library
from datetime import datetime
from typing import Dict, Any, List, Sequence, Optional, Tuple

#   Internal Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel

#   Third Party Libraries
from sqlalchemy import select, Result
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

LOG = DatabaseWatcher(dir="logs", name="Github-Database-Handler")
LOG.file_handler()

class GithubDatabaseHandler():
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
            
        LANGUAGE_ASSOCIATION: List[str] = []

        for i in repository['lang']:
            LANGUAGE: LanguageModel = LanguageModel(language = str(i['language']))
            LANGUAGE_ASSOCIATION.append(LanguageAssosiationModel(language = LANGUAGE, code_bytes = i['bytes']))

        repository.pop('anchor', None)
        repository.pop('collaborators', None)
        dictionary: Dict[str, Any] = {**repository,
            'youtube_url': video_url, 'demo_url': preview_url, 'repo_url': repo_url,
            'lang_associations': LANGUAGE_ASSOCIATION,'last_check': datetime.now()}

        return dictionary

    @staticmethod
    def has_data_changes(exist:RepositoryModel, dictionary: Dict[str, Any]) -> bool:

        FIELDS_TO_CHECK = [
            'owner', 'label','repo_url', 'description',
            'is_private', 'demo_url', 'repo_url', 'is_backend',
            'is_frontend', 'is_fullstack', 'is_collaborator']

        for field in FIELDS_TO_CHECK:
            API_VALUE, DB_VALUE = dictionary.get(field), getattr(exist, field, None)

            if DB_VALUE != API_VALUE: 
                LOG.debug(f"Changes detected for repo_id: {dictionary['repo_id']}, field: {field}")
                return True

        LOG.debug(f"No Changes for repo_id: {dictionary['repo_id']}")
        return False

    def new_association_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:

        association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
        self.session.add(association_obj)
        LOG.debug(f"Initializing new association record for repository: {repo.repo_id}")

    async def _create_repositories(self, repository: Dict[str, Any]) -> None:
        temp_repo = repository.copy()
        temp_repo.pop('lang', None)
        LOG.critical(f"Creating new repository record for repo_id: {repository['repo_id']} with data: {temp_repo}")
        repo_model = RepositoryModel( **temp_repo)

        self.session.add(repo_model)

        LANGUAGE_ASSOCIATIONS: List[str] = repository['lang']

        for i in LANGUAGE_ASSOCIATIONS:
            CODE_BYTES : int = i['bytes']       #type:ignore
            LANG_NAME : str = i['language']     #type:ignore
            LANG_OBJ: LanguageModel = await self.new_language_record(LANG_NAME)
            self.new_association_record(repo_model, LANG_OBJ, CODE_BYTES)

        LOG.debug(f"Successfully created new repository record for repo_id: {repository['repo_id']}")

    def _apply_repositories_updates(self, dictionary: Dict[str, Any], DUPLICATION: RepositoryModel) -> None:
        EXCCLUDE_FIELDS = ['repo_id', 'created_at']
        updated_data = {k: v for k, v in dictionary.items() if k != 'lang_assosiations' and k not in EXCCLUDE_FIELDS}

        for key, value in updated_data.items():
            if hasattr(DUPLICATION, key):
                setattr(DUPLICATION, key, value)
                self.session.add(DUPLICATION)
                LOG.debug(f"Repository was successfully updated to the database.")

    async def new_language_record(self, LANG_NAME: str) -> LanguageModel:
        lang_obj: Result[Tuple[LanguageModel]] = await self.session.scalar(select(LanguageModel).where(LanguageModel.language == LANG_NAME))

        if not lang_obj:
            lang_obj = LanguageModel(language = LANG_NAME)

            self.session.add(lang_obj)

            LOG.debug(f"Initializing new language record for language: {LANG_NAME}")

        return lang_obj

    async def upsert_repositories(self, repository: List[Dict[str, Any]]) -> None:

        repo_ids = [repo['repo_id'] for repo in repository]
        QUERY = select(RepositoryModel).where(RepositoryModel.repo_id.in_(repo_ids))
        DB_RESULTS = await self.session.execute(QUERY)

        EXISTING_REPOS = {str(repo.repo_id).strip(): repo for repo in DB_RESULTS.scalars().all()}

        for i in range(len(repository)):
            dictionary = GithubDatabaseHandler.format_payload(repository[i])
            
            repo_id: str = str(repository[i]['repo_id']).strip()
            DUPLICATION = EXISTING_REPOS.get(repo_id)

            if DUPLICATION:
                if GithubDatabaseHandler.has_data_changes(DUPLICATION, dictionary): self._apply_repositories_updates(dictionary, DUPLICATION)
                else: LOG.warn(f"No changes detected ! Skipping update for repo_id: {repository[i]['repo_id']}")

            else:
                repository[i].update(
                    {
                        'demo_url': dictionary['demo_url'], 'repo_url': dictionary['repo_url'],
                        'youtube_url': dictionary['youtube_url'], 'last_check': datetime.now(),
                        'is_backend': dictionary['is_backend'], 'is_frontend': dictionary['is_frontend'],
                        'is_fullstack': dictionary['is_fullstack'], 'is_collaborator': dictionary['is_collaborator']
                    })

                await self._create_repositories(repository[i])
                LOG.debug(f"Successfully inserted new repository with repo_id: **{repository[i]['label']}**")
        try:
            await self.session.commit()

        except Exception as e:
            LOG.critical(f"An {e.__class__} occured during commiting the session: {e}. Rolling back to previous state.")
            await self.session.rollback()

    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:

        QUERY = (select(RepositoryModel).options(selectinload(RepositoryModel.lang_assosiations).selectinload(LanguageAssosiationModel.language)).where(RepositoryModel.is_secret == False).order_by(RepositoryModel.updated_at.desc()))

        result = await self.session.execute(QUERY)
        return result.scalars().all()
