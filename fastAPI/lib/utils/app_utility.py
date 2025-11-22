
#   Third Party Dependencies
from dotenv import load_dotenv

#   Local Dependencies
from lib.utils.logger_config import AppWatcher
from lib.settings.env_config import Config, DevelopmentConfig, ProdConfig

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
logger = AppWatcher(dir="logs", name='Flask-App')
logger.file_handler()

class AppTools:
    
    @staticmethod
    def setup_environment(env:str) -> Config:
        env = env.lower()

        if env == 'production': return ProdConfig()
        if env == 'development': return DevelopmentConfig()
        raise ValueError(f"Invalid environment variable. ENV = \"{env}\". Set ENV to either 'production' or 'development'.")
