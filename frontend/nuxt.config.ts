// https://nuxt.com/docs/api/configuration/nuxt-config
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const srcDir = dirname(fileURLToPath(import.meta.url)); // Du har denne allerede

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',

    '@pinia/nuxt'
  ],
  css:
  [
    `${srcDir}/assets/index.css`,
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  vite:
  {
    resolve:
    {
      alias:
      {
        '$src': `${srcDir}`,
        }
      }
  },
  dir:
  {
    public:'public'
  }
})