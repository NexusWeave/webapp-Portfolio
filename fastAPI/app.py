#   Standard Depnendencies
import os, __future__, uuid

from datetime import datetime
from typing import Dict, Optional, List, Sequence

#   Third Party Dependencies
from fastapi import FastAPI
from dotenv import load_dotenv


#   Internal Dependencies
from lib.settings.app_config import AppConfig
from lib.utils.logger_config import AppWatcher
from lib.utils.exception_handler import NotFoundError

#from lib.models.heavy_model import HeavyModel
from lib.models.github_model import GithubModel
from lib.models.announcement_model import AnnouncementModel
from lib.models.database_models.GithubModel import RepositoryModel

from lib.services.database_services import GithubServices
from lib.services.database.resources import SQLITE_INSTANCE
from lib.services.announcements import AnnouncementsService
from lib.services.fetch_endpoint_data_service import FetchEndpointDataService



#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='FastAPI-App')
LOG.file_handler()

CONFIG = AppConfig()
try:
    ENVIRONMENT = CONFIG.environment_initialization(os.getenv('ENV', 'development'))

except ValueError as ve:
    LOG.error(f"Error in setting up the environment: {ve}")
    raise ve

#   Initialize FastAPI
app = FastAPI(title = ENVIRONMENT.API_NAME,
              version=ENVIRONMENT.API_VERSION,
              lifespan=CONFIG.app_initialization)

CONFIG.middleware_initialization(app, ENVIRONMENT)
LOG.info(f"\'{ENVIRONMENT.__class__.__name__}\' - \'v{ENVIRONMENT.API_VERSION}\' loaded \'{ENVIRONMENT.ENVIRONMENT}\'- Environment successfully.") 

#   Registering Enpoint Services
VERSION: str = ENVIRONMENT.API_VERSION
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
        LOG.warn(f"Announcement not found: {e.__class__.__name__} - {e.message}")
        return {"announcement_id": 0, "date": today, "message": e.message}
    
    response: Dict[str, int | datetime | str] = {"announcement_id": 1, "date": today, "message": message}

    return response

@app.get(f"{PATH}/repository", response_model=GithubModel, summary="Get GitHub Repository Information",  tags=["GitHub"])
async def get_repositories() -> List[Dict[str, str | int | datetime | List[Dict[str, str | int]]]] | Dict[str, str]:
    try:
        SERVICE: GithubServices = GithubServices(session=SQLITE_INSTANCE.SessionLocal())
        repositories: Sequence[RepositoryModel] = await SERVICE.select_repositories()

        if not repositories: raise NotFoundError(404, "No repositories found in the database.")

    except NotFoundError as e:
        LOG.error(f"Error fetching repositories: {e.__class__.__name__} - {e.message}")
        return {"message": e.message}

    repository_list: List[Dict[str, str | int | datetime | List[Dict[str, str | int]]]] = []
    LOG.debug(f"Fetched {len(repositories)} repositories from the database.")
    
    for repo in repositories:
        
        lang: List[object] = []
        if repo.assosiations is not None:
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
        if repo.youtube_url:
            anchor.append({
                'name': 'youtube',
                'id': uuid.uuid4().hex,
                'type': ['youtube','external'],
                'href': repo.youtube_url})
        repo.lang = lang
        repo.anchor = anchor

        repository_list.append(repo)

    return repository_list

@app.get(f"{PATH}/healthcheck", tags=["HealthCheck"], summary="Health Check Endpoint", description="Endpoint to check the health status of the API.")  
async def health_check() -> Dict[str, str | bool]:
    """
        Health Check Endpoint
    """
    LOG.info("Health check endpoint accessed.")

    dictionary: Dict[str, str | bool] = {
        "ApiRunning": True,
        "EndpointsAvailable": "4",
        "ApiName": ENVIRONMENT.API_NAME,
        "version" : ENVIRONMENT.API_VERSION,
        "status": "OK", "message": "API is healthy and running."
        }
    return dictionary

@app.get(f"{PATH}/test", tags=["Test"], summary="Test Endpoint", description="Endpoint to test the API setup.")
async def test_endpoint() -> Dict[str, str]:
    """
        Test Endpoint
    """

    try:
        await FetchEndpointDataService.github_repo_data_service()
        return {"message": "Test endpoint executed GitHub data fetch successfully."}

    except Exception as e:
        LOG.error(f"Test endpoint failed with error: {e}")
        return {"message": f"Test endpoint failed with error: {str(e)}"}