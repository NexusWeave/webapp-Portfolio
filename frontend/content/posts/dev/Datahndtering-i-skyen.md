---
created: 2025-12-21T00:00:00.000Z
tags:
  - dev-journey
title: Datahåndtering i skyen
ingress: >
  I overgangen fra utvikling til lansering kreves det ofte et skifte i hvordan
  data håndteres for å sikre både skalering og sikkerhet. Denne artikkelen
  dokumenterer reisen fra en lokal SQLite-løsning til den skybaserte
  databaseplattformen Turso. Gjennom en teknisk gjennomgang belyses viktige
  arkitektoniske valg, som overgangen fra asynkron til synkron tilkobling
  grunnet driverbegrensninger i libSQL, samt implementering av robuste
  sikkerhetstiltak via miljøstyring. Ved å delegere infrastrukturansvaret til en
  Managed Service, legges grunnlaget for en mer stabil og kostnadseffektiv
  applikasjon, samtidig som det gir en dypere innsikt i SQLAlchemys
  fleksibilitet og begrensninger i et moderne sky-miljø.
star: >
  ### Migrering fra SQLite til Turso med SQLAlchemy


  #### Lokal lagring til Sky lagring


  SQL prosjektet har nådd et stadium der det er klar for lansering, som en
  konsekvens av dette var ikke det lenger hensisktsmessig løsning å lagre
  databasen lokalt. Det ble besluttet å migrere til Turso, en skybasert
  databaseplattform. Valget ble basert på to hovedkriterier .


  * Kostnadseffektivitet
    * Turso tilbyr en skalerbar modell som passer perfekt for utviklingsprosjekter uten høye drifskostnader.
  * Sikkerhet & Ansvar
    * Som en konsekvens av å bruke Managed Service delegeres ansvaret for datasikkerhet og infrastruktur til fagkynndige. Dette lar meg som utvikler fokusere på applikasjonslogikk framfor databaseadministrasjon.

  #### Fra Lokal Filsti til Nettverksbasert tilkobling


  Overgangen fra lokal SQLite-fil til Turso's libsql system endrer hvordan
  applikasjonene kommuniserer med dataene sine.


  * Autentisering & Tilgang
    * Tidligere var det nok å bare ha en relativ sti til databasen. Nå håndterer applikasjonen sikre og strenge tilkoblingsstrenger og Authentiserings Tokens for å få tilgang til databasen i skyen.
  * Protkollskifte
    * Turso bruke libSQL, som kommuniserer over HTTP/WebSockets. Dette krever at det blir brukt en unik driver, som støtter libSQL. Turso sine egen driver (21.12-25) støtter ikke asynkron tilkobling. Som er en konsekvens av at den asynkrone tilkoblingen må justeres fra asynkron tilkobling til synkron tilkobling, for å sikre stabilitet og kompatibilitet med libSQL-driveren i SQLAlchomy

  #### Omstrukturering og Infrastrukturoppsett


  For å gjennomføre migreringen fra lokal databaseplattfrom til sky basert
  databaseplattfrom ble det tatt tekniske grep 


  * Driver implementering
    * Installerte bibliotekenelibsql-client, sqlalchemy-libsql som gjorde det lettere for SQLAlchemy-motoren til å bruke den synkrone libSQL-dialekten og driveren, samløst.
  * Refaktorering
    * Justerte konfigurasjons-modulen for databasen ved å tilkoble med synkron kode, istedet for asynkron, Dette innebærer å bruke synkron engine, fjerne async og await referanser på selve tilkoblingsdetaljer.
  * Miljøstyring
    * Den sensitive dataen ble implementering i et eget .env-fil for å sikre at sensitiv data ikke ble eksponert

  #### En skyklar og stabil applikasjon


  Etter etableringen av den nye infrastrukturen og omstruktureringen av koden,
  fungerer datakommunikasjonen feilfri, ved hentig av data fra skyen. Ved  å
  akseptere den synkrone tilkoblingen har jeg oppnådd full kompatibilitet med
  Tursos økosystem, samtidig som ansvaret for datasikkerheten er flyttet til
  Tursos infrastruktur.


  #### Evaulering av den personlige fremdriften


  Gjennom å jobbe med migreringen til Turso, har jeg fått en enda dypere
  forståelse for SQLAlchemy sin infrastruktur, og begrensninger, samtidig fått
  en forståelse for deligering av database base ansvar til riktige entiteter.
  Jeg har også fått en repitisjon av både synkrone og asynkrone tilkoblinger, og
  forståelsen av å kunne veksle mellom disse basert på tilgjengelig verktøy og
  driverstøtte.


  #### Neste trinn


  De neste stegene er å sikre stabil og trygg tilkobling fra koden til databasen
  under selve produksjonssettingen og opplastning av nye repositorier, for å
  garantere at delen av tilkoblingen forblir synkron og stabil i det nye
  miljøet.
KildeHenvisning: ''
---

