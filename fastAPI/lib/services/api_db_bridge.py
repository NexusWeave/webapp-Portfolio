#   Standard Depnendencies
import __future__
import os

from typing import Any, Dict, List

#   Third Party Dependencies
from dotenv import load_dotenv

#   Local Dependencies
from lib.utils.logger_config import AppWatcher
from lib.utils.exception_handler import NotFoundError


from lib.services.github_api import GithubAPI
from lib.services.database_services import GithubServices
from lib.services.database.resources import SQLITE_INSTANCE

#   Initialize Enviorment variables
load_dotenv()

# Initialize the logger
LOG = AppWatcher(dir="logs", name='Github-Service')
LOG.file_handler()

class ApiDatabaseBridge:

    @staticmethod
    async def repositories_sync(url: str, endpoint: str):
        LOG.warn("Initializing GitHub Repository Data Fetch Service...")

        GITHUB_TOKEN: str | None = os.getenv("GithubToken", None)

        try:
            if not GITHUB_TOKEN:
                LOG.warn("GitHub Token or Endpoint not found in environment variables.")
                raise NotFoundError(404, "GitHub Token or Endpoint not found in environment variables.")

            with SQLITE_INSTANCE.SessionLocal() as session:

                repositories: List[Dict[str, Any]] | NotFoundError = await GithubAPI(URL=url, KEY=GITHUB_TOKEN).fetch_data(endpoint)

                if isinstance(repositories, NotFoundError): raise NotFoundError(404, "No repositories found from GitHub API.")

                github_services: GithubServices = GithubServices(session = session)

                await github_services.save_repository(repository = repositories)

        except NotFoundError as e:
            LOG.error(f"Error fetching GitHub data: {e.__class__.__name__} - {e.message}")
            return