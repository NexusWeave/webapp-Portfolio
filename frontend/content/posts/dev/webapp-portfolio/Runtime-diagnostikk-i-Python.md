---
created: 2025-12-21T00:00:00.000Z
tags:
  - dev-journey
title: Runtime-diagnostikk i Python
ingress: >
  I kjølvannet av database-migreringen til Turso oppsto utfordringer i
  applikasjonens API-logikk, manifestert som en `500 Internal Server Error`.
  Denne artikkelen dokumenterer diagnostiseringen og rettingen av en "Breaking
  Change" i objekt-instansieringen, der en uoverensstemmelse mellom
  klasse-definisjon og parameter-kall i Python førte til systemstans. Ved å
  bruke målrettet logging for å synkronisere navngivningen i `LanguageModel`,
  ble datastrømmen mellom GitHub og Turso gjenopprettet. Erfaringen gir
  verdifull innsikt i behovet for nøyaktighet i dynamiske språk og moderne
  ORM-verktøy, og markerer overgangen til neste fase: Profesjonalisering av
  driften gjennom deployment til Google Cloud Run.
star: >
  ### Håndtering av Breaking Change og veien mot Google Cloud Run


  #### Hindring i API-integrasjon


  Etter å ha etablert tilkoblingen til Turso-databasen, kom det en ny hindring i
  APIet som henter github repositoriene. Applikasjonen sendte en 500 error som
  indikerer på at det er serveren som feilet. 


  #### Utdrag fra Logg


  Loggen avslørte følgende teknisk utfordring.


  TypeError: 'language' is an invalid keyword argument for LanguageModel


  #### Parameter-konflikt


  En `500 Internal Server Error` er en generell betegnelse på at det oppstår en
  konflikt på serversiden. Ved å grave dypere inn i loggene ble denne feilen
  spesifisert med en `TypeError `knyttet til objekt-initialiseringen.


  * **Identifisering av Breaking Change**
    * Den spesifikke feilmeldingen ‘language’ is an invalid keyword argument indikerer på at applikasjonen forsøker å sende inn et parameter som LanguageModel- klassen ikke aksepterer
  * Konsekvens av Breaking Change
    * Dette oppsto som en konskevens av å forandre LanguageModel-klassen, uten at instaniseringen av modellen ikke ble oppdatert. Python er et dynamisk språk, da oppdages ikke slike uheld før koden faktisk kjører. Dette førte til at instanseringen av et nytt språk objekt kresjet før det hele tatt fikk instansere objektet.

  #### Oppdatering av objekt-instansieringen


  Før å løse denne konflikten og eliminere 500-feilen, ble det korrigert i
  parameterene som instanserere de nye Language-objektene


  * Synkronisering av klasse og kall
    * Ved å erstatte det utdaterte argumentet language med lang i instansierings prosessen, samsvarte argumentet med det nye argumentet i LanguageModel-klassen.
  * Målrettet diagnosering
    * Ved hjelp av å bruke programvare loggene ble den nøyaktige feilmeldingen identifisert som gjorde det mulig å utførre en målrettet retting uten å påvirke resten av endepunkt logikken.

  #### Datastrømmen fra Github til Turso ble Gjenopprettet


  Rettingen førte til at API-et umiddelbart satbiliserte seg. Ved å synkronisere
  navngivningen mellom klassedefinasjon og instansieringen, ble datastrømmen fra
  Github til Turso gjenopprettet.


  #### Læring om nøyaktighet og logging


  Gjennom denne diagnosieringen, har jeg erfart at moderne ORM-verktøy krever
  nøyaktighet, i instanseringsprossesen. Erfaringen understreker også hvor
  viktig det er å ha loggingspunkter i koden spessielt i feilmeldinger. Gode
  logger forkorter tiden fra diagnose til løsning drastisk.


  Dette har gitt meg en dypere forståelse for hvordan endringer i en del av
  arkitekturen krever koordinerte oppdateringer i logikken.


  #### Neste steget for Applikasjonen


  Neste steget er å publisere  backend delen av applikasjonen til en tjeneste
  som Google Cloud Run, for deligere oppgaven om å kjøre koden til fagkyndige
  bedrifter i server-infrastrukturer
KildeHenvisning: ''
---

