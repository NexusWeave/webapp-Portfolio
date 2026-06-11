# Frontend Testing Strategy

Current test coverage is focused on Sass mixins. The following areas are high-priority for upcoming test implementation.

## Priority Test Targets

### 1. Composables
- **`preprosessor-utils.ts`**: Test the logic that formats and cleans data fetched from the backend.
- **`backendAPI-utils.ts`**: Mock API calls to ensure the frontend handles various response types (200, 404, 500) correctly.

### 2. State Management (Pinia)
- **`languageBytesStore.ts`**: Verify that language data is correctly stored, filtered, and remains reactive across components.

### 3. Components (Vitest/Nuxt Test Utils)
- **`portfolio/` & `repository/`**: Ensure components handle "Loading", "Error", and "Empty Data" states gracefully.
- **`navigation/`**: Test dynamic link generation and active state logic.

### 4. Content & CMS
- **TinaCMS Integration**: Verify that data from `content/` is correctly parsed before being passed to the view layer.

### 5. Styles
- **Sass Mixins**: Continue expanding coverage for responsive breakpoints and theme utility functions.
