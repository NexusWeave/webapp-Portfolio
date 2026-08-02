import pytest
import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from lib.models.database_models.GithubModel import RepositoryModel, CollaboratorModel, RepoCollaboratorAssociationModel
from lib.services.github.collaborator_manager import CollaboratorSyncManager

@pytest.mark.asyncio
async def test_get_or_create_collaborator(db_session: AsyncSession):
    manager = CollaboratorSyncManager(db_session)
    
    collab_data = {"github_id": "111", "name": "Bob", "profile_url": "url1"}
    
    # Create
    c1 = await manager._get_or_create_collaborator(collab_data)
    assert c1.github_id == "111"
    assert c1.name == "Bob"
    
    await db_session.flush()
    
    # Update
    collab_data_updated = {"github_id": "111", "name": "Bob Updated", "profile_url": "url2"}
    c2 = await manager._get_or_create_collaborator(collab_data_updated)
    
    assert c1.id == c2.id
    assert c2.name == "Bob Updated"
    assert c2.profile_url == "url2"

@pytest.mark.asyncio
async def test_sync_collaborators(db_session: AsyncSession):
    manager = CollaboratorSyncManager(db_session)
    
    # Create repo
    repo = RepositoryModel(
        repo_id=102, 
        label="Test Repo 2", 
        owner="TestOwner", 
        repo_url="url2",
        created_at=datetime.datetime.now(datetime.timezone.utc)
    )
    db_session.add(repo)
    await db_session.flush()

    # Create existing collaborator
    c_existing = await manager._get_or_create_collaborator({"github_id": "222", "name": "Alice", "profile_url": "url"})
    assoc = RepoCollaboratorAssociationModel(repository=repo, collaborator=c_existing)
    db_session.add(assoc)
    await db_session.flush()

    # Eager load relationships
    repo = await db_session.scalar(
        select(RepositoryModel)
        .options(selectinload(RepositoryModel.collaborator_associations).selectinload(RepoCollaboratorAssociationModel.collaborator))
        .where(RepositoryModel.repo_id == 102)
    )
    
    # New payload: Alice is removed, Charlie is added
    new_payload = [
        {"github_id": "333", "name": "Charlie", "profile_url": "url3"}
    ]
    
    await manager.sync_collaborators(repo, new_payload)
    await db_session.flush()
    
    assert len(repo.collaborator_associations) == 1
    assert repo.collaborator_associations[0].collaborator.github_id == "333"
