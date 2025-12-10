#   Third-Party Libraries
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, AsyncSession
#   Local Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.services.base_services.database_config import AsyncDatabaseService

LOG = DatabaseWatcher(dir="logs", name="DatabaseService")
LOG.file_handler()

class Sqlite3(AsyncDatabaseService):

    def __init__(self, engine: AsyncEngine, session_factory: async_sessionmaker[AsyncSession]):
        super().__init__(engine, session_factory)
        LOG.info("Sqlite3 Service Initialized")
