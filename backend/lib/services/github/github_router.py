#   Standard Libraries
from collections.abc import Sequence
from typing import Any

#   Third-Party Libraries
from fastapi import BackgroundTasks, Request

from lib.models.github_model import RepositoryModel
from lib.services.api_db_bridge import ApiDatabaseBridge
from lib.services.base_service import BaseService
from lib.services.github.repository_handler import GithubDatabaseHandler
from lib.settings.database_config import ASynchronousDatabaseConfig

#   Internal Libraries
from lib.utils.logger_config import AppWatcher

LOG = AppWatcher(name="Router")
LOG.file_handler()


class GithubService(BaseService):
    def __init__(self, PATH: str, ENVIRONMENT: Any) -> None:
        super().__init__(PATH, ENVIRONMENT)
        self._setup_routes()

        self.GITHUB_REST = ENVIRONMENT.GITHUB_REST
        self.GITHUB_TOKEN = ENVIRONMENT.GITHUB_TOKEN
        self.GITHUB_PARAMS = ENVIRONMENT.GITHUB_PARAMS
        self.GITHUB_CONTRIBUTOR = ENVIRONMENT.CONTRIBUTOR
        self.GITHUB_ENDPOINT = ENVIRONMENT.GITHUB_ENDPOINT

    def _setup_routes(self) -> None:
        self.router.add_api_route(
            f"{self.PATH}/repositories",
            self.fetch_repositories,
            response_model=list[RepositoryModel],
            summary="Get GitHub Repository Information",
            tags=["GitHub"],
            name="Fetch Repositories",
        )
        self.router.add_api_route(
            f"{self.PATH}/handleRepositories",
            self.handle_repositories,
            tags=["github", "repositories"],
            summary="Upserts the Database",
            description="Upserts the Database",
            name="Synchronize Repositories",
        )

    async def fetch_repositories(
        self, request: Request
    ) -> Sequence[RepositoryModel] | dict[str, str]:
        DB_CONTEXT: ASynchronousDatabaseConfig = request.app.state.db

        async with DB_CONTEXT.SessionLocal() as session:
            HANDLER = GithubDatabaseHandler(session=session)
            return await HANDLER.fetch_all_repositories()

    async def handle_repositories(
        self, request: Request, background_tasks: BackgroundTasks
    ) -> dict[str, str]:
        background_tasks.add_task(
            ApiDatabaseBridge.repositories_sync,
            request,
            token=self.ENVIRONMENT.GITHUB_TOKEN,
            contributor=self.GITHUB_CONTRIBUTOR,
            url=self.ENVIRONMENT.GITHUB_REST,
            endpoint=self.ENVIRONMENT.GITHUB_ENDPOINT,
            params=self.ENVIRONMENT.GITHUB_PARAMS,
        )

        LOG.info("Repository sync task scheduled in background.")
        return {
            "status": "202",
            "message": "Repository synchronization initiated in background.",
        }
