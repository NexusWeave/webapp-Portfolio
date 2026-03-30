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
    // Vi bruker Nitros egen hook. Denne "vasker" sitemapen rett før den serveres.
    hooks: {
      'sitemap:index': (sitemap) => {
        // sitemap.routes er listen over alle lenker Nuxt har funnet
        sitemap.routes.forEach(route => {
          // Hvis lenken inneholder /post/ (som er dine dype mapper)
          if (route.path.includes('/post/')) {
            // Vi splitter stien og tar bare det siste elementet (filnavnet)
            const parts = route.path.split('/')
            const slug = parts[parts.length - 1]
            
            // Vi endrer stien til slik du vil ha den: /artikkel/filnavn
            route.path = `/artikkel/${slug}`
          }
        })
      }
    },
    prerender: {
      crawlLinks: true, // Viktig: Dette gjør at den finner de 20 loggene fra forsiden
      routes: ['/sitemap.xml']
    }
  },
  site: { url: 'https://krigjo25.no', name: 'Kristoffer Gjøsund - Portfolio'},
  

  runtimeConfig:{
    public:{
      GCLOUD: process.env.GOOGLE_CLOUD || 'http://0.0.0.0:8080',
    },
  }
})
