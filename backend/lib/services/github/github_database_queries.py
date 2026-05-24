# Standard Library
import datetime
from typing import Dict, Sequence, Set

# Internal Libraries
from lib.utils.logger_config import DatabaseWatcher
from lib.models.database_models.GithubModel import RepositoryModel, LanguageModel, LanguageAssosiationModel, RepoCollaboratorAssociationModel

# Third Party Libraries
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

LOG = DatabaseWatcher(name="Github-DAO-Layer")
LOG.file_handler()

class GithubDatabaseQueries:
    """ Data Access Object for fetching and querying Github repository data. """

    def __init__(self, session: AsyncSession):
        self.session = session

    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:
        """ Fetches all non-secret repositories with their associations. """
        QUERY = (select(RepositoryModel)
                 .options(selectinload(RepositoryModel.lang_assosiations).selectinload(LanguageAssosiationModel.language),
                          selectinload(RepositoryModel.collaborator_associations).selectinload(RepoCollaboratorAssociationModel.collaborator))
                 .where(RepositoryModel.is_secret == False)
                 .order_by(RepositoryModel.updated_at.desc()))

        result = await self.session.execute(QUERY)
        return result.scalars().all()

    async def get_existing_timestamps(self) -> Dict[str, datetime.datetime]:
        """ Returns a mapping of repo_id to its last updated_at timestamp. """
        QUERY = select(RepositoryModel.repo_id, RepositoryModel.updated_at)
        result = await self.session.execute(QUERY)
        return {str(row[0]): row[1] for row in result.all() if row[1] is not None}
