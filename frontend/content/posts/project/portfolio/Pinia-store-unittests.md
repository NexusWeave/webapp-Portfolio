---
date: 2026-07-18T09:37:00.000Z
title: Skriving av enhetstester for Pinia-store
ingress: |
  Det ble identifisert et behov for å kvalitetssikre logikken bak språkstatistikk-storen i porteføljen ved bruk av enhetstester. Dette behovet oppstod som en konsekvens av usikkerhet rundt hvordan reaktive data og asynkroni oppførte seg under endringer. Mangelen på automatiserte tester gjorde det utfordrende å forutse om nye justeringer ville påvirke den eksisterende oppførselen på nettstedet.
status: |
  *Skrevet i samarbeid med KI - Gemini 3.7 Flash*

  #### Program informasjon
  **Verktøy** - Node, npm, Vitest
  **Teknologi** - Vue 3, Pinia, Vitest
  **Prinsipper** - Enhetstesting, Reaktivitet

  #### Dagens Aktiviteter.
  * Nullstille tilstand i testing.
  * Legge til dummy-data for nullstillingstester.
  * Korrigere kasting av unntak i enhetstester.
  * Tilrettelegge for reaktive oppdateringer i visningskomponenter.

  #### Motivasjon & Energi - 10 / 10
  Etablering av nye enhetstester for Pinia-store gir økt tillit til kildekodens kvalitet.
sources: |
  * [Nuxt Framework Dokumentasjon](https://nuxt.com)
  * [Vue.js Offisiell Dokumentasjon](https://vuejs.org)
  * [Vitest Testing Framework](https://vitest.dev)
  * [W3C WCAG 2.2 Retningslinjer for Universell Utforming](https://www.w3.org/WAI/standards-guidelines/wcag/)
---

Det ble identifisert et behov for å kvalitetssikre logikken bak språkstatistikk-storen i porteføljen ved bruk av enhetstester. Dette behovet oppstod som en konsekvens av usikkerhet rundt hvordan reaktive data og asynkroni oppførte seg under endringer. Mangelen på automatiserte tester gjorde det utfordrende å forutse om justeringer ville påvirke den eksisterende oppførselen på nettstedet.

Hensikten var å opprette pålitelige enhetstester for tilstandshåndteringen og sikre at reaktive endringer flyter riktig helt frem til brukergrensesnittet.

* Opprettet oppsett for nullstilling av tilstand før hver enkelt enhetstest ved bruk av Pinia-verktøy.
* Korrigerte håndteringen av unntak og testing av feilmeldinger ved bruk av utsatt kjøring med anonyme funksjoner.
* Tilrettelagt dummy-data for testing av nullstillingsfunksjonalitet og repository-oppdateringer.
* Omstrukturert tilgang til interne variabler for å sikre et ryddigere offentlig grensesnitt.

Enhetstestene dekker tilstandshåndteringen som verifiserer at språkdata formateres og lagres riktig. Fremtidige oppdateringer av GitHub-koblingen kan gjøres med minimal risiko for feil, siden eventuelle regresjoner vil bli fanget opp av testene. Erfaringen viser at type-definering med `ReturnType` sikrer full autofullfør når en store deklareres utenfor test-blokkene. Videre viser også erfaringene at <abbr title="anonym funksjon">lambda</abbr>-funksjoner må benyttes for å utsette kjøringen under testing av unntak, samt at statiske øyeblikksbilder av reaktive lister krever presis rekkefølge for å unngå utdaterte referanser.
