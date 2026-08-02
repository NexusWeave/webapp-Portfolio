import { afterAll } from 'vitest';

/**
 * Drain all pending microtasks and a macrotask tick after each suite.
 * This prevents reka-ui / @nuxt/ui from triggering lazy imports
 * after the Nuxt environment is torn down, which would cause
 * EnvironmentTeardownError unhandled rejections.
 */
afterAll(async () => {
    // Flush microtasks (Promises already queued)
    await Promise.resolve();
    // Allow any remaining macrotasks (setTimeout 0) to settle
    await new Promise<void>(resolve => setTimeout(resolve, 0));
});
