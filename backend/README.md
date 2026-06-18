# Backend API
This service acts as the FastAPI backend for the portfolio platform. It provides endpoints for repository management, announcements, and health checks, and handles database synchronization logic.

## Current Stack
- FastAPI + Uvicorn
- Pydantic + pydantic-settings
- SQLAlchemy (async) + asyncpg
- pytest + coverage + pytest-html

## Project Structure
- `app.py`: FastAPI app bootstrap and route registration
- `lib/models/`: Response and domain models
- `lib/services/`: API integrations and data synchronization services
- `lib/database/`: Database engine and provider setup
- `lib/settings/`: Environment, app, and database configuration
- `migration/`: Alembic migration scripts
- `tests/`: Integration, response, and performance test suites

## Run Locally
From the `backend/` directory:

- Create and activate a virtual environment: `python -m venv .venv && source .venv/bin/activate`
- Install the required dependencies: `pip install -r requirements.txt`
- Run the server: `python app.py`

Default local port: `8080`.

## API Endpoints
The API is versioned and mounted at `/api/{version}`.

- `GET /api/{version}/healthcheck`
- `GET /api/{version}/repository`
- `GET /api/{version}/announcement/today`
- `GET /api/{version}/handleRepositories`

## Testing
The backend uses **Pytest** to test API endpoints, business logic, and database interactions.

Run all tests:
```bash
pytest -v
```

Generate a self-contained HTML test report:
```bash
pytest --html=tests/reports/pytest_report.html --self-contained-html
```

### Coverage Analysis
To measure code coverage and generate an HTML report:
```bash
coverage run -m pytest
coverage html
```
The report will be available in `backend/htmlcov/index.html`.

### Key Test Targets
- **API Endpoints**: Validating response codes and data structures.
- **Service Logic**: Ensuring scanners and specialists handle external data gracefully.
- **Database Migrations**: Verifying schema integrity across updates.
- **Resilience**: Testing rate limit handling and error recovery.

## Documentation
- Backend architecture: [docs/architecture.md](./docs/architecture.md)
- Testing strategy: [tests/recommended-tests.md](./tests/recommended-tests.md)
- Service class diagram: [lib/services/docs/services-classDiagram.md](./lib/services/docs/services-classDiagram.md)
- GitHub service sequence diagram: [lib/services/github/docs/github-sequenceDiagram.md](./lib/services/github/docs/github-sequenceDiagram.md)
- GitHub service ER diagram: [lib/services/github/docs/github-erDiagram.md](./lib/services/github/docs/github-erDiagram.md)
- Announcements class diagram: [lib/services/announcements/docs/announcements-classErdiagram.md](./lib/services/announcements/docs/announcements-classErdiagram.md)
- Announcements sequence diagram: [lib/services/announcements/docs/announcements-sequenceDiagram.md](./lib/services/announcements/docs/announcements-sequenceDiagram.md)
