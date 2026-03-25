# Backend API
This service is a FastAPI backend for the portfolio platform. It provides repository, announcement, and health-check endpoints, and manages database synchronization logic.

## Current Stack
- FastAPI + Uvicorn
- Pydantic + pydantic-settings
- SQLAlchemy (async) + asyncpg
- pytest + coverage + pytest-html

## Project Structure
- `app.py`: FastAPI app bootstrap and route registration
- `lib/models/`: response and domain models
- `lib/services/`: API integrations and data synchronization services
- `lib/database/`: database engine and provider setup
- `lib/settings/`: environment, app, and database configuration
- `migration/`: Alembic migration scripts
- `tests/`: integration, response, and performance test suites

## Run Locally
From `backend/`:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Default local port: `8080`.

## API Endpoints
The API is versioned and mounted at `/api/{version}`.

- `GET /api/{version}/healthcheck`
- `GET /api/{version}/repository`
- `GET /api/{version}/announcement/today`
- `GET /api/{version}/handleRepositories`

## Testing
From `backend/`:

```bash
pytest -v
```

Generate HTML test report:

```bash
pytest --html=tests/reports/pytest_report.html --self-contained-html
```

Coverage report:

```bash
coverage run -m pytest
coverage html
```

## Documentation
- Backend architecture: [docs/architecture.md](./docs/architecture.md)
- Service class diagram: [lib/services/docs/services-classDiagram.md](./lib/services/docs/services-classDiagram.md)
- GitHub service sequence diagram: [lib/services/github/docs/github-sequenceDiagram.md](./lib/services/github/docs/github-sequenceDiagram.md)
- GitHub service ER diagram: [lib/services/github/docs/github-erDiagram.md](./lib/services/github/docs/github-erDiagram.md)
- Announcements class diagram: [lib/services/announcements/docs/announcements-classErdiagram.md](./lib/services/announcements/docs/announcements-classErdiagram.md)
- Announcements sequence diagram: [lib/services/announcements/docs/announcements-sequenceDiagram.md](./lib/services/announcements/docs/announcements-sequenceDiagram.md)
