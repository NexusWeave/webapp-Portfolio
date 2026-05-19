import asyncio
import os
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from dotenv import load_dotenv

# Add the backend directory to sys.path to import models
import sys
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from lib.settings.database_config import initialize_postgress_engine
from lib.models.database_models.GithubModel import RepositoryModel, CollaboratorModel, RepoCollaboratorAssociationModel

async def check_contributors():
    load_dotenv()
    db = await initialize_postgress_engine()
    async with db.SessionLocal() as session:
        # Find webapp-Portfolio
        query = (
            select(RepositoryModel)
            .options(selectinload(RepositoryModel.collaborator_associations).selectinload(RepoCollaboratorAssociationModel.collaborator))
            .where(RepositoryModel.label == 'webapp-Portfolio')
        )
        result = await session.execute(query)
        repo = result.scalar_one_or_none()
        
        if repo:
            print(f"Repository: {repo.label} (ID: {repo.repo_id})")
            print(f"Owner: {repo.owner}")
            print("Contributors in DB:")
            for assoc in repo.collaborator_associations:
                print(f" - {assoc.collaborator.name} (ID: {assoc.collaborator.github_id})")
        else:
            print("Repository 'webapp-Portfolio' not found in DB.")
            
    await db.engine.dispose()

if __name__ == "__main__":
    asyncio.run(check_contributors())
