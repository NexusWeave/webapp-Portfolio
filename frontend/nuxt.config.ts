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
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-gtag'
  ],
  //gtag: { id: process.env.GA_MEASUREMENT_ID || 'G-4XX727FZCG' },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  },
  site: { url: 'https://krigjo25.no', name: 'Kristoffer Gjøsund - Portfolio', strictNuxtContentAds: true, },
  sitemap: { exclude: [ '/admin/**' ], autoLastmod: true, strictNuxtContentPaths: true, includeAppSources:true, defaults: { priority: 0.9, changefreq: 'daily'} },
  runtimeConfig:{
    public:{
      GCLOUD: process.env.GOOGLE_CLOUD || 'http://0.0.0.0:8080',
    },
  }
})
