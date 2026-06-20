# 📋 Project Kanban Board

This Kanban board tracks the status and objectives of the Portfolio Web Application project.

---

## 🗂️ Task Board

| 📥 To Do | ⚙️ In Progress | ✅ Completed |
| :--- | :--- | :--- |
| | **[TASK-01] Create Vue Tests**<br>↳ *Cover store language bytes mapping, useCarousel, useNavigation, fetchCollection, API mocks, and CMS parsing.* | |
| **[TASK-02] Create Sass Tests**<br>↳ *Cover card-base, transitions, circle-border mixins, responsive breakpoints, and theme utilities.* | | |
| **[TASK-03] Update Python Tests**<br>↳ *Verify endpoint outputs, API logic, rate limits, scanner resilience, health checks, schemas, validations, and migrations.* | | |
| **[TASK-04] Resolve Responsive Design Errors**<br>↳ *Fix layout shifts and CSS grid/flex breaks on mobile views.* | | |
| **[TASK-05] Resolve Health Check**<br>↳ *Fix github service checks, Specialist check coverage, and Heavy API monitoring.* | | |
| **[TASK-06] Add Heavy API Integration**<br>↳ *Integrate Heavy API service in frontend and backend endpoints.* | | |

---

## 📝 Issue Details

### 📥 To Do Issues

