# Standard Library
from typing import Dict, Any, List

# Internal Libraries
from lib.models.database_models.GithubModel import RepositoryModel, CollaboratorModel, RepoCollaboratorAssociationModel

# Third Party Libraries
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

class CollaboratorSyncManager:
    __VERSION__ = "v1.0.0"
    """ Manages synchronization of collaborators and their associations with repositories. """
    
    def __init__(self, session: AsyncSession):
        self.session = session

    async def sync_collaborators(self, repo: RepositoryModel, new_collabs_data: List[Dict[str, Any]]) -> None:
        """ Synchronizes collaborator associations for a repository. """
        exist_assoc_map = {assoc.collaborator.github_id: assoc for assoc in repo.collaborator_associations}
        new_collab_ids = {c['github_id'] for c in new_collabs_data}

        for c in new_collabs_data:
            collab_obj = await self._get_or_create_collaborator(c)
            if c['github_id'] not in exist_assoc_map:
                assoc = RepoCollaboratorAssociationModel(repository = repo, collaborator = collab_obj)
                self.session.add(assoc)

        for gid, assoc in exist_assoc_map.items():
            if gid not in new_collab_ids:
                await self.session.delete(assoc)
                repo.collaborator_associations.remove(assoc)

    async def _get_or_create_collaborator(self, collab_data: Dict[str, Any]) -> CollaboratorModel:
        """ Fetches or creates/updates a collaborator record. """
        gid = collab_data['github_id']
        collab_obj = await self.session.scalar(select(CollaboratorModel).where(CollaboratorModel.github_id == gid))

        if not collab_obj:
            collab_obj = CollaboratorModel(github_id = gid, name = collab_data['name'], profile_url = collab_data['profile_url'])
            self.session.add(collab_obj)
            await self.session.flush()
        else:
            if collab_obj.name != collab_data['name'] or collab_obj.profile_url != collab_data['profile_url']:
                collab_obj.name = collab_data['name']
                collab_obj.profile_url = collab_data['profile_url']
                self.session.add(collab_obj)
        return collab_obj
