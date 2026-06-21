# Testing Guide: `preprosessor-utils.ts`

This guide outlines how to approach testing the utilities and composables in `frontend/composables/preprosessor-utils.ts` using Vitest.

## 1. Core Building Blocks (Vitest)

Before writing your tests, understand these three fundamental functions:

- **`describe(name, fn)`**: Groups related tests together.
- **`it(name, fn)`** (or **`test`**): Defines an individual test case.
- **`expect(value)`**: Used to create assertions.

### Example (Unrelated to task)
```typescript
import { describe, it, expect } from 'vitest';

// Imagine testing this: export const add = (a, b) => a + b;

describe('Math Utilities', () => {
  it('should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5); // .toBe() is a matcher
  });
});
```

## 2. Setup & Environment

Since this file is part of a Nuxt application, ensure your `vitest.config.ts` is configured for Nuxt (using `@nuxt/test-utils` or similar).

- **Commands:**
  - Run all tests: `npm test` or `npx vitest`
  - Run specific test file: `npx vitest run frontend/tests/composables/preprosessor-utils.spec.ts`

## 3. Testing Pure Functions

These functions do not rely on Vue or Nuxt internals.

### `sortbyDate<T>`
- **Test Strategy:** Create arrays of objects with `created` properties in various orders (ascending, descending, mixed).
- **Assertions:**
  - Test default behavior (descending).
  - Test explicit `ascending` sort.
  - Test edge cases: empty array, objects missing `created` property.
- **Methods:** `expect(sortbyDate(data, 'ascending')).toEqual(...)`

### `setDateFormat(data: DateItem)`
- **Test Strategy:** Pass objects with various `date`/`updated` strings.
- **Assertions:**
  - Verify formatting (using `Intl.DateTimeFormat` with locale `nb-NO`).
  - Verify null/undefined handling.
  - Assert the structure of the returned `DateItem`.

## 4. Testing Composables

These require mocking Vue/Nuxt features.

### `useCarousel`
- **Test Strategy:** This uses `ref` and `setInterval`.
- **Methods:**
  - Use `vi.useFakeTimers()` to control `setInterval`.
  - Assert initial `index` value.
  - Trigger `start()`, advance time (`vi.advanceTimersByTime(interval)`), and assert `index` has updated correctly.
  - Assert `clearInterval` is called on unmount (you may need to trigger `onUnmounted` hook).

### `useNavigation`
- **Test Strategy:** Complex due to dependency on `useRoute`, `useRouter`, `watch`, and `useSeoMeta`.
- **Methods:**
  - **Mocking:** You will likely need to mock `#app` for `useRoute` and `useRouter`.
  - Assert that `useSeoMeta` is called with the correct object based on route meta.
  - Assert the `computed` return value of `navItems` is correctly derived from `router.getRoutes()`.

## 5. General Tips
 
- Use `describe` blocks to group tests for each function/composable.
- Use `it` or `test` for individual test cases.
- If you encounter "composable is not defined" errors, you need to mock the Nuxt/Vue environment for that specific test block.
