#   Third-Party Dependencies
from sqlalchemy import Engine
from dotenv import load_dotenv
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.asyncio import AsyncSession, AsyncEngine, async_sessionmaker

#   Internal Dependencies
from lib.utils.logger_config import DatabaseWatcher


load_dotenv()

LOG = DatabaseWatcher(dir="logs", name="Database-Config")
LOG.file_handler()


BASE = declarative_base()

#   Base Database Configuration
class SynchronousDatabaseConfig:
    def __init__(self, engine: Engine, session_factory : sessionmaker[Session]):
        self.engine = engine
        self.session_factory = session_factory

    async def connection(self) -> None:
        with self.engine.connect() as conn:
            LOG.info("Creating all tables in the database...")
            LOG.info(f"Registered Models: {BASE.metadata.tables.keys()}")

            try: BASE.metadata.create_all(bind= conn)
            except Exception as e:LOG.error(f"Error creating tables: {e}")

            LOG.info("All tables created successfully.")

    @property
    def fetch_engine(self) -> Engine: return self.engine

    @property
    def SessionLocal(self) -> sessionmaker[Session]: return self.session_factory

class ASynchronousDatabaseConfig:
    def __init__(self, engine: AsyncEngine, session_factory : async_sessionmaker[AsyncSession]):
        self.engine = engine
        self.session_factory = session_factory

    async def connection(self) -> None:
        async with self.engine.connect() as conn:
            LOG.info("Creating all tables in the database...")
            LOG.info(f"Registered Models: {BASE.metadata.tables.keys()}")

            try: BASE.metadata.create_all(bind= conn)
            except Exception as e: LOG.error(f"Error creating tables: {e}")

            LOG.info("All tables created successfully.")

    @property
    def fetch_engine(self) -> AsyncEngine: return self.engine

    @property
    def SessionLocal(self) -> async_sessionmaker[AsyncSession]: return self.session_factory