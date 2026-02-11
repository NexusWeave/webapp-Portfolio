#   Dependencies
import os, ssl
from typing import Optional

#   Third-Party Dependencies
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url, URL
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker


#   Internal Dependencies
from .db_providers import Sqlite3Provider, PostgresProvider

#   Initialize Enviorment variables
load_dotenv()

def initialize_turso_engine() -> Sqlite3Provider:
    SQLITE3_DB: Optional[str] = os.getenv('TURSO_DB', None)
    SQLITE3_TOKEN : Optional[str] = os.getenv('TURSO_TOKEN', "local.db")

    #   Database Configuration
    PATH : str = f"sqlite+{SQLITE3_DB}?secure=true"
    SYNC_ENGINE = create_engine( PATH, connect_args={"auth_token": SQLITE3_TOKEN})
    SESSION = sessionmaker( class_ = Session, bind = SYNC_ENGINE, expire_on_commit = False)

    return Sqlite3Provider( engine = SYNC_ENGINE, session_factory = SESSION)

async def initialize_postgress_engine() -> PostgresProvider:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    PATH = connection_pool("postgresql+asyncpg", "PG")
    ASYNC_ENGINE = create_async_engine( PATH, echo = False,  pool_pre_ping = True, connect_args = { "ssl": ctx, "prepared_statement_cache_size":0, "statement_cache_size": 0})

    SESSION = async_sessionmaker(class_ = AsyncSession, bind = ASYNC_ENGINE, expire_on_commit = False)
    return PostgresProvider(engine=ASYNC_ENGINE, session_factory=SESSION)

def connection_pool(DRIVER:str, PREFIX:str):
    USER = os.getenv(f'{PREFIX}USER', None)
    HOST = os.getenv(f'{PREFIX}HOST', None)
    SSLMODE = os.getenv(f'{PREFIX}SSLMODE', None)
    PASSWORD = os.getenv(f'{PREFIX}PASSWORD', None)
    DATABASE: Optional[str] = os.getenv('PGDATABASE', None)
    if not DATABASE or not USER or not HOST or not SSLMODE or not PASSWORD: raise ValueError(f"Mising Environment Variable {DATABASE, USER, HOST, SSLMODE, PASSWORD}")
    return URL.create( drivername=DRIVER, username=USER, password=PASSWORD, host=HOST, database=DATABASE)