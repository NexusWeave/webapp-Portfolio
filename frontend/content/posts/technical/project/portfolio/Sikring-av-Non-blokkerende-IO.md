---
date: 2025-12-04T00:00:00.000Z
title: Forbedre ressursbruk og uavbrutt drift i koblingspunkt-tjenesten
ingress: |
  Jeg har fornyet koblingspunkt-tjenesten i prosjektet for å fjerne hindringer som førte til at systemet stoppet opp. Ved å endre hvordan informasjon hentes, har jeg sørget for at programmet nå kan håndtere mange oppgaver samtidig uten å låse seg. Dette frigjør ressurser og gjør at hele flyten i systemet er langt mer effektiv. Grepet sikrer at løsningen er klar for vekst og alltid har kapasitet til å utføre mange nye oppgaver.
status: |
  #### Dagens Aktiviteter

  * Oppdaget at måten systemet hentet informasjon på tvang programmet til å vente på ett svar om gangen. Dette førte til at ressurser ble låst, noe som kunne få hele applikasjonen til å stoppe opp hvis mange oppgaver kjørte samtidig.
  * Byttet ut det gamle verktøyet `requests` med `httpx`. Dette nye verktøyet gjør det mulig for programmet å utføre flere oppgaver samtidig i stedet for å stå i kø.
  * Skrev om de viktigste delene av koden med `async`. Dette gjør at systemet nå kan starte mange forespørsler på en gang uten å måtte vente på at den forrige er helt ferdig.
  * La til `await` i alle delene av systemet som henter informasjon. Dette sørger for at programmet kan sette en oppgave på pause mens det venter på svar, slik at det kan jobbe med andre ting i mellomtiden.
  * Bekreftet at programvaren nå frigjør plass og kraft mens den henter data. Dette gjør at systemet håndterer mer trafikk og oppleves som langt mer stabilt.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli
sources: ''
---

Den underliggende logikken i hovedklassen for Koblingspunkt-konfigurasjoner inneholdt et <abbr title="En metode der systemet må vente på at en oppgave blir ferdig før neste kan starte">synkront</abbr> <abbr title="Innhenting og utsending av informasjon">I/O</abbr>-kall, med denne teknikken ble ressursene låst til en oppgave om gangen, noe som kunne føre til at applikasjonen stoppet uventet ved høy belastning.

Målet er at programmet skal kunne håndtere flere forespørsler samtidig og frigjøre ressurser etter behov. Oppgaven var å erstatte det nåværende verktøyet `requests` med et <abbr title="en teknikk som lar programmet håndtere flere forespørsler samtidig">asynkront</abbr> bibliotek som `httpx`.

* De eksisterende funksjonene i API-hovedklassen ble omdefinert med nøkkelordet `async` for å tillate at funksjonen kan håndtere flere forespørsler.
* Jeg la til nøkkelordet `await` i klassene som benytter funksjonaliteten i hovedklassen for å sikrer at alle kallene til funksjonen nå kan sette oppgaver på pause uten å stoppe resten av programmet.

Ved å erstatte teknikkene for tjenestene, kan jeg stole på at systemet frigjør ressurser mens I/O-operasjoner pågår, programvaren kan nå håndtere flere forespørsler samtidig. Dette sikrer at flyten ikke lenger begrenses av kall til hovedklassen. De delene som henter informasjon fra hovedklassen er nå oppdatert med instruksjonen `await`, Dette forteller programmet at det skal vente på svar i bakgrunnen, slik at hele prosessen, flyter effektivt uten stans.

Denne oppgraderingen viser hvorfor asynkrone kall er avgjørende i moderne systemer som håndterer store mengder informasjon. Jeg har erfart at en slik struktur at programmet er aldri sterkere enn det svakeste leddetet.
Selv ett enkelt gammeldags vente-kall i bunnen av systemet kan skape en uventet oppførsel som hindrer hele applikasjonen i å vokse. Dette viser viktigheten av å velge moderne verktøy og biblioteker som støtter flere forespørsler samtidig, slik at programmet alltid har ressurser for nye oppgaver.
