---
date: 2025-12-24T00:00:00.000Z
tags:
  - dev-journey
title: Trygg og stabil oppstart av nettsidens redaktørpanel
ingress: >
  Gjennom smart bruk av sikkerhetsverktøy i nettsidens redaktørpanel sikrer vi
  at hemmelige tilgangskoder ikke lenger er tilgjenglige for uønskede gjester,
  samtidig som den gjør det både raskere og tryggere for teamet å jobbe videre
  med nettsiden.
parade: ''
star: >
  I prosjektet brukes det et redaktørpanel som kalles for TinaCMS for at kunden
  skal kunne håndtere tekst og bilder på nettsiden for prosjektet. Da jeg skulle
  klargjøre dette systemet for bruk, oppstod det et avbrudd i oversettelsen som
  en konskekvens av systemet manglet digitale nøkler (Identifikasjon og passord
  ) for å koble seg trygt til skyen.


  Min oppgave var å få systemet på nett uten at dette skulle gå utover
  sikkerheten. Utfordringen var å mate systemet med disse hemmlige nøklene slik
  at de ikke er offentliggjort.


  *  Jeg forsto at systemet ikke fant de nødvendige tilgangskoedne i den lokale
  låste filen kalt .env.

  * Jeg installerte et hjelpeverktøy kalt dotenv-cli og endret
  oppstartskommandoen slik at hjelpeverktøyet henter de sensitive nøklene og
  verdiene fra den låste filen  og overleverer dem direkte til systemet i bygge
  fasen. Ved å bruke denne metoden sikret jeg for at ingen passord ble delt
  offentlig ved å skrive de inn direkte i filen, dette holder systemet trygt for
  uønskede gjester.


  Denne løsningen har sikret at nettsiden og innholdssystemet nå er stabilt og
  klart til bruk for organisasjonen. Jeg fjernet risikoen for at sensitive
  tilgangskoder blir stjålet og dermed beskytter jeg bedriften mot potensielle
  datainnbrudd og økonomiske tap rundt dette. Det har også blitt etablert en ny
  standard for sikkerhet som gjør at fremtidge utvikler kan sette opp systemet
  raskt og trygt. Dette sparer tid og reduserer risikoen for mennesklige feil i
  fremtiden.
sources: ''
---

**Dagens agenda**

* Oppdaget og analyserte et avbrudd i systemet som hindret redaktørpanelet (TinaCMS) i å koble seg trygt til skyen.
* Implementerte verktøyet `dotenv-cli` for å sikre at sensitive passord og ID-nøkler hentes direkte fra en låst fil i stedet for å ligge åpent i koden.
* Testet at systemet nå starter stabilt og at alle tilkoblinger er krypterte og beskyttet mot uønskede gjester.
* Dokumenterte metoden som en ny sikkerhetsstandard for prosjektet for å hindre fremtidige menneskelige feil og spare tid ved videre utvikling.

Motivasjon og energi - 10 / 10

Dagen har vært så fin den kan bli.
