# Frontend — Portfolio Web Application
The frontend delivers a fast, accessible, and content-driven portfolio experience. It is built to present professional work, achievements, and blog posts with minimal friction for both visitors and content editors. The CMS integration means non-technical stakeholders can manage content independently, reducing maintenance overhead and time-to-publish.

## Tech Stack
| Technology | Role | Value |
| ---        | ---  | ---   |
| [Nuxt 4](https://nuxt.com) | Full-stack Vue framework (SSR / SSG, routing, composables) | Server-side rendering and static generation improve search visibility and load times. Nuxt's file-based routing and component model accelerate feature delivery. |
| [TinaCMS](https://tina.io) | Git-backed headless CMS with visual editing | TinaCMS provides a Git-backed visual editor, enabling content updates without developer involvement. |
| [TypeScript](https://www.typescriptlang.org) | Static typing across all components, composables, and utilities | TypeScript across the entire frontend reduces runtime errors and lowers long-term maintenance cost. |
| [SASS](https://sass-lang.com) | Structured, maintainable styling | Variables, mixins, and modular partials eliminate duplicated CSS, making visual changes faster and less error-prone across the entire app. |

## Documentation
| Resource | Path |
|---|---|
| Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Context diagram | [docs/context-diagram.md](docs/context-diagram.md) |
| Changelog | [docs/logs/CHANGELOG.md](docs/logs/CHANGELOG.md) |

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Serve the production build locally:

```bash
npm run serve
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for hosting options.
