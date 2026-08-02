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
from lib.settings.database_config import ASynchronousDatabaseConfig
from lib.services.github.repository_handler import GithubDatabaseHandler


#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='API-Database-Bridge')
LOG.file_handler()

class ApiDatabaseBridge:
    __VERSION__ = "v1.0.0"

    @staticmethod
    async def repositories_sync(request:Request, url: str, params: Dict[str, str | int], endpoint: str, token: str, contributor: str):
        DB_CONTEXT: ASynchronousDatabaseConfig = request.app.state.db
        existing_timestamps = {}

        try:
            # Phase 1: Fetch existing state and close connection quickly
            async with DB_CONTEXT.SessionLocal() as session:
                existing_timestamps = await GithubDatabaseHandler(session = session).get_existing_timestamps()

            # Phase 2: Long-running external API calls (No DB connection held)
            repositories: List[Dict[str, Any]] | NotFoundError = await GithubAPI(URL = url, KEY = token).fetch_data(endpoint, contributor = contributor, params=params, existing_timestamps=existing_timestamps)
            if isinstance(repositories, NotFoundError): raise NotFoundError(404, "No repositories found from GitHub API.")

            # Phase 3: Save results in a fresh connection
            async with DB_CONTEXT.SessionLocal() as session:
                await GithubDatabaseHandler(session = session).upsert_repositories(repository = repositories)

        except NotFoundError as e:
            LOG.error(f"Error fetching GitHub data: {e.__class__.__name__} - {e.message}")
            return
