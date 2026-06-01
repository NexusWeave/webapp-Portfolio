# Portfolio Webapp
Portfolio is a full-stack biography and project showcase application with a Nuxt frontend and a FastAPI backend.

## Current Stack
| Layer | Technology | Notes |
| :--- | :--- | :--- |
| Frontend | Nuxt 4 + Vue 3 + TypeScript | SSR/SSG-ready UI, composables, file-based routes |
| Content | TinaCMS + Nuxt Content | Git-backed content editing workflow |
| State | Pinia | Centralized frontend state (language stats and UI data) |
| Styling | Sass | Modular style architecture |
| Backend | FastAPI + Uvicorn | Async Python API for repository, health, and announcements |
| Data | SQLAlchemy + asyncpg | PostgreSQL-oriented backend data layer |

## Repository Layout
- `frontend/`: Nuxt application, content, Tina config, and UI components
- `backend/`: FastAPI app, services, models, database configuration, and tests
- `docs/`: Top-level architecture docs and prototype assets
- `docker-compose.yml`: Local multi-service orchestration

## Installation and Running

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Python 3.14+](https://www.python.org/)

### Option 1: Docker (Recommended)
From the repository root, run the entire stack:
```bash
docker compose up --build
```

### Option 2: Local Development
#### Backend
1. Navigate to `backend/`.
2. Create and activate a virtual environment: `python -m venv venv && source venv/bin/activate`.
3. Install dependencies: `pip install -r requirements.txt`.
4. Run the server: `uvicorn app:app --reload`.

#### Frontend
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Run the development server: `npm run dev`.
4. Clean build artifacts: `npm run clean`.

Default ports:
- Frontend: `http://localhost:3002`
- Backend: `http://localhost:8080`

## Documentation
- Top-level architecture: [docs/architecture.md](./docs/architecture.md)
- Architecture Documentation index: [docs/architecture-documentation.md](./docs/architecture-documentation.md)
- Frontend architecture: [frontend/docs/architecture.md](./frontend/docs/architecture.md)
- Backend architecture: [backend/docs/architecture.md](./backend/docs/architecture.md)
- Prototype entry point: [docs/prototype/index.html](./docs/prototype/index.html)

## Release Notes
Project release history is tracked in [CHANGELOG.md](./CHANGELOG.md).
