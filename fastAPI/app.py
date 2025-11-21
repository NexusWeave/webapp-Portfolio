#  Application entry point

#   Importing required depenedencies
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv


#   Custom dependencies
from lib.utils.logger_config import AppWatcher

#   Endpoint services
#   from lib.endpoint_services.github_data import Github
#   from lib.endpoint_services.Photos import PhotoLibrary
#   from lib.endpoint_services.announcements import Announcements
from lib.settings.env_config import DevelopmentConfig, ProdConfig

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
logger = AppWatcher(dir="logs", name='Flask-App')
logger.file_handler()

#   Initialize Flask app and Extensions
app = FastAPI(title="Portfolio Backend API", version="1.0.0")

match str(os.getenv('ENV')).lower():
    case 'production':
        app.add_middleware(CORSMiddleware,ProdConfig.CORS_ORIGINS, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
        logger.info("Loading the Production Environment")                                                                                     #type: ignore

    case 'development':
        app.add_middleware(CORSMiddleware,DevelopmentConfig.CORS_ORIGINS, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
        logger.info("Loading the Development Environment")                                                                                     #type: ignore

    case _:
        logger.error("Invalid environment variable. Set ENV to either 'production' or 'development'.")                                          #type: ignore
        raise ValueError("Invalid environment variable. Set ENV to either 'production' or 'development'.")

#   Registering Enpoint Services
#   @app.get("/api/v2/blogs/heavy/")
@app.get("/")
def read_root():
    return {"message": "Welcome to the Portfolio Backend API"}
# @app.get("/api/v2/announcement", tags=["Announcements"])
# @app.get("/api/v2/portfolio/github/{username}", tags=["GitHub"])