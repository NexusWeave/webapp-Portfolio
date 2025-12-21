# krigjo25 | Portfolio Webapp

> **Moderne JAMstack Portfolio** med Nuxt 3, FastAPI og TinaCMS

Personlig portfolio-applikasjon bygget med moderne web-teknologier for optimal ytelse og brukervennlighet.

**Live:** [krigjo25.no](https://krigjo25.no)  
**API:** [home.krigjo25.no](https://home.krigjo25.no)  
**Future Projects:** [GitHub Projects](https://github.com/users/krigjo25/projects/17)

---

## 📚 Dokumentasjon

### Arkitekturoversikt

- **[🏗️ Hovedarkitektur](ARCHITECTURE.md)** - Komplett JAMstack-arkitektur
- **[🎨 Frontend](frontend/FRONTEND-ARCHITECTURE.md)** - Nuxt 3 / Vue 3 dokumentasjon
- **[⚙️ Backend](fastAPI/BACKEND-ARCHITECTURE.md)** - FastAPI / Flask dokumentasjon
- **[📖 Dokumentasjon](documentations/DOCUMENTATION-ARCHITECTURE.md)** - Dokumentasjonsstruktur

### Teknisk Dokumentasjon

- **[Tech Stack](documentations/documents/techstack.md)** - Teknologioversikt
- **[System Architecture](documentations/model/system-architecture.md)** - Systemdesign
- **[API Reference](documentations/model/apis.md)** - API-dokumentasjon
- **[Database Schema](documentations/model/database.md)** - Database-design
- **[Directories](documentations/model/Directories.md)** - Mappestruktur

---

## 🚀 Quick Start

### Frontend (Nuxt 3)

1. Naviger til frontend-mappen:
```bash
cd frontend
```

2. Installer dependencies:
```bash
npm install
```

3. Start utviklingsserver:
```bash
npm run dev
```

Frontend kjører nå på `http://localhost:3000`

### Backend (FastAPI)

1. Naviger til backend-mappen:
```bash
cd fastAPI
```

2. Installer dependencies:
```bash
pip install -r requirements.txt
```

3. Konfigurer miljøvariabler (`.env`):
```env
GITHUB_TOKEN=your_github_token_here
```

4. Start backend:
```bash
uvicorn app:app --reload
```

Backend kjører nå på `http://localhost:8000`

---

## 📦 Installation

1. Clone the repository:
```sh
# Using HTTPS
git clone https://github.com/NexusWeave/webapp-Portfolio-vupy.git

# Using SSH
git clone git@github.com:NexusWeave/webapp-Portfolio-vupy.git

# Using Github CLI
gh repo clone NexusWeave/webapp-Portfolio-vupy
```

2. Naviger til prosjektmappen:
```sh
cd webapp-Portfolio-vupy
```

3. Følg instruksjonene i [Quick Start](#-quick-start) for å starte frontend og backend.

---

## 🏗️ Prosjektstruktur

```
webapp-Portfolio-vupy/
├── frontend/           # Nuxt 3 applikasjon
├── fastAPI/           # FastAPI backend
├── documentations/    # Dokumentasjon
├── ARCHITECTURE.md    # Hovedarkitektur
└── README.md          # Denne filen
```

Se [ARCHITECTURE.md](ARCHITECTURE.md) for fullstendig struktur.

---

## 🛠️ Teknologier

### Frontend
- **Nuxt 3** - Vue.js meta-framework
- **TypeScript** - Type-sikkerhet
- **SASS** - Styling
- **TinaCMS** - Headless CMS

### Backend
- **FastAPI** - Python web framework
- **Turso** - Database
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation

### DevOps
- **Netlify** - Frontend hosting
- **PythonAnywhere** - Backend hosting
- **Git** - Versjonskontroll

---

## 📝 Konfigurasjon

### Frontend Environment Variables
### Frontend Environment Variables

Opprett `.env` i `frontend/`:
```env
VITE_CV=https://...
VITE_Github=https://github.com/...
VITE_LinkedIn=https://linkedin.com/in/...
VITE_Mail=mailto:...
```

### Backend Environment Variables

Opprett `.env` i `fastAPI/`:
```env
# Turso Database
TURSO_DATABASE_URL="libsql://your-database.turso.io"
TURSO_AUTH_TOKEN="your-auth-token"

```

---

## 🌐 Deployment

### Frontend (Netlify)

```bash
cd frontend
npm run deploy  # Bygger og deployer til Netlify
```

### Backend (PythonAnywhere)

Backend er hostet på PythonAnywhere med:
- WSGI configuration
- Virtual environment
- SQLite database

---

## 💻 Development

### Development Server

Start frontend development server:

```bash
cd frontend

# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

Server kjører på `http://localhost:3000`

---

## 🏭 Production Build

### Frontend

Build frontend for production:

### Frontend

Build frontend for production:

```bash
cd frontend

# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build
```

Generate static files:

```bash
npm run generate
```

Preview production build locally:

```bash
npm run start
```

Se [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for mer informasjon.

---

## 🧪 Testing

### Backend Tests

```bash
cd fastAPI
pytest tests/ -v
```

Test-suiten inkluderer:
- API status tests
- Performance tests
- Response validation
- Database tests

---
## 📜 Credits

### Frameworks & Libraries

**Frontend:**
* **Nuxt.js / Vue.js**
    * Developed by: Nuxt Team / Vue Team
    * URL: [https://nuxt.com](https://nuxt.com) / [https://vuejs.org](https://vuejs.org)
    * Purpose: Frontend framework

* **TinaCMS**
    * Developed by: TinaCMS Team
    * URL: [https://tina.io](https://tina.io)
    * Purpose: Headless CMS

**Backend:**
* **FastAPI**
    * Developed by: Sebastián Ramírez
    * URL: [https://fastapi.tiangolo.com](https://fastapi.tiangolo.com)
    * Purpose: Web framework

* **Flask**
    * Developed by: The Pallets Project
    * URL: [https://flask.palletsprojects.com](https://flask.palletsprojects.com)
    * Purpose: Web framework (legacy)

**Utilities:**
* **python-dotenv**
    * Developed by: Saurabh Kumar
    * URL: [https://pypi.org/project/python-dotenv/](https://pypi.org/project/python-dotenv/)
    * Purpose: Environment variable management

**Built-in Modules:**
* sqlite3 - Database management
* os - Operating system interactions

**Testing:**
* pytest - Python testing framework
* pytest-asyncio - Async testing support

---

## 📄 License

The project's licensing information can be found in the [LICENSE](LICENSE) file.

---

## 🎯 Project Goals & Challenges

### Opprinnelig Formål

Prosjektet ble opprinnelig opprettet som en personlig hjemmeside for å vise mine prosjekter og ferdigheter. 
Det ble ikke designet som et CS50x-assignment, men det løste begge formål effektivt.

### Tekniske Utfordringer

#### JAMstack Arkitektur
- Implementering av moderne JAMstack-arkitektur med separasjon mellom frontend og backend
- Konfigurasjon av TinaCMS for sømløs innholdsadministrasjon
- Optimalisering av statisk site generation for ytelse

#### GitHub API Integration
Under implementeringen av GitHub API-integrasjonen ble det observert at hver GET-forespørsel returnerte komplette data.
For å optimalisere dette ble en scheduling-mekanisme implementert for å begrense datahenting til én gang per dag eller når endringer i repository oppdages.

**Løsning:** Database-caching med SQLite for å redusere API-kall.

#### Model Implementation
Under implementeringen av datamodellen måtte jeg lære hvordan man:
- Beskriver klasser og deres relasjoner til subklasser
- Definerer funksjonalitet og arv i objektorientert programmering
- Bruker Pydantic for datavalidering i FastAPI

#### Testing Challenges

**GitHub API Testing:**
* **Automated API Function Testing:**
    * Utfordring: Sikker lagring av forventede testresultater uten å eksponere sensitiv kontoinformasjon
    * Løsning: Bruke API-requesten selv for å hente og validere sensitiv informasjon

* **API Connection Testing:**
    * Utfordring: Teste API-tilkobling uten å avsløre sensitiv informasjon
    * Løsning: Mock-testing med pytest fixtures

**SQLite3 Database Testing:**
* Database-tilkoblingstesting
* Exception-testing for feilhåndtering
* Validering av datamodeller

---

## 🚀 Future Development

Se [GitHub Projects](https://github.com/users/krigjo25/projects/17) for planlagte funksjoner og forbedringer.

**Planlagte funksjoner:**
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Enhanced AI/ML features
- [ ] Comprehensive test coverage
- [ ] Performance monitoring
- [ ] Advanced analytics

---

## 👤 Author

**Kristoffer Joar Gabrielsen (krigjo25)**

- GitHub: [@krigjo25](https://github.com/krigjo25)
- Website: [krigjo25.no](https://krigjo25.no)

---

## 🙏 Acknowledgments

Takk til alle open source-bidragsytere som gjør slike prosjekter mulige!

---

Have a glorious rest of your day! ✨

[@krigjo25](https://github.com/krigjo25)
