---
date: 2026-07-28T00:00:00.000Z
title: Integrasjon av Schema.org JSON-LD for Sitelinks og AI-skanning
ingress: |
  For å styrke synligheten i søkemotorer som Google og Bing, samt tilrettelegge for automatisk visning av nettstedslenker, ble det konfigurert strukturert Schema.org-data via <abbr title="JavaScript Object Notation for Linked Data">JSON-LD</abbr> i Nuxt-applikasjonen. Løsningen benytter `useHead` for å etablere et semantisk `@graph` bestående av `WebSite`, `Person`, `Organization` (NexusWeave) og `SiteNavigationElement`.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt 3/4, TypeScript, JSON-LD
  **Verktøy** - Git, Google Search Console, Schema.org
  **Prinsipper** - <abbr title="Search Engine Optimization">SEO</abbr>, Semantisk Web, Brukeradopsjon

  #### Dagens aktiviteter
  * Strukturere `@graph` med WebSite, Person og SiteNavigationElement i `app.vue`.
  * Definere navigeringsveier for `/dev`, `/personal` og `/logs` for å fasilitere Google Sitelinks.
  * Validere at sitemap og <abbr title="Server-Side Rendering">SSR</abbr> prerendering bygger uten feil.

  #### Motivasjon & Energi - 10 / 10
  Målrettet og effektiv <abbr title="Search Engine Optimization">SEO</abbr>-optimalisering for bedre autoritet i søkemotorer.

sources: '[Schema.org WebSite Specification](https://schema.org/WebSite) [Google Search Central: Sitelinks Guidelines](https://developers.google.com/search/docs/appearance/sitelinks) [Nuxt Docs: useHead](https://nuxt.com/docs/api/composables/use-head)'
---

Under inspeksjon av nettstedets synlighet ble det registrert at søkeresultater manglet <abbr title="strukturerte undersider">nettstedslenker</abbr> og tydelig identifisering av navigeringsstruktur overfor søkemotorer og <abbr title="Kunstig Intelligens">KI</abbr>-boter.

Hensikten med tiltaket var å gi søkemotorer som Google og Bing instruksjoner om oppbygningen av nettstedet, utgiver og kjerneområder, slik at treff på domenet `krigjo25.no` fremstår informativt i søkeresultatene.

* Laget til et Schema.org <abbr title="JavaScript Object Notation for Linked Data">JSON-LD</abbr>-skript som er integrert direkte via `useHead` i `app.vue`.
* Konfigurerte en `Organization`/`Person`-nodestruktur knyttet til Kristoffer Gjøsund med kobling til GitHub-profil.
* La til `SiteNavigationElement` for hovedmenyens nøkkelkomponenter `/dev`, `/personal` og `/logs`.
* Verifiserte at statisk prerendering via Nitro genererer korrekte HTML-tagger for alle sider.

Ved å ta i bruk standardisert <abbr title="JavaScript Object Notation for Linked Data">JSON-LD</abbr>-struktur unngås det at søkemotorern må tippe på nettstedets oppbygning. Denne erfaringen viser at Schema.org-oppmerking akselererer indeksering og øker sjansen for at Google genererer dynamiske Sitelinks. Som en konsekvens blir porteføljen lettere tilgjengelig for både potensielle arbeidsgivere, besøkende og moderne <abbr title="Kunstig Intelligens">KI</abbr>-søkemotorer.

