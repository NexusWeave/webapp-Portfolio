#   Standard Library
from datetime import datetime
from typing import Dict, Any, List, Sequence

#   Third Party Libraries
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession


#   Internal Libraries
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanugageRepositoryAssosiationModel
from lib.utils.logger_config import DatabaseWatcher

LOG = DatabaseWatcher(name="Github-Database-Services")
LOG.file_handler()

class GithubServices():

    def __init__(self, repo: List[Dict[str, Any]], db_session: AsyncSession):
        self.db_session = db_session
        self.repo = repo

    @staticmethod
    def setup_repo(repository: Dict[str, Any]) -> Dict[str, Any]:
        repo_url: str | None = None
        video_url: str | None = None
        preview_url: str | None = None

        for url in repository['anchor']:

            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'ytube_url': video_url = url['href']
                case _: continue
            
        LANGUAGE_ASSOCIATION: List[str] = []

        for i in repository['lang']:
            LANGUAGE_ASSOCIATION.append(LanugageRepositoryAssosiationModel(language=LanguageModel(language=i['language']), code_bytes=i['bytes']))

        dictionary: Dict[str, Any] = {
            'html_url': repo_url,
            'repo_url': repo_url,
            'demo_url': preview_url,
            'youtube_url': video_url,
            'name': repository['label'],
            'owner': repository['owner'],
            'label': repository['label'],
            'repo_id': repository['repo_id'],
            'assosiations': LANGUAGE_ASSOCIATION,
            'created_at': repository['created_at'],
            'description': repository['description'],
            'updated_at': datetime.now().isoformat()}

        return dictionary

    @staticmethod
    def check_stmt(exist: RepositoryModel, dictionary: Dict[str, Any]) -> bool:

        FIELDS_TO_CHECK = [
            'name', 'owner', 'label',
            'demo_url', 'youtube_url',
            'description', 'updated_at'
            ]

        for field in FIELDS_TO_CHECK:
            if getattr(exist, field) != dictionary[field]: return True
            
        return False

    def insert_new_record(self, repository: Dict[str, Any]) -> None:
        repo_obj = RepositoryModel( name = repository['name'], owner = repository['owner'],
                label = repository['label'], html_url = repository['html_url'],
                demo_url = repository['demo_url'], repo_url = repository['repo_url'], youtube_url = repository['youtube_url'],
                updated_at = datetime.now().isoformat(), repo_id = repository['repo_id'],
                created_at = repository['created_at'], description = repository['description'],
                assosiations = repository['assosiations'])

        self.db_session.add(repo_obj)

    async def save_repository(self) -> None:
        for repository in self.repo:

            dictionary = GithubServices.setup_repo(repository)

            result = await self.db_session.execute(select(RepositoryModel).where(RepositoryModel.repo_id == repository['repo_id']))
            exist = result.scalars().first()

            HAS_CHANGES: bool = GithubServices.check_stmt(exist, dictionary)
            dictionary_for_update = {k: v for k, v in dictionary.items() if k != 'assosiations'}
            
            if exist and HAS_CHANGES:
                LOG.info(f"Updating repository with repo_id: **{repository['repo_id']}**")
                stmt = ( update(RepositoryModel).where(RepositoryModel.repo_id == repository['repo_id']).values(**dictionary_for_update) )    
                await self.db_session.execute(stmt)

            elif not exist:
                LOG.info(f"Inserting new repository with repo_id: **{repository['repo_id']}**")
                self.insert_new_record(dictionary)

            await self.db_session.commit()

    async def select_repositories(self) -> Sequence[RepositoryModel]:
        result = await self.db_session.execute(select(RepositoryModel))
        repositories = result.scalars().all()
        return repositories
        

class HeavyServices:
    pass