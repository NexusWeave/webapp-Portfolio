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
│   └── tina-lock.json          # Låst TinaCMS-konfigurasjon
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
    ├── ARCHITECTURE.md
    ├── context-diagram.md
    └── logs/
        └── CHANGELOG.md
```