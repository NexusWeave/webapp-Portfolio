---
created: 2025-12-06T00:00:00.000Z
tags:
  - dev-journey
title: Implementering av Vedvarende Caching med SQLAlchemy og SQLite
ingress: >
  En ytelsesutfordring ble identifisert der API-responsen for GitHub-data førte
  til uakseptabel høy latens (**O**(**n**)-kompleksitet) i FastAPI. For å løse
  dette ble det initiert et prosjekt for å implementere et vedvarende
  databaselag basert på SQLAlchemy (med SQLite-driver), målet var å cache
  eksterne data og eliminere sekundære kall. Backend-infrastrukturen er nå
  fullført, inkludert detaljert relasjonsdesign og en APScheduler-basert
  synkroniseringsmekanisme for lavtrafikkperioder. Status: Til tross for
  vellykket arkitektur, ble det under testing avdekket to feil knyttet til
  databasepersistering ved oppstart og APScheduler-integrasjon i
  FastAPI-livssyklusen. Prosessen har gitt dyp faglig læring i universell
  ORM-oppsett og viktigheten av korrekt håndtering av applikasjonens
  Startup-hendelser.
star: >
  ## Latens og Skalerbarhet


  API-responsen for henting av Github repository data i FastAPI applikasjonen
  viste en **uakseptabel høy latens**, dette er en direkte konsekvens av
  **asynkrone kall til Github REST API**, der henting og formatering av data tok
  **estimert O**(**n**) **tid**, hvor **n** er antall repositories. Denne
  tidskompleksiteten var ugunstig for brukeropplevelsen og skalerbarheten.


  ### Eliminering av den direkte avhengigheten til Github API for forespørsler
  og redusere responstiden. Dette gjorde at oppgaven ble todelt.


  #### Caching Implementering


  Etablere et **databaselag** som er bassert på SQLAlchomy, med  SQLite driver,
  for å lagre den formaterte Github-informasjonen, slik at NUXT-applikasjonen
  kan hente data med minimal ventetid.


  #### Datasentralisering


  Migrere all tilleggsinformasjon  som videoer og demo-lenker direkte inn i den
  nye databasen for å sikre enhetlig datalagring og eliminere sekundære kall.


  ### Etablering av Vedvarende Caching-Lag


  #### Database oppsett og avhengigheter


  De nødvendige avhengighetene for SQLAlchemy som ORM ble importert og
  Database-modellene ble bygget for å sikre riktig datastruktur og relasjoner.


  #### Databasemodellering og Relasjonsdesign


  For å sikre en robust database arkitektur, ble det implementert fem database
  modeller, for å lagre og koble informasjonen med hverandre.


  * en for å lagre repositorydata (Primær-tabell),

  * en for å lagre de unike programmeringsspråkene,

  * en for å lagre informasjon om bidragytere.


  Det ble også laget to assosiasjonstabeller for å håndtere relasjonene mellom
  dataen som var kommet inn.


  * En for å assosiere kodespråkene med repositories,

  * en for å assosiere bidragsytere med repositories.


  #### Datainnlastning og Periodisk Synkronisering


  Det tidskrevende O(n)-kallet til Github ble utført i et kontrollert miljø en
  gang for å hente de nødvendige dataene. Disse rådataene ble deretter formatert
  og lagret i de nydesignede databasetabellene.


  [APSchedule](https://pypi.org/project/APScheduler/) ble valgt for å sette opp
  periodiske jobber. Disse jobbene kjører daglig mellom kl 02:00 og 05:00 , et
  tidspunkt valgt som en konsekvens av lavest forventede trafikktrykk. Dette
  sikrer at databasen holdes oppdatert uten å påvirke front-end ytelsen.


  #### Status oppdatering og FeilIdentifisering


  Backend-caching-infrastrukturen er fullført og klar for konsum, men det
  gjenstår å koble til NUXT-applikasjonen. Dette er det siste steget som skal
  gjøres etter at de Identifiserte feilene har blitt fikset.


  Under testingen oppsto det to feil i FastAPI-applikasjonen


  * Databasene har blitt opprettet, men tabellene ble ikke pålitelig lagret ved
  oppstart

  * APScheduler-loggikken for periodisk synkronisering har blitt definert, men
  loggmeldingene bekrefter at funksjonaliteten ikke ble initiert ved oppstart.
  Dette indikerer på at scheduler-logikken ikke blir presistert i
  FastAPI-applikasjonens livssyklus.


  #### ORM-forståelse og Presisering av Livssyklus


  Prosjektet har gitt en dypere innsikt i SQLAlchomy ORMs funksjonalitet og
  arkitektur. Spesielt ble viktigheten av å sette opp en universell OMR-struktur
  som er kompatibel med flere database-drivere som ( SQLite, PostgresSQL,
  MariDB, o.l) understreket.


  Feilidentifseringen har synliggjort rollen til Startup og Shutdown-hendelser i
  FastAPI, spesielt ved integrering av databasemodeller og tredjeparts
  planleggere (APScheduler)


  Jeg har lært å forstå hvordan SQLAlchomy ORMen fungerer, og lært å sette opp
  en unviersell SQLAlchomy ORM, som kan brukes på flere database drivere.
KildeHenvisning: ''
---

