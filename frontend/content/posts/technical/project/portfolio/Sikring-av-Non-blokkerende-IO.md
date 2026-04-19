---
date: 2025-12-04T00:00:00.000Z
title: Sikring av Non-blokkerende I/O
ingress: |
  En sårbarhet ble identifisert der den underliggende logikken i Base Class benyttet et synkront I/O-kall. Dette hadde potensial til å forårsake trådblokkering i det asynkrone API-laget. For å løse dette ble Base Class-funksjonen refaktorert med `async def` og `await` i underklassene, samt integrering av et asynkront tredjepartsbibliotek. Resultatet var en eliminering av flaskehalsen, noe som bekrefter den kritiske viktigheten av non-blokkerende I/O for å oppnå robust systemskalerbarhet i asynkrone arkitekturer.
status: |
  Dagens Aktiviteter

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli
sources: ''
---

Den underliggende logikken i hovedklassen for <abbr title="Application Programming Interface – en kobling som lar to systemer utveksle informasjon på en trygg måte">API</abbr>-konfigurasjoner inneholdt et <abbr title="En metode der systemet må vente på at én oppgave blir ferdig før neste kan starte">synkront</abbr> <abbr title="Innhenting og utsending av informasjon">I/O</abbr>-kall, med denne teknikken ble ressursene låst til en oppgave om gangen, noe som kunne føre til at applikasjonen stoppet uventet ved høy belastning.

Målet er at programmet skal kunne håndtere flere forespørsler samtidig og frigjøre ressurser etter behov. Oppgaven var å erstatte det nåværende biblioteket `requests` med et <abbr title="en teknikk som lar programmet håndtere flere forespørsler samtidig">asynkront</abbr> bibliotek som `httpx`.

* De eksisterende funksjonene i API-hovedklassen ble omdefinert med nøkkelordet `async` for å tillate at funksjonen kan håndtere flere forespørsler.
* Jeg la til nøkkelordet `await` i klassene som benytter funksjonaliteten i hovedklassen for å sikrer at alle kallene til funksjonen nå kan sette oppgaver på pause uten å stoppe resten av programmet.

Ved å erstatte teknikkene for tjenestene, kan vi stole på at systemet frigjør ressurser mens I/O-operasjoner pågår, programvaren kan nå håndtere flere forespørsler samtidig. Dette sikrer at gjennomstrømmingen ikke lenger begrenses av kall til hovedklassen. De delene som henter informasjon fra hovedklassen er nå oppdatert med instruksjonen `await`, Dette forteller programmet at det skal vente på svar i bakgrunnen, slik at hele prosessen, flyter effektivt uten stans.

Denne oppgraderingen viser hvorfor asynkrone kall er avgjørende i moderne systemer som håndterer store mengder informasjon. Jeg har erfart at en slik struktur at vi er aldri sterkere enn det svakeste leddetet.
Selv ett enkelt gammeldags "vente-kall" i bunnen av systemet kan skape en uventet oppførsel som hindrer hele applikasjonen i å vokse. Dette viser viktigheten av å velge moderne verktøy og biblioteker som støtter flere forespørsler samtidig, slik at programmet alltid har ressurser for nye oppgaver.
