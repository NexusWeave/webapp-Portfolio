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
  routeRules: { '/artikkel/**': { prerender: true } },
  site: { url: 'https://krigjo25.no', name: 'Kristoffer Gjøsund - Portfolio'},
  runtimeConfig:{ public:{ GCLOUD: process.env.GOOGLE_CLOUD || 'http://0.0.0.0:8080' } },
  nitro: { preset: 'static', prerender: { crawlLinks: true, routes: ['/sitemap.xml', '/'] } },
  sitemap: { autoLastmod: true, includeAppSources:true, exclude: [ '/admin/**' ], sources: ['/api/log-urls'], defaults: { priority: 0.9, changefreq: 'daily'} },
  
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
            routes.push(`/artikkel/${slug}`)
          }
        }
        return routes
      }

      try {
        const routes = await getRoutes(join(srcDir, 'content', 'posts'))
        console.log(`[prerender] Fant ${routes.length} artikkelruter`)
        nitroConfig.prerender ??= {}
        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes ?? []),
          ...routes
        ]
      } catch (e) {
        console.warn('[prerender] Klarte ikke lese content-mappen:', e)
      }
    }
  }
})
