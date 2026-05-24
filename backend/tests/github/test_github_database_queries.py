import pytest
import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from lib.models.database_models.GithubModel import RepositoryModel
from lib.services.github.github_database_queries import GithubDatabaseQueries

@pytest.mark.asyncio
async def test_fetch_all_repositories(db_session: AsyncSession):
    queries = GithubDatabaseQueries(db_session)
    
    # Create repos
    repo1 = RepositoryModel(
        repo_id=201, 
        label="Public Repo", 
        owner="TestOwner", 
        repo_url="url1",
        is_secret=False,
        created_at=datetime.datetime.now(datetime.timezone.utc),
        updated_at=datetime.datetime.now(datetime.timezone.utc)
    )
    repo2 = RepositoryModel(
        repo_id=202, 
        label="Secret Repo", 
        owner="TestOwner", 
        repo_url="url2",
        is_secret=True, # Should be excluded
        created_at=datetime.datetime.now(datetime.timezone.utc),
        updated_at=datetime.datetime.now(datetime.timezone.utc)
    )
    db_session.add_all([repo1, repo2])
    await db_session.flush()

    results = await queries.fetch_all_repositories()
    
    assert len(results) == 1
    assert results[0].repo_id == 201

@pytest.mark.asyncio
async def test_get_existing_timestamps(db_session: AsyncSession):
    queries = GithubDatabaseQueries(db_session)
    
    dt = datetime.datetime(2025, 1, 1, 12, 0, 0, tzinfo=datetime.timezone.utc)
    
    repo = RepositoryModel(
        repo_id=203, 
        label="Timestamp Repo", 
        owner="TestOwner", 
        repo_url="url3",
        created_at=dt,
        updated_at=dt
    )
    db_session.add(repo)
    await db_session.flush()

    timestamps = await queries.get_existing_timestamps()
    
    assert "203" in timestamps
    assert timestamps["203"].replace(tzinfo=datetime.timezone.utc) == dt
