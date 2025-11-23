#   Standard Depnendencies
import __future__
import os

from datetime import datetime
from typing import Dict, Optional, List

#   Third Party Dependencies
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

#   Local Dependencies
from lib.utils.exception_handler import NotFoundError
from lib.utils.app_utility import AppTools
from lib.utils.logger_config import AppWatcher

#from lib.models.heavy_model import HeavyModel
from lib.models.github_model import GithubModel
from lib.models.announcements import AnnouncementModel


from lib.services.github_api import GithubAPI
#   from lib.endpoint_services.Photos import HeavyService
from lib.services.announcements import AnnouncementsService


#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
logger = AppWatcher(dir="logs", name='FastAPI-App')
logger.file_handler()

try:
    config = AppTools.setup_environment(os.getenv('ENV', 'development'))

except ValueError as ve:
    logger.error(f"Error in setting up the environment: {ve}")
    raise ve

logger.info(f"Configuration for \'{config.API_NAME}\' - \'v{config.API_VERSION}\' loaded \'{config.ENVIRONMENT}\'- Environment successfully.") 
    
#   Initialize FastAPI
app = FastAPI(title = config.API_NAME, version=config.API_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

#   Registering Enpoint Services
@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio Backend API"}

#   @app.get("/api/v2/blogs/heavy/", response_model=Heavy, tags=["exercise", "blogs"])


@app.get("/api/v2/announcement/today", response_model=AnnouncementModel, tags=["Announcements"], summary="Get Today's Announcement", description="Fetches today's announcement based on predefined holidays and special occasions.")
async def get_todays_announcement() -> Dict[str, int | datetime | str]:
    service: AnnouncementsService = AnnouncementsService()
    today: datetime = datetime.today()

    try:
        message: Optional[str] = service.get_holidays(today)

        if message is None:
            raise NotFoundError(404, "No announcements for today")

    except NotFoundError as e:
        logger.warn(f"Announcement not found: {e.__class__.__name__} - {e.message}")
        return {"announcement_id": 0, "date": today, "message": e.message}
    
    response: Dict[str, int | datetime | str] = {"announcement_id": 1, "date": today, "message": message}

    return response

@app.get(f"/api/v2/repository", response_model=GithubModel, summary="Get GitHub Repository Information",  tags=["GitHub"])
async def get_repositories() -> Dict[str, str | int | datetime | List[Dict[str, str | int]]]:

    #github_service: GithubAPI = GithubAPI()
    endpoint: str = os.getenv("GithubRepos", "/users/your-username")  # Replace 'your-username' with the actual GitHub username

    try:
        repositories: List[Dict[str, str | int | List[str] | object]] | NotFoundError = await GithubAPI().fetch_data(endpoint)

        if isinstance(repositories, NotFoundError):
            raise repositories

    except NotFoundError as e:
        logger.warn(f"GitHub Repositories not found: {e.__class__.__name__} - {e.message}")
        return {"name": "", "owner": "", "date": datetime.now(), "id": 0, "description": "", "lang": [], "anchor": []}
    
    # For demonstration, returning the first repository's details
    first_repo = repositories[0]
    return first_repo