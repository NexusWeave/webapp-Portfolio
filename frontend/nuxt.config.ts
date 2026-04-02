// https://nuxt.com/docs/api/configuration/nuxt-config
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const srcDir = dirname(fileURLToPath(import.meta.url)); // Du har denne allerede

export default defineNuxtConfig({
  ssr:true,
  dir: { public:'public' },
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
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
  routeRules: { '/artikkel/**': { static: true } },
  //gtag: { id: process.env.GA_MEASUREMENT_ID || 'G-4XX727FZCG' }
  nitro: { prerender: { crawlLinks: true, routes: ['/api/log-urls','/sitemap.xml', '/'] }},
  site: { url: 'https://krigjo25.no', name: 'Kristoffer Gjøsund - Portfolio'},
  runtimeConfig:{ public:{ GCLOUD: process.env.GOOGLE_CLOUD || 'http://0.0.0.0:8080' } },
  sitemap: { autoLastmod: true, includeAppSources:true, exclude: [ '/admin/**' ], sources: ['/api/log-urls'], defaults: { priority: 0.9, changefreq: 'daily'} },
})
