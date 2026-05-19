
import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from dotenv import load_dotenv

from lib.models.database_models.GithubModel import RepositoryModel as SARepositoryModel, LanguageAssosiationModel, RepoCollaboratorAssociationModel
from lib.models.github_model import RepositoryModel as PydanticRepositoryModel

load_dotenv()

async def test_validation():
    USER = os.getenv('PG_USER')
    HOST = os.getenv('PG_HOST')
    PASSWORD = os.getenv('PG_PASSWORD')
    DATABASE = os.getenv('PG_DATABASE')
    
    DB_PATH = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}/{DATABASE}"
    engine = create_async_engine(DB_PATH)
    async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async with async_session() as session:
        QUERY = (select(SARepositoryModel)
                 .options(selectinload(SARepositoryModel.lang_assosiations).selectinload(LanguageAssosiationModel.language),
                          selectinload(SARepositoryModel.collaborator_associations).selectinload(RepoCollaboratorAssociationModel.collaborator)))
        
        result = await session.execute(QUERY)
        db_repos = result.scalars().all()
        
        print(f"Testing validation for {len(db_repos)} repos...")
        success_count = 0
        fail_count = 0
        for db_repo in db_repos:
            try:
                pydantic_repo = PydanticRepositoryModel.model_validate(db_repo)
                # Test serialization
                pydantic_repo.model_dump_json()
                success_count += 1
            except Exception as e:
                print(f"Validation/Serialization failed for repo {db_repo.label} (ID: {db_repo.repo_id}): {e}")
                fail_count += 1
        
        print(f"Results: {success_count} success, {fail_count} failures.")

if __name__ == "__main__":
    asyncio.run(test_validation())
