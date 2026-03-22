#   Standard Depnendencies
import __future__
from typing import Any, Dict, List

#   Third Party Dependencies
from fastapi import Request
from dotenv import load_dotenv

#   Internal Dependencies
from lib.utils.logger_config import AppWatcher
from lib.services.github.github_api import GithubAPI
from lib.utils.exception_handler import NotFoundError
from lib.services.db_handler import GithubDatabaseHandler
from lib.settings.database_config import ASynchronousDatabaseConfig


#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='API-Database-Bridge')
LOG.file_handler()

class ApiDatabaseBridge:

    @staticmethod
    async def repositories_sync(request:Request, URL: str, params: Dict[str, str | int], ENDPOINT: str, TOKEN: str):
        DB_CONTEXT: ASynchronousDatabaseConfig = request.app.state.db

        try:
            async with DB_CONTEXT.SessionLocal() as session:
                repositories: List[Dict[str, Any]] | NotFoundError = await GithubAPI(URL = URL, KEY = TOKEN).fetch_data(ENDPOINT, params=params)
                if isinstance(repositories, NotFoundError): raise NotFoundError(404, "No repositories found from GitHub API.")

                GITHUB_HANDLER: GithubDatabaseHandler = GithubDatabaseHandler(session = session)
                await GITHUB_HANDLER.upsert_repositories(repository = repositories)

        except NotFoundError as e:
            LOG.error(f"Error fetching GitHub data: {e.__class__.__name__} - {e.message}")
            return
