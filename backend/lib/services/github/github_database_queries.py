# Standard Library
import datetime
from collections.abc import Sequence
from typing import Any

# Third Party Libraries
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from lib.models.database_models.GithubModel import (
    LanguageAssosiationModel,
    RepoCollaboratorAssociationModel,
    RepositoryModel,
)
from lib.services.base_service import DatabaseQueries

# Internal Libraries
from lib.utils.logger_config import DatabaseWatcher

LOG = DatabaseWatcher(name="Github-DAO-Layer")
LOG.file_handler()


class GithubDatabaseQueries(DatabaseQueries):
    """Data Access Object for fetching and querying Github repository data."""

    def __init__(self, session: AsyncSession):
        super().__init__(session)

    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:
        """Fetches all non-secret repositories with their associations."""
        QUERY = (
            select(RepositoryModel)
            .options(
                selectinload(RepositoryModel.lang_assosiations).selectinload(
                    LanguageAssosiationModel.language
                ),
                selectinload(RepositoryModel.collaborator_associations).selectinload(
                    RepoCollaboratorAssociationModel.collaborator
                ),
            )
            .where(RepositoryModel.is_secret.is_(False))
            .order_by(RepositoryModel.updated_at.desc())
        )

        result = await self.session.execute(QUERY)
        return result.scalars().all()

    async def get_existing_timestamps(self) -> dict[str, datetime.datetime]:
        """Returns a mapping of repo_id to its last updated_at timestamp."""
        result: Any = await self.session.execute(
            select(RepositoryModel.repo_id, RepositoryModel.updated_at)
        )
        return {str(row[0]): row[1] for row in result.all() if row[1] is not None}
