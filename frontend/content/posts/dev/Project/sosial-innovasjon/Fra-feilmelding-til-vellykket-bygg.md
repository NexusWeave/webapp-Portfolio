---
date: 2025-12-24T00:00:00.000Z
title: Trygg og stabil oppstart av nettsidens redaktørpanel
ingress: |
  Ved å sikre  <abbr title="Et publiserings verktøy for bilder og tekst">redaktørpanelt</abbr> mot datainnbrudd har jeg lagt grunnlaget for en trygg og selvstendig drift. Jeg løste feil i <abbr title="Når koden utviklings koden skal oversettes til produksjons kode">kompileringen</abbr> ved å legge til en sikker håndtering av <abbr title ="Variabler i et isolert miljø">miljøvariabler</abbr> og sensitive tilgangsnøkler. Gjennom bruk av profesjonelle verktøy hindres lekkasje av konfidensiell data, samtidig som systemet er stabilisert. Dette har etablert en ny standard som forenkler videre utvikling og beskytter bedriftens digitale verdier.
status: |
  #### Dagens Aktiviteter

  * Oppdaget og analyserte et avbrudd i systemet som hindret redaktørpanelet i å koble seg trygt til skyen.
  * Implementerte verktøyet `dotenv-cli` for å sikre at sensitive passord og ID-nøkler hentes direkte fra en låst fil i stedet for å ligge åpent i koden.
  * Testet at systemet nå starter stabilt og at alle tilkoblinger er krypterte og beskyttet mot uønskede gjester.
  * Dokumenterte metoden som en ny sikkerhetsstandard for prosjektet for å hindre fremtidige menneskelige feil og spare tid ved videre utvikling.

  #### Motivasjon & Energi - 10 / 10

  Dagen har vært så fin den kan bli.
sources: ''
---

Det hadde tidligere blitt laget til et tilpasset <abbr title="Et publiserings verktøy for bilder og tekst">redaktørpanelt</abbr>, dette skulle hjelpe bedriften for å bli mer selvstendig og redusere behovet for teknisk hjelp. Da jeg skulle klargjøre dette systemet for bruk, oppstod det et avbrudd i <abbr title="Når koden utviklings koden skal oversettes til produksjons kode">kompileringen</abbr> som en konskekvens av systemet manglet digitale identifikasjoner og nøkler for å koble seg trygt til skyen. Jeg forsto at systemet ikke fant de nødvendige tilgangskodene i den lokale miljø-filen kalt <abbr title="En isolert fil som gjemmer sensitive nøkler">`**.env**`.</abbr>
Målet var å få systemet tilgjenglig på nett, uten at dette gikk utover sikkerheten. Oppgaven var å mate bedriftens plattform med disse hemmlige nøklene, på en måte de ikke er offentliggjort.

* Jeg installerte et hjelpeverktøy kalt <abbr title = "Et hjelpeverktøy i Node JS">`dotenv-cli`</abbr>, som har ansvaret for å finne `.env`-filen. Jeg endret også oppstartskommandoen slik at hjelpeverktøyet henter de sensitive nøklene og verdiene fra miljø filen og overleverer dem direkte til systemet i bygge fasen. Ved å bruke denne metoden sikret jeg at hemmlige nøkler ikke blir offentliggjort, ved å skrive de inn direkte i filen, dette holder systemet trygt for uønskede gjester.

Denne løsningen har sikret at nettsiden og innholdssystemet nå er stabilt og klart til bruk for organisasjonen. Jeg sikret at systemet finner nøklene samtidig som at systemet ikke offentliggjør disse nøklene, dermed beskytter jeg bedriften mot potensielle datainnbrudd og tap rundt dette. Verdien for videre utvikling av prosjektet er at jeg har etablert en ny sikkerhets standard, som gjør at fremtidige utviklere kan sette opp systemet raskt og trygt. Dette reduserer også risikoen for mennesklige feil i fremtiden.
