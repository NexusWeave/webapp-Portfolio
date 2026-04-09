# Standard Libraries
import __future__, os
from typing import List, Optional, Dict

# Third Party Libraries
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


#   Initialize Enviorment variables
load_dotenv()

class Config(BaseSettings):
    DEBUG: bool = False
    
    API_VERSION: str = "v1"
    CORS_ORIGINS: List[str] = []
    ENVIRONMENT: str = "development"
    API_NAME: str = "Portfolio Backend API"

    # Github REST API
    GITHUB_TREE: str = ""
    GITHUB_REST: str = ""
    GITHUB_TOKEN: str = ""
    PERSONAL_GITHUB_REST_API: str = ""
    GITHUB_PARAMS: Dict[str, str | int] = {}

    # Heavy Workout API
    HEAVY_V: str = ""
    HEAVY_API: str = ""
    HEAVY_COUNT: str = ""
    HEAVY_TOKEN: str = ""
    HEAVY_WORKOUTS: str = ""

    #   AI Specialist
    SPECIALIST_LINKS: List[str] = []

    #   Database
    PG_USER: str = ""
    PG_HOST: str = ""
    PG_PASSWORD: str = ""
    PG_SSL_MODE: str = ""
    PG_DATABASE : str = ""
    PG_CHANNEL_BINDING: str = ""
    model_config = SettingsConfigDict(env_file="/.env", env_file_encoding="utf-8", extra="ignore")


class ProdConfig(Config):
    SECRET_KEY: Optional[str] = os.getenv('SECRET_KEY', None)
    DATABASE_URL: Optional[str] = os.getenv('PROD_DATABASE', None)
    DATABASE_TOKEN: Optional[str] = os.getenv('TURSO_WRITE_TOKEN', None)

class DevelopmentConfig(Config):
    DEBUG: bool = True
    SECRET_KEY: Optional[str] = os.getenv('SECRET_KEY', None)
    DATABASE_URL: Optional[str] = os.getenv('DEV_DATABASE', None)
    DATABASE_TOKEN: Optional[str] = os.getenv('DEV_DATABASE_TOKEN', None)
