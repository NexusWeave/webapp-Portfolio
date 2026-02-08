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
    ENVIRONMENT: str
    DEBUG: bool = False
    API_VERSION: str = "v1"
    CORS_ORIGINS: List[str]
    SECRET_KEY: Optional[str]
    DATABASE_URL: Optional[str]
    DATABASE_TOKEN: Optional[str]
    API_NAME: str = "Portfolio Backend API"

    #   Enviorment strings
    ENV: str = ""

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

    ENVIRONMENT: str =  'production'
    SECRET_KEY: Optional[str] = os.getenv('SECRET_KEY', None)
    DATABASE_URL: Optional[str] = os.getenv('PROD_DATABASE', None)
    DATABASE_TOKEN: Optional[str] = os.getenv('TURSO_WRITE_TOKEN', None)
    CORS_ORIGINS: List[str] = os.getenv('CORS_ORIGINS', f'{['localhost:3000', 'http://localhost:3000', 'https://localhost:3000']}').split(',')


class DevelopmentConfig(Config):
    DEBUG: bool = True
    ENVIRONMENT: str = 'development'
    SECRET_KEY: Optional[str] = os.getenv('SECRET_KEY', None)
    DATABASE_URL: Optional[str] = os.getenv('DEV_DATABASE', None)
    DATABASE_TOKEN: Optional[str] = os.getenv('DEV_DATABASE_TOKEN', None)
    CORS_ORIGINS: List[str] = ['localhost:3000', 'http://localhost:3000', 'https://localhost:3000']

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
