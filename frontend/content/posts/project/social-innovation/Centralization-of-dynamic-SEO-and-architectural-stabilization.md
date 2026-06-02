---
date: 2026-05-06T12:45:00.000Z
title: "Sentralisering av dynamisk SEO og arkitektonisk stabilisering"
ingress: |
  Dagens arbeid har fokusert på å eliminere teknisk ustabilitet under bygging (<abbr title="Prosessen med å generere statiske HTML-sider på forhånd for bedre ytelse og SEO">prerendering</abbr>) og automatisere <abbr title="Search Engine Optimization">SEO</abbr>-håndteringen i applikasjonen. Ved å flytte dynamisk tittel-oppløsning fra <abbr title="En funksjon eller instruksjon som prosesseres av kompilatoren fremfor å kjøres som vanlig kode i nettleseren">compiler-makroer</abbr> til en sentralisert reaktiv composable, har jeg løst kritiske feil som oppstod ved aksessering av rute-parametre før instansiering. Resultatet er en robust arkitektur som sikrer korrekt metadata for søkemotorer samtidig som den opprettholder en stabil og forutsigbar bygg-pipeline.
status: |
  #### Program informasjon
  **Teknologi** - Nuxt 4, Vue 3, TypeScript
  **Verktøy** - Nuxt Content, Composables

  #### Dagens Aktiviteter

  * Diagnostiserte og løste build-feil knyttet til aksessering av `route.params` i `definePageMeta` under prerendering.
  * Sentraliserte dynamisk tittel-generering i `preprosessor-utils.ts` for å dekoble rute-logikk fra sideoppsettet.
  * Implementerte en reaktiv "watcher" for SEO-metadata som sikrer umiddelbar oppdatering av sidetitler ved klient-side navigasjon (<abbr title="Single Page Application">SPA</abbr>).
  * Automatiserte generering av SEO-meta-tags for å garantere konsistent synlighet på tvers av hele plattformen.
  * Refaktorerte `Body.vue` og artikkellogikk for å forenkle <abbr title="User Interface">UI</abbr>-koden gjennom reaktiv synlighet.
  * Rettet en kritisk type-import feil ("module not found") som hindret korrekt type-checking.

  #### Motivasjon & Energi - 10 / 10

  Ekstremt tilfredsstillende å flytte kompleksitet fra skjøre compiler-makroer til robuste, testbare composables.
sources: ''
---

Applikasjonen opplevde ustabilitet under bygg-prosessen, spesielt ved generering av statiske sider (prerendering). Problemet skyldtes at dynamiske rute-parametre ble forsøkt hentet inne i `definePageMeta`-makroen. Siden denne makroen evalueres av Nuxt-compileren før ruten i det hele tatt eksisterer i nettleseren, resulterte dette i feilmeldinger som "Cannot read properties of undefined". Samtidig var SEO-metadataene statiske, noe som førte til at sidetitler ikke oppdaterte seg korrekt når brukeren navigerte mellom artikler i SPA-modus.

Målet for dagen var å stabilisere bygg-pipelinen ved å skille statiske metadata fra dynamisk <abbr title="Logikk som kjøres mens applikasjonen er aktiv i nettleseren">runtime-logikk</abbr>, samt å automatisere SEO-arbeidet for å redusere manuelt vedlikehold.

* **Arkitektonisk refaktorering:** Jeg startet med å flytte all logikk som omhandler oppløsning av dynamiske titler fra `definePageMeta` i de enkelte sidene og inne i `frontend/composables/preprosessor-utils.ts` (via `useNavigation`). 
* **Reaktiv SEO-håndtering:** Inne i composablen implementerte jeg en `watch` på den aktive ruten. Denne vakten fanger opp endringer i `route.params.slug`, vasker <abbr title="Den delen av en URL som identifiserer en spesifikk side i et menneskevennlig format">sluggen</abbr> (fjerner bindestreker, legger til stor forbokstav) og oppdaterer sidetittelen dynamisk via `useSeoMeta`. Dette sikrer at både brukere og søkemotorer alltid ser korrekt informasjon.
* **Stabilisering av makroer:** Jeg ryddet i alle side-komponenter og sørget for at `definePageMeta` kun inneholder statiske verdier som trengs for rute-organisering. Dynamiske beskrivelser ble i stedet flyttet til det sentraliserte SEO-systemet.
* **UI-forenkling:** Parallelt med SEO-arbeidet refaktorerte jeg `frontend/components/article/Body.vue`. Ved å erstatte komplisert imperativ logikk med reaktiv synlighet, ble komponenten betydelig lettere å vedlikeholde og mindre utsatt for feil.

Resultatet er en applikasjon som bygger feilfritt hver gang. Vi har oppnådd en tydelig separation of concerns: `definePageMeta` brukes kun til statisk rute-konfigurasjon, mens `useNavigation`-composablen håndterer den dynamiske presentasjonen. Dette har ikke bare fjernet build-feil, men også gjort det langt enklere å legge til nye sider med full SEO-støtte uten ekstra koding.

Dagens arbeid har understreket viktigheten av å forstå livssyklusen til moderne rammeverk. Ved å respektere skillet mellom <abbr title="Kodesnutter som kjøres under kompileringsfasen for å transformere eller generere kode">build-time</abbr> og <abbr title="Logikk som kjøres mens applikasjonen er aktiv i nettleseren">runtime</abbr>, har vi transformert en potensielt skjør løsning til en robust og skalerbar arkitektur.
