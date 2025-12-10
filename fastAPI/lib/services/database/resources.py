#   Standard Libraries
import os

#   Third-Party Libraries
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, CollaboratorModel, LanugageRepositoryAssosiationModel #type: ignore

#   Local Libraries
from .databases import Sqlite3

load_dotenv()
SEPERATOR: str = ":///"
DIALECT: str = os.getenv("SQLITE3_DIALECT", "sqlite")
DRIVER: str = os.getenv("SQLITE3_DRIVER", "aiosqlite")

PATH : str = os.getenv("SQLITE3_PATH", "./databases/sqliteDatabase.db")

#   Database Configuration
SQLITE3_URL = os.getenv("SQLITE3_URL", f"{DIALECT}+{DRIVER}{SEPERATOR}{PATH}")
SQLITE3_Engine = create_async_engine( SQLITE3_URL, echo=True, future=True)
SQLITE3_SESSIONLOCAL = async_sessionmaker(
    class_=AsyncSession,
    bind=SQLITE3_Engine,
    expire_on_commit=False,
)

SQLITE_INSTANCE = Sqlite3(
    engine=SQLITE3_Engine,
    session_factory=SQLITE3_SESSIONLOCAL
)