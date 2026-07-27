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
                'https://github.com/krigjo25',
                'https://github.com/NexusWeave'
              ]
            },
            'hasPart': [
              {
                '@type': 'WebPage',
                '@id': 'https://krigjo25.no/#developer',
                'url': 'https://krigjo25.no/dev',
                'name': 'Kompetanse profil',
                'description': 'En detaljert side om Kristoffers tekniske kompetanse. Viser sanntids GitHub-aktivitet og biografi med fokus på teknisk utvikling og teknologier.',
                'author': {
                  '@id': 'https://krigjo25.no/#nexusweave'
                }
              },
              {
                '@type': 'WebPage',
                '@id': 'https://krigjo25.no/#personal',
                'url': 'https://krigjo25.no/personal',
                'name': 'Autobiografi',
                'description': 'En personlig side som går i dybden på Kristoffers verdier. Inneholder også en biografi med et mer personlig perspektiv.'
              },
              {
                '@type': 'WebPage',
                '@id': 'https://krigjo25.no/#logs',
                'url': 'https://krigjo25.no/logs',
                'name': 'Tekniske logger',
                'description': 'Artikler, logger og dokumentasjon om IT, KI, DevOps og utvikling'
              }
            ]
          },
          {
            '@type': 'Organization',
            '@id': 'https://krigjo25.no/#nexusweave',
            'name': 'NexusWeave',
            'url': 'https://github.com/NexusWeave',
            'description': 'Kristoffer Gjøsund sin organisasjon og utviklerprofil for profesjonelt arbeid',
            'founder': {
              '@id': 'https://krigjo25.no/#person'
            }
          },
          {
            '@type': 'SiteNavigationElement',
            '@id': 'https://krigjo25.no/#navigation',
            'name': 'Hovedmeny',
            'hasPart': [
              {
                '@type': 'WebPage',
                'name': 'Kompetanse profil',
                'url': 'https://krigjo25.no/dev'
              },
              {
                '@type': 'WebPage',
                'name': 'Autobiografi',
                'url': 'https://krigjo25.no/personal'
              },
              {
                '@type': 'WebPage',
                'name': 'Tekniske logger',
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
