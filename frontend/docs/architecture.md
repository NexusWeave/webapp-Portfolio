## Prosjektstruktur

Dette treet viser dagens frontend-struktur og utelater mapper som er ignorert i gitignore.

```text
frontend/
├── Dockerfile
├── Makefile
├── README.md
├── app.vue
├── content.config.ts
├── eslint.config.mjs
├── nuxt.config.ts
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
│   ├── ARCHITECTURE.md
│   ├── context-diagram.md
│   └── logs/
├── pages/
│   ├── Dev.vue
│   ├── Personal.vue
│   ├── index.vue
│   └── artikkel/
├── public/
│   ├── _redirects
│   ├── robot.txt
│   └── media/
├── sass/
│   ├── colors/
│   ├── flexbox/
│   ├── mappings/
│   ├── media-query/
│   ├── utils/
│   ├── views/
│   └── index.sass
├── stores/
│   └── languageBytesStore.ts
├── tina/
│   ├── collections/
│   ├── config.ts
│   └── tina-lock.json
├── types/
│   ├── article.d.ts
│   ├── navigation.d.ts
│   ├── props.d.ts
│   ├── references.d.ts
│   └── timeline.d.ts
└── utils/
    ├── tech-utils.ts
    ├── techStack.ts
    └── utils.ts
```