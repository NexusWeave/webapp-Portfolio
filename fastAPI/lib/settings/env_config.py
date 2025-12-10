#  App congiguration settings

# Standard Libraries
import __future__, os

# Third Party Libraries
from typing import List
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict


#   Initialize Enviorment variables
load_dotenv()

class Config(BaseSettings):
    ENVIRONMENT: str
    DEBUG: bool = False
    SECRET_KEY: str | None
    API_VERSION: str = "v1"
    CORS_ORIGINS: List[str]
    DATABASE_URL: str | None
    API_NAME: str = "Portfolio Backend API"
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

class ProdConfig(Config):
    ENVIRONMENT: str = 'production'
    SECRET_KEY: str | None = os.getenv('SECRET_KEY', None)
    DATABASE_URL: str | None = os.getenv('PROD_DATABASE_URL', None)
    CORS_ORIGINS: List[str] = os.getenv('CORS_ORIGINS', f'{['localhost:3000', 'http://localhost:3000', 'https://localhost:3000']}').split(',')

class DevelopmentConfig(Config):
    DEBUG: bool = True
    ENVIRONMENT: str = 'development'
    SECRET_KEY: str | None = os.getenv('SECRET_KEY', None)
    DATABASE_URL: str | None = os.getenv('DEV_DATABASE_URL', None)
    CORS_ORIGINS: List[str] = ['localhost:3000', 'http://localhost:3000', 'https://localhost:3000']