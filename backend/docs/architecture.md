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

---

## 🎯 Overview

The backend application is built with **FastAPI** (primary) and **Flask** (legacy) with focus on:

- ✅ **RESTful API** design
- ✅ **Type safety** with Pydantic models
- ✅ **Async/await** for optimal performance
- ✅ **SQLAlchemy** for database ORM
- ✅ **Exception handling** and logging
- ✅ **CORS** configuration for frontend

---

## 📁 Project Structure

```
fastAPI/
├── 📄 app.py                   # Main FastAPI application
├── 📄 requirements.txt         # Python dependencies
├── 📄 pyproject.toml          # Project configuration
├── 📄 README.md               # Backend documentation
├── 📄 CHANGELOG.md            # Change log
│
├── 📁 lib/                    # Core libraries
│   ├── 📁 models/             # Data models
│   │   ├── announcement_model.py
│   │   ├── github_model.py
│   │   ├── heavy_model.py
│   │   ├── web_config.py
│   │   └── database_models/   # SQLAlchemy models
│   │       └── GithubModel.py
│   │
│   ├── 📁 services/           # Business logic
│   │   ├── announcements.py
│   │   ├── api_db_bridge.py
│   │   ├── db_handler.py
│   │   ├── github_api.py
│   │   ├── heavy_api.py
│   │   ├── scheduler_service.py
│   │   ├── database/          # Database resources
│   │   │   ├── databases.py
│   │   │   └── resources.py
│   │   └── utils/             # Service utilities
│   │       └── services_utils.py
│   │
│   ├── 📁 settings/           # Configuration
│   │   ├── api_config.py
│   │   ├── app_config.py
│   │   ├── database_config.py
│   │   ├── env_config.py
│   │   ├── schedule_config.py
│   │   └── __init__.py
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
    ├── test_responses.py
    └── reports/
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

### Announcements API

#### `GET /api/v1/announcement/today`

Fetch today's announcement based on special occasions and holidays.

**Response:**
```json
{
  "announcement_id": 1,
  "date": "2026-02-07T10:30:00Z",
  "message": "🎂 Happy Birthday @krigjo25 🎁"
}
```

**Status Code:** `200 OK` or `404 Not Found`

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

The backend uses **Neon Postgres** as the primary database with **SQLAlchemy ORM** for database interactions.

**Features:**
- Serverless Postgres database
- Automatic scaling
- Connection pooling via PgBouncer
- Branching for development/testing

**Configuration:** `lib/services/database/resources.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

# Database URL (from Neon)
# Format: postgresql://user:password@host/dbname
DATABASE_URL = "postgresql+psycopg2://user:password@ep-xxx.neon.tech/portfolio"

# Engine setup with connection pooling
engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool,  # Recommended for serverless
    echo=False
)

SessionLocal = sessionmaker(bind=engine)
```

**Connection String:**

Set the `DATABASE_URL` environment variable with Neon connection string:

```env
DATABASE_URL=postgresql+psycopg2://user:password@ep-xxx.neon.tech/portfolio
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

**File:** `lib/services/db_handler.py`

Implements the `GithubDatabaseHandler` class for database operations:

```python
class GithubDatabaseHandler:
    def __init__(self, session: Session):
        self.session = session
    
    @staticmethod
    def format_payload(repository: Dict[str, Any]) -> Dict[str, Any]:
        """Format GitHub API payload for database storage."""
    
    def fetch_all_repositories(self) -> List[RepositoryModel]:
        """Fetch all repositories from database."""
```

---

## 🔧 Services

### Announcements Service (`lib/services/announcements.py`)

Handles announcements based on special days and occasions.

```python
class AnnouncementsService:
    """Service for managing announcements."""
    
    @staticmethod
    def get_celebration_days(date: datetime) -> str | None:
        """Get announcement message for celebration days."""
        # Implements match-case for various holidays:
        # - Valentines Day (February 10-14)
        # - Birthday (February 25)
        # - Independence Day Norway (May 10-17)
        # - Halloween (October 20+)
        # - Christmas (December 11-25)
        # - New Year (December 30+ / January 1-9)
```

