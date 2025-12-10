#   Third Party Dependencies
from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from apscheduler.schedulers.asyncio import AsyncIOScheduler

#   Local Dependencies
from lib.settings.schedule_config import SchedulerConfig
from lib.settings.env_config import Config, DevelopmentConfig, ProdConfig

from lib.services.base_services.database_config import BASE
from lib.services.database.resources import SQLITE_INSTANCE

from lib.utils.logger_config import AppWatcher
# Initialize the logger
LOG = AppWatcher(dir="logs", name='FastAPI-App')
LOG.file_handler()

class AppConfig:
    
    @staticmethod
    def environment_initialization(env:str) -> Config:
        env = env.lower()

        match env:
            case 'production': return ProdConfig()
            case 'development': return DevelopmentConfig()
            case _:
                raise ValueError(f"Invalid environment variable. ENV = \"{env}\". Set ENV to either 'production' or 'development'.")

    @staticmethod
    def middleware_initialization(app: FastAPI, config: Config) -> None:
        LOG.info("Initializing Middleware...")
        app.add_middleware(
        CORSMiddleware, allow_credentials=True,
        allow_origins=config.CORS_ORIGINS,
        allow_methods=["*"], allow_headers=["*"])

    @asynccontextmanager
    async def app_initialization(self,app: FastAPI):
        """
            FastAPI Startup Eventer
        """
        LOG.info("FastAPI Application is starting up...")
        try:
            async with SQLITE_INSTANCE.engine.begin() as conn:
                await conn.run_sync(BASE.metadata.create_all)
            LOG.info("Database tables created successfully.")
        
        except Exception as e:
            LOG.error(f"Error creating database tables: {e}")
            raise e

        await SQLITE_INSTANCE.connection

        SCHEDULER = AsyncIOScheduler()
        SchedulerConfig().configure_jobs(SCHEDULER)
        SCHEDULER.start()

        LOG.info("FastAPI Application started successfully.")

        yield

        SCHEDULER.shutdown()
        LOG.info("Scheduler is shutting down...")