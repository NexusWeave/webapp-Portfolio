
#   Third Party Dependencies
from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
#   Local Dependencies
from lib.utils.logger_config import AppWatcher
from lib.settings.env_config import Config, DevelopmentConfig, ProdConfig

# Initialize the logger
LOG = AppWatcher(dir="logs", name='FastAPI-App')
LOG.file_handler()

class AppTools:
    
    @staticmethod
    def environment_initialization(env:str) -> Config:
        env = env.lower()

        if env == 'production': return ProdConfig()
        if env == 'development': return DevelopmentConfig()
        raise ValueError(f"Invalid environment variable. ENV = \"{env}\". Set ENV to either 'production' or 'development'.")

    @staticmethod
    def middleware_initialization(app: FastAPI, config: Config) -> None:
        pass

    #@asynccontextmanager
    async def app_initialization(app: FastAPI):
        """
            FastAPI Startup Eventer
        """
        pass