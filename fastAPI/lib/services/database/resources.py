#   Standard Libraries
import os

#   Third-Party Libraries
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

#   Local Libraries
from .databases import Sqlite3

load_dotenv()

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