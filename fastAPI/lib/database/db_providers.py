#   Third-Party Dependencies
from sqlalchemy import Engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.asyncio import AsyncSession, AsyncEngine, async_sessionmaker

#   Internal Dependencies
from lib.utils.logger_config import DatabaseWatcher
from lib.settings.database_config import SynchronousDatabaseConfig, ASynchronousDatabaseConfig


LOG = DatabaseWatcher(dir="logs", name="Database-Config")
LOG.file_handler()

class Sqlite3Provider(SynchronousDatabaseConfig):
    def __init__(self, engine: Engine, session_factory: sessionmaker[Session]):
        super().__init__(engine, session_factory)
        LOG.info("Sqlite3 Provider Initialized")

class PostgresProvider(ASynchronousDatabaseConfig):
    def __init__(self, engine: AsyncEngine, session_factory: async_sessionmaker[AsyncSession]):
        super().__init__(engine, session_factory)
        LOG.info("POSTGRES Provider Initialized")
