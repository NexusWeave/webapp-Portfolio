#   Dependencies
import os
from typing import Optional

#   Third-Party Dependencies
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

#   Internal Dependencies
from databases import Sqlite3Provider, PostgresProvider

load_dotenv()

def initialize_sqlite_engine() -> Sqlite3Provider:
    SQLITE3_DB: Optional[str] = os.getenv('SQLITE3_TOKEN', None)
    SQLITE3_TOKEN : Optional[str] = os.getenv('SQLITE3_TOKEN', "local.db")

    #   Database Configuration
    PATH : str = f"sqlite+{SQLITE3_DB}?secure=true"
    SQLITE3_Engine = create_engine( PATH, connect_args={"auth_token": SQLITE3_TOKEN})
    SQLITE3_SESSIONLOCAL = sessionmaker( class_ = Session, bind = SQLITE3_Engine, expire_on_commit = False)

    return Sqlite3Provider( engine = SQLITE3_Engine, session_factory = SQLITE3_SESSIONLOCAL)

def initialize_postgress_engine() -> PostgresProvider:
    POSTGRES_DB: Optional[str] = os.getenv('POSTGRESS_DATABASE', None)

    #   Database Configuration
    PATH : str = f"sqlite+{POSTGRES_DB}?secure=true"
    POSTGRES_ENGINE = create_engine( PATH, echo=False, pool_pre_ping=True,
        connect_args={"sslmode": "require"} if "neon.tech" in PATH else {}
    )
    SQLITE3_SESSIONLOCAL = sessionmaker( class_ = Session, bind = POSTGRES_ENGINE, expire_on_commit = False)

    return PostgresProvider( engine = POSTGRES_ENGINE, session_factory = SQLITE3_SESSIONLOCAL)

SQLITE_INSTANCE = initialize_sqlite_engine()
POSTGRES_INSTANCE = initialize_postgress_engine()