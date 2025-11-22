#   Standard Depnendencies
import os


#   Third Party Dependencies
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

#   Local Dependencies
from lib.utils.app_utility import AppTools
from lib.utils.logger_config import AppWatcher
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
@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio Backend API"}
#   Registering Enpoint Services
#   @app.get("/api/v2/blogs/heavy/")

# @app.get("/api/v2/announcement", tags=["Announcements"])
# @app.get("/api/v2/portfolio/github/{username}", tags=["GitHub"])