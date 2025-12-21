# ⚙️ Backend Architecture

> **Framework:** FastAPI / Flask  
> **Language:** Python 3.13  
> **Database:** SQLite  
> **Sist oppdatert:** 1. desember 2025

---

## 📋 Innholdsfortegnelse

1. [Oversikt](#-oversikt)
2. [Prosjektstruktur](#-prosjektstruktur)
3. [API Endpoints](#-api-endpoints)
4. [Database](#-database)
5. [Services](#-services)
6. [Models](#-models)
7. [Testing](#-testing)

---

## 🎯 Oversikt

Backend-applikasjonen er bygget med **FastAPI** (hovedsakelig) og **Flask** (legacy) med fokus på:

- ✅ **RESTful API** design
- ✅ **Type safety** med Pydantic models
- ✅ **Async/await** for optimal ytelse
- ✅ **SQLAlchemy** for database ORM
- ✅ **Exception handling** og logging
- ✅ **CORS** konfigurasjon for frontend

---

## 📁 Prosjektstruktur

```
fastAPI/
├── 📄 app.py                   # Main FastAPI application
├── 📄 requirements.txt         # Python dependencies
├── 📄 pyproject.toml          # Project configuration
├── 📄 README.md               # Backend documentation
├── 📄 CHANGELOG.md            # Change log
│
├── 📁 lib/                    # Core libraries
│   ├── 📁 apis/               # External API integrations
│   │   ├── github_data.py     # GitHub API client
│   │   └── Photos.py          # Photo API client
│   │
│   ├── 📁 models/             # Data models
│   │   ├── announcements.py
│   │   ├── exception_models.py
│   │   ├── github_model.py
│   │   ├── heavy_model.py
│   │   ├── web_config.py
│   │   └── database_models/   # SQLAlchemy models
│   │
│   ├── 📁 services/           # Business logic
│   │   ├── announcements.py
│   │   ├── database_services.py
│   │   ├── github_api.py
│   │   ├── heavy_api.py
│   │   └── base_services/     # Base service classes
│   │       └── sqlalchomy_config.py
│   │
│   ├── 📁 settings/           # Configuration
│   │   ├── env_config.py      # Environment variables
│   │   └── __init__.py
│   │
│   └── 📁 utils/              # Utilities
│       ├── app_utility.py
│       ├── exception_handler.py
│       ├── logger_config.py
│       ├── mathlibrary.py
│       └── os_utils.py
│
├── 📁 sqlite/                 # Database
│   ├── programming-languages.sql
│   ├── repo.sql
│   └── sqlite.py              # Database setup
│
└── 📁 tests/                  # Test suite
    ├── algorithms.py
    ├── test_ApiStatus.py
    ├── test_performance.py
    └── test_responses.py
```

---

## 🌐 API Endpoints

### Base URL

- **Development:** `http://localhost:8000`
- **Production:** `https://home.krigjo25.no`

---

### GitHub Data API

#### `GET /api/github/repositories`

Hent GitHub repositories.

**Response:**
```json
{
  "repositories": [
    {
      "name": "repo-name",
      "description": "Repository description",
      "language": "Python",
      "stars": 42,
      "forks": 7,
      "updated_at": "2025-12-01T00:00:00Z",
      "html_url": "https://github.com/user/repo"
    }
  ]
}
```

#### `GET /api/github/user`

Hent GitHub brukerinformasjon.

**Response:**
```json
{
  "login": "username",
  "name": "Full Name",
  "bio": "Developer bio",
  "public_repos": 50,
  "followers": 100,
  "avatar_url": "https://..."
}
```

---

### Announcements API

#### `GET /api/announcements`

Hent kunngjøringer.

**Response:**
```json
{
  "announcements": [
    {
      "id": 1,
      "title": "Announcement Title",
      "content": "Announcement content",
      "date": "2025-12-01",
      "priority": "high"
    }
  ]
}
```

#### `POST /api/announcements`

Opprett ny kunngjøring.

**Request Body:**
```json
{
  "title": "New Announcement",
  "content": "Content here",
  "priority": "medium"
}
```

---

### Photos API

#### `GET /api/photos`

Hent fotogalleri.

**Response:**
```json
{
  "photos": [
    {
      "id": 1,
      "title": "Photo Title",
      "url": "https://...",
      "thumbnail": "https://...",
      "description": "Photo description"
    }
  ]
}
```

---

### Health Check

#### `GET /api/health`

API health status.

**Response:**
```json
{
  "status": "healthy",
  "version": "2.0.3",
  "timestamp": "2025-12-01T00:00:00Z"
}
```

---

## 🗄️ Database

### SQLite Schema

#### Programming Languages Table

```sql
CREATE TABLE programming_languages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,  -- 'compiled', 'interpreted', etc.
    description TEXT,
    icon_path TEXT,
    color_code TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Eksempeldata:**
```sql
INSERT INTO programming_languages (name, type, color_code) VALUES
    ('Python', 'interpreted', '#3776AB'),
    ('TypeScript', 'compiled', '#3178C6'),
    ('JavaScript', 'interpreted', '#F7DF1E');
```

---

#### Repositories Table

```sql
CREATE TABLE repositories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    language_id INTEGER,
    stars INTEGER DEFAULT 0,
    forks INTEGER DEFAULT 0,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_id) REFERENCES programming_languages(id)
);
```

---

### Database Configuration (`sqlite/sqlite.py`)

```python
import sqlite3
from pathlib import Path

DATABASE_PATH = Path(__file__).parent / "portfolio.db"

def get_connection():
    """Create database connection."""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def initialize_database():
    """Initialize database with schema."""
    conn = get_connection()
    cursor = conn.cursor()
    
    # Read and execute SQL files
    with open('programming-languages.sql', 'r') as f:
        cursor.executescript(f.read())
    
    with open('repo.sql', 'r') as f:
        cursor.executescript(f.read())
    
    conn.commit()
    conn.close()
```

---

## 🔧 Services

### Base Service (`services/base_services/sqlalchomy_config.py`)

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./portfolio.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    """Dependency for database sessions."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

### GitHub Service (`services/github_api.py`)

```python
from typing import List, Dict
import httpx
from lib.settings.env_config import get_settings

settings = get_settings()

class GitHubService:
    """Service for GitHub API integration."""
    
    BASE_URL = "https://api.github.com"
    
    def __init__(self):
        self.headers = {
            "Accept": "application/vnd.github.v3+json",
            "Authorization": f"token {settings.GITHUB_TOKEN}"
        }
    
    async def get_repositories(self, username: str) -> List[Dict]:
        """Fetch user repositories."""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/users/{username}/repos",
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()
    
    async def get_user_profile(self, username: str) -> Dict:
        """Fetch user profile."""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.BASE_URL}/users/{username}",
                headers=self.headers
            )
            response.raise_for_status()
            return response.json()
```

---

### Announcements Service (`services/announcements.py`)

```python
from typing import List
from sqlalchemy.orm import Session
from lib.models.announcements import Announcement
from lib.services.base_services.sqlalchomy_config import get_db

class AnnouncementService:
    """Service for managing announcements."""
    
    @staticmethod
    def get_all(db: Session) -> List[Announcement]:
        """Get all announcements."""
        return db.query(Announcement).order_by(
            Announcement.date.desc()
        ).all()
    
    @staticmethod
    def create(db: Session, announcement_data: dict) -> Announcement:
        """Create new announcement."""
        announcement = Announcement(**announcement_data)
        db.add(announcement)
        db.commit()
        db.refresh(announcement)
        return announcement
    
    @staticmethod
    def delete(db: Session, announcement_id: int) -> bool:
        """Delete announcement."""
        announcement = db.query(Announcement).filter(
            Announcement.id == announcement_id
        ).first()
        
        if announcement:
            db.delete(announcement)
            db.commit()
            return True
        return False
```

---

### Database Service (`services/database_services.py`)

```python
from typing import List, Optional
from sqlalchemy.orm import Session
from lib.models.database_models import Repository, ProgrammingLanguage

class DatabaseService:
    """Generic database operations."""
    
    @staticmethod
    def get_featured_repos(db: Session) -> List[Repository]:
        """Get featured repositories."""
        return db.query(Repository).filter(
            Repository.is_featured == True
        ).all()
    
    @staticmethod
    def get_languages(db: Session) -> List[ProgrammingLanguage]:
        """Get all programming languages."""
        return db.query(ProgrammingLanguage).all()
    
    @staticmethod
    def get_repos_by_language(
        db: Session,
        language: str
    ) -> List[Repository]:
        """Get repositories by programming language."""
        return db.query(Repository).join(
            ProgrammingLanguage
        ).filter(
            ProgrammingLanguage.name == language
        ).all()
```

---

## 📦 Models

### Announcement Model (`models/announcements.py`)

```python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class AnnouncementBase(BaseModel):
    """Base announcement model."""
    title: str = Field(..., min_length=1, max_length=200)
    content: str = Field(..., min_length=1)
    priority: str = Field(default="medium")

class AnnouncementCreate(AnnouncementBase):
    """Create announcement model."""
    pass

class AnnouncementResponse(AnnouncementBase):
    """Announcement response model."""
    id: int
    date: datetime
    
    class Config:
        from_attributes = True
```

---

### GitHub Model (`models/github_model.py`)

```python
from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class GitHubRepository(BaseModel):
    """GitHub repository model."""
    name: str
    description: Optional[str]
    language: Optional[str]
    stars: int = Field(alias="stargazers_count")
    forks: int = Field(alias="forks_count")
    html_url: HttpUrl
    updated_at: datetime
    
    class Config:
        populate_by_name = True

class GitHubUser(BaseModel):
    """GitHub user model."""
    login: str
    name: Optional[str]
    bio: Optional[str]
    public_repos: int
    followers: int
    avatar_url: HttpUrl
```

---

### Exception Models (`models/exception_models.py`)

```python
from pydantic import BaseModel
from typing import Optional

class ErrorResponse(BaseModel):
    """Standard error response."""
    error: str
    detail: Optional[str] = None
    status_code: int

class ValidationError(BaseModel):
    """Validation error response."""
    field: str
    message: str
```

---

## 🧪 Testing

### API Status Tests (`tests/test_ApiStatus.py`)

```python
import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health_endpoint():
    """Test health check endpoint."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_github_repositories():
    """Test GitHub repositories endpoint."""
    response = client.get("/api/github/repositories")
    assert response.status_code == 200
    assert "repositories" in response.json()

def test_announcements():
    """Test announcements endpoint."""
    response = client.get("/api/announcements")
    assert response.status_code == 200
    assert isinstance(response.json()["announcements"], list)
```

---

### Performance Tests (`tests/test_performance.py`)

```python
import pytest
import time
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_response_time():
    """Test API response time."""
    start = time.time()
    response = client.get("/api/health")
    duration = time.time() - start
    
    assert response.status_code == 200
    assert duration < 0.5  # Should respond in < 500ms

def test_concurrent_requests():
    """Test handling of concurrent requests."""
    import concurrent.futures
    
    def make_request():
        return client.get("/api/health")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(make_request) for _ in range(100)]
        results = [f.result() for f in futures]
    
    assert all(r.status_code == 200 for r in results)
```

---

### Response Tests (`tests/test_responses.py`)

```python
import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_github_response_schema():
    """Test GitHub API response schema."""
    response = client.get("/api/github/repositories")
    data = response.json()
    
    assert "repositories" in data
    if data["repositories"]:
        repo = data["repositories"][0]
        assert "name" in repo
        assert "description" in repo
        assert "language" in repo

def test_error_response_format():
    """Test error response format."""
    response = client.get("/api/nonexistent")
    assert response.status_code == 404
    
    data = response.json()
    assert "error" in data
    assert "status_code" in data
```

---

## 🛠️ Utilities

### Exception Handler (`utils/exception_handler.py`)

```python
from fastapi import Request, status
from fastapi.responses import JSONResponse
from lib.models.exception_models import ErrorResponse

async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            error="Internal Server Error",
            detail=str(exc),
            status_code=500
        ).dict()
    )
```

---

### Logger Config (`utils/logger_config.py`)

```python
import logging
from pathlib import Path

LOG_DIR = Path(__file__).parent.parent / "logs"
LOG_DIR.mkdir(exist_ok=True)

def setup_logger(name: str) -> logging.Logger:
    """Setup application logger."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    
    # File handler
    fh = logging.FileHandler(LOG_DIR / f"{name}.log")
    fh.setLevel(logging.INFO)
    
    # Console handler
    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    
    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    fh.setFormatter(formatter)
    ch.setFormatter(formatter)
    
    logger.addHandler(fh)
    logger.addHandler(ch)
    
    return logger
```

---

## 🚀 Deployment

### Requirements (`requirements.txt`)

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
sqlalchemy==2.0.23
httpx==0.25.1
python-dotenv==1.0.0
pytest==7.4.3
pytest-asyncio==0.21.1
```

### Run Commands

```bash
# Development
uvicorn app:app --reload --port 8000

# Production
uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4

# Testing
pytest tests/ -v

# Coverage
pytest tests/ --cov=lib --cov-report=html
```

---

## 📊 File Statistics

```
Directories: 12
Files: 27
```

**Breakdown:**
- Python Files: ~20 files
- SQL Files: 2 files
- Config Files: 3 files
- Test Files: 4 files

---

**Relaterte dokumenter:**
- [Hovedarkitektur](../ARCHITECTURE.md)
- [Frontend Arkitektur](../frontend/FRONTEND-ARCHITECTURE.md)
- [API Dokumentasjon](../documentations/model/apis.md)
