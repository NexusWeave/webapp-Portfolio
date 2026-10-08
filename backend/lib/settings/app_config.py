#   Standard Library Dependencies


#   Third Party Dependencies
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from lib.database.db_engine import initialize_postgress_engine

#   Internal Dependencies
from lib.settings.database_config import BASE
from lib.settings.env_config import Config, DevelopmentConfig, ProdConfig
from lib.utils.logger_config import AppWatcher

# Initialize the logger
LOG = AppWatcher(dir="logs", name="FastAPI-App")
LOG.file_handler()


class AppConfig:
    __VERSION__ = "v1.0.0"

    @staticmethod
    def environment_initialization() -> Config:

        try:
            match Config().ENVIRONMENT:
                case "production":
                    return ProdConfig()
                case "development":
                    return DevelopmentConfig()
                case _:
                    raise ValueError("Invalid environment variable.")
        except ValueError as e:
            LOG.critical(f"An error occurred during environment initialization: {e}")
            raise e

    @staticmethod
    def middleware_initialization(app: FastAPI, CORS_ORIGINS: list[str]) -> None:
        app.add_middleware(
            CORSMiddleware,
            allow_credentials=False,
            allow_origins=CORS_ORIGINS,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    @asynccontextmanager
    async def app_initialization(self, app: FastAPI):
        """
        FastAPI Startup Eventer
        """
        try:
            config = self.environment_initialization()
            app.state.db = await initialize_postgress_engine(url=config.DATABASE_URL)

            async with app.state.db.engine.begin() as conn:
                await conn.run_sync(BASE.metadata.create_all)

            LOG.info("Database tables verified/created successfully.")

        except Exception as e:
            LOG.critical(f"An Error occured during database initalization: {e}")
            raise e

        LOG.info("FastAPI Application started successfully.")

        yield

        if hasattr(app.state, "db"):
            await app.state.db.engine.dispose()
            LOG.info("Database connections closed.")

        LOG.info("FastAPI Application has been shutdown")
