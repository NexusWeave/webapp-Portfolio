#   Standard Libraries
from typing import List, Type, TypeVar

#   Third-Party Libraries
from dotenv import load_dotenv
from sqlalchemy.orm import declarative_base
from sqlalchemy import ScalarResult, select, delete
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, AsyncEngine

#   Internal Libraries
from lib.utils.logger_config import DatabaseWatcher


load_dotenv()

LOG = DatabaseWatcher(dir="logs", name="DatabaseService")
LOG.file_handler()

#   Type Aliases
T = TypeVar('T')

BASE = declarative_base()


#   Base Database Service
class AsyncDatabaseService:

    def __init__(self, engine: AsyncEngine, session_factory : async_sessionmaker[AsyncSession]):
        self.engine = engine
        self.session_factory = session_factory
    
    @property
    async def connection(self) -> None:
        async with self.engine.connect() as conn:
            LOG.info("Creating all tables in the database...")
            LOG.info(f"Registered Models: {BASE.metadata.tables.keys()}")

            try:
                await conn.run_sync(BASE.metadata.create_all)

            except Exception as e:
                LOG.error(f"Error creating tables: {e}")

            LOG.info("All tables created successfully.")

    @property
    def SessionLocal(self) -> async_sessionmaker[AsyncSession]:
        return self.session_factory
    
    @property
    def fetch_engine(self) -> AsyncEngine:
        return self.engine

    async def fetch_records(self, model: Type[T]) -> List[T]:
        async with self.SessionLocal() as session:
            result: ScalarResult[T] = await session.scalars(select(model))
            LOG.info(f"Fetched records for model: {model.__name__}")
            return list(result.all())

    async def delete_records(self, instance: Type[T]) -> None:
        async with self.SessionLocal() as session:
            instance =  await session.merge(instance)
            await session.execute(delete(instance))
            await session.commit()
        
        LOG.warn(f"Record deleted: {instance}")

