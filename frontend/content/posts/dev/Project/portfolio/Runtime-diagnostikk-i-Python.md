---
date: 2025-12-21T00:00:00.000Z
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
star: |
sources: ''
---

Etter å ha etablert tilkoblingen til Turso-databasen, kom det en ny hindring i APIet som henter github repositoriene. Applikasjonen sendte en 500 error som indikerer på at det er serveren som feilet.  Loggen avslørte følgende teknisk utfordring. `TypeError: 'language' is an invalid keyword argument for LanguageModel`

En <abbr title="En generell konflikt på serversiden">`500 Internal Server Error`</abbr> oppstod. Ved å grave dypere inn i loggene ble denne feilen spesifisert med en `TypeError `knyttet til objekt-initialiseringen. Den spesifikke feilmeldingen `language is an invalid keyword argument` indikerer på at applikasjonen forsøker å sende inn et parameter som LanguageModel- klassen ikke aksepterer. Dette oppsto som en konskevens av å forandre `LanguageModel`-klassen, uten at instaniseringen av modellen ikke ble oppdatert. Python er et dynamisk språk, da oppdages ikke slike uheld før koden faktisk kjører. Dette førte til at instanseringen av et nytt språk objekt kresjet før det hele tatt fikk instansere objektet.

Før å løse denne konflikten og eliminere 500-feilen, ble det korrigert i parameterene som instanserere de nye Language-objektene
* Ved å erstatte det utdaterte argumentet language med lang i instansierings prosessen, samsvarte argumentet med det nye argumentet i LanguageModel-klassen.
* Ved hjelp av å bruke programvare loggene ble den nøyaktige feilmeldingen identifisert som gjorde det mulig å utførre en målrettet retting uten å påvirke resten av endepunkt logikken.

Rettingen førte til at API-et umiddelbart stabiliserte seg. Ved å synkronisere navngivningen mellom klassedefinisjon og instansieringen, ble datastrømmen fra GitHub til Turso gjenopprettet.

Gjennom denne diagnostiseringen har jeg erfart at moderne ORM-verktøy krever nøyaktighet i instansieringsprosessen. Erfaringen understreker også hvor viktig det er å ha loggingspunkter i koden, spesielt i feilmeldinger, da gode logger forkorter tiden fra diagnose til løsning drastisk. Dette har gitt meg en dypere forståelse for hvordan endringer i en del av arkitekturen krever koordinerte oppdateringer i logikken.

Neste steg er å publisere backend-delen av applikasjonen til en tjeneste som Google Cloud Run. På denne måten kan jeg delegere oppgaven om å kjøre koden til fagkyndige bedrifter med spesialisert server-infrastruktur.