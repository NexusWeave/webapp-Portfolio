#   Standard Library
from datetime import datetime
from typing import Dict, Any, List, Sequence

#   Third Party Libraries
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession


#   Internal Libraries
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanugageRepositoryAssosiationModel
from lib.utils.logger_config import DatabaseWatcher

LOG = DatabaseWatcher(dir="logs", name="Github-Database-Services")
LOG.file_handler()

class GithubServices():

    def __init__(self, session: AsyncSession):
        self.session = session

    @staticmethod
    def setup_repo(repository: Dict[str, Any]) -> Dict[str, Any]:
        repo_url: str | None = None
        video_url: str | None = None
        preview_url: str | None = None

        LOG.debug(f"Setting up repository data for repo_id: {repository['repo_id']}")

        for url in repository['anchor']:

            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'ytube_url': video_url = url['href']
                case _: continue
            
        LANGUAGE_ASSOCIATION: List[str] = []

        LOG.debug(f"Appending language associations for repo_id: {repository['repo_id']}")
        for i in repository['lang']:
            LANGUAGE_ASSOCIATION.append(LanugageRepositoryAssosiationModel(language=LanguageModel(language=i['language']), code_bytes=i['bytes']))

        dictionary: Dict[str, Any] = {
            'repo_url': repo_url,
            'demo_url': preview_url,
            'youtube_url': video_url,
            'name': repository['label'],
            'owner': repository['owner'],
            'label': repository['label'],
            'repo_id': repository['repo_id'],
            'associations': LANGUAGE_ASSOCIATION,
            'created_at': repository['created_at'],
            'description': repository['description'],
            'updated_at': datetime.now().isoformat(),
            'last_update': datetime.now().isoformat()}

        return dictionary

    @staticmethod
    def check_stmt(exist: RepositoryModel, dictionary: Dict[str, Any]) -> bool:

        LOG.info(f"Checking for changes in repository with repo_id: {dictionary['repo_id']}")
        FIELDS_TO_CHECK = [
            'name', 'owner', 'label',
            'demo_url', 'youtube_url',
            'description', 'updated_at'
            ]

        for field in FIELDS_TO_CHECK:
            if getattr(exist, field) != dictionary[field]: return True
            
        return False

    async def new_repo_record(self, repository: Dict[str, Any]) -> None:

        LOG.info(f"Creating new repository record for repo_id: {repository['repo_id']}")

        repo_obj = RepositoryModel(
            repo_id = repository['repo_id'], label = repository['label'],
            description = repository['description'], owner = repository['owner'],
            demo_url = repository['demo_url'], repo_url = repository['repo_url'],
            youtube_url = repository['youtube_url'], created_at = repository['created_at'])

        self.session.add(repo_obj)

        for assoc_data in repository.get('associations', []):

            CODE_BYTES = assoc_data.code_bytes
            LANG_NAME: str = assoc_data.language.language

            lang_obj: LanguageModel = await self.session.scalar(select(LanguageModel).where(LanguageModel.language == LANG_NAME))

            if not lang_obj: lang_obj = self.new_language_record(LANG_NAME)

            self.new_association_record(repo_obj, lang_obj, CODE_BYTES)

    def new_language_record(self, language: str) -> LanguageModel:

        LOG.info(f"Initializing new language record for language: {language}")
        language_obj = LanguageModel(language=language)
        self.session.add(language_obj)
        return language_obj
    
    def new_association_record(self, repository: RepositoryModel, language: LanguageModel, code_bytes: int) -> LanugageRepositoryAssosiationModel:
        LOG.info(f"Initializing new association record for repository: {repository.repo_id} and language: {language.language}")
        association_obj = LanugageRepositoryAssosiationModel( repository=repository, language=language, code_bytes=code_bytes)
        self.session.add(association_obj)
        return association_obj

    async def save_repository(self, repository: List[Dict[str, Any]]) -> None:
        
        LOG.info(f"Saving GitHub repositories to the database...{repository}\n repositories found.")

        for i in range(len(repository)):

            dictionary = GithubServices.setup_repo(repository[i])
            LOG.info(f"Setup was successful")

            #result = await self.session.execute(select(RepositoryModel).where(RepositoryModel.repo_id == repository[i]['repo_id']))
            LOG.debug(f"Executed select statement for repo_id {repository[i]['repo_id']}")
            exist:bool = False #result.scalars().first()

            HAS_CHANGES: bool = False#GithubServices.check_stmt(exist, dictionary)
            dictionary_for_update = {k: v for k, v in dictionary.items() if k != 'assosiations'}

            if exist and HAS_CHANGES:
                LOG.info(f"Updating repository with repo_id: **{repository[i]['repo_id']}**")
                stmt = ( update(RepositoryModel).where(RepositoryModel.repo_id == repository[i]['repo_id']).values(**dictionary_for_update) )    
                await self.session.execute(stmt)

            elif not exist:
                LOG.info(f"Inserting new repository with repo_id: **{repository[i]['repo_id']}**")
                await self.new_repo_record(dictionary)

            await self.session.commit()

    async def select_repositories(self) -> Sequence[RepositoryModel]:
        result = await self.session.execute(select(RepositoryModel))
        repositories = result.scalars().all()
        return repositories
        

class HeavyServices:
    pass