#   Standard Libraries
import os, __future__, uvicorn
from datetime import datetime
from typing import Dict, Optional, List, Sequence, Any, Union

#   Third-Party Libraries
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.routing import APIRoute

#   Internal Libraries
from lib.settings.app_config import AppConfig
from lib.utils.logger_config import AppWatcher
from lib.utils.exception_handler import NotFoundError
from lib.utils.health_check import check_specializt_api, check_github_database_repositories

from lib.models.github_model import RepositoryModel
from lib.models.announcement_model import AnnouncementModel

from lib.services.api_db_bridge import ApiDatabaseBridge
from lib.services.github.repository_handler import GithubDatabaseHandler
from lib.services.announcements.announcements import AnnouncementsService

from lib.settings.database_config import ASynchronousDatabaseConfig

NESTED_DICTS = Union[str, Dict[str, Any], bool, int]

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

@app.get(f"{PATH}/healthcheck", tags=["HealthCheck"], summary="Health Check Endpoint", description="Endpoint to check the health status of the API.", name="Health Check")  
async def health_check() -> NESTED_DICTS:
    """
        Health Check Endpoint
    """
    LOG.info("Health check endpoint accessed.")

    dictionary: NESTED_DICTS = {
        "ApiRunning": True,
        "EndpointsAvailable": f"{len(app.routes)}",
        "ApiName": ENVIRONMENT.API_NAME,
        "version" : ENVIRONMENT.API_VERSION,
        'GET' : [],
        'POST': []
        }

    health_check_chart = {
        'AI-specialist' : await check_specializt_api(),
        'Fetch Repositories' : await check_github_database_repositories()
    }

    for route in app.routes:
        if isinstance(route, APIRoute) and hasattr(route, 'methods') and not route.name == 'Health Check':
            model_name = str(route.response_model) if route.response_model else "None"
            if 'GET' in route.methods:
                dictionary["GET"].append({ f"{route.name}": { 'path': route.path, 'model': model_name, 'methods': list(route.methods), 'status': health_check_chart.get(route.name) if health_check_chart.get(route.name) else "Not Connected" } })
    
    return dictionary

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

@app.get(f"{PATH}/repository", response_model = List[RepositoryModel], summary="Get GitHub Repository Information",  tags=["GitHub"], name='Fetch Repositories' )
async def fetch_repositories(request: Request) -> Sequence[RepositoryModel] | Dict[str, str]:
    DB_CONTEXT: ASynchronousDatabaseConfig = request.app.state.db

    async with DB_CONTEXT.SessionLocal() as session:
        HANDLER = GithubDatabaseHandler(session = session)

        return await HANDLER.fetch_all_repositories()

@app.get(f"{PATH}/handleRepositories", tags=["github", "repositories"], summary="Upserts the Database", description="Upserts the Database", name= 'Synchronize Repositories')
async def handle_repositories(request: Request) -> Dict[str, str]:

    try:
        await ApiDatabaseBridge.repositories_sync(request, ENVIRONMENT.GITHUB_REST, ENVIRONMENT.GITHUB_PARAMS, ENVIRONMENT.PERSONAL_GITHUB_REST_API, ENVIRONMENT.GITHUB_TOKEN)

    except Exception as e:
        LOG.critical(f"handle_repositories_endpoint : failed with error\n {e.__class__.__name__} - {e}")
        if ENVIRONMENT.ENVIRONMENT == 'development': return {"code": "500","message": f"{e}"}
        else : return {"code": "400","message": f"Endpoint was not found"}

    return {"message": "All Repositories has been successfully synced with database."}

@app.get(f"{PATH}/specialist", tags=["AI", "specialist"], summary="Upserts the Database", description="Upserts the Database", name='AI-specialist')
async def specialist(request: Request) -> Dict[str, str]:

    try:
        await ApiDatabaseBridge.repositories_sync(request, ENVIRONMENT.GITHUB_REST, ENVIRONMENT.GITHUB_PARAMS, ENVIRONMENT.PERSONAL_GITHUB_REST_API, ENVIRONMENT.GITHUB_TOKEN)

    except Exception as e:
        LOG.critical(f"handle_repositories_endpoint : failed with error\n {e.__class__.__name__} - {e}")
        if ENVIRONMENT.ENVIRONMENT == 'development': return {"code": "500","message": f"{e}"}
        else : return {"code": "400","message": f"Endpoint was not found"}

    return {"message": "All Repositories has been successfully synced with database."}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)