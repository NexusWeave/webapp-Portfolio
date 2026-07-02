---
date: 2026-07-02T12:17:00.000Z
title: Kvalitetssikring, forbedringer av koblingspunkt og testoptimalisering
ingress: |
  Opprettelsen av testdekning for prosjektets backend-kobling og pagineringslogikk avdekket et behov for en teststruktur. Ved å skille ut tilkoblingslogikk og legge til falske Nuxt-runtime-miljøer, er fundamentet for testingen modernisert. Det sikrer en stabil drift og raskere endringer av endepunktsstrukturer uten behov for tunge mock-filer.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt, TypeScript, Vitest, Python
  **Verktøy** - Vitest, npm, git

  #### Dagens aktiviteter
  * Opprettet en gjenbrukbar hjelpefunksjon for å hente data fra koblingspunkter.
  * Sørget for at pagineringslogikken returnerer en tom liste `[]` fremfor `null` ved manglende treff.
  * Oppdatert lokal miljøvariabel i konfigurasjonsfilene.
  * Forenklet testene for kartleggingsfunksjonaliteten ved å ta i bruk delvise objekt-sjekker (`expect.objectContaining`) og lengdesjekker, samt konfigurert pålitelige `Nuxt-runtime-config`- og `fetch`-mocks.

  #### Motivasjon & Energi - 10 / 10
  Dagen har vært proaktiv og perfekt.
  
sources: ''
---

Det manglet testdekning for både <abbr title="Systemets bakdel/serverdel">backend</abbr>-koblingen som henter prosjektene fra GitHub og <abbr title="Sidedeling av innhold">pagineringslogikken</abbr> som viser frem prosjektene. Testdekningen for koblingspunktene krevde store mengder med repeterende og hardkodede data.

Hensikten var å sikre at både backend og <abbr title="Brukergrensesnitt/klientdel">frontend</abbr> er stabile, og gjøre testdekningen fleksibel og vedlikeholdsvennlig.

* Refaktorerte koblingspunktet for å skille ut ruting- og tilkoblingslogikk, og oppdaterte pagineringsfunksjonaliteten slik at den returnerer en tom matrise.
* Separerte koblingspunktet fra frontend til backend fra funksjonen som kalte prosjektene, for å gjøre funksjonaliteten mer fleksibel for å hente andre data fra backend.
* Opprettet falske <abbr title="Kjøretidsmiljø for applikasjonen">Nuxt-runtime-miljøer</abbr> (`useFetch` og `useRuntimeConfig`) i <abbr title="Samling av automatiserte tester">test-suiten</abbr> for å ivareta applikasjonens standardinnstillinger.
* Laget nye tester for <abbr title="Gjenbrukbare funksjoner med tilstandslogikk">composable-funksjoner</abbr> og kartleggingsfunksjonaliteten for å validere antall elementer og essensielle felter ved hjelp av `expect.objectContaining`.

Prosjektet har nå utvidet testdekningen for å inkludere koblingspunktene fra frontend til backend. Det nye testoppsettet gjør det raskere å utvide og endre API-strukturer i fremtiden uten å måtte skrive om massive <abbr title="Filer med simulert testdata">mock-filer</abbr>.

Erfaringen viser at å ta i bruk delvise objekt-verifikasjoner (`expect.objectContaining`) fremfor eksakte <abbr title="Simulert testdata">mock-data</abbr> gjør testene langt mer robuste og enklere å vedlikeholde, ettersom mindre endringer i datastrukturene ikke lenger krever oppdatering av store testfiler.




