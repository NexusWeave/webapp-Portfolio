import datetime

import pytest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from lib.models.database_models.GithubModel import (
    LanguageAssosiationModel,
    LanguageModel,
    RepositoryModel,
)
from lib.services.github.language_manager import LanguageSyncManager


@pytest.mark.asyncio
async def test_new_language_record(db_session: AsyncSession):
    manager = LanguageSyncManager(db_session)

    # Test creating new
    lang1 = await manager.new_language_record("python")
    assert lang1.language == "python"

    # Needs to be flushed to DB to be found by the next query
    await db_session.flush()

    # Test fetching existing
    lang2 = await manager.new_language_record("PYTHON")  # should lowercase it
    assert lang1.id == lang2.id


@pytest.mark.asyncio
async def test_sync_languages(db_session: AsyncSession):
    manager = LanguageSyncManager(db_session)

    # Create repo
    repo = RepositoryModel(
        repo_id=101,
        label="Test Repo",
        owner="TestOwner",
        repo_url="url",
        created_at=datetime.datetime.now(datetime.UTC),
    )
    db_session.add(repo)
    await db_session.flush()

    # Create existing languages
    lang_python = await manager.new_language_record("python")
    lang_js = await manager.new_language_record("javascript")

    assoc1 = LanguageAssosiationModel(repository=repo, language=lang_python, code_bytes=100)
    assoc2 = LanguageAssosiationModel(repository=repo, language=lang_js, code_bytes=200)
    db_session.add_all([assoc1, assoc2])
    await db_session.flush()

    # Eager load relationships
    loaded_repo = await db_session.scalar(
        select(RepositoryModel)
        .options(
            selectinload(RepositoryModel.lang_assosiations).selectinload(
                LanguageAssosiationModel.language
            )
        )
        .where(RepositoryModel.repo_id == 101)
    )
    assert loaded_repo is not None

    # Now we simulate a payload where:
    # Python bytes change from 100 to 150
    # Javascript is removed
    # Go is added

    lang_python_new = LanguageModel(language="python")
    new_python_assoc = LanguageAssosiationModel(language=lang_python_new, code_bytes=150)

    lang_go_new = LanguageModel(language="go")
    new_go_assoc = LanguageAssosiationModel(language=lang_go_new, code_bytes=300)

    new_payload = [new_python_assoc, new_go_assoc]

    await manager.sync_languages(loaded_repo, new_payload)
    await db_session.flush()

    # Assertions
    assert len(loaded_repo.lang_assosiations) == 2

    lang_map = {a.language.language: a.code_bytes for a in loaded_repo.lang_assosiations}
    assert "javascript" not in lang_map
    assert lang_map["python"] == 150
    assert lang_map["go"] == 300
