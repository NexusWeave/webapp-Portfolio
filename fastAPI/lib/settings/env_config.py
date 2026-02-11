#  App congiguration settings

# Standard Libraries
import __future__, os

# Third Party Libraries
from typing import List, Optional
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


#   Initialize Enviorment variables
load_dotenv()

class Config(BaseSettings):
    DEBUG: bool = False
    API_VERSION: str = "v1"
    CORS_ORIGINS: List[str]
    #SECRET_KEY: Optional[str]
    #DATABASE_URL: Optional[str]
    #DATABASE_TOKEN: Optional[str]
    ENVIRONMENT: str = "development"
    API_NAME: str = "Portfolio Backend API"

    #   Enviorment strings

    # Github REST API
    GITHUB_REST: str = "".strip()
    GITHUB_TOKEN: str = ""
    GITHUB_PER_PAGE: str = ""
    ORGANIZATIONS: List[str] = []
    ORG_GITHUB_REST_API: str = ""
    PERSONAL_GITHUB_REST_API: str = ""

    # Heavy Workout API
    HEAVYV: str = ""
    HEAVYAPI: str = ""
    HEAVYCOUNT: str = ""
    HEAVYTOKEN: str = ""
    HEAVYWORKOUTS: str = ""

    #   Database
    POSTGRESS_DB : str = ""
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

class ProdConfig(Config):
    SECRET_KEY: Optional[str] = os.getenv('SECRET_KEY', None)
    DATABASE_URL: Optional[str] = os.getenv('PROD_DATABASE', None)
    DATABASE_TOKEN: Optional[str] = os.getenv('TURSO_WRITE_TOKEN', None)

class DevelopmentConfig(Config):
    DEBUG: bool = True
    SECRET_KEY: Optional[str] = os.getenv('SECRET_KEY', None)
    DATABASE_URL: Optional[str] = os.getenv('DEV_DATABASE', None)
    DATABASE_TOKEN: Optional[str] = os.getenv('DEV_DATABASE_TOKEN', None)

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
