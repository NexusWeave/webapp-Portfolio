#  App congiguration settings

# Importing required modules
import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Config(BaseSettings):

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8") #type: ignore

    DEBUG: bool = False
    ENVIRONMENT: str | None
    SECRET_KEY: str | None
    CORS_ORIGINS: List[str]
    DATABASE_URL: str | None

class ProdConfig(Config):
    ENVIRONMENT: str | None = 'production'
    CORS_ORIGINS: List[str] = os.getenv('CORS_ORIGINS') if (os.getenv('CORS_ORIGINS')) else [] #type: ignore

    

class DevelopmentConfig(Config):
    DEBUG: bool = True
    ENVIRONMENT: str | None = 'development'
    CORS_ORIGINS: List[str] = ['localhost:3000', 'http://localhost:3000', 'https://localhost:3000']
