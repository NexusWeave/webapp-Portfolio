#   Standard Library
from datetime import datetime
from typing import Dict, Any, List, Sequence

#   Third Party Libraries
from sqlalchemy import select, update
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession


#   Internal Libraries
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel
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
            LOG.debug(f"{i['language']} - {i['bytes']}")
            

            LANGUAGE: LanguageModel = LanguageModel(lang = str(i['language']))
            LANGUAGE_ASSOCIATION.append(LanguageAssosiationModel(language = LANGUAGE, code_bytes = i['bytes']))
            LOG.debug(f"Appending language for repo_id: {repository['repo_id']}")
        LOG.debug(f"Appending language associations for repo_id: {repository['repo_id']}")

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
    def check_stmt(exist: bool, dictionary: Dict[str, Any]) -> bool:

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
        LOG.info(f"New repository record created for repo_id: {repository['repo_id']}")

        for assoc_data in repository.get('lang_associations', []):
            CODE_BYTES = assoc_data.code_bytes
            LANG_NAME: str = assoc_data.lang_id
            lang_obj: LanguageModel = await self.session.scalar(select(LanguageModel).where(LanguageModel.lang == LANG_NAME))
            LOG.debug(lang_obj)
            if not lang_obj: lang_obj = self.new_language_record(LANG_NAME)

            self.new_association_record(repo_obj, lang_obj, CODE_BYTES)
        
            LOG.info(repo_obj, lang_obj, CODE_BYTES)

    def new_language_record(self, language: str) -> LanguageModel:

        language_obj = LanguageModel(lang=language)
        self.session.add(language_obj)
        LOG.info(f"Initializing new language record for language: {language}")
        return language_obj
    
    def new_association_record(self, repository: RepositoryModel, language: LanguageModel, code_bytes: int) -> LanguageAssosiationModel:
        
        association_obj = LanguageAssosiationModel( repo_id =repository.repo_id, lang_id=language.id, code_bytes=code_bytes)
        self.session.add(association_obj)
        LOG.info(f"Initializing new association record for repository: {repository.repo_id} and language: {language.lang}")

        return association_obj

    async def save_repository(self, repository: List[Dict[str, Any]]) -> None:
        
        LOG.info(f"Saving GitHub repositories to the database...{repository}\n repositories found.")

        for i in range(len(repository)):

            dictionary = GithubServices.setup_repo(repository[i])
            LOG.info(f"Setup was successful")

            duplication = await self.session.execute(select(RepositoryModel).where(RepositoryModel.repo_id == repository[i]['repo_id']))

            exist:bool = False
            has_changes: bool = False

            if duplication.scalars().first():
                exist = True
                LOG.info(f"Checking for duplication in repository with repo_id: {repository[i]['repo_id']} - {exist}")

            #if GithubServices.check_stmt(exist, dictionary):
                #has_changes = True
                #LOG.info(f"Checking for changes in repository with repo_id: {repository[i]['repo_id']} - {has_changes}")

            dictionary_for_update = {k: v for k, v in dictionary.items() if k != 'assosiations'}
            LOG.info(f"Dictionary for update: {dictionary_for_update}")

            if exist and has_changes:
                LOG.info(f"Updating repository with repo_id: **{repository[i]['repo_id']}**")
                stmt = ( update(RepositoryModel).where(RepositoryModel.repo_id == repository[i]['repo_id']).values(**dictionary_for_update) )    
                await self.session.execute(stmt)

            elif not exist:
                LOG.info(f"Inserting new repository with repo_id: **{repository[i]['repo_id']}**")
                await self.new_repo_record(dictionary)

            await self.session.commit()

    async def select_repositories(self) -> Sequence[RepositoryModel]:
        repo = await self.session.execute(select(RepositoryModel).options(selectinload(RepositoryModel.lang_assosiations)))
        repositories = repo.scalars().all()
        LOG.info(f"Fetched {len(repositories)} repositories from the database.")
        return repositories
        

class HeavyServices:
    pass