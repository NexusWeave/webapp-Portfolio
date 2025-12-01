#   Standard Libraries5987533333
import os
from typing import List, Type, TypeVar

#   Third-Party Libraries
from dotenv import load_dotenv
from sqlalchemy import ScalarResult, select, delete
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, AsyncEngine, create_async_engine

#   Local Libraries
from fastAPI.lib.services.database.sqlite3_services import Sqlite3
from lib.utils.logger_config import DatabaseWatcher

load_dotenv()

logger = DatabaseWatcher(name="DatabaseService")
logger.file_handler()

#   Type Aliases
T = TypeVar('T')

#   Database Configuration
SQLITE3_URL = os.getenv("SQLITE3_URL", "sqlite+aiosqlite:///./test.db")
SQLITE3_Engine = create_async_engine( SQLITE3_URL, echo=True, future=True)
SQLITE3_SessionLocal = async_sessionmaker(
    class_=AsyncSession,
    bind=SQLITE3_Engine,
    expire_on_commit=False,
)

SQLITE_INSTANCE = Sqlite3(
    engine=SQLITE3_Engine,
    session_factory=SQLITE3_SessionLocal
)
#   Base Database Service
class AsyncDatabaseService:

    def __init__(self, engine: AsyncEngine, session_factory : async_sessionmaker[AsyncSession]):
        self.engine = engine
        self.session_factory = session_factory

    @property
    def engine_connect(self) -> AsyncEngine:
        return self.engine

    @property
    def SessionLocal(self) -> async_sessionmaker[AsyncSession]:
        return self.session_factory
    
    @property
    def fetch_engine(self) -> AsyncEngine:
        return self.engine

    async def fetch_records(self, model: Type[T]) -> List[T]:
        async with self.SessionLocal() as session:
            result: ScalarResult[T] = await session.scalars(select(model))
            logger.info(f"Fetched records for model: {model.__name__}")
            return list(result.all())

    async def delete_records(self, instance: Type[T]) -> None:
        async with self.SessionLocal() as session:
            instance =  await session.merge(instance)
            await session.execute(delete(instance))
            await session.commit()
        
        logger.warn(f"Record deleted: {instance}")
