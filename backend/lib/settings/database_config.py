#   Third-Party Dependencies
from dotenv import load_dotenv
from sqlalchemy import Engine
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import Session, declarative_base, sessionmaker

#   Internal Dependencies
from lib.utils.logger_config import DatabaseWatcher

load_dotenv()

LOG = DatabaseWatcher(dir="logs", name="Database-Config")
LOG.file_handler()


BASE = declarative_base()


#   Base Database Configuration
class SynchronousDatabaseConfig:
    __VERSION__ = "v1.0.0"

    def __init__(self, engine: Engine, session_factory: sessionmaker[Session]):
        self.engine = engine
        self.session_factory = session_factory

    async def connection(self) -> None:
        with self.engine.connect() as conn:
            try:
                BASE.metadata.create_all(bind=conn)
            except Exception as e:
                LOG.error(f"Error creating tables: {e}")

    @property
    def fetch_engine(self) -> Engine:
        return self.engine

    @property
    def SessionLocal(self) -> sessionmaker[Session]:
        return self.session_factory


class ASynchronousDatabaseConfig:
    __VERSION__ = "v1.0.0"

    def __init__(self, engine: AsyncEngine, session_factory: async_sessionmaker[AsyncSession]):
        self.engine = engine
        self.session_factory = session_factory

    async def connection(self) -> None:
        async with self.engine.connect() as conn:
            try:
                BASE.metadata.create_all(bind=conn)
            except Exception as e:
                LOG.error(f"Error creating tables: {e}")

    @property
    def fetch_engine(self) -> AsyncEngine:
        return self.engine

    @property
    def SessionLocal(self) -> async_sessionmaker[AsyncSession]:
        return self.session_factory
