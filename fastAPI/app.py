#   Standard Depnendencies
import os, __future__, uvicorn
from datetime import datetime
from typing import Dict, Optional, List, Sequence

#   Third Party Dependencies
from dotenv import load_dotenv
from fastapi import FastAPI, Request

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

from lib.settings.database_config import ASynchronousDatabaseConfig

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
app = FastAPI(title = ENVIRONMENT.API_NAME, version = ENVIRONMENT.API_VERSION, lifespan = CONFIG.app_initialization)

CONFIG.middleware_initialization(app, ENVIRONMENT)
LOG.info(f"\'{ENVIRONMENT.__class__.__name__}\' - \'v{ENVIRONMENT.API_VERSION}\' loaded \'{ENVIRONMENT.ENVIRONMENT}\'- Environment successfully.") 

#   Registering Enpoint Services
VERSION: str = ENVIRONMENT.API_VERSION
PATH = f"/api/{VERSION}"

@app.get("/")
def read_root():
    return {"message": "END POINT NOT FOUND !"}

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
async def get_repositories(request: Request) -> Sequence[RepositoryModel] | Dict[str, str]:
    DB_CONTEXT: ASynchronousDatabaseConfig = request.app.state.db

    async with DB_CONTEXT.SessionLocal() as session:
        HANDLER = GithubDatabaseHandler(session = session)
        return await HANDLER.fetch_all_repositories()


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

@app.get(f"{PATH}/handleRepositories", tags=["github", "repositories"], summary="Upserts the Database", description="Upserts the Database")
async def handle_repositories(request: Request) -> Dict[str, str]:

    try:
        for i in range(len(ENVIRONMENT.ORGANIZATIONS)):
            ORG_ENDPOINT: str = f"{ENVIRONMENT.ORG_GITHUB_REST_API}{ENVIRONMENT.ORGANIZATIONS[i]}{ENVIRONMENT.GITHUB_PER_PAGE}"
            # await ApiDatabaseBridge.repositories_sync(ENVIRONMENT.GITHUB_REST, ORG_ENDPOINT, ENVIRONMENT.GITHUB_TOKEN, request)

        PERSONAL_ENDPOINT: str = f"{ENVIRONMENT.PERSONAL_GITHUB_REST_API}{ENVIRONMENT.GITHUB_PER_PAGE}"
        await ApiDatabaseBridge.repositories_sync(ENVIRONMENT.GITHUB_REST,PERSONAL_ENDPOINT, ENVIRONMENT.GITHUB_TOKEN, request)

        return {"message": " Fetched All Repositories Successfully."}

    except Exception as e:
        LOG.error(f"fetch_repositories_endpoint : failed with error\n {e}")
        if ENVIRONMENT.ENVIRONMENT == 'development': return {"code": "500","message": f"{e}"}
        else : return {"code": "400","message": f"Endpoint was not found"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)