# 🎨 Frontend Architecture

> **Framework:** Nuxt 3 / Vue 3  
> **Language:** TypeScript  
> **Styling:** SASS/SCSS  
> **CMS:** TinaCMS  
> **Sist oppdatert:** 1. desember 2025

---

## 📋 Innholdsfortegnelse

1. [Oversikt](#-oversikt)
2. [Prosjektstruktur](#-prosjektstruktur)
3. [Komponenter](#-komponenter)
4. [Sider (Routes)](#-sider-routes)
5. [Innholdsadministrasjon](#-innholdsadministrasjon)
6. [Styling Arkitektur](#-styling-arkitektur)
7. [Type System](#-type-system)
8. [Utilities](#-utilities)

---

## 🎯 Oversikt

Frontend-applikasjonen er bygget med **Nuxt 3** og følger moderne Vue 3-arkitektur med:

- ✅ **Static Site Generation (SSG)** for optimal ytelse
- ✅ **TypeScript** for type-sikkerhet
- ✅ **Composables** for gjenbrukbar logikk
- ✅ **TinaCMS** for visuell innholdsredigering
- ✅ **SASS** for modulær styling
- ✅ **Responsive design** med enhetsbaserte breakpoints

---

## 📁 Prosjektstruktur

```
frontend/
├── 📄 app.vue                  # Root-komponent
├── 📄 nuxt.config.ts           # Nuxt-konfigurasjon
├── 📄 content.config.ts        # Content-konfigurasjon
├── 📄 tsconfig.json            # TypeScript-konfigurasjon
├── 📄 eslint.config.mjs        # ESLint-regler
├── 📄 package.json             # Dependencies
│
├── 📁 assets/                  # Statiske assets
│   └── index.css
│
├── 📁 components/              # Vue-komponenter
│   ├── article/                # Artikkelstruktur
│   ├── Date/                   # Dato-komponenter
│   ├── form/                   # Skjemakomponenter
│   ├── media/                  # Media-håndtering
│   ├── navigation/             # Navigasjon
│   ├── portfolio/              # Portfolio-visninger
│   ├── repository/             # Repository-kort
│   ├── timeline/               # Tidslinje
│   └── utils/                  # Utility-komponenter
│
├── 📁 composables/             # Vue Composables
│   ├── backendAPI-utils.ts     # API-kommunikasjon
│   └── preprosessor-utils.ts   # Data-prosessering
│
├── 📁 content/                 # Markdown-innhold
│   ├── achievements/           # Prestasjoner
│   ├── posts/                  # Blogginnlegg
│   ├── profiles/               # Profiler
│   ├── quotes/                 # Sitater
│   └── portfolio/              # Portfolio-data
│
├── 📁 pages/                   # Rute-sider
│   ├── index.vue               # Hovedside
│   ├── dev.vue                 # Developer portfolio
│   ├── personal.vue            # Personlig profil
│   └── aktuelt.vue             # Nyheter
│
├── 📁 public/                  # Offentlige filer
│   ├── admin/                  # TinaCMS admin
│   ├── media/                  # Bilder og dokumenter
│   └── robots.txt
│
├── 📁 sass/                    # SASS styling
│   ├── colors/                 # Fargepaletter
│   ├── flexbox/                # Layout utilities
│   ├── mappings/               # Ikoner og breakpoints
│   ├── media-query/            # Responsive design
│   ├── utils/                  # Komponentstiler
│   └── views/                  # Sidebaserte stiler
│
├── 📁 tina/                    # TinaCMS konfigurasjon
│   ├── collections/            # Content collections
│   ├── config.ts               # TinaCMS config
│   └── __generated__/          # Auto-genererte typer
│
├── 📁 types/                   # TypeScript definisjoner
│   ├── timeline.d.ts           # Tidslinjetyper
│   ├── props.d.ts              # Komponent props
│   └── references.d.ts         # Referansetyper
│
├── 📁 utils/                   # Hjelpefunksjoner
│   ├── techStack.ts            # Tech stack data
│   ├── tech-utils.ts           # Tech utilities
│   ├── tagStack.ts             # Tag-håndtering
│   └── utils.ts                # Generelle utilities
│
└── 📁 docs/                    # Dokumentasjon
    └── logs/
        └── CHANGELOG.md
```

---

## 🧩 Komponenter

### Article Components (`/components/article/`)

Strukturelle komponenter for artikkeloppbygning:

```typescript
article/
├── Article.vue     // Hovedcontainer
├── Header.vue      // Artikkel-header
├── Main.vue        // Hovedinnhold
└── Footer.vue      // Artikkel-footer
```

**Bruk:**
```vue
<Article>
  <ArticleHeader :title="title" :date="date" />
  <ArticleMain>
    <!-- Innhold -->
  </ArticleMain>
  <ArticleFooter />
</Article>
```

---

### Date Components (`/components/Date/`)

```typescript
Date/
├── Date.vue        // Fullstendig datovisning
└── Year.vue        // Kun årvisning
```

**Eksempel:**
```vue
<Date :date="{ year: 2025, month: 12, day: 1 }" />
<Year :year="2025" />
```

---

### Form Components (`/components/form/`)

```typescript
form/
├── Form.vue        // Skjema-container
└── inputs.vue      // Input-komponenter
```

---

### Media Components (`/components/media/`)

Håndtering av bilder, ikoner og media:

```typescript
media/
├── Figure.vue      // Bilde med caption
├── Icon.vue        // Ikon-komponent
└── Media.vue       // Generisk media
```

**Tech Icons:**
```vue
<Icon :tech="'Python'" :size="'large'" />
<Icon :tech="'TypeScript'" />
```

---

### Navigation Components (`/components/navigation/`)

```typescript
navigation/
├── Anchor.vue      // Link-komponent
├── Button.vue      // Knapp-komponent
└── NavMenu.vue     // Navigasjonsmeny
```

---

### Portfolio Components (`/components/portfolio/`)

```typescript
portfolio/
└── Card.vue        // Portfolio-kort
```

**Props:**
```typescript
interface PortfolioCard {
  title: string;
  description: string;
  techStack: TechStack[];
  image?: string;
  link?: string;
}
```

---

### Repository Components (`/components/repository/`)

```typescript
repository/
├── BusinessCard.vue    // Kompakt visning
└── Portfolio.vue       // Full portfolio-visning
```

---

### Timeline Components (`/components/timeline/`)

```typescript
timeline/
├── Card.vue        // Tidslinje-kort
├── Filter.vue      // Filtreringskomponent
└── Timeline.vue    // Hovedtidslinje
```

**TimelineItem Interface:**
```typescript
interface TimelineItem {
  id: number;
  title?: string;
  description?: string;
  date: DateObject;
  techStack?: TechStack[];
  organization: ReferencePoint;
  location: ReferencePoint;
  reference: ReferencePoint;
  isVisible: boolean;
}
```

---

### Utility Components (`/components/utils/`)

```typescript
utils/
├── Announcements.vue   // Kunngjøringer
├── Footer.vue          // Sidefot
├── Header.vue          // Sidetop
├── List.vue            // Liste-visning
├── Pagination.vue      // Paginering
├── Progress.vue        // Progresbar
└── Tags.vue            // Tag-visning
```

---

## 📄 Sider (Routes)

### `index.vue` - Hovedside

Landingsside med oversikt over portfolio.

```vue
<template>
  <div class="home-page">
    <Header />
    <Main>
      <!-- Portfolio highlights -->
      <PortfolioCard v-for="item in portfolio" :key="item.id" :item="item" />
    </Main>
    <Footer />
  </div>
</template>
```

---

### `dev.vue` - Developer Portfolio

Teknisk portfolio med fokus på utviklingsprosjekter.

**Innhold:**
- GitHub repositories
- Teknisk kompetanse
- Prosjekter og prestasjoner
- Tidslinje

---

### `personal.vue` - Personlig Profil

Personlig informasjon og CV.

**Innhold:**
- Biografi
- Utdanning
- Arbeidserfaring
- Referanser

---

### `aktuelt.vue` - Nyheter

Blogginnlegg og oppdateringer.

**Innhold:**
- Nyeste innlegg
- Kategorier
- Arkiv

---

## 📝 Innholdsadministrasjon

### TinaCMS Collections (`/tina/collections/`)

#### Academic Collection (`academic.ts`)

```typescript
{
  name: 'academic',
  label: 'Academic Achievements',
  path: 'content/achievements/academic',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'institution', type: 'string' },
    { name: 'date', type: 'datetime' },
    { name: 'description', type: 'rich-text' }
  ]
}
```

#### Blog Collection (`blog.ts`)

```typescript
{
  name: 'posts',
  label: 'Blog Posts',
  path: 'content/posts/dev',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'date', type: 'datetime' },
    { name: 'category', type: 'string' },
    { name: 'body', type: 'rich-text' }
  ]
}
```

#### Profiles Collection (`profiles.ts`)

```typescript
{
  name: 'profiles',
  label: 'Profiles',
  path: 'content/profiles/dev',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'bio', type: 'rich-text' },
    { name: 'skills', type: 'object', list: true }
  ]
}
```

#### References Collection (`reference.ts`)

```typescript
{
  name: 'references',
  label: 'Reference Quotes',
  path: 'content/quotes/references',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'position', type: 'string' },
    { name: 'company', type: 'string' },
    { name: 'quote', type: 'string' }
  ]
}
```

---

## 🎨 Styling Arkitektur

### SASS Struktur

```
sass/
├── index.sass              # Main entry point
│
├── colors/                 # Fargepaletter
│   ├── _colors.sass        # Grunnfarger
│   ├── _palette.sass       # Fargepaletter
│   ├── _tech-color.sass    # Tech-spesifikke farger
│   ├── _social-colors.sass # Sosiale medier-farger
│   └── _misc.sass          # Diverse farger
│
├── flexbox/                # Flexbox utilities
│   ├── _flexbox-row.sass
│   ├── _flexbox-column.sass
│   ├── _flexbox-reversed-row.sass
│   ├── _flexbox-wrap-row.sass
│   └── row-align-justify-mix/
│       └── _flexbox-wrap-row-align-justify.sass
│
├── mappings/               # Mappings og configs
│   ├── _devices-breakpoints.sass  # Responsive breakpoints
│   ├── _flexbox.sass              # Flexbox mappings
│   ├── _icons.sass                # Ikon mappings
│   └── _tech-icons.sass           # Tech ikon mappings
│
├── media-query/            # Responsive design
│   ├── _media-queries.sass
│   └── devices/            # Device-spesifikke queries
│       ├── _apple-media-query.sass
│       ├── _samsung-media-query.sass
│       ├── _google-media-query.sass
│       ├── _microsoft-media-query.sass
│       ├── _amazon-media-query.sass
│       ├── _blackberry-media-query.sass
│       ├── _htc-media-query.sass
│       ├── _motorola-media-query.sass
│       ├── _sharp-media-query.sass
│       ├── _sony-media-query.sass
│       ├── _display-media-query.sass
│       └── _breakpoints.sass
│
├── utils/                  # Komponentstiler
│   ├── _article.sass
│   ├── _buttons.sass
│   ├── _cards.sass
│   ├── _components.sass
│   ├── _flexbox.sass
│   ├── _grid-container.sass
│   ├── _icons.sass
│   ├── _mixins.sass
│   ├── _navigation.sass
│   ├── _tech-content.sass
│   └── _timeline.sass
│
└── views/                  # Sidebaserte stiler
    ├── _dev.sass
    └── _portfolio.sass
```

### Fargesystem

#### Tech Colors (`_tech-color.sass`)

```sass
$tech-colors: (
  'Python': #3776AB,
  'TypeScript': #3178C6,
  'JavaScript': #F7DF1E,
  'Vue': #42B883,
  'Nuxt': #00DC82,
  'SASS': #CC6699,
  // ... flere
)
```

#### Responsive Breakpoints (`_devices-breakpoints.sass`)

```sass
$breakpoints: (
  'mobile-s': 320px,
  'mobile-m': 375px,
  'mobile-l': 425px,
  'tablet': 768px,
  'laptop': 1024px,
  'laptop-l': 1440px,
  'desktop': 2560px
)
```

---

## 🔤 Type System

### Timeline Types (`types/timeline.d.ts`)

```typescript
interface DateObject {
  year: number;
  month?: number;
  day?: number;
}

interface ReferencePoint {
  name: string;
  url?: string;
  description?: string;
}

interface TechStack {
  type: string;
  label: string;
}

interface TimelineItem {
  id: number;
  title?: string;
  description?: string;
  date: DateObject;
  techStack?: TechStack[];
  organization: ReferencePoint;
  location: ReferencePoint;
  reference: ReferencePoint;
  isVisible: boolean;
}
```

### Component Props (`types/props.d.ts`)

```typescript
interface ComponentProps {
  // Props definisjoner
}
```

### References (`types/references.d.ts`)

```typescript
interface Reference {
  name: string;
  position: string;
  company: string;
  quote: string;
  date?: DateObject;
}
```

---

## 🛠️ Utilities

### Tech Stack (`utils/techStack.ts`)

```typescript
export const techStackCategories = {
  compiled: ['C', 'C++', 'C#', 'Go'],
  interpreted: ['Python', 'JavaScript', 'TypeScript'],
  frameworks: ['Vue', 'Nuxt', 'React', 'Flask', 'FastAPI'],
  databases: ['SQLite', 'MySQL', 'PostgreSQL'],
  tools: ['Git', 'SASS', 'TinaCMS']
};
```

### Tech Utils (`utils/tech-utils.ts`)

```typescript
export function getTechColor(tech: string): string;
export function getTechIcon(tech: string): string;
export function filterByTech(items: any[], tech: string): any[];
```

### Tag Stack (`utils/tagStack.ts`)

```typescript
export function createTags(items: any[]): string[];
export function filterByTag(items: any[], tag: string): any[];
```

### General Utils (`utils/utils.ts`)

```typescript
export function formatDate(date: DateObject): string;
export function sortByDate(items: any[]): any[];
export function paginate(items: any[], page: number, perPage: number): any[];
```

---

## 📦 Composables

### Backend API Utils (`composables/backendAPI-utils.ts`)

```typescript
export function useBackendAPI() {
  const fetchGithubData = async () => { /* ... */ };
  const fetchAnnouncements = async () => { /* ... */ };
  const fetchPhotos = async () => { /* ... */ };
  
  return {
    fetchGithubData,
    fetchAnnouncements,
    fetchPhotos
  };
}
```

### Preprocessor Utils (`composables/preprosessor-utils.ts`)

```typescript
export function usePreprocessor() {
  const processContent = (content: any) => { /* ... */ };
  const formatData = (data: any) => { /* ... */ };
  
  return {
    processContent,
    formatData
  };
}
```

---

## 🚀 Build & Deploy

### Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run serve

# Deploy to Netlify
npm run deploy
```

### Nuxt Config (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  ssr: false,  // SPA mode
  app: {
    head: {
      title: 'Portfolio - krigjo25.no',
      meta: [/* ... */]
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ]
});
```

---

## 📊 File Statistics

```
Directories: 54
Files: 151
```

**Breakdown:**
- Vue Components: ~40 files
- SASS Files: ~50 files
- TypeScript Files: ~20 files
- Markdown Content: ~30 files
- Configuration Files: ~10 files

---

**Relaterte dokumenter:**
- [Hovedarkitektur](../ARCHITECTURE.md)
- [Backend Arkitektur](../fastAPI/BACKEND-ARCHITECTURE.md)
- [Tech Stack](../documentations/documents/techstack.md)
