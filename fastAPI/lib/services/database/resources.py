#   Dependencies
import os
from typing import Optional

#   Third-Party Dependencies
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel #type: ignore

#   Internal Dependencies
from .databases import Sqlite3

load_dotenv()

TURSO_DB: Optional[str] = os.getenv('PROD_DATABASE', None)
PATH : str = f"sqlite+{TURSO_DB}?secure=true"
TURSO_TOKEN : Optional[str] = os.getenv('TURSO_WRITE_TOKEN', "local.db")

#   Database Configuration
SQLITE3_Engine = create_engine( PATH, connect_args={"auth_token": TURSO_TOKEN})
SQLITE3_SESSIONLOCAL = sessionmaker(
    class_=Session,
    bind=SQLITE3_Engine,
    expire_on_commit=False,
)

SQLITE_INSTANCE = Sqlite3(
    engine=SQLITE3_Engine,
    session_factory=SQLITE3_SESSIONLOCAL
)