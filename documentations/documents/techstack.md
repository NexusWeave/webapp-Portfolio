# 🚀 Technology Stack Documentation

Komplett oversikt over teknologier, arkitektur og infrastruktur for webapp-Portfolio-vupy.

---

## 📋 Innholdsfortegnelse

1. [Teknologistakk](#-teknologistakk-stack)
2. [Frontend Arkitektur](#-frontend-arkitektur)
3. [Backend Arkitektur](#-backend-arkitektur)
4. [Distribusjons- & Hostingmiljø](#-distribusjons--hostingmiljø)
5. [Utviklerverktøy](#-utviklerverktøy)
6. [Innholdsstyring](#-innholdsstyring)
7. [Type System](#-type-system)
8. [Styling & Design](#-styling--design)
9. [Viktige Konfigurasjoner](#-viktige-konfigurasjoner)

---

## 💻 Teknologistakk (Stack)

### Core Technologies

| Lag | Teknologi | Versjon/Status | Formål & Konfigurasjon |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **Nuxt 3** | v3.x | Vue.js meta-framework for SSR/SSG. Konfigurert som SPA (`ssr: false`) |
| **UI Framework** | **Vue.js 3** | v3.x | Progressiv JavaScript framework med Composition API |
| **Type Safety** | **TypeScript** | v5.x | Type-safe JavaScript superset for hele frontend |
| **Backend API** | **FastAPI** | v0.x (Python) | High-performance async API framework (under utvikling) |
| **Database** | **SQLite** | v3.x | Lightweight relational database for lokal data |
| **Content Management** | **TinaCMS** | v2.x | Git-based headless CMS med visuell redigering |
| **Styling** | **Sass/SCSS** | v1.x | CSS preprocessor med omfattende design system |

---

## 🎨 Frontend Arkitektur

### Framework & Build System

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,              // SPA-modus
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  // ... se nuxt.config.ts for fullstendig konfigurasjon
})
```

### Komponentstruktur

Definert i [`frontend/components/`](../../frontend/components/):

| Kategori | Komponenter | Formål |
| :--- | :--- | :--- |
| **Article** | [`Article.vue`](../../frontend/components/article/Article.vue), [`Header.vue`](../../frontend/components/article/Header.vue), [`Footer.vue`](../../frontend/components/article/Footer.vue), [`Main.vue`](../../frontend/components/article/Main.vue) | Artikkelstruktur og innholdsvisning |
| **Date** | [`Date.vue`](../../frontend/components/Date/Date.vue), [`Year.vue`](../../frontend/components/Date/Year.vue) | Datoformatering og tidsvisning |
| **Form** | [`Form.vue`](../../frontend/components/form/Form.vue), [`inputs.vue`](../../frontend/components/form/inputs.vue) | Skjemaer og input-håndtering |
| **Media** | [`Figure.vue`](../../frontend/components/media/Figure.vue), [`Icon.vue`](../../frontend/components/media/Icon.vue), [`Media.vue`](../../frontend/components/media/Media.vue) | Bilde- og medievisning |
| **Navigation** | [`Anchor.vue`](../../frontend/components/navigation/Anchor.vue), [`Button.vue`](../../frontend/components/navigation/Button.vue), [`NavMenu.vue`](../../frontend/components/navigation/NavMenu.vue) | Navigasjon og lenker |
| **Portfolio** | [`Card.vue`](../../frontend/components/portfolio/Card.vue) | Porteføljevisning |
| **Repository** | [`BusinessCard.vue`](../../frontend/components/repository/BusinessCard.vue), [`Portfolio.vue`](../../frontend/components/repository/Portfolio.vue) | GitHub repository-visning |
| **Timeline** | [`Card.vue`](../../frontend/components/timeline/Card.vue), [`Filter.vue`](../../frontend/components/timeline/Filter.vue), [`Timeline.vue`](../../frontend/components/timeline/Timeline.vue) | Akademisk tidslinje |
| **Utils** | [`Announcements.vue`](../../frontend/components/utils/Announcements.vue), [`Footer.vue`](../../frontend/components/utils/Footer.vue), [`Header.vue`](../../frontend/components/utils/Header.vue), [`List.vue`](../../frontend/components/utils/List.vue), [`Pagination.vue`](../../frontend/components/utils/Pagination.vue), [`Progress.vue`](../../frontend/components/utils/Progress.vue), [`Tags.vue`](../../frontend/components/utils/Tags.vue) | Hjelpefunksjoner og utilities |

### Utilities & Composables

Definert i [`frontend/utils/`](../../frontend/utils/) og [`frontend/composables/`](../../frontend/composables/):

- **[`tech-utils.ts`](../../frontend/utils/tech-utils.ts)**: [`fetchTechType()`](../../frontend/utils/tech-utils.ts) - Teknologi type mapping
- **[`techStack.ts`](../../frontend/utils/techStack.ts)**: [`techStack`](../../frontend/utils/techStack.ts), [`techStackMap`](../../frontend/utils/techStack.ts) - Teknologi definisjon
- **[`tagStack.ts`](../../frontend/utils/tagStack.ts)**: [`tagsOptions`](../../frontend/utils/tagStack.ts) - Tag kategorier
- **[`utils.ts`](../../frontend/utils/utils.ts)**: Generelle hjelpefunksjoner
- **[`backendAPI-utils.ts`](../../frontend/composables/backendAPI-utils.ts)**: API-kommunikasjon
- **[`preprosessor-utils.ts`](../../frontend/composables/preprosessor-utils.ts)**: [`mapTimeline()`](../../frontend/composables/preprosessor-utils.ts), [`sortbyDate()`](../../frontend/composables/preprosessor-utils.ts) - Data preprocessing

### Pages

Definert i [`frontend/pages/`](../../frontend/pages/):

- **[`index.vue`](../../frontend/pages/index.vue)**: Hovedside
- **[`dev.vue`](../../frontend/pages/dev.vue)**: Utvikler-profil med skills og referanser
- **[`aktuelt.vue`](../../frontend/pages/aktuelt.vue)**: Nyheter og blogposter
- **[`personal.vue`](../../frontend/pages/personal.vue)**: Personlig profil

---

## ⚙️ Backend Arkitektur

### API Structure

Definert i [`fastAPI/`](../../fastAPI/):

#### FastAPI Backend (Under utvikling)

**Hovedfil**: [`fastAPI/app.py`](../../fastAPI/app.py)

Moderne asynkron API med samme arkitektur som Flask-versjon.

### Database

**SQLite Schema**: [`backend/sqlite/`](../../backend/sqlite/)
- [`programming-languages.sql`](../../backend/sqlite/programming-languages.sql)
- [`repo.sql`](../../backend/sqlite/repo.sql)
- [`sqlite.py`](../../backend/sqlite/sqlite.py)

---

## 🌐 Distribusjons- & Hostingmiljø

| Tjeneste | Rolle | Konfigurasjon |
| :--- | :--- | :--- |
| **Frontend Hosting** | **Netlify** | - Hovedhosting med DNS-administrasjon<br>- SSL/TLS automatisk<br>- Domene: `krigjo25.no` |
| **DNS Provider** | **Netlify DNS** | - Autoritativ DNS<br>- NETLIFY-poster for rotdomene<br>- CNAME for API-subdomene |
| **Build Process** | **npm scripts** | `tinacms build && npm run generate && netlify deploy` |
| **Deployment** | **Netlify CLI** | SPA fallback via [`netlify.toml`](../../frontend/netlify.toml) |

### Build Configuration

```bash
# Frontend build
npm run generate  # Genererer statisk SPA
npm run deploy   # Full deploy-prosess med TinaCMS

# Backend
# Manuell deploy til PythonAnywhere
```

---

## 🛠️ Utviklerverktøy

### Version Control

| Verktøy | Konfigurasjon | Formål |
| :--- | :--- | :--- |
| **Git** | [`.gitignore`](../../.gitignore) | Versjonskontroll |
| **GitHub** | - | Repository hosting og CI/CD |
| **Pre-commit Hooks** | [`.pre-commit-config.yaml`](../../.pre-commit-config.yaml) | Code quality checks |

### Code Quality

| Verktøy | Konfigurasjon | Formål |
| :--- | :--- | :--- |
| **ESLint** | [`eslint.config.mjs`](../../frontend/eslint.config.mjs) | JavaScript/TypeScript linting |
| **TypeScript** | [`tsconfig.json`](../../frontend/tsconfig.json) | Type checking |

### Testing

**FastAPI Backend**:
- **pytest**: [`backend/flask/tests/`](../../backend/flask/tests/)
  - [`test_ApiStatus.py`](../../backend/flask/tests/test_ApiStatus.py)
  - [`test_performance.py`](../../backend/flask/tests/test_performance.py)
  - [`test_responses.py`](../../backend/flask/tests/test_responses.py)

### IDE Configuration

**VS Code**:
- Workspace: [`webapp-Portfolio-vupy.code-workspace`](../../webapp-Portfolio-vupy.code-workspace)
- Settings: [`.vscode/settings.json`](../../.vscode/settings.json)

---

## 📝 Innholdsstyring

### TinaCMS

**Konfigurasjon**: [`frontend/tina/config.ts`](../../frontend/tina/config.ts)

**Collections**:

| Collection | Fil | Content Path | Formål |
| :--- | :--- | :--- | :--- |
| **Academic** | [`academic.ts`](../../frontend/tina/collections/academic.ts) | `content/achievements/` | Utdanning og akademiske prestasjoner |
| **Blog** | [`blog.ts`](../../frontend/tina/collections/blog.ts) | `content/posts/` | Blogginnlegg og artikler |
| **Profiles** | [`profiles.ts`](../../frontend/tina/collections/profiles.ts) | `content/profiles/` | Profil-informasjon |
| **References** | [`reference.ts`](../../frontend/tina/collections/reference.ts) | `content/quotes/references/` | Attester og referanser |

**Auto-genererte typer**: [`frontend/tina/__generated__/`](../../frontend/tina/__generated__/)

### Content Collections

Definert i [`content.config.ts`](../../frontend/content.config.ts) med Zod-validering:

```typescript
const achievementsCollection = z.object({
    tag: z.string(),
    title: z.string(),
    created: z.string(),
    organization: z.string(),
    techStack: z.array(z.string()).optional(),
    // ... se content.config.ts
});
```

---

## 🎯 Type System

### TypeScript Interfaces

Definert i [`frontend/types/`](../../frontend/types/):

#### Props Types ([`props.d.ts`](../../frontend/types/props.d.ts))

```typescript
export interface GithubRepo {
    id: string;
    name: string;
    date: string;
    owner: string;
    label: string;
    lang: string[];
    description: string;
    anchor: Record<string, string>;
}

export interface RepoProps {
    data: GithubRepo;
    cls?: Array<string | string[] | Array<string | string[]>>;
}

export interface ProgressProps {
    value: number;
    tech?: string;
    label: string;
    cls?: string[];
}
```

#### Timeline Types ([`timeline.d.ts`](../../frontend/types/timeline.d.ts))

```typescript
export interface TimelineItem {
    id: number;
    body?: object;
    date: DateObject;
    isVisible: boolean;
    techStack?: TechStack[];
    location: ReferencePoint;
    reference: ReferencePoint;
    title?: string | undefined;
    organization: ReferencePoint;
    description?: string | undefined;
}

export interface TechStack {
    type: string;
    label: string;
}
```

#### Reference Types ([`references.d.ts`](../../frontend/types/references.d.ts))

Typer for attester og referansesystem.

---

## 🎨 Styling & Design

### Sass Architecture

Organisert i [`frontend/sass/`](../../frontend/sass/):

#### Color System

- **[`colors/_colors.sass`](../../frontend/sass/colors/_colors.sass)**: Hovedfargepallette
- **[`colors/_tech-color.sass`](../../frontend/sass/colors/_tech-color.sass)**: Teknologi-spesifikke farger
- **[`colors/_social-colors.sass`](../../frontend/sass/colors/_social-colors.sass)**: Sosiale media farger
- **[`colors/_palette.sass`](../../frontend/sass/colors/_palette.sass)**: Utvidet fargepalett

#### Utilities

- **[`utils/_mixins.sass`](../../frontend/sass/utils/_mixins.sass)**: Gjenbrukbare mixins
- **[`utils/_flexbox.sass`](../../frontend/sass/utils/_flexbox.sass)**: Flexbox utilities
- **[`utils/_grid-container.sass`](../../frontend/sass/utils/_grid-container.sass)**: Grid system
- **[`utils/_cards.sass`](../../frontend/sass/utils/_cards.sass)**: Card komponenter
- **[`utils/_buttons.sass`](../../frontend/sass/utils/_buttons.sass)**: Button styles
- **[`utils/_icons.sass`](../../frontend/sass/utils/_icons.sass)**: Icon system
- **[`utils/_navigation.sass`](../../frontend/sass/utils/_navigation.sass)**: Navigasjon
- **[`utils/_tech-content.sass`](../../frontend/sass/utils/_tech-content.sass)**: Teknologi badges
- **[`utils/_timeline.sass`](../../frontend/sass/utils/_timeline.sass)**: Timeline komponenter
- **[`utils/_article.sass`](../../frontend/sass/utils/_article.sass)**: Artikkel-styling

#### Mappings

- **[`mappings/_icons.sass`](../../frontend/sass/mappings/_icons.sass)**: Bootstrap Icons mapping
- **[`mappings/_tech-icons.sass`](../../frontend/sass/mappings/_tech-icons.sass)**: Teknologi-ikoner
- **[`mappings/_flexbox.sass`](../../frontend/sass/mappings/_flexbox.sass)**: Flexbox mappings
- **[`mappings/_devices-breakpoints.sass`](../../frontend/sass/mappings/_devices-breakpoints.sass)**: Device breakpoints

#### Responsive Design

Media queries i [`frontend/sass/media-query/devices/`](../../frontend/sass/media-query/devices/):

- **Apple**: [`_apple-media-query.sass`](../../frontend/sass/media-query/devices/_apple-media-query.sass)
- **Microsoft**: [`_microsoft-media-query.sass`](../../frontend/sass/media-query/devices/_microsoft-media-query.sass)
- **Samsung**: [`_samsung-media-query.sass`](../../frontend/sass/media-query/devices/_samsung-media-query.sass)
- **Google**: [`_google-media-query.sass`](../../frontend/sass/media-query/devices/_google-media-query.sass)
- **Generic**: [`_display-media-query.sass`](../../frontend/sass/media-query/devices/_display-media-query.sass)

#### Views

- **[`views/_dev.sass`](../../frontend/sass/views/_dev.sass)**: Developer-side styling
- **[`views/_portfolio.sass`](../../frontend/sass/views/_portfolio.sass)**: Portfolio-side styling

### Main Stylesheet

**[`sass/index.sass`](../../frontend/sass/index.sass)**: Samler alle stiler

```sass
@use './colors/colors' as color
@use './utils/mixins' as mix

@forward './views/dev'
@forward './utils/cards'
// ... se index.sass for fullstendig oversikt
```

---

## 🔧 Viktige Konfigurasjoner

### Environment Variables

**Frontend** ([`.env`](../../frontend/.env), [`.env.development`](../../frontend/.env.development)):
```bash
TINA_TOKEN=                    # TinaCMS autentisering
NEXT_PUBLIC_TINA_CLIENT_ID=    # TinaCMS klient ID
TINA_BRANCH=main               # Git branch for innhold
```

**fastAPI** ([`.env`](../../.env)):
```bash
# API keys og secrets
# Database konfigurasjon
# CORS innstillinger
```

### Package Management

**Frontend**:
- **npm**: [`package.json`](../../frontend/package.json), [`package-lock.json`](../../frontend/package-lock.json)

**Backend (FastAPI)**:
- **pip**: [`requirements.txt`](../../fastAPI/requirements.txt)
- **Poetry**: [`pyproject.toml`](../../fastAPI/pyproject.toml)

### Critical Configurations

1. **SPA Mode**: `ssr: false` i [`nuxt.config.ts`](../../frontend/nuxt.config.ts)
2. **CORS**: Backend konfigurert for Netlify-domene
3. **DNS**: NETLIFY-poster for `krigjo25.no`
4. **API Subdomain**: CNAME `home.krigjo25.no` → PythonAnywhere
5. **Build Command**: `tinacms build && npm run generate && netlify deploy`
6. **Fallback**: SPA routing via `netlify.toml` eller `_redirects`

---

## 📚 Dokumentasjon

### Arkitektur Dokumenter

- **[`Jamstack-arkitektur.txt`](../../Jamstack-arkitektur.txt)**: Fullstendig prosjektstruktur
- **[`frontend-arkitektur.txt`](../../frontend/frontend-arkitektur.txt)**: Frontend file tree
- **[`backend-arkitektur.txt`](../../backend/backend-arkitektur.txt)**: Backend file tree
- **[`tree-map-documentation.txt`](../../frontend/tree-map-documentation.txt)**: Detaljert frontend tree

### Model Dokumentasjon

I [`documentations/model/`](../../documentations/model/):

- **[`system-architecture.md`](../../documentations/model/system-architecture.md)**: System oversikt
- **[`frontend.md`](../../documentations/model/frontend.md)**: Frontend detaljer
- **[`apis.md`](../../documentations/model/apis.md)**: API dokumentasjon
- **[`database.md`](../../documentations/model/database.md)**: Database schema
- **[`utils.md`](../../documentations/model/utils.md)**: Utility tools
- **[`endpoints.md`](../../documentations/model/endpoints.md)**: API endpoints

### Change Log

**[`frontend/docs/logs/CHANGELOG.md`](../../frontend/docs/logs/CHANGELOG.md)**: Versjonhistorikk og endringer

---

## 🔍 Teknologi Kategorier

Som definert i [`frontend/utils/techStack.ts`](../../frontend/utils/techStack.ts) og [`frontend/utils/tech-utils.ts`](../../frontend/utils/tech-utils.ts):

### Programming Languages

- **Python**: Flask, Django, Pandas, NumPy, Matplotlib
- **TypeScript**: Vue.ts, Nuxt.ts, React.ts
- **JavaScript**: Vue.js, React.js, Node.js
- **C#/.NET**: ASP.NET, Entity Framework, Blazor
- **Compiled**: C, C++, Go

### Frameworks & Libraries

- **Frontend**: Vue.js, Nuxt.js, React.js
- **Backend**: Flask, Django, FastAPI, ASP.NET
- **Styling**: Sass, CSS, Bootstrap, Tailwind

### Databases

- **Relational**: SQLite, MySQL, MSSQL, PostgreSQL
- **NoSQL**: MongoDB, Redis, Firebase

### DevOps & Tools

- **Version Control**: Git, GitHub, GitLab
- **Workflow**: Agile, Scrum, Docker, Kubernetes
- **CI/CD**: GitHub Actions, Jenkins
- **Deployment**: Netlify, Vercel, PythonAnywhere

### Content Management

- **CMS**: TinaCMS, WordPress, Strapi
- **Markup**: Markdown, HTML, LaTeX

---

## 📊 Prosjektstatistikk

**Directories**: 98  
**Files**: 246+  
**Main Language**: TypeScript (Frontend), Python (Backend)  
**Lines of Code**: Omfattende codebase med modular arkitektur

---

## 📄 Lisens

Se [`LICENSE`](../../LICENSE) for lisensinformasjon.

---

## 👤 Forfatter

**Kristoffer Gjøsund** (krigjo25)

- **Portfolio**: https://krigjo25.no
- **GitHub**: Referert gjennom backend og frontend konfigurasjoner
- **Contact**: Via portfolio eller GitHub

---

**Sist oppdatert**: 2025-01-09  
**Dokument versjon**: 2.0
**Workspace**: webapp-Portfolio-vupy