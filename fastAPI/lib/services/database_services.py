#   Standard Library
from datetime import datetime
from typing import Dict, Any, List, Sequence, Optional, Tuple

#   Third Party Libraries
from sqlalchemy import select, Result
from sqlalchemy.orm import Session, selectinload


#   Internal Libraries
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel
from lib.utils.logger_config import DatabaseWatcher


LOG = DatabaseWatcher(dir="logs", name="Github-Database-Services")
LOG.file_handler()

class GithubServices():

    def __init__(self, session: Session):
        self.session = session

    @staticmethod
    def setup_repo(repository: Dict[str, Any]) -> Dict[str, Any]:
        repo_url: Optional[str] = None
        video_url: Optional[str] = None
        preview_url: Optional[str] = None

        for url in repository['anchor']:

            match url['name']:
                case 'github': repo_url = url['href']
                case 'webapp': preview_url = url['href']
                case 'ytube_url': video_url = url['href']
                case _: continue
            
        LANGUAGE_ASSOCIATION: List[str] = []
        for i in repository['lang']:

            LANGUAGE: LanguageModel = LanguageModel(lang = str(i['language']))
            LANGUAGE_ASSOCIATION.append(LanguageAssosiationModel(language = LANGUAGE, code_bytes = i['bytes']))

        dictionary: Dict[str, Any] = {
            'repo_url': repo_url,
            'ytube_url': video_url,
            'demo_url': preview_url,
            'lang': repository['lang'],
            'owner': repository['owner'],
            'label': repository['label'],
            'repo_id': repository['repo_id'],
            'created_at': repository['created_at'],
            'description': repository['description'],
            'updated_at': datetime.now().isoformat(),
            'lang_associations': LANGUAGE_ASSOCIATION,
            'last_update': datetime.now().isoformat()}

        LOG.info(f"Setup was successful for repo_id: {repository['repo_id']}")
        return dictionary

    @staticmethod
    def check_stmt(exist:RepositoryModel, dictionary: Dict[str, Any]) -> bool:

        FIELDS_TO_CHECK = [
            'owner', 'label',
            'repo_url', 'description'
            ]

        for field in FIELDS_TO_CHECK:
            API_VALUE, DB_VALUE = dictionary.get(field), getattr(exist, field, None)

            if DB_VALUE != API_VALUE: 
                LOG.info(f"Changes detected for repo_id: {dictionary['repo_id']}, field: {field}")
                return True

        LOG.info(f"No Changes for repo_id: {dictionary['repo_id']}")
        return False

    def new_association_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:

        association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
        self.session.add(association_obj)
        LOG.info(f"Initializing new association record for repository: {repo.repo_id} and language: {lang.language}")

    async def new_repo_record(self, repository: Dict[str, Any]) -> None:

        repo_obj = RepositoryModel(
            repo_id = repository['repo_id'], label = repository['label'],
            description = repository['description'], owner = repository['owner'],
            demo_url = repository['demo_url'], repo_url = repository['repo_url'],
            youtube_url = repository['ytube_url'], created_at = repository['created_at'])

        self.session.add(repo_obj)

        LANGUAGE_ASSOCIATIONS: List[str] = repository['lang']

        for i in LANGUAGE_ASSOCIATIONS:
            CODE_BYTES : int = i['bytes']       #type:ignore
            LANG_NAME : str = i['language']     #type:ignore
            LANG_OBJ: LanguageModel = await self.new_language_record(LANG_NAME)

            self.new_association_record(repo_obj, LANG_OBJ, CODE_BYTES)

        LOG.info(f"Successfully created new repository record for repo_id: {repository['repo_id']}")

    async def new_language_record(self, LANG_NAME: str) -> LanguageModel:

        lang_obj: Result[Tuple[LanguageModel]] = self.session.scalar(select(LanguageModel).where(LanguageModel.lang == LANG_NAME))

        if not lang_obj:
            lang_obj = LanguageModel(lang = LANG_NAME)

            self.session.add(lang_obj)

            LOG.info(f"Initializing new language record for language: {LANG_NAME}")

        return lang_obj

    async def save_repository(self, repository: List[Dict[str, Any]]) -> None:

        repo_ids = [repo['repo_id'] for repo in repository]

        QUERY = select(RepositoryModel).where(RepositoryModel.repo_id.in_(repo_ids))
        DB_RESULTS = self.session.execute(QUERY)
        
        EXISTING_REPOS = {str(repo.repo_id).strip(): repo for repo in DB_RESULTS.scalars().all()}

        for i in range(len(repository)):

            dictionary = GithubServices.setup_repo(repository[i])

            repo_id: str = str(repository[i]['repo_id']).strip()
            DUPLICATION = EXISTING_REPOS.get(repo_id)

            if DUPLICATION:

                if GithubServices.check_stmt(DUPLICATION, dictionary):

                    EXCCLUDE_FIELDS = ['repo_id', 'created_at']
                    updated_data = {k: v for k, v in dictionary.items() if k != 'lang_assosiations' and k not in EXCCLUDE_FIELDS}

                    for key, value in updated_data.items():
                        if hasattr(DUPLICATION, key):
                            setattr(DUPLICATION, key, value)

                    self.session.add(DUPLICATION)
                    LOG.info(f"Successfully updated repository with repo_id: **{repository[i]['repo_id']}**")

                else:
                    LOG.warn(f"No changes detected for repository with repo_id: **{repository[i]['repo_id']}**")
                    continue
            else:
                repository[i].update(
                    {
                        'demo_url': dictionary['demo_url'],
                        'repo_url': dictionary['repo_url'],
                        'ytube_url': dictionary['ytube_url'],
                        'last_update': datetime.now().isoformat()
                    })
                
                await self.new_repo_record(repository[i])
                LOG.info(f"Successfully inserted new repository with repo_id: **{repository[i]['repo_id']}**")
        try:
            self.session.commit()

        except Exception as e:
            LOG.error(f"An {e.__class__} occured during commiting the session: {e}. Rolling back to previous state.")
            self.session.rollback()

    def select_repositories(self) -> Sequence[RepositoryModel]:
        QUERY = select(RepositoryModel).options(
            selectinload(RepositoryModel.lang_assosiations)
            .selectinload(LanguageAssosiationModel.language))

        return self.session.execute(QUERY).scalars().all()

        

class HeavyServices:
    pass