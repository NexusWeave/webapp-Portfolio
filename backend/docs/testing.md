# 🧪 Backend Pytest Documentation Guide

This document outlines the testing strategy, setup instructions, and code execution patterns for the FastAPI backend, along with concrete examples for each of our primary test targets.

---

## 🚀 Setup & Execution

### 1. Prerequisites
From the `backend/` directory, ensure your virtual environment is active and all test dependencies are installed:
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Execution Commands
- **Run the full test suite**:
  ```bash
  pytest -v
  ```
- **Generate self-contained HTML reports**:
  ```bash
  pytest --html=tests/reports/pytest_report.html --self-contained-html
  ```
- **Run with coverage measurement**:
  ```bash
  coverage run -m pytest
  coverage html  # Generates backend/htmlcov/index.html
  ```

---

## 🗂️ Database Fixtures (`conftest.py`)

All database-reliant tests run against an isolated **SQLite in-memory or file-based database** (via `aiosqlite`) to keep tests fast and side-effect free:
```python
# conftest.py
import pytest
from sqlalchemy import NullPool
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from lib.settings.database_config import BASE 

TEST_DATABASE_URL = "sqlite+aiosqlite:///./test_database.db"

@pytest.fixture(scope="session")
def engine():
    return create_async_engine(TEST_DATABASE_URL, echo=False, future=True, poolclass=NullPool)

@pytest.fixture(scope="session")
async def setup_database(engine):
    async with engine.begin() as conn:
        await conn.run_sync(BASE.metadata.create_all)
    yield
    # Optional teardown:
    # async with engine.begin() as conn:
    #     await conn.run_sync(BASE.metadata.drop_all)

@pytest.fixture(scope="function")
async def db_session(engine, setup_database):
    connection = await engine.connect()
    transaction = await connection.begin()
    SessionLocal = async_sessionmaker(expire_on_commit=False, autoflush=False, bind=connection, class_=AsyncSession)
    session = SessionLocal()
    try:
        yield session
    finally:
        await transaction.rollback()
        await connection.close()
        await session.close()
```

---

## 📝 Test Target Examples

Here is a testing template containing code examples for each of the 6 recommended test suites.

### 1. API Rate Limiting Test
Verify that external service integrations gracefully await reset windows and retry requests when hit with HTTP 429.

```python
# backend/tests/test_rate_limiting.py
import pytest
import httpx
from unittest.mock import AsyncMock, patch
from lib.services.github.github_api import GithubAPI

@pytest.mark.asyncio
async def test_github_api_rate_limit_retry():
    api = GithubAPI(URL="https://api.github.com", KEY="fake-token")
    
    # Mocking first call to return 429, second call to succeed with 200
    with patch("httpx.AsyncClient.request") as mock_request:
        mock_request.side_effect = [
            httpx.Response(429, headers={"X-RateLimit-Reset": "2"}), # Await reset for 2s
            httpx.Response(200, json=[{"id": 1, "name": "repo1"}])
        ]
        
        response = await api.fetch_data("/repos")
        assert len(response) == 1
        assert response[0]["name"] == "repo1"
        assert mock_request.call_count == 2
```

### 2. Scanner/Specialist Resilience Test
Scraping logic is prone to network failure. Ensure the specialist endpoint ignores dead links and aggregates successful ones.

```python
# backend/tests/test_specialist_scraper.py
import pytest
from httpx import Response
from unittest.mock import patch
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_specialist_endpoint_resilience():
    # Simulate a scenario where one link fails but the others succeed
    with patch("lib.services.scanner.scanner_api.Scanner.check_status") as mock_status, \
         patch("lib.services.scanner.scanner_api.Scanner.scrape_information") as mock_scrape:
         
         # First scanner fails, second scanner succeeds
         mock_status.side_effect = [False, True]
         mock_scrape.return_value = {"status": "success", "data": "Scraped Info"}
         
         response = client.get("/api/v1/specialist")
         assert response.status_code == 200
         data = response.json()
         
         # The list contains the error dict for the first, and success details for the second
         assert len(data) == 2
         assert data[0]["code"] == "500"
         assert "Scraped Info" in data[1]["data"]
```

### 3. Health Service Logic Test
Validate that the `/healthcheck` endpoint correctly reports down states for critical backend dependencies.

```python
# backend/tests/test_health_check.py
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from app import app

client = TestClient(app)

def test_healthcheck_reports_database_down():
    # Force the database provider or engine connection check to fail
    with patch("lib.services.health.health_check.HealthChecks.check_database", new_callable=AsyncMock) as mock_db:
        mock_db.return_value = {"message": "NOT OK"}
        
        response = client.get("/api/v1/healthcheck")
        assert response.status_code == 200
        
        health_chart = response.json()
        assert health_chart["GET"][0]["Postgres Database"]["status"]["message"] == "NOT OK"
```

### 4. Heavy Service Integration Test
Ensure external Heavy Workout API data matches internal database model structure and can map correctly without schema exceptions.

```python
# backend/tests/test_heavy_integration.py
import pytest
from lib.services.heavy.heavy_api import HeavyAPI
from lib.models.heavy_model import HeavyWorkoutModel

@pytest.mark.asyncio
async def test_heavy_api_mapping():
    # Mock return payload
    mock_payload = {
        "workouts": [
            {
                "title": "Leg Day",
                "description": "Squat heavy",
                "start_time": "2026-06-20T10:00:00+0200",
                "end_time": "2026-06-20T11:00:00+0200",
                "exercises": [
                    {
                        "title": "Barbell Squats",
                        "sets": [
                            {"reps": 8, "weight_kg": 100, "rpe": 9, "distance_meters": None}
                        ]
                    }
                ]
            }
        ]
    }
    
    # Test that model maps successfully
    workout_model = HeavyWorkoutModel(**mock_payload["workouts"][0])
    assert workout_model.title == "Leg Day"
    assert workout_model.exercises[0].sets[0].weight_kg == 100
```

### 5. Pydantic Model Validation Test
Verify data contract boundary assertions, checking that malformed payloads raise validation errors.

```python
# backend/tests/test_model_validation.py
import pytest
from pydantic import ValidationError
from lib.models.github_model import RepositoryModel

def test_repo_model_validation_fails_on_malformed_url():
    with pytest.raises(ValidationError):
        # repo_url must be a valid URL string
        RepositoryModel(
            repo_id="invalid-id-type", # Should be integer
            label="Test Repo",
            owner="Owner",
            repo_url="not-a-valid-url"
        )
```

### 6. Database Migration Integrity Test
Test migration status to verify the local schema remains completely inline with SQLAlchemy configurations.

```python
# backend/tests/test_migration_integrity.py
import pytest
from sqlalchemy import inspect
from sqlalchemy.ext.asyncio import AsyncSession

@pytest.mark.asyncio
async def test_migration_schema_matches_models(db_session: AsyncSession):
    # Retrieve the model metadata
    connection = await db_session.connection()
    
    def inspect_tables(conn):
        inspector = inspect(conn)
        return inspector.get_table_names()
        
    tables = await connection.run_sync(inspect_tables)
    
    # Assert critical tables exist after setup migrations run
    assert "repositories" in tables
    assert "languages" in tables
    assert "language_assosiations" in tables
```
