#   Third-Party Dependencies
from sqlalchemy import Engine
from sqlalchemy.orm import sessionmaker, Session

#   Internal Dependencies
from lib.utils.logger_config import DatabaseWatcher
from lib.settings.database_config import DatabaseConfig

LOG = DatabaseWatcher(dir="logs", name="DatabaseService")
LOG.file_handler()

class Sqlite3(DatabaseConfig):

    def __init__(self, engine: Engine, session_factory: sessionmaker[Session]):
        super().__init__(engine, session_factory)
        LOG.info("Sqlite3 Service Initialized")
