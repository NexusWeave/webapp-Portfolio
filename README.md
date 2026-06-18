# Portfolio Web Application
This repository contains a full-stack biography and project showcase application. It uses a Nuxt frontend and a FastAPI backend.

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
- `docs/`: Top-level architecture docs
- `docker-compose.yml`: Local multi-service orchestration

## Installation and Running

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Python 3.14+](https://www.python.org/)

### Using Docker (Recommended)
From the repository root, run the entire stack:
```bash
docker compose up --build
```

### Local Development

#### Backend Setup
- Navigate to the `backend/` directory.
- Create and activate a virtual environment: `python -m venv venv && source venv/bin/activate`.
- Install the required dependencies: `pip install -r requirements.txt`.
- Run the server: `uvicorn app:app --reload`.

#### Frontend Setup
- Navigate to the `frontend/` directory.
- Install the necessary dependencies: `npm install`.
- Run the development server: `npm run dev`.
- To clean build artifacts, run: `npm run clean`.

Default ports:
- Frontend: `http://localhost:3002`
- Backend: `http://localhost:8080`

## Documentation
- Top-level architecture: [docs/architecture.md](./docs/architecture.md)
- Architecture Documentation index: [docs/architecture-documentation.md](./docs/architecture-documentation.md)
- Frontend architecture: [frontend/docs/architecture.md](./frontend/docs/architecture.md)
- Backend architecture: [backend/docs/architecture.md](./backend/docs/architecture.md)

## Testing
The project uses a comprehensive testing strategy across both layers. Detailed testing instructions can be found in their respective directories:

- [Frontend Testing (Vitest & SASS Validation Suite)](./frontend/README.md#testing)
- [Backend Testing (Pytest & Coverage)](./backend/README.md#testing)

## Release Notes
Project release history is tracked in the [CHANGELOG.md](./CHANGELOG.md) file.
