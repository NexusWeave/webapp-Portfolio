#   Dependencies
from typing import List, Type, TypeVar

#   Third-Party Dependencies
from sqlalchemy import Engine

from dotenv import load_dotenv
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import ScalarResult, select, delete

#   Internal Dependencies
from lib.utils.logger_config import DatabaseWatcher


load_dotenv()

LOG = DatabaseWatcher(dir="logs", name="DatabaseService")
LOG.file_handler()

#   Type Aliases
T = TypeVar('T')

BASE = declarative_base()


#   Base Database Service
class DatabaseServices:

    def __init__(self, engine: Engine, session_factory : sessionmaker[Session]):
        self.engine = engine
        self.session_factory = session_factory

    async def connection(self) -> None:
        with self.engine.connect() as conn:
            LOG.info("Creating all tables in the database...")
            LOG.info(f"Registered Models: {BASE.metadata.tables.keys()}")

            try:
                BASE.metadata.create_all(bind= conn)

            except Exception as e:
                LOG.error(f"Error creating tables: {e}")

            LOG.info("All tables created successfully.")

    @property
    def SessionLocal(self) -> sessionmaker[Session]:
        return self.session_factory
    
    @property
    def fetch_engine(self) -> Engine:
        return self.engine

    async def fetch_records(self, model: Type[T]) -> List[T]:
        with self.SessionLocal() as session:
            result: ScalarResult[T] = session.scalars(select(model))
            LOG.info(f"Fetched records for model: {model.__name__}")
            return list(result.all())

    async def delete_records(self, instance: Type[T]) -> None:
        with self.SessionLocal() as session:
            instance = session.merge(instance)
            session.execute(delete(instance))
            session.commit()
        
        LOG.warn(f"Record deleted: {instance}")

