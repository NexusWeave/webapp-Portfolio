#   Standard Depnendencies
import __future__
import os

from datetime import datetime
from typing import Dict, Optional

#   Third Party Dependencies
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

#   Local Dependencies
from lib.utils.exception_handler import NotFoundError
from lib.utils.app_utility import AppTools
from lib.utils.logger_config import AppWatcher

from lib.models.announcements import Announcements
#   from lib.models.github import Github
#   from lib.models.announcements import Announcements
#   from lib.models.announcements import Announcements

from lib.services.announcements import AnnouncementsService
#   from lib.endpoint_services.github_data import Github
#   from lib.endpoint_services.Photos import PhotoLibrary
#   from lib.endpoint_services.announcements import Announcements


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


@app.get("/api/v2/announcement/today", response_model=Announcements, tags=["Announcements"], summary="Get Today's Announcement", description="Fetches today's announcement based on predefined holidays and special occasions.")
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

# @app.get("/api/v2/portfolio/github/{username}", tags=["GitHub"])