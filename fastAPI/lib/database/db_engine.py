#   Dependencies
import os, ssl
from typing import Optional

#   Third-Party Dependencies
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker


#   Internal Dependencies
from .db_providers import Sqlite3Provider, PostgresProvider

#   Initialize Enviorment variables
load_dotenv()

def initialize_sqlite_engine() -> Sqlite3Provider:
    SQLITE3_DB: Optional[str] = os.getenv('SQLITE3_DB', None)
    SQLITE3_TOKEN : Optional[str] = os.getenv('SQLITE3_TOKEN', "local.db")

    #   Database Configuration
    PATH : str = f"sqlite+{SQLITE3_DB}?secure=true"
    SYNC_ENGINE = create_engine( PATH, connect_args={"auth_token": SQLITE3_TOKEN})
    SESSION = sessionmaker( class_ = Session, bind = SYNC_ENGINE, expire_on_commit = False)

    return Sqlite3Provider( engine = SYNC_ENGINE, session_factory = SESSION)

async def initialize_postgress_engine() -> PostgresProvider:
    POSTGRES_DB: Optional[str] = os.getenv('POSTGRESS_DB', None)
    if not POSTGRES_DB: raise ValueError("POSTGRESS_DB env variable is missing")

    DB_CONTEXT = POSTGRES_DB.split('://')

    URL = DB_CONTEXT[1]
    driver = DB_CONTEXT[0]
    PATH = sanitize_url(driver, URL)

    print(PATH)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    ASYNC_ENGINE = create_async_engine( PATH, echo = False,  pool_pre_ping = True, connect_args = {
        "ssl": ctx, "prepared_statement_cache_size":0})

    SESSION = async_sessionmaker(class_ = AsyncSession, bind = ASYNC_ENGINE, expire_on_commit = False)
    return PostgresProvider(engine=ASYNC_ENGINE, session_factory=SESSION)

def sanitize_url(driver:str, URL:str):

    url = None
    match driver:
        case 'postgresql+asyncpg':
            url = make_url(f"{driver}://{URL}") 
            url = url.set(query = {})

        case 'sqlite3+libsql':
            url = make_url(f"{driver}://{URL}") 
            url = url.set(query = {})

        case _: url = URL
    return url