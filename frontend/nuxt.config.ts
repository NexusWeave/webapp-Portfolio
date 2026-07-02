// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const srcDir = dirname(fileURLToPath(import.meta.url)); // Du har denne allerede

export default defineNuxtConfig({

  ssr:true,
  dir: { public:'public' },
  devtools: { enabled: true },
  compatibilityDate: '2025-07-15',
  experimental: { payloadExtraction: false},
  vite: { resolve: { alias: {'$src': `${srcDir}`,} } },
  routeRules: { '/logs/records/**': { prerender: true } },
  css: [ `~/sass/index.sass`, 'bootstrap-icons/font/bootstrap-icons.css' ],
  site: { url: 'https://krigjo25.no', name: 'Kristoffer Gjøsund - Portfolio'},
  runtimeConfig:{ public:{ GCLOUD: process.env.GCLOUD || "http://0.0.0.0:8000/" } },
  sitemap: { autoLastmod: true, includeAppSources:true, exclude: [ '/admin/**' ], sources: ['/api/log-urls'], defaults: { priority: 0.9, changefreq: 'daily'} },
  nitro: { preset: 'static', prerender: { crawlLinks: true, routes: ['/sitemap.xml', '/'], ignore: [ '/logs/records/.gitkeep', '**/.gitkeep', '**/.DS_Store'] } },

  modules: [
    '@nuxt/ui',
    'nuxt-gtag',
    '@nuxt/fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxt/test-utils/module'
  ],
   hooks: {
    async 'nitro:config'(nitroConfig) {
      async function getRoutes(dir: string): Promise<string[]> {
        const entries = await readdir(dir, { withFileTypes: true })
        const routes: string[] = []
        for (const entry of entries) {
          if (entry.isDirectory()) {
            routes.push(...await getRoutes(join(dir, entry.name)))
          } else if (entry.name.endsWith('.md')) {
            const slug = entry.name.replace(/\.md$/, '').toLowerCase()
            routes.push(`/logs/records/${slug}`)
          }
        }
        return routes
      }

      try {
        const routes = await getRoutes(join(srcDir, 'content', 'posts'))
        nitroConfig.prerender ??= {}
        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes ?? []),
          ...routes
        ]
      } catch (e) {
        console.warn('[prerender] An error occured with the content directory:', e)
      }
    }
  },
  app: {head : {title: 'Portefølje - Kristoffer Gjøsund(krigjo25)', viewport: 'width=device-width, initial-scale=1', htmlAttrs: { lang: 'no' }, meta: [{name:'description', content:'Portefølje side for Kristoffer Gjøsund'}, {charset:'utf-8'}], link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]}}
})