#### [TASK-01] Create Vue Tests
* **Description**: Create Unit and Integration tests for Vue pages, composables, and Pinia stores.
* **Documentation**: [frontend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/docs/testing.md) | [Vitest Docs](https://vitest.dev/) | [Vite Testing Guide](https://vite.dev/guide/features.html#testing)
* **Subtasks**:
  - [ ] **Composables Testing**: Test `preprosessor-utils.ts` data formatting and mock API calls in `backendAPI-utils.ts` to handle 200, 404, and 500 response codes.
    - [ ] **fetchCollection Composable**: Test mock async fetches, mapper transformations, and query modifier integrations.
    - [ ] **useCarousel Composable**: Test slide rotation intervals, bounds wrapping, and single-item edge cases.
    - [ ] **useNavigation Composable**: Test dynamic SEO title generation, invalid route parameter filtering, and menu order sorting.
  - [ ] **State Management Testing**: Verify Pinia `languageBytesStore.ts` store storage, reactivity, and filtering.
  - [ ] **Component Testing**: Test `portfolio/`, `repository/`, and `navigation/` components for active link states and Loading/Error/Empty states.
  - [ ] **Content & CMS Integration**: Verify TinaCMS data parsing from `content/` before passing to view layer.
  - [ ] **Semantic & SEO Validation**: Use the semantic validator to verify page headers, meta descriptions, semantic layout tags, and unique element IDs.
* **Target Files**: 
  - [languageBytesStore.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/stores/languageBytesStore.ts)
  - [preprosessor-utils.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/composables/preprosessor-utils.ts)
  - [backendAPI-utils.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/composables/backendAPI-utils.ts)
  - [Card.vue (Portfolio)](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/components/portfolio/Card.vue)
  - [Portfolio.vue (Repository)](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/components/repository/Portfolio.vue)
  - [NavMenu.vue (Navigation)](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/components/navigation/NavMenu.vue)
  - [content.config.ts](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/content.config.ts)
* **Status**: In Progress.

#### [TASK-02] Create Sass Tests
* **Description**: Expand testing coverage for SASS mixins (`card-base`, `transitions`, `circle-border`) using `sass-true`.
* **Documentation**: [frontend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/docs/testing.md) | [Sass True Docs](https://www.oddbird.net/true/)
* **Subtasks**:
  - [ ] **Core Mixins**: Cover `card-base`, `transitions`, and `circle-border` mixin styling logic.
  - [ ] **Responsive Breakpoints**: Test responsive design breakpoint functions.
  - [ ] **Theme Utilities**: Verify theme utility functions and color scheme outputs.
  - [ ] **Edge-Case Inputs**: Test that mixins/functions fail or warn correctly under invalid parameters (e.g., mismatched units).
  - [ ] **Accessibility & Color Contrast**: Validate color-math functions for WCAG text contrast ratios.
  - [ ] **Design Token Mapping**: Verify lookup functions throw errors when requested keys are missing from configuration maps.
* **Target Files**:
  - [_utilities.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/utilities/_utilities.sass)
  - [_layout.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/utilities/_layout.sass)
  - [_cards.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/components/_cards.sass)
  - [_navigation.sass](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/frontend/sass/components/_navigation.sass)
* **Status**: To Do.

#### [TASK-03] Update Python Tests
* **Description**: Resolve import order syntax errors in log configs, mock APIs, and write tests for API routing.
* **Documentation**: [backend/docs/testing.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/docs/testing.md) | [backend/README.md#testing](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/README.md#testing) | [Python unittest Docs](https://docs.python.org/3/library/unittest.html) | [Pytest Docs](https://docs.pytest.org/)
* **Subtasks**:
  - [ ] **API Rate Limiting**: Verify wait times, reset parameters, and retries under simulated rate limit conditions.
  - [ ] **Scanner/Specialist Resilience**: Ensure scraper endpoint is resilient to dead external links.
  - [ ] **Health Service Logic**: Check correct reporting of system service failures.
  - [ ] **Heavy Service Integration**: Ensure external workout endpoints match database and model mapping schemas.
  - [ ] **Pydantic Model Validation**: Verify schema validation rules on external mock data inputs.
  - [ ] **Database Migration Integrity**: Test that migration configurations stay synced with models in `lib/models/`.
  - [ ] **LinkedIn & Announcements Services**: Write tests for the unconnected LinkedIn and Announcements services (e.g., API route mocks and scheduler execution logic).
  - [ ] **Database Resilience**: Verify connection recovery and pool retry limits when Postgres temporarily disconnects.
* **Target Files**:
  - [logger_config.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/utils/logger_config.py)
  - [app.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/app.py)
  - [scanner_api.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/scanner/scanner_api.py)
  - [health_check.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/health/health_check.py)
  - [heavy_api.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/heavy/heavy_api.py)
  - [heavy_model.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/models/heavy_model.py)
  - [github_model.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/models/github_model.py)
* **Status**: To Do.

#### [TASK-04] Resolve Responsive Design Errors
* **Description**: Eliminate visual overflow and layout alignment issues in mobile screen viewports.
* **Action Plan**: Correct Flexbox utility mappings and media query breakpoints inside SASS files.
* **Status**: To Do.

#### [TASK-05] Resolve Health Check
* **Description**: Enable full diagnostics for external systems (GitHub Rest API, Specialist scanner links, Heavy API).
* **Required Endpoints / Targets**:
  - **Database Endpoint (`check_database`)**: Verifies connectivity to the Postgres database.
  - **GitHub API Service (`check_github_service`)**: Verifies connectivity to `api.github.com` and validates token validity.
  - **AI Specialist Scanner (`check_scanner`)**: Verifies connectivity and status of the Specialist scanner.
  - **Heavy Workout API**: Verifies connectivity to the external Heavy API endpoint.
  - **System Resource Monitoring**: Monitors CPU and Memory usage thresholds.
  - **Environment Validation**: Validates presence and expiry of critical secrets.
* **Broken / Missing Checks**:
  - ❌ **GitHub API Service (`check_github_service`)**: Currently a placeholder returning `"NOT OK"`.
  - ❌ **AI Specialist Scanner (`check_scanner`)**: Currently only checks the first link from `SPECIALIST_LINKS`. Needs to check all links.
  - ❌ **Heavy Workout API**: No health check implemented yet.
  - ❌ **System Resource Monitoring**: Missing entirely.
  - ❌ **Environment Validation**: Missing entirely.
* **Action Plan**: Merge modified health checks into the main deployment pipelines and resolve the broken/missing checks listed above.
* **Status**: To Do.

#### [TASK-06] Add Heavy API Integration
* **Description**: Fully map and register Heavy Workout API workouts, sessions, sets, and exercise endpoints in the frontend components and backend routes.
* **Status**: To Do.

---

## 🔗 Unconnected Services & Endpoints

The following services or endpoints are present in the `backend/lib/services/` codebase but are **not connected** or registered within the main FastAPI application (`app.py`):

1. **LinkedIn Service Endpoint** (`POST /api/v1/linkedin/share`)
   - *Details*: Outlined in the LinkedIn Automation Service [README.md](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/linkedin/docs/README.md) for sharing blog posts. The service/route modules are currently not implemented or registered.
2. **Announcements Service** (`AnnouncementsService`)
   - *Details*: Implemented in [announcements.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/announcements/announcements.py) to manage holiday and birthday alerts, but lacks any corresponding endpoint or integration in `app.py`.
3. **Heavy API Service** (`HeavyAPI`)
   - *Details*: Defined in [heavy_api.py](file:///home/kristoffer/Documents/Repository/webapp-Portfolio/backend/lib/services/heavy/heavy_api.py) for fetching/mapping workout sessions but has no active routes registered in `app.py`.


