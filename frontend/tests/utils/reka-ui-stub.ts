/**
 * Stub for reka-ui's shared/createContext module.
 * Prevents EnvironmentTeardownError caused by reka-ui being lazily imported
 * by @nuxt/ui AFTER the Nuxt test environment has been torn down.
 */
export const createContext = () => [() => null, () => null];
export default createContext;
