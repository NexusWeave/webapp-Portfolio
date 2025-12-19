# 🏗️ JAMstack Portfolio Architecture

> **Prosjekt:** Portfolio Webapp med JAMstack-arkitektur  
> **Sist oppdatert:** 1. desember 2025  
> **Repository:** [NexusWeave/webapp-Portfolio-vupy](https://github.com/NexusWeave/webapp-Portfolio-vupy)

---

## 📋 Innholdsfortegnelse

1. [Oversikt](#-oversikt)
2. [Prosjektstruktur](#-prosjektstruktur)
3. [Arkitekturkomponenter](#-arkitekturkomponenter)
4. [Detaljert Dokumentasjon](#-detaljert-dokumentasjon)

---

## 🎯 Oversikt

Dette prosjektet følger **JAMstack-arkitekturen** (JavaScript, APIs, Markup) med en klar separasjon mellom:

- **Frontend:** Nuxt 3 / Vue 3 (SSG - Static Site Generation)
- **Backend:** FastAPI / Flask (REST API)
- **Content:** TinaCMS (Headless CMS)
- **Database:** Turso (Cloud-based SQLite)

### Nøkkelegenskaper

- ✅ Statisk generert frontend for optimal ytelse
- ✅ Dynamisk API-integrasjon for sanntidsdata
- ✅ Headless CMS for enkel innholdsadministrasjon
- ✅ TypeScript for type-sikkerhet
- ✅ SASS for modulær styling
- ✅ Responsive design med enhetsbaserte media queries

---

## 📁 Prosjektstruktur

```
webapp-Portfolio-vupy/
├── 📚 documentations/          # Dokumentasjon og modeller
│   ├── documents/              # Tekniske dokumenter
│   ├── model/                  # Arkitekturmodeller
│   └── prototype/              # Tidlige prototyper
│
├── 🎨 frontend/                # Nuxt 3 applikasjon
│   ├── components/             # Vue-komponenter
│   ├── pages/                  # Rute-sider
│   ├── content/                # Markdown-innhold
│   ├── sass/                   # SASS styling
│   ├── composables/            # Vue composables
│   ├── utils/                  # Hjelpefunksjoner
│   ├── types/                  # TypeScript-definisjoner
│   └── tina/                   # TinaCMS-konfigurasjon
│
├── ⚙️ fastAPI/                 # Backend API (FastAPI)
│   ├── lib/                    # Kjerne biblioteker
│   │   ├── apis/               # API-integrasjoner
│   │   ├── models/             # Datamodeller
│   │   ├── services/           # Business logic
│   │   ├── settings/           # Konfigurasjon
│   │   └── utils/              # Verktøy
│   ├── sqlite/                 # Database scripts
│   └── tests/                  # Enhetstester
│
├── 🗄️ backend/                # Legacy Flask backend
│   └── flask/                  # Flask applikasjon
│
└── 📦 archive/                 # Arkiverte filer
    └── frontend/               # Gamle frontend-filer
```

---

## 🏛️ Arkitekturkomponenter

### 1. Frontend (Nuxt 3)

**Plassering:** `/frontend/`

Moderne Vue 3-basert applikasjon med server-side rendering capabilities.

#### Komponenter (`/components/`)

```
components/
├── article/        # Artikkelstruktur (Header, Main, Footer)
├── Date/           # Datoformatering
├── form/           # Skjemakomponenter
├── media/          # Media-håndtering (bilder, ikoner)
├── navigation/     # Navigasjonskomponenter
├── portfolio/      # Portfolio-kort
├── repository/     # Repository-visninger
├── timeline/       # Tidslinjekomponenter
└── utils/          # Gjenbrukbare verktøykomponenter
```

#### Sider (`/pages/`)

- `index.vue` - Hovedside
- `dev.vue` - Utviklerportfolio
- `personal.vue` - Personlig profil
- `aktuelt.vue` - Nyheter og oppdateringer

#### Innhold (`/content/`)

```
content/
├── achievements/   # Prestasjoner (akademiske & profesjonelle)
├── posts/          # Blogginnlegg
├── profiles/       # Profiler (dev & personal)
├── quotes/         # Referansesitater
└── portfolio/      # Portfolio-data
```

#### Styling (`/sass/`)

Modulær SASS-arkitektur:

```
sass/
├── colors/         # Fargepaletter (tech, sosiale, generelle)
├── flexbox/        # Flexbox utilities
├── mappings/       # Tech ikoner & breakpoints
├── media-query/    # Responsive design
│   └── devices/    # Enhetsbaserte queries (Apple, Samsung, etc.)
├── utils/          # Komponentstiler
└── views/          # Sidebaserte stiler
```

#### Type Definitions (`/types/`)

- `timeline.d.ts` - Tidslinjetyper
- `props.d.ts` - Komponent props
- `references.d.ts` - Referansetyper

---

### 2. Backend (FastAPI)

**Plassering:** `/fastAPI/`

Python-basert REST API med FastAPI framework.

#### API-struktur (`/lib/`)

```
lib/
├── apis/               # Eksterne API-integrasjoner
│   ├── github_data.py  # GitHub API
│   └── Photos.py       # Foto API
│
├── models/             # Datamodeller
│   ├── announcements.py
│   ├── github_model.py
│   ├── heavy_model.py
│   ├── web_config.py
│   └── database_models/
│
├── services/           # Business logic
│   ├── announcements.py
│   ├── github_api.py
│   ├── heavy_api.py
│   ├── database_services.py
│   └── base_services/
│
├── settings/           # Konfigurasjon
│   └── env_config.py
│
└── utils/              # Verktøy
    ├── app_utility.py
    ├── exception_handler.py
    └── logger_config.py
```

#### Database (`/sqlite/`)

- `programming-languages.sql` - Programmeringsspråk
- `repo.sql` - Repository-data
- `sqlite.py` - Database-konfigurasjon

#### Testing (`/tests/`)

- `test_ApiStatus.py` - API-statustester
- `test_performance.py` - Ytelsestester
- `test_responses.py` - Responsvaldierung

---

### 3. Content Management (TinaCMS)

**Plassering:** `/frontend/tina/`

Headless CMS for innholdsadministrasjon.

#### Collections (`/tina/collections/`)

- `academic.ts` - Akademiske prestasjoner
- `blog.ts` - Blogginnlegg
- `profiles.ts` - Profiler
- `reference.ts` - Referanser

#### Genererte filer (`/tina/__generated__/`)

Auto-genererte TypeScript-typer og GraphQL-schemas.

---

### 4. Dokumentasjon

**Plassering:** `/documentations/`

#### Modeller (`/model/`)

- `system-architecture.md` - Systemarkitektur
- `apis.md` - API-dokumentasjon
- `database.md` - Database-skjema
- `endpoints.md` - API-endpoints
- `frontend.md` - Frontend-dokumentasjon
- `utils.md` - Verktøydokumentasjon
- `Directories.md` - Mappestruktur

#### Prototyper (`/prototype/`)

Tidlige HTML/CSS/JS-prototyper for design-konsepter.

---

## 📚 Detaljert Dokumentasjon

For mer detaljert informasjon om hver komponent, se:

### Arkitekturdokumenter

- **[Frontend Arkitektur](frontend/FRONTEND-ARCHITECTURE.md)** - Detaljert frontend-struktur
- **[Backend Arkitektur](fastAPI/BACKEND-ARCHITECTURE.md)** - Backend API-dokumentasjon
- **[Dokumentasjonsarkitektur](documentations/DOCUMENTATION-ARCHITECTURE.md)** - Dokumentasjonsstruktur

### Teknisk Dokumentasjon

- **[Tech Stack](documentations/documents/techstack.md)** - Komplett teknologioversikt
- **[System Architecture](documentations/model/system-architecture.md)** - Systemdesign
- **[API Reference](documentations/model/apis.md)** - API-referanse
- **[Database Schema](documentations/model/database.md)** - Database-design

---

## 🔧 Teknologioversikt

### Core Technologies

| Område | Teknologi |
|:-------|:----------|
| **Frontend Framework** | Nuxt 3, Vue 3 |
| **Backend Framework** | FastAPI, Flask |
| **Language** | TypeScript, Python 3.13 |
| **Styling** | SASS/SCSS |
| **CMS** | TinaCMS |
| **Database** | SQLite |
| **Testing** | Pytest |

### Development Tools

| Verktøy | Formål |
|:--------|:-------|
| **Git** | Versjonskontroll |
| **ESLint** | Code linting |
| **Pre-commit** | Git hooks |
| **Netlify** | Frontend hosting |
| **PythonAnywhere** | Backend hosting |

---

## 📊 Dataflyt

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ↓
┌─────────────┐      ┌──────────────┐
│   Nuxt 3    │◄────►│   TinaCMS    │
│  (Frontend) │      │   (Content)  │
└──────┬──────┘      └──────────────┘
       │
       ↓
┌─────────────┐      ┌──────────────┐
│   FastAPI   │◄────►│   SQLite     │
│  (Backend)  │      │  (Database)  │
└──────┬──────┘      └──────────────┘
       │
       ↓
┌─────────────┐
│ External    │
│ APIs        │
│ (GitHub)    │
└─────────────┘
```

---

## 🚀 Deployment

### Frontend (Netlify)

- **URL:** https://krigjo25.no
- **Build:** `npm run generate`
- **Output:** `.output/public/`

### Backend (PythonAnywhere)

- **URL:** https://home.krigjo25.no
- **Framework:** FastAPI/Flask
- **CORS:** Konfigurert for Netlify-domenet

---

## 📝 Notater

- ✅ Prosjektet er i aktiv utvikling på `backend`-branchen
- ✅ Frontend bruker SSG (Static Site Generation) for optimal ytelse
- ✅ Backend API er tilgjengelig på subdomene
- ✅ TinaCMS gir visuell redigering av innhold
- ✅ Alle arkitekturfiler er nå i Markdown-format for bedre lesbarhet

---

**Relaterte filer:**
- [README.md](README.md) - Prosjektets hovedinformasjon
- [LICENSE](LICENSE) - Lisensvilkår
- [CHANGELOG](frontend/docs/logs/CHANGELOG.md) - Endringslogg
