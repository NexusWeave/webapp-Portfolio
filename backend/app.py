#   Standard Libraries
import os, __future__, uvicorn
from datetime import datetime
from typing import Dict, Optional, List, Sequence

#   Third-Party Libraries
from dotenv import load_dotenv
from fastapi import FastAPI, Request

#   Internal Libraries
from lib.settings.app_config import AppConfig
from lib.utils.logger_config import AppWatcher
from lib.utils.exception_handler import NotFoundError

from lib.models.github_model import RepositoryModel
from lib.models.announcement_model import AnnouncementModel

from lib.services.api_db_bridge import ApiDatabaseBridge
from lib.services.github.repository_handler import GithubDatabaseHandler
from lib.services.announcements.announcements import AnnouncementsService

from lib.settings.database_config import ASynchronousDatabaseConfig

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='FastAPI-App')
LOG.file_handler()

CONFIG: AppConfig = AppConfig()

try:
    ENVIRONMENT = CONFIG.environment_initialization()

except ValueError as ve:
    LOG.error(f"Error in setting up the environment: {ve}")
    raise ve

#   Initialize FastAPI
app = FastAPI(title = ENVIRONMENT.API_NAME, version = ENVIRONMENT.API_VERSION, lifespan = CONFIG.app_initialization)

CONFIG.middleware_initialization(app, ENVIRONMENT)
LOG.info(f"\'{ENVIRONMENT.__class__.__name__}\' - \'{ENVIRONMENT.API_VERSION}\' loaded \'{ENVIRONMENT.ENVIRONMENT}\'- Environment successfully.") 

#   Registering Enpoint Services
VERSION: str = ENVIRONMENT.API_VERSION
PATH = f"/api/{VERSION}"

@app.get("/")
def read_root():
    return {"message": "END POINT NOT FOUND !"}

@app.get(f"{PATH}/blogs/heavy/", tags=["exercise", "blogs"])
async def get_heavy_data() ->None:
    pass

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
async def fetch_repositories(request: Request) -> Sequence[RepositoryModel] | Dict[str, str]:
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
        "status": "OK", "message": "API is healthy and running.",
        }

    dictionary["github_api"] = "Responsive" if await check_github_api() else "Unresponsive"
    dictionary['Crawler'] = "Responsive" if await check_specializt_api() else "Unresponsive"
    
    return dictionary

@app.get(f"{PATH}/handleRepositories", tags=["github", "repositories"], summary="Upserts the Database", description="Upserts the Database")
async def handle_repositories(request: Request) -> Dict[str, str]:

    try:
        await ApiDatabaseBridge.repositories_sync(request, ENVIRONMENT.GITHUB_REST, ENVIRONMENT.GITHUB_PARAMS, ENVIRONMENT.PERSONAL_GITHUB_REST_API, ENVIRONMENT.GITHUB_TOKEN)

    except Exception as e:
        LOG.critical(f"handle_repositories_endpoint : failed with error\n {e.__class__.__name__} - {e}")
        if ENVIRONMENT.ENVIRONMENT == 'development': return {"code": "500","message": f"{e}"}
        else : return {"code": "400","message": f"Endpoint was not found"}

    return {"message": "All Repositories has been successfully synced with database."}

async def check_github_api() -> bool:
    """ Checks the availability of the GitHub API. """
    from lib.services.github.github_api import GithubAPI

    URL = ENVIRONMENT.GITHUB_REST
    TOKEN = ENVIRONMENT.GITHUB_TOKEN

    try:
        if not URL or not TOKEN:
            raise ValueError("GITHUB_REST and GITHUB_TOKEN must be set in the environment variables.")
    
    except ValueError as e:
        LOG.error(f"Error initializing GithubAPI: {e.__class__.__name__} - {str(e)}")
        return False
    
    github = GithubAPI(URL=URL, KEY=TOKEN)
    PERSONAL_ENDPOINT: str = f"{ENVIRONMENT.PERSONAL_GITHUB_REST_API}{ENVIRONMENT.GITHUB_PARAMS}"

    try:
        await github.fetch_data(endpoint=PERSONAL_ENDPOINT)
    
    except Exception as e:
        LOG.error(f"GitHub API check failed: {e.__class__.__name__} - {str(e)}, {URL}{PERSONAL_ENDPOINT}")
        return False

    return True

async def check_specializt_api() -> bool:
    from lib.settings.api_config import Scanner

    cb = Scanner(URL = 'https://krigjo25.no', KEY = '')
    response = None
    try:
        response = await cb.fetch_web_rules()
        if not response: raise Exception('Response is none')

    except Exception as e:
        LOG.error(f"Specialist API check failed: {e.__class__.__name__} - {str(e)}")
        return False

    return True

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)