---
date: 2025-12-01T00:00:00.000Z
title: Omgjøring fra Ustandardisert Logikk til ORM
ingress: |
  Jeg har modernisert datalaget ved å legge til biblioteket **SQLAlchemy** og gå fra en ustandardisert logikk over til en <abbr title="Object-Relational Mapping. En programmeringsteknikk som lar deg kommunisere med en relasjonsdatabase ved hjelp av Objekt orientert kode">**ORM**</abbr>-basert struktur. Ved å etablere <abbr title="Data Access Object er et designmønster som brukes for å skille forretningslogikk fra datatilgang">DAO-lag</abbr> som skiller databaseoperasjoner fra forretningslogikken, har jeg forbedret kodekvaliteten og vedlikeholdbarheten betydelig. Omgjøringen innebar et oppsett av Motor- og økt instanser samt definisjon av modeller. Resultatet er en ryddigere arkitektur som sikrer robust databaselogikk og følger moderne Python-standarder for profesjonell utvikling.
status: |
  #### Dagens Aktiviteter

  * Erstattet utdatert databaselogikk med en moderne bransjestandard for å sikre et pålitelig og fremtidsrettet system.
  * Skilte tekniske databaseoppgaver fra systemets logikk, noe som gjør løsningen modulær og reduserer risikoen for følgefeil ved fremtidige endringer.
  * Forenklet malen for håndtering av informasjon <abbr title="Create, Read, Update & Delete. De fire grunnleggende operasjonene for å håndtere data i databaser.">CRUD</abbr>, som sikrer lik praksis i hele koden og gjør den enklere for andre utviklere å forstå
  * Etablerte nye og sikre koblingspunkter mot databasen for mer effektiv trafikkflyt og høyere stabilitet.
  * Definerte objektorienterte modeller som sørger for at dataene alltid samsvarer med systemets krav, noe som minimerer faren for logiske feil.
  * Fjernet teknisk gjeld og klargjorde arkitekturen for automatiserte tester, slik at fremtidige oppdateringer kan rulles ut med høyere trygghet.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli !
sources: ''
---

Systemets måte å kommunisere med databasen på var utdatert. Selv om det fungerte, var det ikke et pålitelig system. Dette gjorde det vanskelig å vedlikeholde koden og økte risikoen for feil hver gang jeg skulle gjøre endringer eller legge til ny funksjonalitet.

Målet mitt var å bygge om dette systemet ved hjelp av bransjestandarden <abbr title="Et ORM basert bibliotek i programmeringsspråket python">`SQLAlchemy`</abbr>. Oppgaven handlet om å standardisere hvordan data lagres og hentes, slik at systemet er pålitelig, forenkle den tiden det tar for at andre kan sette seg inn i koden, og klargjør tjenesten for fremtidig vekst.

* Jeg separerte de tekniske databaseoppgavene fra selve forretningslogikken. Dette betyr at om vi endrer på databasen, påvirker det ikke resten av systemet.
* Med hjelp av <abbr title="Et python basert bibliotek, som validerer kode">`Pydandic`</abbr>-modeller har jeg  laget en felles mal for hvordan jeg legger til, leser eller sletter informasjon, som sikrer lik praksis i hele løsningen.
* Jeg satte opp nye, trygge koblingspunkter mot databasen som håndterer trafikken mer effektivt.
* Jeg sørget for at dataene i databasen alltid stemmer overens med slik systemet forventer å se dem, som reduserer sjansen for logiske feil.

Jeg har nå fjernet teknisk rot og sitter igjen med en ryddigere og mer stabil plattform. Dette reduserer behovet for å vedlikeholde koden og gjør det tryggere å rulle ut nye oppdateringer. Systemet er nå også klargjort for automatiserte tester, for å sikre at funksjonaliteten gir et ønsket resultat.

Gjennom denne prosessen har jeg fått erfart verdien av prinsippet om å skille bekymringer ved bruk av <abbr title="Data Access Object">DAO</abbr>-mønsteret. Jeg har fått en dypere forståelse for hvordan `SQLAlchemy` og `Pydantic` sammen skaper en kontrakt-basert lag mellom kode og database, som reduserer logiske feil. Den viktigste erfaringen er at investering i arkitektur tidlig reduserer teknisk gjeld og gjør systemet klargjort  for både samarbeid og automatisert testing.
