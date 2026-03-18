# Portfolio Webapp

Portfolio is a web-based biography and project showcase application.

## Architectural Decisions

### Architecture Question

**Why use this tech stack for a portfolio platform instead of a single monolithic app?**

Because the project needs fast page delivery, easy content editing, and a flexible API for dynamic data (for example GitHub and analytics data), while keeping deployment and maintenance simple.

### Tech Stack

| Layer | Technology | Version/Status | Why this choice |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **Nuxt 3** | v3.x | Server-side rendering + static generation for speed, strong DX, and Vue ecosystem compatibility. |
| **Backend API** | **FastAPI** | v0.x (Python) | High performance async API, typed contracts with Pydantic, and fast iteration for integrations. |
| **Database** | **Neon Postgres** | Migration in progress | Serverless PostgreSQL for relational integrity, scalability, and lower infrastructure overhead. |
| **Content Management** | **TinaCMS** | v2.x | Git-based headless CMS so content updates stay versioned and developer-friendly. |
| **Styling** | **Sass/SCSS** | v1.x | Structured styling architecture with reusable design tokens and maintainable style modules. |

### Architectural Justification

- **Performance:** Nuxt enables prerendered/static delivery for low latency and better Core Web Vitals.
- **Separation of concerns:** Frontend handles presentation while FastAPI owns integrations and business logic.
- **Maintainability:** Typed models and clear module boundaries reduce regression risk over time.
- **Scalability:** Neon Postgres and API-first backend design support growth without rewriting core parts.
- **Content workflow:** TinaCMS allows non-code content updates while keeping Git as the source of truth.

### Repository Structure

- [Repository Architecture](./docs/architecture.md)

## Application Diagrams

- [Database ER Diagram](./docs/diagrams/database-erDiagram.md)
- [Utilities Class Diagram](./docs/diagrams/utils-classDiagram.md)
- [External APIs Class Diagram](./docs/diagrams/apis/external-apis-classDiagram.md)
- [Endpoints Class Diagram](./docs/diagrams/endpoints/endpoints-classDiagram.md)
- [Endpoint Sequence Diagram](./docs/diagrams/endpoints/endpoint-sequenceDiagram.md)

## Prototype

- [Prototype Entry](./docs/prototype/index.html)
