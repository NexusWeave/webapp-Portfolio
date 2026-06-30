---
date: 2026-06-30T13:20:00.000Z
title: Forbedring av typesikkerhet og enhetstester for kartleggingsverktøy
ingress: |
  Kartleggingsverktøyene for innhold i porteføljen manglet tilstrekkelig testdekning mot eksterne datastrukturer. Dette ble løst ved å opprette enhetstester med simulerte testdata for samtlige funksjoner i applikasjonen. Endringene gjør det enkelt å verifisere oppførselen uten å være avhengig av eksterne systemer under testing.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini 3.5 Flash*
  **Teknologi** - Nuxt.js, Vitest
  **Verktøy** - TypeScript, Git
  **Prinsipper** - Enhetstesting, Typesikkerhet

  #### Dagens aktiviteter
  * Legge til type-sikre testdata for alle mapping-funksjoner.
  * Løse <abbr title="Feil som gjør at programkoden ikke kan oversettes eller klargjøres til å kjøre">kompileringsfeil</abbr> knyttet til ufullstendige CMS-typer under testkjøring.
  * Verifisere at alle enhetstester for kartleggingsverktøyene kjører grønt.

  #### Motivasjon & Energi - 10 / 10
  Dagen har vært så fin den kan bli.
---

For å sikre at data-kartleggerne for nettsiden var pålitelige, trenger kartleggingsfunksjonaliteten enhetstester, for å dokumentere hvordan funksjonene fungerer i praksis. Kartleggingsfunksjonene skal i praksis ta i mot rådata som er automatisk generert fra <abbr title="Redaktørpanel">CMS</abbr>-Panelet og konvertere disse til definerte objekter for TypeScript programvaren, men dette er simulert gjennom <abbr title="Simulering av data">mocking</abbr>.

Hensikten med å opprette et enhetstestsett for alle kartleggingsfunksjonene, er å sikre at alle funksjoner er pålitelige og hindre uforutsigbare feil som kan oppstå ved endring av innholdsmodellene.

* Opprettet en dedikert fil med realistiske testdata for samtlige kartleggingsverktøy i prosjektet.
* Sikret typesikkerhet for mock-dataene ved å bruke <abbr title="Å fortelle programmeringsspråket hvilken datatype en verdi skal behandles som">type-kast</abbr> for innholdsleverandørens innebygde datatyper.
* Opprettet en dedikert fil for kartleggingstester hvor kartleggingsfunksjoner for profiler, referanser, tidslinjer, kildekoder og blogginnlegg blir testet grundig.
* Justerte testdataene til å matche formatet for teknologikategorier og ukedager i datoformateringstester.
* Fjernet midlertidige feilsøkingslogger og forenklet testenes struktur for bedre lesbarhet.

Prosjektet har oppnådd full testdekning for alle kartleggingsfunksjonene, dette hindre uforutsigbare feil som oppstår i koden ved endring av innholdsmodellene.

Erfaringen viser at simulering av datastrukturene gjennom <abbr title="Simulering av data">mocking</abbr> gjør det enkelt å verifisere oppførselen uten å være avhengig av eksterne systemer.