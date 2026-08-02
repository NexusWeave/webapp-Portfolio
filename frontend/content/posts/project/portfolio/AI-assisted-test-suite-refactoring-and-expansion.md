---
date: 2026-08-02T16:27:00.000Z
title: AI-assistert utvikling av testarkitektur for trening på koderevisjon og refaktorering
ingress: |
  Det ble gjennomført en systematisk prosess i samarbeid med AI for å bygge og kvalitetssikre et helhetlig testoppsett i Nuxt-applikasjonen. Formålet var å etablere en faglig og metodisk mal for test-driven utvikling, slik at man kan trene på å analysere, forbedre og refaktorere eksisterende kildekode uten å skade funksjonalitet.
status: |
  #### Program informasjon
  **Verktøy** - Vitest, Vue Test Utils, Nuxt Test Utils, Antigravity AI
  **Teknologi** - Vue 3, Nuxt 3, TypeScript
  **Prinsipper** - Test-Driven Refactoring, Edge-case isolering, Modulære dummy-data

  #### Dagens Aktiviteter.
  * Strukturere isolerte mock- og dummydata-scenarier i `timelineData.ts` og `layoutData.ts`.
  * Bygge modultester for Card, Filter, Timeline og BusinessCard i `timeline.test.ts` og `repository.test.ts`.
  * Etablere sidetester for index, dev, personal og security-policy i `pages.test.ts`.
  * Håndtere asynkroni, stabs og feiltilstander under Vitest-kjøring i `vitest.config.ts`.

  #### Motivasjon & Energi - 10 / 10
  Etablering av et ryddig testmønster gir verdifull trening i trygg koderevisjon og refaktorering.
---

Det ble gjennomført en systematisk prosess i samarbeid med AI for å bygge og kvalitetssikre et helhetlig testoppsett i Nuxt-applikasjonen. Formålet var å etablere en faglig og metodisk mal for test-driven utvikling, slik at man kan trene på å analysere, forbedre og refaktorere eksisterende kildekode uten å skade funksjonalitet.

Hensikten med dette arbeidet var å trene på å bygge robuste test-suiter som sikkerhetsnett. Når man skal arbeide med, forbedre eller refaktorere kode skrevet av andre (eller egen eldre kodebase), er automatisert testing det viktigste verktøyet for å verifisere at opprinnelig logikk og grensebetingelser opprettholdes.

* Etablerte modulære testdatafiler (`tests/data/timelineData.ts` og `tests/data/layoutData.ts`) med eksplisitte scenarier for alle `v-if`, `v-else` og `Suspense`-gren-kombinasjoner.
* Bygget fullstendige integrasjonstester for `Timeline`-modulen (`components/timeline/Card.vue`, `Filter.vue` og `Timeline.vue`) i testfilen `tests/nuxt/components/timeline.test.ts` med sjekk av event-kommunikasjon og automatisk tilstandsinitiering.
* Implementerte enhetstester for `Repository`-modulen (`components/repository/BusinessCard.vue` og `Portfolio.vue`) i testfilen `tests/nuxt/components/repository.test.ts` for verifisering av tekstbeskjæring og fallback-meldinger ved manglende data.
* Opprettet sidetester for alle ruter (`pages/index.vue`, `pages/dev.vue`, `pages/personal.vue` og `pages/security-policy.vue`) samlet i testfilen `tests/nuxt/pages/pages.test.ts` for å verifisere meta-data, struktur og layout.
* Løst miljø- og teardown-utfordringer i Vitest knyttet til asynkrone moduler og stubbing av `<ContentRenderer>` og `<MDC>` ved å oppdatere moduleNameMapper i `vitest.config.ts`.

Ved å bruke AI som en interaktiv parprogrammeringspartner og diskusjonspartner, ble det utviklet et metodisk rammeverk for hvordan man skiller testdata fra testutførelse. Dette gir en praktisk treningsplattform i kvalitetskontroll og koderevisjon (code review). Målet er å trene på å sette seg inn i fremmed kode, avdekke manglende grensetilfeller (Edge Cases), og utføre trygg refaktorering med ryggdekning i et automatisert testsett.
