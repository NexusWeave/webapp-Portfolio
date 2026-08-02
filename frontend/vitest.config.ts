import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'


export default defineConfig(async () => {
  return {
    test: {
      globals: true,
      projects: [
        {
          test: {
            name: 'unit',
            environment: 'node',
            include: ['tests/unit/**/*.{test,spec}.ts'],
          }
        },
        await defineVitestProject({
          test: {
            name: 'nuxt',
            environment: 'nuxt',
            include: ['tests/nuxt/**/*.{test,spec}.ts'],
            setupFiles: ['tests/utils/setup.ts'],
            teardownTimeout: 30000,
            dangerouslyIgnoreUnhandledErrors: true,
            pool: 'threads',
            poolOptions: {
              threads: {
                singleThread: true
              }
            },
            environmentOptions: {
              nuxt: {
                domEnvironment: 'jsdom'
              }
            },
            server: {
              deps: {
                moduleNameMapper: {
                  'reka-ui/dist/shared/createContext\.js': '<rootDir>/tests/utils/reka-ui-stub.ts',
                  'reka-ui/dist/shared/arrays\.js': '<rootDir>/tests/utils/reka-ui-stub.ts'
                }
              }
            }
          }
        })
      ]
    }
  }
})
