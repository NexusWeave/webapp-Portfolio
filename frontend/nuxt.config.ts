// https://nuxt.com/docs/api/configuration/nuxt-config
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const srcDir = dirname(fileURLToPath(import.meta.url)); // Du har denne allerede

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  dir: { public:'public' },
  vite: { resolve: { alias: {'$src': `${srcDir}`,} } },
  css: [ `~/sass/index.sass`, 'bootstrap-icons/font/bootstrap-icons.css' ],
  modules: [ '@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@pinia/nuxt' ],
  runtimeConfig:{
    public:{
      GCLOUD: process.env.GOOGLE_CLOUD || 'http://0.0.0.0:8080',
    }
  }
})