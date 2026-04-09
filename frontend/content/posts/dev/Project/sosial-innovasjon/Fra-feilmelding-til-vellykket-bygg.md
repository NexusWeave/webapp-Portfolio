---
tags:
  - dev-journey
date: 2025-12-24T00:00:00.000Z
title: Trygg og stabil oppstart av nettsidens redaktørpanel
ingress: |
  Gjennom smart bruk av sikkerhetsverktøy i nettsidens redaktørpanel sikrer vi at hemmelige tilgangskoder ikke lenger er tilgjenglige for uønskede gjester, samtidig som den gjør det både raskere og tryggere for teamet å jobbe videre med nettsiden.
parade: ''
star: |
  for at kunden skulle håndtere tekst og bilder på nettsiden sin har det tidligere blitt laget et redaktørpanel (CMS), da jeg skulle klargjøre dette systemet for bruk, oppstod det et avbrudd i oversettelsen som en konskekvens av systemet manglet digitale nøkler (Identifikasjon ID og passord ) for å koble seg trygt til skyen.

  Min oppgave var å få systemet tilgjenglig på nett, uten at dette går utover sikkerheten. Utfordringen var å mate publiseringsverktøyet  med disse hemmlige nøklene slik at de ikke er offentliggjort.

  * Jeg forsto at systemet ikke fant de nødvendige tilgangskoedne i den lokale miljø filen kalt **`.env`**.
  * Jeg installerte et hjelpeverktøy kalt `dotenv-cli`, som har ansvaret for å finne `.env`-filen.  og  jeg endret oppstartskommandoen slik at hjelpeverktøyet henter de sensitive nøklene og verdiene fra miljø filen  og overleverer dem direkte til systemet i bygge fasen. Ved å bruke denne metoden sikret jeg at hemmlige nøkler ikke blir offentliggjort, ved å skrive de inn direkte i filen, dette holder systemet trygt for uønskede gjester.

  Denne løsningen har sikret at nettsiden og innholdssystemet nå er stabilt og klart til bruk for organisasjonen. Jeg sikret at systemet finner nøklene samtidig som at systemet ikke offentliggjør disse nøklene, dermed beskytter jeg bedriften mot potensielle datainnbrudd og økonomiske tap rundt dette. Verdien for videre utvikling av prosjektet er at jeg har etablert en ny sikkerhets standard, som gjør at fremtidige utviklere kan sette opp systemet raskt og trygt. Dette reduserer også risikoen for mennesklige feil i fremtiden.
sources: ''
---

**Dagens Aktiviteter**

* Oppdaget og analyserte et avbrudd i systemet som hindret redaktørpanelet i å koble seg trygt til skyen.
* Implementerte verktøyet `dotenv-cli` for å sikre at sensitive passord og ID-nøkler hentes direkte fra en låst fil i stedet for å ligge åpent i koden.
* Testet at systemet nå starter stabilt og at alle tilkoblinger er krypterte og beskyttet mot uønskede gjester.
* Dokumenterte metoden som en ny sikkerhetsstandard for prosjektet for å hindre fremtidige menneskelige feil og spare tid ved videre utvikling.

**Motivasjon** & **Energi** - **10** / **10**

Dagen har vært så fin den kan bli.
