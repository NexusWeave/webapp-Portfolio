# Portfolio Webapp
Portfolio is a webased biography project

## Architectural Decisions

### Architecture Question

### Techstack
| Layer | Technology | Version/Status | |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **Nuxt 3** | v3.x | Progressive JavaScript framework with Composition API & TypeScript |
| **Backend API** | **FastAPI / Pylance** | v0.x (Python) | High-performance async API framework |	
| **Database** | **Neon Postgres** | Migrering pågår | Serverless PostgreSQL-database for skalerbar lagring og relasjonsdata. |
| **Content Management** | **TinaCMS** | v2.x | Git-based headless CMS med visuell redigering |
| **Styling** | **Sass/SCSS** | v1.x | CSS preprocessor med omfattende design system |


### Architectural Justification
#### Unified Language Strategy (Python)
Python was chosen for both backend and frontend-related logic to keep development simple and
consistent.

**Same language everywhere**
Using one language means less confusion, faster teamwork, and easier onboarding for new
developers.

**One shared data model**
The same municipality and geodata models can be used across the app, which reduces errors and
keeps behavior predictable.

**Less glue code**
When everything is in Python, we avoid extra conversion layers between different languages.
That saves time and reduces bugs.

#### FastAPI as Backend Core
FastAPI is used because it is fast, clear, and easy to maintain. For PuraSecurus, this gives:
- A clear API boundary for map and municipality endpoints
- Stable validation and error handling for external geodata
- Built-in API documentation and easier testing

### Data Integerty with Pydantic
Since PuraSecurus relies on critical geographic data from `Kartverket API`, Pydantic is used
as a strict validation layer before data reaches the UI.

**Why this matters**
- Invalid or incomplete data is stopped early
- Clean, consistent schemas make map rendering stable
- Shared models reduce crashes and unexpected UI behavior

This turns uncertain external data into trusted internal data that can be used safely across
the app.

### Integrated Content Management (CMS)
The architecture handles complex maps while keeping the site fast and secure. Heavy map data
processing runs on the server, where credentials and integration keys stay protected.

All text and images are versioned in GitHub, which gives:
- Full traceability for content and configuration changes
- Simple rollback when regressions are detected
- A lightweight editorial workflow without a dedicated content database in early phases

This gives a practical path: start simple now, then move to a headless CMS later if content
needs become larger.

### Performance and Security Posture
- **Server-side geoprocessing (Pandas/GeoPandas):** keeps heavy computation off user devices
	and gives more consistent results across browsers.
- **Thin client map rendering (Pydeck):** keeps the browser focused on drawing the map quickly.
- **Controlled data exposure:** only required fields are returned to clients, reducing attack
	surface and payload size.
- **Strong validation + typed routes:** makes issues easier to trace and fix.

### Repository Structure
	-	[Repository Architecture](./docs/architecture.md)

## Application Diagrams
