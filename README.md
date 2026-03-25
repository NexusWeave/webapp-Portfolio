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

## Run With Docker
From the repository root:

```bash
docker compose up --build
```

Default ports:

- Frontend: `http://localhost:3002`
- Backend: `http://localhost:8080`

The compose setup reads variables from `.env` at repository root.

## Documentation
- Top-level architecture: [docs/architecture.md](./docs/architecture.md)
- Frontend architecture: [frontend/docs/ARCHITECTURE.md](./frontend/docs/ARCHITECTURE.md)
- Frontend context diagram: [frontend/docs/context-diagram.md](./frontend/docs/context-diagram.md)
- Backend architecture: [backend/docs/architecture.md](./backend/docs/architecture.md)
- Prototype entry point: [docs/prototype/index.html](./docs/prototype/index.html)

## Release Notes
Project release history is tracked in [CHANGELOG.md](./CHANGELOG.md).
