# 📚 Documentation Architecture

> **Prosjekt:** Portfolio Webapp Dokumentasjon  
> **Sist oppdatert:** 1. desember 2025

---

## 📋 Innholdsfortegnelse

1. [Oversikt](#-oversikt)
2. [Dokumentasjonsstruktur](#-dokumentasjonsstruktur)
3. [Modeller](#-modeller)
4. [Prototyper](#-prototyper)

---

## 🎯 Oversikt

Dokumentasjonsbiblioteket inneholder:

- ✅ Arkitekturmodeller og diagrammer
- ✅ Teknisk dokumentasjon
- ✅ Design-prototyper
- ✅ Skjermbilder og visuelle ressurser

---

## 📁 Dokumentasjonsstruktur

```
documentations/
├── 📄 documentation-arkitektur.txt  # Denne filen (nå .md)
│
├── 📁 documents/                    # Tekniske dokumenter
│   ├── techstack.md                 # Teknologioversikt
│   └── screen-capture-homepage.pdf  # Skjermbilde
│
├── 📁 model/                        # Arkitekturmodeller
│   ├── system-architecture.md       # Systemarkitektur
│   ├── apis.md                      # API-dokumentasjon
│   ├── database.md                  # Database-skjema
│   ├── endpoints.md                 # API endpoints
│   ├── frontend.md                  # Frontend-dokumentasjon
│   ├── utils.md                     # Utility-dokumentasjon
│   ├── Directories.md               # Mappestruktur
│   └── Gemini_Generated_Image_*.jpeg # Arkitekturdiagram
│
└── 📁 prototype/                    # Tidlige prototyper
    ├── index.html                   # HTML-prototype
    ├── sass/                        # Prototype styling
    │   ├── flexbox.sass
    │   ├── fonts.sass
    │   ├── grid-container.sass
    │   ├── index.sass
    │   └── flexbox/
    │       ├── flexbox-column.sass
    │       └── flexbox-row.sass
    └── static/                      # Statiske ressurser
        ├── css/
        ├── js/
        │   ├── model.js
        │   ├── controller.js
        │   ├── view.js
        │   ├── aboutme/
        │   ├── dev/
        │   ├── portfolio/
        │   └── utils/
        └── media/
            ├── images/
            │   └── carousel/
            └── logo/
```

---

## 🏗️ Modeller

### System Architecture (`model/system-architecture.md`)

Overordnet systemarkitektur med:
- Komponentdiagram
- Dataflytdiagram
- Deployment-arkitektur

**Lenke:** [system-architecture.md](model/system-architecture.md)

---

### API Documentation (`model/apis.md`)

Detaljert API-dokumentasjon:
- Endpoint-definisjon er
- Request/Response-eksempler
- Autentisering
- Rate limiting

**Lenke:** [apis.md](model/apis.md)

---

### Database Schema (`model/database.md`)

Database-design og relasjoner:
- Tabelldefinisjoner
- Relasjoner og constraints
- Indekser og optimaliseringer

**Lenke:** [database.md](model/database.md)

---

### API Endpoints (`model/endpoints.md`)

Komplett oversikt over alle endpoints:
- HTTP-metoder
- Parametre
- Svar-formater
- Feilhåndtering

**Lenke:** [endpoints.md](model/endpoints.md)

---

### Frontend Documentation (`model/frontend.md`)

Frontend-arkitektur og komponenter:
- Komponenthierarki
- State management
- Routing
- Styling-konvensjoner

**Lenke:** [frontend.md](model/frontend.md)

---

### Utilities Documentation (`model/utils.md`)

Hjelpefunksjoner og utilities:
- Logger-oppsett
- Exception handling
- Dato-formattering
- Validering

**Lenke:** [utils.md](model/utils.md)

---

### Directory Structure (`model/Directories.md`)

Detaljert mappestruktur:
- Prosjektorganisering
- Navnekonvensjoner
- Modulstruktur

**Lenke:** [Directories.md](model/Directories.md)

---

## 🎨 Prototyper

### HTML Prototype (`prototype/index.html`)

Tidlig HTML-prototype for design-konsepter.

**Innhold:**
- Grunnleggende layout
- Navigasjonsstruktur
- Innholdseksjoner

---

### SASS Prototypes (`prototype/sass/`)

Styling-prototyper for:

#### Flexbox Layout (`flexbox/`)
```sass
flexbox/
├── flexbox-column.sass   # Kolonnebasert layout
└── flexbox-row.sass      # Radbasert layout
```

#### Typography (`fonts.sass`)
Skrifttyper og typografi:
- Font-familier
- Font-størrelser
- Line-heights
- Letter-spacing

#### Grid System (`grid-container.sass`)
CSS Grid implementasjon:
- Grid-templates
- Responsive grids
- Gap-systemer

---

### JavaScript Prototypes (`prototype/static/js/`)

Tidlige JavaScript-moduler:

```
js/
├── model.js          # Datamodell
├── controller.js     # Applikasjonskontroller
├── view.js           # Visningslogikk
│
├── aboutme/
│   └── view.js       # Om meg-seksjon
│
├── dev/
│   └── view.js       # Utvikler-portfolio
│
├── portfolio/
│   ├── controller.js # Portfolio-kontroller
│   └── view.js       # Portfolio-visning
│
└── utils/
    ├── controller.js # Utility-kontroller
    └── view.js       # Utility-visning
```

**Pattern:** MVC (Model-View-Controller)

---

### Media Assets (`prototype/static/media/`)

#### Images (`images/`)
```
images/
└── carousel/
    ├── klar00.jpg
    ├── klar01.jpg
    ├── klar02.jpg
    ├── klar03.jpg
    ├── klar04.jpg
    └── sosent.zip
```

#### Logos (`logo/`)
```
logo/
└── logic-meets-creative-solutions.png
```

---

## 📊 Tekniske Dokumenter

### Tech Stack (`documents/techstack.md`)

Komplett oversikt over teknologistacken:
- Frontend-teknologier
- Backend-teknologier
- Utviklerverktøy
- Deployment-løsninger

**Innhold:**
- Programmeringsspråk
- Frameworks og biblioteker
- Databaser
- DevOps-verktøy

**Lenke:** [techstack.md](documents/techstack.md)

---

### Screenshots (`documents/screen-capture-homepage.pdf`)

Visuelle dokumenter:
- Homepage-skjermbilder
- Design-evolusjon
- UI/UX-eksempler

---

## 🔄 Dokumentasjonsflyt

```
Planlegging
    ↓
Prototype Design (HTML/CSS/JS)
    ↓
Arkitekturmodeller
    ↓
Teknisk Dokumentasjon
    ↓
Implementasjon
    ↓
Oppdatert Dokumentasjon
```

---

## 📝 Dokumentasjonskonvensjoner

### Markdown-formattering

Alle dokumenter bruker Markdown med:
- ✅ Tydelige overskrifter
- ✅ Kodeblokker med syntaksutheving
- ✅ Tabeller for strukturert data
- ✅ Lenker til relaterte dokumenter
- ✅ Emojis for visuell strukturering

### Navnekonvensjoner

```
kebab-case.md        # Dokumentfiler
PascalCase.md        # Komponenter/klasser
camelCase.ts         # TypeScript
snake_case.py        # Python
UPPERCASE.md         # Viktige filer (README, LICENSE)
```

---

## 🔗 Dokumentlenker

### Arkitekturdokumenter
- [Hovedarkitektur](../ARCHITECTURE.md)
- [Frontend Arkitektur](../frontend/FRONTEND-ARCHITECTURE.md)
- [Backend Arkitektur](../fastAPI/BACKEND-ARCHITECTURE.md)

### Modeller
- [System Architecture](model/system-architecture.md)
- [API Documentation](model/apis.md)
- [Database Schema](model/database.md)
- [Endpoints](model/endpoints.md)
- [Frontend Details](model/frontend.md)
- [Utils Documentation](model/utils.md)
- [Directory Structure](model/Directories.md)

### Tekniske Dokumenter
- [Tech Stack](documents/techstack.md)

### Prosjektfiler
- [README](../README.md)
- [LICENSE](../LICENSE)
- [CHANGELOG](../frontend/docs/logs/CHANGELOG.md)

---

## 📊 File Statistics

```
Directories: 17
Files: 48
```

**Breakdown:**
- Markdown Files: 8 files
- HTML Prototypes: 1 file
- SASS Files: ~10 files
- JavaScript Files: ~10 files
- Media Files: ~10 files
- PDF Documents: 1 file

---

## 🎯 Dokumentasjonsmål

1. **Klarhet** - Tydelig og forståelig for alle
2. **Fullstendighet** - Dekker alle aspekter av systemet
3. **Vedlikehold** - Oppdateres regelmessig
4. **Tilgjengelighet** - Lett å finne og navigere
5. **Visuell** - Diagrammer og eksempler

---

**Vedlikeholdt av:** NexusWeave  
**Sist revidert:** 1. desember 2025
