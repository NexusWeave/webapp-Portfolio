---
tags:
  - dev-journey
date: 2025-11-03T00:00:00.000Z
title: Gjenoppretting av intranett og sikring av universell systemtilgang
ingress: |
  Da en lynrask teknologiovergang lammet bedriftens intranett, ble det produksjonsstans. Ved å utbedre svakheter i AI-generert kode, ble systemet transformert fra en ustabil kilde til feil til en pålitelig, plattformuavhengig løsning. Resultatet er et feilfritt arbeidsverktøy for alle ansatte, uavhengig av operativsystem, slik at utviklingsteamet nå kan jobbe effektivt uten frykt for nye driftsstans.
status: |
  #### Dagens Aktivitet

  * Fant ut hvorfor systemet sviktet for utviklere på Mac og Linux, selv om det fungerte på Windows.
  * Innledet matematiske uttrykk: Erstattet den ustabile koden med en universell løsning som automatisk finner riktig sti til filer, uavhengig av hvilken datasystem utvikleren bruker.
  * Ryddet opp i logikken for dokumenthåndtering for å sikre at systemet nå er pålitelig og feilfritt. Ved å fjerne svakhetene har jeg hindret fremtidige krasj og sørget for at utviklingsteamet kan jobbe videre uten kostbare forsinkelser.

  #### Motivasjon & Energi - 10 / 10

  Dagen var så fin den kunne bli !
sources: ''
---

Bedriftens intranett krasjet ved innlogging på nettsiden under testing etter at systemet ble flyttet fra kodespråket **PHP** → **C#** ved hjelp av AI-generert kode. Den halv automatiske flyttingen skapte hindringer som gjorde nettsiden utilgjengelig, og videre utviklingsarbeidet stanset. Dette betydde stopp i produksjon for bedriften.

Min oppgave var å feilsøke den AI-genererte koden, finne årsaken til at nettsiden krasjet og få nettsiden klar til videreutvikling, så raskt som mulig. Samtidig skulle jeg sikre at systemet hadde støtte for **MacOS**, **Windows** og **Linux**.

Da denne feilen kun rammet utviklere på visse datasystemer, gjennomførte jeg en feilsøking for å sikre at intranettet var stabilt for alle.

* Jeg analyserte den AI-genererte koden for å finne ut hvorfor den fungerte på Windows, men sviktet på andre datasystemer.
* Jeg erstattet den ustabile koden med en universell løsning som automatisk gjenkjenner riktig filsti, uavhengig av hvilket datasystem den ansatte bruker.
* Jeg bygde om logikken for hvordan systemet finner filer, slik at koblingen mellom nettsiden og dokumentene nå er pålitelig og feilfri.
* Jeg rettet opp i svakhetene fra den automatiske flyttingen for å hindre at lignende krasj skjer i fremtiden.

Systemet ble fikset, og alle datasystemer fikk tilgang igjen. Ved å fjerne denne tekniske utfordringen, har jeg spart bedriften for fremtidige driftsstans og sørget for at utviklere kan jobbe uforstyrret videre uten forsinkelser.