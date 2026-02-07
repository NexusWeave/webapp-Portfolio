#   Standard Depnendencies
import os, __future__, uvicorn
from datetime import datetime
from typing import Dict, Optional, List

#   Third Party Dependencies
from fastapi import FastAPI
from dotenv import load_dotenv

#   Internal Dependencies
from lib.settings.app_config import AppConfig
from lib.utils.logger_config import AppWatcher
from lib.utils.exception_handler import NotFoundError

#from lib.models.heavy_model import HeavyModel
from lib.models.github_model import RepositoryModel
from lib.models.announcement_model import AnnouncementModel

from lib.services.api_db_bridge import ApiDatabaseBridge
from lib.services.db_handler import GithubDatabaseHandler
from lib.services.announcements import AnnouncementsService

from lib.database.db_engine import SQLITE_INSTANCE

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='FastAPI-App')
LOG.file_handler()

CONFIG: AppConfig = AppConfig()

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

@app.get(f"{PATH}/repository", response_model = List[RepositoryModel], summary="Get GitHub Repository Information",  tags=["GitHub"])
def get_repositories() -> List[RepositoryModel] | Dict[str, str]:

    with SQLITE_INSTANCE.SessionLocal() as session:
        try:
            repositories: List[RepositoryModel] = GithubDatabaseHandler(session = session).fetch_all_repositories()
            if not repositories: raise NotFoundError(404, 'Resource not found')

        except NotFoundError as e:
            LOG.error(f"Exception occurred while fetching repositories: {e.status_code} - {e.message}")

            return {'message': 'No repositories found'}
    
        LOG.info(f"Fetched {len(repositories)} repositories from the database.")
        return repositories

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

@app.get(f"{PATH}/fetchRepositories", tags=["github", "repositories"], summary="Upserts the Database", description="Upserts the Database")
async def fetch_repositories_endpoint() -> Dict[str, str]:
    """
        Test Endpoint
    """

    REPOS:str | None = os.getenv("REPOS", None)
    org_endpoint:str | None = os.getenv("ORG_GITHUB_REST_API", None)
    personal_endpoint:str | None = os.getenv("PERSONAL_GITHUB_REST_API", None)
    ORANIZATION_GITHUB_REPOS: List[str | None] = [os.getenv("NEXUSWAVE_ORGANIZATION", None), os.getenv("GETACADEMY_ORGANIZATION", None)]
        

    try:
        if not org_endpoint or not personal_endpoint or not REPOS or not org_endpoint:
            LOG.warn("GitHub Token or Endpoint not found in environment variables.")
            raise NotFoundError(404, "GitHub Token or Endpoint not found in environment variables.")

        '''for i in range(len(ORANIZATION_GITHUB_REPOS)):
            if ORANIZATION_GITHUB_REPOS[i] is None: continue
            ORG_ENDPOINT: str = f"{ORANIZATION_GITHUB_REPOS[i]}{REPOS}"
            await FetchEndpointDataService.github_repo_data_service(ORG_ENDPOINT)'''
        PERSONAL_ENDPOINT: str = f"{personal_endpoint}{REPOS}"

        await ApiDatabaseBridge.repositories_sync(PERSONAL_ENDPOINT)
        return {"message": " Fetched All Repositories Successfully."}

    except Exception as e:
        LOG.error(f"Test endpoint failed with error: {e}")
        return {"message": f"An Error occured while processing the REST API call."}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)