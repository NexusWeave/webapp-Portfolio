#   Standard Libraries
import os

#   Local Libraries
from dotenv import load_dotenv

from lib.utils.logger_config import DatabaseWatcher
from lib.services.base_services.database_services import AsyncDatabaseService

load_dotenv()

logger = DatabaseWatcher(name="DatabaseService")
logger.info("Sqlite3 Service Initialized")

class Sqlite3(AsyncDatabaseService):

    def __init__(self, engine, session_factory):
    
        super().__init__(engine, session_factory)
