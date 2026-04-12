## Prosjektstruktur

Dette treet viser dagens frontend-struktur og utelater mappeinnhold som vanligvis ignoreres (for eksempel `node_modules/`).

```text
frontend/
├── .dockerignore
├── Dockerfile
├── Makefile
├── README.md
├── app.vue
├── content.config.ts
├── eslint.config.mjs
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
├── components/
│   ├── Dates/
│   ├── article/
│   ├── form/
│   ├── layout/
│   ├── media/
│   ├── navigation/
│   ├── portfolio/
│   ├── repository/
│   ├── timeline/
│   └── utils/
├── composables/
│   ├── maps/
│   ├── backendAPI-utils.ts
│   ├── pagination.ts
│   └── preprosessor-utils.ts
├── content/
│   ├── achievements/
│   ├── posts/
│   ├── profiles/
│   └── quotes/
├── docs/
│   ├── architecture.md
│   ├── context-diagram.md
│   └── logs/
├── pages/
│   ├── dev.vue
│   ├── index.vue
│   ├── logs/
│   │   ├── records/
│   │   │   └── [slug].vue
│   │   └── tags/
│   │       └── [slug].vue
│   └── personal.vue
├── public/
│   ├── _redirects
│   ├── admin/
│   ├── favicon.ico
│   ├── media/
│   └── robot.txt
├── sass/
│   ├── colors/
│   ├── flexbox/
│   ├── mappings/
│   ├── media-query/
│   ├── mix/
│   ├── utils/
│   ├── views/
│   └── index.sass
├── server/
│   └── api/
│       └── log-urls.ts
├── stores/
│   └── languageBytesStore.ts
├── tina/
│   ├── __generated__/
│   ├── collections/
│   ├── config.ts
│   └── tina-lock.json
├── types/
│   ├── article.d.ts
│   ├── date.d.ts
│   ├── documents.d.ts
│   ├── media.d.ts
│   ├── navigation.d.ts
│   ├── props.d.ts
│   └── timeline.d.ts
└── utils/
    ├── tech-utils.ts
    ├── techStack.ts
    └── utils.ts
```