#   Standard Depnendencies
import os, __future__

from datetime import datetime
from typing import AsyncGenerator, Dict, Optional, List, Sequence
import uuid

#   Third Party Dependencies

from dotenv import load_dotenv
from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler

#   Internal Dependencies


from lib.utils.app_utility import AppTools
from lib.utils.logger_config import AppWatcher
from lib.utils.exception_handler import NotFoundError
from lib.settings.schedule_config import SchedulerConfig

#from lib.models.heavy_model import HeavyModel
from lib.models.github_model import GithubModel
from lib.models.announcement_model import AnnouncementModel
from lib.models.database_models.GithubModel import RepositoryModel

from lib.services.database_services import GithubServices
from lib.services.base_services.database_config import BASE
from lib.services.database.resources import SQLITE_INSTANCE
from lib.services.announcements import AnnouncementsService
from lib.services.fetch_endpoint_data_service import FetchEndpointDataService



#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
logger = AppWatcher(dir="logs", name='FastAPI-App')
logger.file_handler()

try:
    config = AppTools.environment_initialization(os.getenv('ENV', 'development'))

except ValueError as ve:
    logger.error(f"Error in setting up the environment: {ve}")
    raise ve

logger.info(f"\'{config.__class__.__name__}\' - \'v{config.API_VERSION}\' loaded \'{config.ENVIRONMENT}\'- Environment successfully.") 

@asynccontextmanager
async def event_initialization(app: FastAPI):
    """
        FastAPI Startup Eventer
    """
    logger.info("FastAPI Application is starting up...")
    logger.info(f"Registered Database Models: {BASE.metadata.tables.keys()}")
    try:
        async with SQLITE_INSTANCE.engine.begin() as conn:
            await conn.run_sync(BASE.metadata.create_all)
        logger.info("Database tables created successfully.")
    
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")
        raise e
    await SQLITE_INSTANCE.connection

    SCHEDULER = AsyncIOScheduler()
    SchedulerConfig().configure_jobs(SCHEDULER)
    SCHEDULER.start()
    
    logger.info("FastAPI Application started successfully.")

    yield

    SCHEDULER.shutdown()
    logger.info("FastAPI Application is shutting down...")

#   Initialize FastAPI
app = FastAPI(title = config.API_NAME,
              version=config.API_VERSION,
              lifespan=event_initialization)

async def middleware_initialization(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=config.CORS_ORIGINS, 
        allow_credentials=True, 
        allow_methods=["*"], allow_headers=["*"]
    )

#   Registering Enpoint Services
VERSION: str = config.API_VERSION
PATH = f"/api/{VERSION}"

@app.get("/")
def read_root():
    return {"message": "NOT FOUND"}

#   @app.get("/api/v2/blogs/heavy/", response_model=Heavy, tags=["exercise", "blogs"])

@app.get(f"{PATH}/announcement/today", response_model=AnnouncementModel, tags=["Announcements"], summary="Get Today's Announcement", description="Fetches today's announcement based on predefined holidays and special occasions.")
async def get_todays_announcement() -> Dict[str, int | datetime | str]:
    service: AnnouncementsService = AnnouncementsService()
    today: datetime = datetime.today()

    try:
        message: Optional[str] = service.get_celebration_days(today)

        if message is None:
            raise NotFoundError(404, "No announcements for today")

    except NotFoundError as e:
        logger.warn(f"Announcement not found: {e.__class__.__name__} - {e.message}")
        return {"announcement_id": 0, "date": today, "message": e.message}
    
    response: Dict[str, int | datetime | str] = {"announcement_id": 1, "date": today, "message": message}

    return response

@app.get(f"{PATH}/repository", response_model=GithubModel, summary="Get GitHub Repository Information",  tags=["GitHub"])
async def get_repositories() -> List[Dict[str, str | int | datetime | List[Dict[str, str | int]]]] | Dict[str, str]:
    try:
        SERVICE: GithubServices = GithubServices(repo=[], session=SQLITE_INSTANCE.SessionLocal())
        repositories: Sequence[RepositoryModel] = await SERVICE.select_repositories()

        if not repositories:
            raise NotFoundError(404, "No repositories found in the database.")

    except NotFoundError as e:
        logger.error(f"Error fetching repositories: {e.__class__.__name__} - {e.message}")
        return {"message": e.message}

    repository_list: List[Dict[str, str | int | datetime | List[Dict[str, str | int]]]] = []
    for repo in repositories:
        
        lang = []
        if hasattr(repo, 'assosiations') and repo.assosiations is not None:
            lang.append(i.language.language for i in repo.assosiations)

        anchor: List[Dict[str, str | List[str] | object]] = []
        if repo.repo_url:
            anchor.append({
                'name': 'github',
                'id': uuid.uuid4().hex,
                'type': ['github','external'],
                'href': repo.repo_url})
        if repo.demo_url:
            anchor.append({
                'name': 'webapp',
                'id': uuid.uuid4().hex,
                'href': repo.demo_url})
        if repo.ytube_url:
            anchor.append({
                'name': 'youtube',
                'id': uuid.uuid4().hex,
                'type': ['youtube','external'],
                'href': repo.youtube_url})
        repo.lang = lang
        repo.anchor = anchor

        repository_list.append(repo.__dict__)

    return repository_list
