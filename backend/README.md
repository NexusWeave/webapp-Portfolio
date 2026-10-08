# Backend API
This service acts as the FastAPI backend for the portfolio platform. It provides endpoints for repository management, announcements, and health checks, and handles database synchronization logic.

## Current Stack
- FastAPI + Uvicorn
- Pydantic + pydantic-settings
- SQLAlchemy (async) + asyncpg
- uv (Package & Project Manager)
- pytest + coverage + pytest-html
- Ruff (Linter & Formatter) + Mypy (Type Checker)

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

1. **Synchronize virtual environment and dependencies**:
   ```bash
   uv sync
   ```

2. **Activate the virtual environment** *(Optional - not needed when using `uv run`)*:
   - **Linux / Ubuntu / macOS (Bash / Zsh)**:
     ```bash
     source .venv/bin/activate
     ```
   - **Windows (Command Prompt)**:
     ```cmd
     .venv\Scripts\activate.bat
     ```
   - **Windows (PowerShell)**:
     ```powershell
     .venv\Scripts\Activate.ps1
     ```
   - **Windows (Git Bash / WSL)**:
     ```bash
     source .venv/Scripts/activate
     ```

3. **Run the server**:
   ```bash
   uv run python app.py
   # or if the environment is activated:
   python app.py
   ```
   *(Or using Uvicorn directly: `uv run uvicorn app:app --host 0.0.0.0 --port 8080 --reload`)*

Default local port: `8080`.

## API Endpoints
The API is versioned and mounted at `/api/{version}`.

- `GET /api/{version}/healthcheck`
- `GET /api/{version}/repository`
- `GET /api/{version}/announcement/today`
- `GET /api/{version}/handleRepositories`

## Testing
The backend uses [Pytest](https://docs.pytest.org/) and Python's built-in [unittest](https://docs.python.org/3/library/unittest.html) framework to test API endpoints, business logic, and database interactions.

Run all tests:
```bash
uv run pytest -v
```

Generate a self-contained HTML test report:
```bash
uv run pytest --html=tests/reports/pytest_report.html --self-contained-html
```

### Coverage Analysis
To measure code coverage and generate an HTML report:
```bash
uv run coverage run -m pytest
uv run coverage html
```
The report will be available in `backend/htmlcov/index.html`.

### Key Test Targets
- **API Endpoints**: Validating response codes and data structures.
- **Service Logic**: Ensuring scanners and specialists handle external data gracefully.
- **Database Migrations**: Verifying schema integrity across updates.
- **Resilience**: Testing rate limit handling and error recovery.

## Documentation
- Backend architecture: [docs/architecture.md](./docs/architecture.md)
- Testing strategy & guide: [docs/testing.md](./docs/testing.md)
- uv cheatsheet: [docs/uv-cheatsheet.md](./docs/uv-cheatsheet.md)
- Service class diagram: [lib/services/docs/services-classDiagram.md](./lib/services/docs/services-classDiagram.md)
- GitHub service sequence diagram: [lib/services/github/docs/github-sequenceDiagram.md](./lib/services/github/docs/github-sequenceDiagram.md)
- GitHub service ER diagram: [lib/services/github/docs/github-erDiagram.md](./lib/services/github/docs/github-erDiagram.md)
- Announcements class diagram: [lib/services/announcements/docs/announcements-classErdiagram.md](./lib/services/announcements/docs/announcements-classErdiagram.md)
- Announcements sequence diagram: [lib/services/announcements/docs/announcements-sequenceDiagram.md](./lib/services/announcements/docs/announcements-sequenceDiagram.md)
- LinkedIn automation service diagram: [lib/services/linkedin/docs/linkedin_automation.drawio](./lib/services/linkedin/docs/linkedin_automation.drawio)
