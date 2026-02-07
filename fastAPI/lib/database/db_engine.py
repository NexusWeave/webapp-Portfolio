#   Dependencies
import os
from typing import Optional

#   Third-Party Dependencies
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

#   Internal Dependencies
from databases import Sqlite3Provider, PostgressProvider

load_dotenv()

def initialize_sqlite_engine() -> Sqlite3Provider:
    SQLITE3_DB: Optional[str] = os.getenv('SQLITE3_TOKEN', None)
    SQLITE3_TOKEN : Optional[str] = os.getenv('SQLITE3_TOKEN', "local.db")

    #   Database Configuration
    PATH : str = f"sqlite+{SQLITE3_DB}?secure=true"
    SQLITE3_Engine = create_engine( PATH, connect_args={"auth_token": SQLITE3_TOKEN})
    SQLITE3_SESSIONLOCAL = sessionmaker( class_ = Session, bind = SQLITE3_Engine, expire_on_commit = False)

    return Sqlite3Provider( engine = SQLITE3_Engine, session_factory = SQLITE3_SESSIONLOCAL)

def initialize_postgress_engine() -> PostgressProvider:
    POSTGRESS_DB: Optional[str] = os.getenv('POSTGRESS_DATABASE', None)
    POSTGRESS_TOKEN : Optional[str] = os.getenv('POSTGRESS_TOKEN', "local.db")

    #   Database Configuration
    PATH : str = f"sqlite+{POSTGRESS_DB}?secure=true"
    POSTGRESS_ENGINE = create_engine( PATH, echo=False, pool_pre_ping=True,
        connect_args={"sslmode": "require"} if "neon.tech" in DATABASE_URL else {}
    )
    SQLITE3_SESSIONLOCAL = sessionmaker( class_ = Session, bind = POSTGRESS_ENGINE, expire_on_commit = False)

    return PostgressProvider( engine = POSTGRESS_ENGINE, session_factory = SQLITE3_SESSIONLOCAL)

SQLITE_INSTANCE = initialize_sqlite_engine()
POSTGRES_INSTANCE = initialize_postgress_engine()