---

### Database Handler (`lib/services/db_handler.py`)

Handles all database communication with GitHub repositories.

```python
class GithubDatabaseHandler:
    """Handler for GitHub database operations."""
    
    def __init__(self, session: Session):
        self.session = session
    
    @staticmethod
    def format_payload(repository: Dict[str, Any]) -> Dict[str, Any]:
        """Format GitHub API response for database storage."""
        # Formats URLs for repository, demo, and YouTube
        # Handles language associations
    
    def fetch_all_repositories(self) -> List[RepositoryModel]:
        """Fetch all repositories from database."""
```

---

### API Database Bridge (`lib/services/api_db_bridge.py`)

Bridges GitHub API with the database for synchronization.

```python
class ApiDatabaseBridge:
    """Bridge between API calls and database operations."""
    
    @staticmethod
    async def repositories_sync(endpoint: str) -> None:
        """Sync repositories from GitHub API to database."""
        # Fetches data from GitHub API endpoint
        # Formats and stores in Postgres database
```

---

### GitHub API Service (`lib/services/github_api.py`)

Integration with GitHub API.

---

### Heavy API Service (`lib/services/heavy_api.py`)

Service for heavy API operations or calculations.

---

### Scheduler Service (`lib/services/scheduler_service.py`)

Schedules periodic tasks for background execution.

---

## 📦 Models

All models use **Pydantic** for validation and serialization.

---

### Announcement Model (`lib/models/announcement_model.py`)

```python
class AnnouncementModel(BaseModel):
    """Model for announcements."""
    announcement_id: int = Field(..., description="Unique Announcement ID")
    date: datetime = Field(..., description="Announcement Date")
    message: str = Field(..., description="Announcement Message")
    
    class Config:
        json_schema_extra = {
            "example": {
                "announcement_id": 1,
                "date": "2026-02-07T10:30:00Z",
                "message": "🎂 Happy Birthday @krigjo25 🎁"
            }
        }
```

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

### Heavy Model (`lib/models/heavy_model.py`)

Model for heavy data loads or complex operations.

---

### Web Config Model (`lib/models/web_config.py`)

Model for web configuration.

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

### Service Utils (`lib/services/utils/services_utils.py`)

Helper functions for services.

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

Create a `.env` file in the `fastAPI/` folder:

```env
ENV=development
DATABASE_URL=postgresql+psycopg2://user:password@ep-xxx.neon.tech/portfolio
GITHUB_TOKEN=your_github_token
PERSONAL_GITHUB_REST_API=https://api.github.com/users/your-username
ORG_GITHUB_REST_API=https://api.github.com/orgs/your-org
REPOS=/repos
PORT=8000
```

**Neon Connection:**
- Get connection string from Neon dashboard
- Use `postgresql+psycopg2` driver for best compatibility
- Connection pooling handled automatically

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
- **`schedule_config.py`** - Scheduler configuration

---

## 📊 Project Statistics

```
Directories: 9
Primary Directories:
  - lib/         (Core business logic)
  - tests/       (Test suite)
  - __pycache__/ (Python cache)
```

**Main Python Modules:**
- Models: 4 files
- Services: 8 files
- Settings: 5 files
- Utils: 2 files
- Tests: 6 files

---

## 🔗 Related Documentation

- [Main Architecture](../ARCHITECTURE.md)
- [Frontend Architecture](../frontend/FRONTEND-ARCHITECTURE.md)
- [API Documentation](../documentations/model/apis.md)
- [Backend README](./README.md)
- [Backend Changelog](./CHANGELOG.md)

---

## 📝 Notes

- Backend uses **FastAPI** as the main framework
- Database operations are handled via **SQLAlchemy ORM** with **Neon Postgres**
- All API responses are validated with **Pydantic models**
- Logging is centralized via `AppWatcher` and `DatabaseWatcher`
- Exception handling is standardized with custom exceptions
- Postgres migration from SQLite completed
- Connection pooling optimized for serverless environment
