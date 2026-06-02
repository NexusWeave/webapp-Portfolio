# ⚙️ Backend Architecture

> **Framework:** FastAPI  
> **Language:** Python 3.13  
> **Database:** Neon Postgres with SQLAlchemy ORM  
> **Last Updated:** February 7, 2026

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Project Structure](#-project-structure)
3. [API Endpoints](#-api-endpoints)
4. [Database](#-database)
5. [Services](#-services)
6. [Models](#-models)
7. [Testing](#-testing)
8. [Utilities](#-utilities)
9. [Deployment](#-deployment)
10. [Configuration](#-configuration)

---

## 🎯 Overview

The backend application is built with **FastAPI** with focus on:

- ✅ **RESTful API** design
- ✅ **Type safety** with Pydantic models
- ✅ **Async/await** for optimal performance
- ✅ **SQLAlchemy** for database ORM
- ✅ **Exception handling** and logging
- ✅ **CORS** configuration for frontend

---

## 📁 Project Structure

```
backend/
├── 📄 app.py                   # Main FastAPI application
├── 📄 requirements.txt         # Python dependencies
├── 📄 pyproject.toml          # Project configuration
├── 📄 README.md               # Backend documentation
├── 📄 CHANGELOG.md            # Change log
│
├── 📁 lib/                    # Core libraries
│   ├── 📁 database/           # Database engine and providers
│   │   ├── db_engine.py
│   │   └── db_providers.py
│   │
│   ├── 📁 models/             # Data models
│   │   ├── github_model.py
│   │   └── database_models/   # SQLAlchemy models
│   │       └── GithubModel.py
│   │
│   ├── 📁 services/           # Business logic
│   │   ├── api_db_bridge.py
│   │   ├── base_service.py
│   │   ├── scheduler_service.py
│   │   ├── github/             # GitHub service (API, handler, managers)
│   │   │   ├── github_api.py
│   │   │   ├── github_router.py
│   │   │   └── repository_handler.py
│   │   └── health/             # Health check service
│   │
│   ├── 📁 settings/           # Configuration
│   │   ├── api_config.py
│   │   ├── app_config.py
│   │   ├── database_config.py
│   │   └── env_config.py
│   │
│   └── 📁 utils/              # Utilities
│       ├── logger_config.py
│       └── exception_handler.py
│
└── 📁 tests/                  # Test suite
    ├── algorithms.py
    ├── conftest.py
    ├── Makefile
    ├── test_integration.py
    ├── test_performance.py
    └── test_responses.py
```

---

## 🌐 API Endpoints

### Base URL

- **Development:** `http://localhost:8000`
- **Production:** `https://krigjo25.no`

### API Version

- **Current Version:** `v1`
- **Base Path:** `/api/v1`

---

### GitHub Repositories API

#### `GET /api/v1/repository`

Fetch all GitHub repositories from the database.

**Response:**
```json
[
  {
    "label": "my-repo",
    "owner": "username",
    "created_at": "2025-12-01T00:00:00Z",
    "id": 1234567890,
    "description": "This is my repository.",
    "languages": [
      {
        "id": 1,
        "name": "Python",
        "bytes": 2048
      }
    ]
  }
]
```

**Status Code:** `200 OK` or `404 Not Found`

---

#### `GET /api/v1/fetchRepositories`

Sync all repositories from GitHub to the database.

**Response:**
```json
{
  "message": "Fetched All Repositories Successfully."
}
```

**Status Code:** `200 OK`

---

### Health Check

#### `GET /api/v1/healthcheck`

API health status.

**Response:**
```json
{
  "ApiRunning": true,
  "EndpointsAvailable": "4",
  "ApiName": "Portfolio API",
  "version": "v1",
  "status": "OK",
  "message": "API is healthy and running."
}
```

**Status Code:** `200 OK`

---

## 🗄️ Database

### Neon Postgres

The backend uses **Neon Postgres** as the primary database with **SQLAlchemy ORM** for database interactions. The connection is managed asynchronously using `asyncpg`.

**Features:**
- Serverless Postgres database
- Automatic scaling
- Asynchronous database engine with `sqlalchemy.ext.asyncio`
- Connection pooling and SSL management

**Configuration:** `lib/database/db_engine.py`

The database engine is initialized using environment variables with the `PG_` prefix:

```python
async def initialize_postgress_engine() -> PostgresProvider:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    # Builds URL from PG_USER, PG_HOST, PG_PASSWORD, PG_DATABASE, etc.
    PATH = connection_pool("postgresql+asyncpg", "PG")
    
    ASYNC_ENGINE = create_async_engine(
        PATH, 
        echo=False,  
        pool_pre_ping=True, 
        connect_args={
            "ssl": ctx, 
            "prepared_statement_cache_size": 0, 
            "statement_cache_size": 0
        }
    )
    # ...
```

**Required Environment Variables:**

```env
PG_USER=your_user
PG_HOST=your_host
PG_PASSWORD=your_password
PG_DATABASE=your_database
PG_SSL_MODE=require
```

---

### Database Models

#### Repository Model (`lib/models/database_models/GithubModel.py`)

```python
class RepositoryModel(BaseModel):
    label: str                                  # Repository name
    owner: str                                  # Repository owner
    is_private: bool                           # Private indicator
    created_at: datetime                       # Creation timestamp
    id: int                                    # Repository ID
    demo_url: Optional[str]                   # Demo URL
    repo_url: str                              # GitHub URL
    youtube_url: Optional[str]                # YouTube demo URL
    updated_at: Optional[datetime]            # Last update
    description: Optional[str]                # Description
    is_fork: bool                              # Fork indicator
    parent_owner: Optional[str]               # Original owner if fork
    lang_associations: List[LanguageAssociationModel]  # Languages
    
    @computed_field
    def languages(self) -> List[Dict]:
        """Computed field for language information."""
```

#### Language Model

```python
class LanguageModel(BaseModel):
    id: int                    # Language ID
    language: str             # Language name (e.g., "Python")
    
    model_config = ConfigDict(from_attributes=True)
```

#### Language Association Model

```python
class LanguageAssociationModel(BaseModel):
    lang_id: int              # Language ID
    code_bytes: int          # Code bytes for language
    repo_id: int             # Repository ID
    language: LanguageModel  # Relationship to language
    
    model_config = ConfigDict(from_attributes=True)
```

---

### Database Handler

**File:** `lib/services/github/repository_handler.py`

Implements the `GithubDatabaseHandler` class for database operations:

```python
class GithubDatabaseHandler:
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def fetch_all_repositories(self) -> Sequence[RepositoryModel]:
        """Fetch all repositories from database."""
        
    async def upsert_repositories(self, repository: List[Dict[str, Any]]) -> None:
        """Entry point for syncing repositories from the API payload."""
```

---

## 🔧 Services

### Database Handler (`lib/services/github/repository_handler.py`)

Handles all database communication with GitHub repositories.

---

### API Database Bridge (`lib/services/api_db_bridge.py`)

Bridges GitHub API with the database for synchronization.

---

### GitHub API Service (`lib/services/github/github_api.py`)

Integration with GitHub API.

---

### Scheduler Service (`lib/services/scheduler_service.py`)

Schedules periodic tasks for background execution.

---

## 📦 Models

All models use **Pydantic** for validation and serialization.

---

### GitHub Model (`lib/models/github_model.py`)

```python
class LanguageImage(BaseModel):
    """Language icon/image metadata."""
    id: int
    alt: str
    src: str
    type: str = "svg"

class LanguageModel(BaseModel):
    """Programming language model."""
    id: int
    language: str  # Language name (alias: "lang")
    
    model_config = ConfigDict(from_attributes=True)

class LanguageAssociationModel(BaseModel):
    """Language association with repository."""
    lang_id: int
    code_bytes: int
    repo_id: int
    language: LanguageModel  # Relationship
    
    model_config = ConfigDict(from_attributes=True)

class RepositoryModel(BaseModel):
    """GitHub repository model."""
    label: str                                    # Repository name
    owner: str                                    # Repository owner
    is_private: bool                             # Private indicator
    created_at: datetime                         # Creation timestamp
    id: int  # Repository ID (alias: "repo_id")
    demo_url: Optional[str]                      # Demo URL
    repo_url: str                                # GitHub URL
    youtube_url: Optional[str]                   # YouTube URL
    updated_at: Optional[datetime]              # Last update
    description: Optional[str]                  # Description
    lang_assosiations: List[LanguageAssociationModel]
    
    @computed_field
    def languages(self) -> List[Dict]:
        """Computed field for language information."""
```

---

## 🧪 Testing

Test suite is located in the `tests/` folder with various test types.

---

### Test Structure

- **`test_integration.py`** - Integration tests for the entire system
- **`test_performance.py`** - Performance tests
- **`test_responses.py`** - Response validation and API tests
- **`algorithms.py`** - Algorithm tests
- **`conftest.py`** - Pytest configuration

---

### Running Tests

```bash
# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_responses.py -v

# Run with coverage report
pytest tests/ --cov=lib --cov-report=html

# Run performance tests
pytest tests/test_performance.py -v
```

---

### CI/CD

Tests can be run using Makefile:

```bash
# See Makefile for test targets
make test
```

---

## 🛠️ Utilities

### Logger Config (`lib/utils/logger_config.py`)

Centralized logging for the application.

```python
class AppWatcher:
    """Application logger."""
    def __init__(self, dir: str, name: str):
        self.log_dir = dir
        self.name = name
    
    def file_handler(self):
        """Setup file handler for logging."""

class DatabaseWatcher:
    """Database logger."""
    def __init__(self, dir: str, name: str):
        self.log_dir = dir
        self.name = name
    
    def file_handler(self):
        """Setup file handler for database logging."""
```

---

### Exception Handler (`lib/utils/exception_handler.py`)

Handling of custom exceptions.

```python
class NotFoundError(Exception):
    """Custom exception for not found errors."""
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message
        super().__init__(self.message)
```

---

## 🚀 Deployment

### Requirements (`requirements.txt`)

Python dependencies are specified in `requirements.txt`.

```bash
# Install dependencies
pip install -r requirements.txt
```

---

### Run Commands

```bash
# Development with auto-reload
uvicorn app:app --reload --port 8000

# Production
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4

# Testing
pytest tests/ -v

# Coverage report
pytest tests/ --cov=lib --cov-report=html
```

---

### Environment Variables

Create a `.env` file in the `backend/` folder:

```env
ENVIRONMENT=development
PORT=8080

# Github REST API
GITHUB_REST=https://api.github.com/
GITHUB_TOKEN=your_github_token
GITHUB_ENDPOINT=users/your-username/repos

# Database (Postgres)
PG_USER=your_user
PG_HOST=your_host
PG_PASSWORD=your_password
PG_DATABASE=your_database
PG_SSL_MODE=require
```

**Neon Connection:**
- Get connection details from Neon dashboard.
- The application uses `postgresql+asyncpg` for asynchronous database operations.
- Connection pooling and SSL are handled in `lib/database/db_engine.py`.

---

### Docker

See `Dockerfile` in the root folder for containerization.

---

## 🔐 Configuration

### Settings (`lib/settings/`)

- **`api_config.py`** - FastAPI app configuration
- **`app_config.py`** - Application environment configuration
- **`database_config.py`** - Database configuration
- **`env_config.py`** - Environment variables

---

## 📊 Project Statistics

**Main Python Modules:**
- Models: 1 primary (GitHub) + Database Models
- Services: 4 primary (API Bridge, Scheduler, GitHub, Health)
- Settings: 4 files
- Utils: 2 files
- Tests: 6 files

---

## 🔗 Related Documentation

- [Main Architecture](../ARCHITECTURE.md)
- [Frontend Architecture](../frontend/FRONTEND-ARCHITECTURE.md)
- [Backend README](./README.md)
- [Backend Changelog](./CHANGELOG.md)

---

## 📝 Notes

- Backend uses **FastAPI** as the main framework
- Database operations are handled via **SQLAlchemy ORM** with **Neon Postgres**
- All API responses are validated with **Pydantic models**
- Logging is centralized via `AppWatcher` and `DatabaseWatcher`
- Exception handling is standardized with custom exceptions
- Connection pooling optimized for serverless environment
