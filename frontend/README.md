# Frontend — Portfolio Web Application
The frontend provides a fast, accessible, and content-driven interface. It displays professional work, achievements, and blog posts clearly. The CMS integration lets you manage content easily, so you can publish updates without needing deep technical knowledge.

## Tech Stack
| Technology | Role | Value |
| ---        | ---  | ---   |
| [Nuxt 4](https://nuxt.com) | Full-stack Vue framework (SSR / SSG, routing, composables) | Server-side rendering and static generation improve search visibility and load times. Nuxt's file-based routing and component model help you build features faster. |
| [TinaCMS](https://tina.io) | Git-backed headless CMS with visual editing | TinaCMS provides a visual editor linked to Git. This allows you to update content without asking a developer for help. |
| [TypeScript](https://www.typescriptlang.org) | Static typing across all components, composables, and utilities | Using TypeScript everywhere reduces runtime errors and makes the code easier to maintain over time. |
| [SASS](https://sass-lang.com) | Structured, maintainable styling | Variables, mixins, and modular partials prevent duplicated CSS. This makes changing the design faster and less error-prone. |

## Available Commands

| Command | Description | Source |
|---|---|---|
| `npm run dev` | Start development server (TinaCMS + Nuxt) | `package.json` |
| `npm run build` | Build for production | `package.json` |
| `npm run generate` | Generate static site | `package.json` |
| `npm run serve` | Build and preview production build | `package.json` |
| `npm run deploy` | Build and deploy to Netlify | `package.json` |
| `npm run clean` | Clean up build artifacts and cache | `package.json` |
| `npm run test` | Run all frontend tests (Vitest + SASS) | `package.json` |

## Testing
The frontend uses a dual testing strategy to verify both logic and presentation.

### Component and Logic Testing (Vitest)
Unit and integration tests check Vue components, Pinia stores, and TypeScript composables.
```bash
npm run test:nuxt
```

### SASS Validation Suite
Specialized tools ensure style integrity and catch compiler deprecations.
- **Spec Tests**: `sass-true` driven tests for mixins.
- **Syntax Check**: Standalone validation of all `.sass` files.
- **Dependency Warnings**: Monitors for modern SASS deprecations.

Run SASS tests:
```bash
npm run test:sass
```

#### SASS Test Output Example:
```text
Checking for SASS dependency warnings...
⚠️  SASS Compilation Error: Can't find stylesheet to import.
💡 This error is likely due to missing context during standalone compilation of a partial.
✅ PASS: No dependency warnings detected (ignoring build errors for warning check).

Checking 22 Sass files for syntax and namespace validity...
✅ sass/pages/_dev.sass
⚠️ sass/assets/_images.sass (Partial: Undefined mixin.)
...
All Sass files passed syntax and namespace validation.
```

## Documentation
| Resource | Path |
|---|---|
| Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Context diagram | [docs/context-diagram.md](docs/context-diagram.md) |
| Changelog | [docs/logs/CHANGELOG.md](docs/logs/CHANGELOG.md) |
| Testing Strategy | [tests/recommended-tests.md](tests/recommended-tests.md) |

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for hosting options.
