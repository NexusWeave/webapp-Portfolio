#  Project Kanban Board

This Kanban board tracks the status and objectives of the Portfolio Web Application project.

###  Execution Priority
1. **Test (Priority 1)**: `[TASK-01]`, `[TASK-02]`, `[TASK-03]`, `[TASK-04]`
2. **Features & Presentation (Priority 2)**: `[TASK-08]`
3. **Fixes (Priority 3)**: `[TASK-05]`, `[TASK-06]`
4. **New Integrations (Priority 4)**: `[TASK-07]`
5. **Unconnected Features (Priority 5)**: Unconnected services and endpoints (LinkedIn Sharing, Announcements)

---

## ️ Task Board

|  To Do | ️ In Progress |  Completed |
| :--- | :--- | :--- |
| **[TASK-08] Add Presentation Page & Index Slide**<br>↳ *Create dedicated /presentation page and add interactive presentation slide to index.vue.* | **[TASK-03] Test TinaCMS Configuration & Schema Audit**<br>↳ *Audit TinaCMS collections, fields schema validity, and CLI build checks.* | **[TASK-01] Create Vue Tests**<br>↳ *Cover store language bytes mapping, useCarousel, useNavigation, fetchCollection, API mocks, and CMS parsing.* |
| **[TASK-02] Create Sass Tests**<br>↳ *Cover card-base, transitions, circle-border mixins, responsive breakpoints, and theme utilities.* | | |
| **[TASK-04] Update Python Tests**<br>↳ *Verify endpoint outputs, API logic, rate limits, scanner resilience, health checks, schemas, validations, and migrations.* | | |
| **[TASK-05] Resolve Responsive Design Errors**<br>↳ *Fix layout shifts and CSS grid/flex breaks on mobile views.* | | |
| **[TASK-06] Resolve Health Check**<br>↳ *Fix github service checks, Specialist check coverage, and Heavy API monitoring.* | | |
| **[TASK-07] Add Heavy API Integration**<br>↳ *Integrate Heavy API service in frontend and backend endpoints.* | | |

---

##  Issue Details

###  To Do Issues

