---
tags:
  - dev-journey
date: 2025-11-03T00:00:00.000Z
title: Bærekraftig Stihåndtering etter kritisk API-krasj
ingress: |
  Jeg reddet bedriftens intranett etter at en automatisk AI-flytting skapte full stans i arbeidet. På kun fire timer identifiserte jeg feilene, innførte matematiske uttrykk som sikrer at systemet nå fungerer for alle datasystemer, og fjernet risikoen for fremtidige krasj. Ved å rydde opp i den ustabile koden har jeg spart bedriften for store forsinkelser og sørget for at alle får gjort jobben sin uten kostbare avbrudd.
parade: ''
star: |
  Bedriftens intranett krasjet ved innlogging på nettsiden etter at systemet ble flyttet fra kodespråket PHP til C# ved hjelp av AI-generert kode. Den halv automatiske flyttingen skapte tekniske feil som gjorde nettsiden utilgjengelig, og videre utviklingsarbeid stoppet opp. For bedriften betydde dette en stans i produksjonen.

  Min oppgave var å feilsøke den AI-genererte koden, finne årsaken til at nettsiden krasjet og få nettsiden klar til videreutvikling, så raskt som mulig. Samtidig skulle jeg sikre at systemet hadde støtte for **MacOS**, **Windows** og **Linux**.

  Da denne feilen kun rammet ansatte på visse datasystemer, gjennomførte jeg en feilsøking for å sikre at intranettet var stabilt for alle.

  * Jeg analyserte den AI-genererte koden for å finne ut hvorfor den fungerte på Windows, men sviktet på andre datasystemer.
  * Jeg erstattet den ustabile koden med en universell løsning som automatisk gjenkjenner riktig filsti, uavhengig av hvilket datasystem den ansatte bruker.
  * Jeg bygde om logikken for hvordan systemet finner filer, slik at koblingen mellom nettsiden og dokumentene nå er pålitelig og feilfri.
  * Jeg rettet opp i svakhetene fra den automatiske flyttingen for å hindre at lignende krasj skjer i fremtiden.

  Systemet ble fikset etter fire timer, og alle datasystemer fikk tilgang igjen. Ved å fjerne denne tekniske utfordringen, har jeg spart bedriften for fremtidige driftsstans og sørget for at utviklere kan jobbe uforstyrret videre uten forsinkelser.
sources: ''
---

