# Repository Directory Tree
The tree below reflects the current repository structure and excludes directories listed in `.gitignore`.

```text
webapp-Portfolio/
├── CHANGELOG.md
├── LICENSE
├── README.md
├── docker-compose.yml
├── package.json
├── docs/
│   ├── architecture.md
│   ├── screen-capture-homepage.pdf
│   └── prototype/
│       ├── index.html
│       ├── sass/
│       │   ├── flexbox/
│       │   ├── flexbox.css
│       │   ├── flexbox.css.map
│       │   ├── flexbox.sass
│       │   ├── fonts.css
│       │   ├── fonts.css.map
│       │   ├── fonts.sass
│       │   ├── grid-container.css
│       │   ├── grid-container.css.map
│       │   ├── grid-container.sass
│       │   ├── index.css
│       │   ├── index.css.map
│       │   └── index.sass
│       └── static/
├── backend/
│   ├── CHANGELOG.md
│   ├── Dockerfile
│   ├── Makefile
│   ├── README.md
│   ├── alembic.ini
│   ├── app.py
│   ├── pyproject.toml
│   ├── requirements.in
│   ├── requirements.txt
│   ├── docs/
│   │   └── architecture.md
│   ├── lib/
│   │   ├── database/
│   │   │   ├── db_engine.py
│   │   │   └── db_providers.py
│   │   ├── models/
│   │   │   ├── announcement_model.py
│   │   │   ├── github_model.py
│   │   │   ├── heavy_model.py
│   │   │   ├── web_config.py
│   │   │   └── database_models/
│   │   ├── services/
│   │   │   ├── announcements/
│   │   │   ├── docs/
│   │   │   ├── github/
│   │   │   ├── heavy/
│   │   │   ├── api_db_bridge.py
│   │   │   ├── db_handler.py
│   │   │   └── scheduler_service.py
│   │   ├── settings/
│   │   │   ├── api_config.py
│   │   │   ├── app_config.py
│   │   │   ├── database_config.py
│   │   │   └── env_config.py
│   │   └── utils/
│   │       ├── exception_handler.py
│   │       ├── logger_config.py
│   │       ├── mathlibrary.py
│   │       └── os_utils.py
│   ├── migration/
│   │   ├── README
│   │   ├── env.py
│   │   └── versions/
│   └── tests/
│       ├── Makefile
│       ├── algorithms.py
│       ├── conftest.py
│       ├── reports/
│       ├── test_integration.py
│       ├── test_performance.py
│       └── test_responses.py
└── frontend/
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
