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
            teardownTimeout: 10000,
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
            }
          }
        })
      ]
    }
  }
})