#### [TASK-01] Create Vue Tests
* **Documentation**: [frontend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/docs/testing.md) | [Nuxt Testing Docs](https://nuxt.com/docs/getting-started/testing)
* **Subtasks**:
  - [x] **Composables Testing**:
    - [x] `sortbyDate` (preprosessor-utils.ts)
    - [x] `setDateFormat` (preprosessor-utils.ts)
    - [x] `fetchCollection` (preprosessor-utils.ts)
    - [x] `useRotateCollections` (preprosessor-utils.ts)
    - [x] `useNavigation` (preprosessor-utils.ts)
    - [x] `fetchRepositories` (backendAPI-utils.ts)
    - [x] Mock API response status codes (200, 404, 500)
  - [x] **State Management Testing**:
    - [x] Pinia `languageBytesStore.ts` store state storage
    - [x] Pinia store sorting filters and reactivity
  - [x] **Component Testing**:
    - [x] `Card.vue` & `Timeline.vue` & `Filter.vue` (Timeline module integration)
    - [x] `Card.vue` (Portfolio) loading/error/empty states
    - [x] `Portfolio.vue` & `BusinessCard.vue` (Repository) integration
    - [x] `Announcements.vue` & `Progress.vue` (Utils module integration)
    - [x] `NavMenu.vue` (Navigation) active link & router/anchor states
  - [x] **Pages Testing**:
    - [x] `index.vue`, `dev.vue`, `personal.vue`, `security-policy.vue` integration
    - [x] `records/[slug].vue` & `tags/[slug].vue` integration
  - [x] **Content & CMS Integration**:
    - [x] TinaCMS content parser schema integrity (Zod schema tests in cms-schema.spec.ts)
  - [x] **Semantic & SEO Validation**:
    - [x] SEO tags (title, description, ogImage)
    - [x] Semantic HTML landmark tags (main, header, footer)
    - [x] Unique element IDs check (Tested in unique-ids.spec.ts)
* **Target Files**: 
  - [languageBytesStore.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/stores/languageBytesStore.ts)
  - [preprosessor-utils.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/composables/preprosessor-utils.ts)
  - [backendAPI-utils.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/composables/backendAPI-utils.ts)
  - [Card.vue (Portfolio)](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/components/portfolio/Card.vue)
  - [Portfolio.vue (Repository)](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/components/repository/Portfolio.vue)
  - [NavMenu.vue (Navigation)](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/components/navigation/NavMenu.vue)
  - [content.config.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/content.config.ts)
* **Priority**: 1 (Test)
* **Status**: Completed.
 
#### [TASK-02] Create Sass Tests
* **Description**: Expand testing coverage for SASS mixins (`card-base`, `transitions`, `circle-border`) using `sass-true`.
* **Documentation**: [frontend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/docs/testing.md) | [Sass True Docs](https://www.oddbird.net/true/)
* **Subtasks**:
  - [ ] **Core Mixins** (sass/utilities/structure.sass):
    - [ ] `card-shadow-box`
    - [ ] `card-base`
    - [ ] `transitions`
    - [ ] `circle-border`
    - [ ] `radius`
    - [ ] `border`
    - [ ] `shadow`
  - [ ] **Responsive Breakpoints** (sass/utilities/layout.sass):
    - [ ] `absolute-inset`
    - [ ] `logical-center`
    - [ ] `logical-size`
    - [ ] `margin`
    - [ ] `padding`
  - [ ] **Theme Utilities** (sass/utilities/button-helpers.sass & generators.sass):
    - [ ] `button-neumorphism`
    - [ ] `primary-button-neumorphism`
    - [ ] `colored-button-neumorphism`
    - [ ] `tag-generator`
    - [ ] `tech-generator`
    - [ ] `article-theme-generator`
  - [ ] **Edge-Case Inputs**:
    - [ ] Verify validation errors/warnings on incorrect units
  - [ ] **Accessibility & Color Contrast**:
    - [ ] Validate dynamic text-color selector math contrast ratio
  - [ ] **Design Token Mapping**:
    - [ ] Validate lookup helper functions for missing keys
* **Target Files**:
  - [_utilities.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/utilities/_utilities.sass)
  - [_layout.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/utilities/_layout.sass)
  - [_cards.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/components/_cards.sass)
  - [_navigation.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/components/_navigation.sass)
* **Priority**: 1 (Test)
* **Status**: To Do.

#### [TASK-03] Test TinaCMS Configuration & Schema Audit
* **Description**: Create automated tests and audit configurations to verify the integrity of the TinaCMS collection schema and custom fields.
* **Documentation**: [frontend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/docs/testing.md) | [TinaCMS CLI Reference](https://tina.io/docs/tina-cloud/cli/)
* **Subtasks**:
  - [ ] **Schema Integrity Audit**:
    Run `tinacms schema audit` via CLI build checks to confirm configuration validity
    - [ ] Verify `collections.ts` schema exports valid schema shapes for all content collections
  - [ ] **Custom Fields Validation**:
    - [ ] Write unit tests for custom schema field helpers in `tina/utils/fields.tsx` and `utilsFields.ts`
* **Target Files**:
  - [config.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/tina/config.ts)
  - [collections.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/tina/collections/collections.ts)
  - [fields.tsx](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/tina/utils/fields.tsx)
  - [utilsFields.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/tina/utils/utilsFields.ts)
* **Priority**: 1 (Test)
* **Status**: To Do.
 
#### [TASK-04] Update Python Tests
* **Description**: Resolve import order syntax errors in log configs, mock APIs, and write tests for API routing.
* **Documentation**: [backend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/docs/testing.md) | [backend/README.md#testing](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/README.md#testing) | [Python unittest Docs](https://docs.python.org/3/library/unittest.html) | [Pytest Docs](https://docs.pytest.org/)
* **Subtasks**:
  - [ ] **API Rate Limiting**:
    - [ ] `GithubAPI.fetch_data` retries and reset parameters
  - [ ] **Scanner/Specialist Resilience**:
    - [ ] `Scanner.check_status` and `scrape_information` dead links resilience
  - [ ] **Health Service Logic** (backend/lib/services/health/health_check.py):
    - [ ] `check_database` connection check
    - [ ] `check_github_service` status check
    - [ ] `check_scanner` links list status
  - [ ] **Heavy Service Integration**:
    - [ ] `HeavyWorkoutModel` mapping validation
  - [ ] **Pydantic Model Validation**:
    - [ ] `RepositoryModel` validation boundary rules
  - [ ] **Database Migration Integrity**:
    - [ ] Inspect tables constraint checks (`repositories`, `languages`, `language_assosiations`)
  - [ ] **LinkedIn & Announcements Services**:
    - [ ] `linkedin_service.py` route handler checks
    - [ ] `announcements.py` holiday scheduler execution logic
  - [ ] **Database Resilience**:
    - [ ] Verify connection recovery and pool retry limits when Postgres temporarily disconnects.
* **Target Files**:
  - [logger_config.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/utils/logger_config.py)
  - [app.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/app.py)
  - [scanner_api.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/scanner/scanner_api.py)
  - [health_check.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/health/health_check.py)
  - [heavy_api.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/heavy/heavy_api.py)
  - [heavy_model.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/models/heavy_model.py)
  - [github_model.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/models/github_model.py)
* **Priority**: 1 (Test)
* **Status**: To Do.

#### [TASK-05] Resolve Responsive Design Errors
* **Description**: Eliminate visual overflow and layout alignment issues in mobile screen viewports.
* **Action Plan**: Correct Flexbox utility mappings and media query breakpoints inside SASS files.
* **Priority**: 2 (Fixes)
* **Status**: To Do.

#### [TASK-06] Resolve Health Check
* **Description**: Enable full diagnostics for external systems (GitHub Rest API, Specialist scanner links, Heavy API).
* **Subtasks**:
  - [ ] **Core Diagnostics**:
    - [ ] `check_database`: Verify connection to Postgres database
    - [ ] `check_github_service`: Replace `"NOT OK"` placeholder and verify token/api.github.com connection
    - [ ] `check_scanner`: Check all links in `SPECIALIST_LINKS` (instead of only the first link)
  - [ ] **Missing Monitors**:
    - [ ] Heavy Workout API: Implement connectivity checks to the external Heavy API endpoint
    - [ ] System Resource Monitoring: Implement CPU and Memory usage threshold checks
    - [ ] Environment Validation: Validate presence and expiry of critical environment secrets
* **Priority**: 2 (Fixes)
* **Status**: To Do.
  
#### [TASK-07] Add Heavy API Integration
* **Description**: Fully map and register Heavy Workout API workouts, sessions, sets, and exercise endpoints in the frontend components and backend routes.
* **Subtasks**:
  - [ ] **Data Model & Backend Routing**:
    - [ ] Register workout, session, set, and exercise endpoints in FastAPI `app.py`
    - [ ] Map incoming external API payloads to `HeavyWorkoutModel` schema
  - [ ] **Database Schema & Migrations**:
    - [ ] Create database schema `HeavyModel.py` for workouts, exercises, and sets
    - [ ] Generate and execute Alembic database migration to create the tables
  - [ ] **Frontend Components**:
    - [ ] Fetch and display workout data in portfolio/repository views
    - [ ] Implement loading, error, and empty states for workouts dashboard
* **Priority**: 4 (New Integrations)
* **Status**: To Do.

#### [TASK-08] Add Presentation Page & Index Slide
* **Description**: Build a dedicated presentation page (`pages/presentation.vue`) for the Vue 3 / Nuxt 3 (TypeScript) slide deck, and integrate a showcase slide on the main `pages/index.vue` page.
* **Subtasks**:
  - [ ] **Presentation Page (`pages/presentation.vue`)**:
    - [ ] Create full-screen interactive slide viewer component using Markdown / MDC parsing
    - [ ] Support keyboard navigation (Arrow left/right, Space) and touch swipe
  - [ ] **Index Page Slide Showcase**:
    - [ ] Add a presentation preview slide / carousel item on `pages/index.vue`
    - [ ] Link directly from index showcase slide to `/presentation`
  - [ ] **Navigation Menu Integration**:
    - [ ] Add `Presentation` link item to `NavMenu.vue` router data items
* **Priority**: 2 (Features & Presentation - Execution right after testing phase)
* **Status**: To Do.

---

##  Unconnected Services & Endpoints

The following services or endpoints are present in the `backend/lib/services/` codebase but are **not connected** or registered within the main FastAPI application (`app.py`).

* **Priority**: 4 (New Features)
* **Integration Tasks**:
  - [ ] **LinkedIn Sharing Service**:
    - [ ] Register `POST /api/v1/linkedin/share` endpoint in `app.py`
    - [ ] Wire route to `linkedin_service.py`
  - [ ] **Announcements Service**:
    - [ ] Register `AnnouncementsService` holiday and birthday alert tasks on FastAPI startup
  - [ ] **Heavy API Service**:
    - [ ] Wire `HeavyAPI` workout session fetchers to routes in `app.py` (tied to TASK-07)
