#   Third-Party Libraries
import pytest
from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

#   Internal Libraries
from lib.settings.database_config import BASE

TEST_DATABASE_URL = "sqlite+aiosqlite:///./test_database.db"


@pytest.fixture(scope="session")
def engine():

    engine = create_async_engine(TEST_DATABASE_URL, echo=False, future=True, poolclass=NullPool)
    return engine


@pytest.fixture(scope="session")
async def setup_database(engine):
    async with engine.begin() as conn:
        await conn.run_sync(BASE.metadata.create_all)

    yield

    # async with engine.begin() as conn:
    #     await conn.run_sync(BASE.metadata.drop_all)


@pytest.fixture(scope="function")
async def db_session(engine, setup_database):
    connection = await engine.connect()
    transaction = await connection.begin()

    SessionLocal = async_sessionmaker(
        expire_on_commit=False, autoflush=False, bind=connection, class_=AsyncSession
    )
    session = SessionLocal()

    try:
        yield session
    finally:
        await transaction.rollback()
        await connection.close()
        await session.close()
