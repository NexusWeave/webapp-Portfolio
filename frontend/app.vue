<script setup lang="ts">
useSeoMeta({
  title: 'Portefølje - Kristoffer Gjøsund (krigjo25)',
  description: 'Portefølje side for Kristoffer Gjøsund',
  googleSiteVerification: '8gvx99aCgKbc489qfagbKyJyY9Wv4KUKC9AAk8fLxUs',
  robots: 'index, follow',
  ogTitle: 'Kristoffer Gjøsund - Portefølje',
  ogDescription: 'Portefølje side for Kristoffer Gjøsund',
  ogType: 'website',
  ogUrl: 'https://krigjo25.no',
  ogImage: 'https://krigjo25.no/og-image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Kristoffer Gjøsund - Portefølje',
  twitterDescription: 'Portefølje side for Kristoffer Gjøsund',
  twitterImage: 'https://krigjo25.no/og-image.png'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://krigjo25.no/#website',
            'url': 'https://krigjo25.no/',
            'name': 'Kristoffer Gjøsund - Portefølje',
            'description': 'Portefølje side for Kristoffer Gjøsund (krigjo25)',
            'inLanguage': 'nb-NO',
            'publisher': {
              '@type': 'Person',
              '@id': 'https://krigjo25.no/#person',
              'name': 'Kristoffer Gjøsund',
              'url': 'https://krigjo25.no',
              'sameAs': [
                'https://github.com/krigjo25'
              ]
            },
            'hasPart': [
              {
                '@type': 'WebPage',
                '@id': 'https://krigjo25.no/#developer',
                'url': 'https://krigjo25.no/dev',
                'name': 'Utvikler & IT',
                'description': 'Utviklingsprosjekter, erfaring og teknologisk kompetanse'
              },
              {
                '@type': 'WebPage',
                '@id': 'https://krigjo25.no/#personal',
                'url': 'https://krigjo25.no/personal',
                'name': 'Personlig & Om meg',
                'description': 'Informasjon om Kristoffer Gjøsund sin bakgrunn'
              },
              {
                '@type': 'WebPage',
                '@id': 'https://krigjo25.no/#logs',
                'url': 'https://krigjo25.no/logs',
                'name': 'Tekniske logger & Artikler',
                'description': 'Artikler, logger og dokumentasjon om IT, KI og utvikling'
              }
            ]
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://krigjo25.no/#navigation',
            'name': 'Hovedmeny',
            'hasPart': [
              {
                '@type': 'WebPage',
                'name': 'Utvikler',
                'url': 'https://krigjo25.no/dev'
              },
              {
                '@type': 'WebPage',
                'name': 'Personlig',
                'url': 'https://krigjo25.no/personal'
              },
              {
                '@type': 'WebPage',
                'name': 'Logger',
                'url': 'https://krigjo25.no/logs'
              }
            ]
          }
        ]
      })
    }
  ]
})
</script>

<template>
    <header>
        <LayoutHeader />
    </header>
    <main>
        <NuxtPage />
    </main>
    <footer>
        <LayoutFooter />
    </footer>
</template>
