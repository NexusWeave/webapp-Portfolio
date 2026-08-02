<script setup lang="ts">

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
              '@id': 'https://krigjo25.no/#person'
            }
          },
          {
            '@type': 'Person',
            '@id': 'https://krigjo25.no/#person',
            'name': 'Kristoffer Gjøsund',
            
            'url': 'https://krigjo25.no',
            'alternateName': ['Kriss', 'krigjo25'],
            'jobTitle': 'IT-konsulent & Utvikler',
            'sameAs': [
              'https://github.com/krigjo25',
              'https://github.com/NexusWeave',
              'https://www.linkedin.com/in/krigjo25',
              'https://www.facebook.com/krigjo25',
              'https://www.instagram.com/krigjo25',
              'https://www.youtube.com/@krigjo25'
            ]
          },
          {
            '@type': 'Organization',
            '@id': 'https://krigjo25.no/#nexusweave',
            'name': 'NexusWeave',
            'url': 'https://github.com/NexusWeave',
            'description': 'Offisiell GitHub-organisasjon og utviklerprofil for Kristoffer Gjøsund sine profesjonelle IT-prosjekter.',
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
                'name': 'Hjem',
                'url': 'https://krigjo25.no/'
              },
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
          },
          {
            '@type': 'BreadcrumbList',
            '@id': 'https://krigjo25.no/#breadcrumb',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Hjem',
                'item': 'https://krigjo25.no/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Kompetanse',
                'item': 'https://krigjo25.no/dev'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Personlig',
                'item': 'https://krigjo25.no/personal'
              },
              {
                '@type': 'ListItem',
                'position': 4,
                'name': 'Tekniske logger',
                'item': 'https://krigjo25.no/logs'
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

