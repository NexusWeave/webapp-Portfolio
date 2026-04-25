---
date: 2025-12-06T00:00:00.000Z
title: Implementering av Vedvarende Caching med SQLAlchemy og SQLite
ingress: ''
status: |
  #### Dagens Aktiviteter

  #### Motivasjon & Energi - 10/10

  Dagen er så fin den kan bli
sources: ''
---

Koblingspunktet for henting av prosjektene mine som ligger på Github  i `FastAPI` applikasjonen brukte for lang tid på å hente alle prosjekter; dette er en konsekvens av at systemet må hente og formatere data x antall ganger hvor x er antall prosjekter. Dette bidrar til at informasjonen hentes tregere for besøkende

Målet var å redusere tiden for at prosjekter ble vist for besøkende, som gjorde at oppgaven ble todelt.

* Jeg fjernet det direkte koblingspunktet mellom Github og hjemmesiden og heller la til et **databaselag** som er basert på **SQLAlchemy**, med  **SQLite** driver, for å lagre den formaterte Github-informasjonen, slik at NUXT-applikasjonen kan hente data med minimal ventetid.
* Jeg slo sammen all tilleggsinformasjon om prosjektene som video-, demo- og prosjekt-lenker direkte inn i den nye databasen for å sikre enhetlig datalagring og fjerne sekundære kall.

For å legge til vedvarende caching, gjorde jeg som følgende:

* Jeg utviklet <abbr title="En strukturert mal på hvordan den lagrede informasjonen skal se ut">databasemodell</abbr>ene for å sikre datastrukturen og relasjoner mellom tabellene og importerte de nødvendige avhengighetene for SQLAlchemy som <abbr title="En teknikk som forenkler prosessen med å bytte database ved behov.">ORM</abbr>.

For å sikre at systemet er pålitelig, la jeg til tre databasemodeller, for å lagre og koble informasjonen med hverandre.

* En for å lagre prosjektdata, dette er den primære modellen,
* En for å lagre de unike programmeringsspråkene,
* En for å lagre informasjon om bidragsytere.

Jeg la til to assosiasjonstabeller som håndterer relasjonene mellom dataen som var kommet inn.

* En for å assosiere kodespråkene for hvert prosjekt,
* En for å assosiere bidragsytere for hvert prosjekt.

Det tidskrevende koblingspunktet til Github ble utført i et kontrollert miljø en gang for å hente de nødvendige dataene. Disse rådataene ble deretter formatert og lagret i de nye databasetabellene.  [APScheduler](https://pypi.org/project/APScheduler/) ble valgt for å sette opp periodiske jobber, som en konsekvens av at programmet har en stor fleksibilitet i tidsstyringen og støtte for teknikken for å kjøre flere forespørsler samtidig. Disse jobbene kjører daglig mellom kl **02:00** - **05:00** , et tidspunkt valgt for å redusere ressursbruken. Dette sikrer at databasen holdes oppdatert uten å påvirke front-end ytelsen.

Logikken for caching i infrastrukturen er fullført og klargjort for produksjon, men det gjenstår å koble logikken mot NUXT-applikasjonen. Dette er det siste steget som skal gjøres etter at de Identifiserte feilene har blitt fikset.

Under testingen oppsto det to utfordringer i FastAPI-applikasjonen

* Databasene har blitt opprettet, men tabellene ble ikke pålitelig lagret ved
  oppstart.
* `APScheduler`-logikken for periodisk synkronisering har blitt definert, men loggmeldingene bekrefter at funksjonaliteten ikke ble installert ved oppstart. Dette indikerer at `APScheduler`-logikken ikke blir lagret i applikasjonens livssyklus.

Gjennom denne omgjøringen har prosjektet gitt meg en innsikt i `SQLAlchemy` ORMs funksjonalitet og struktur.  Jeg ble spesielt oppmerksom på viktigheten av å sette opp en universell struktur som er kompatibel med flere databasedrivere som ( `SQLite`, `PostgreSQL`, `MariaDB`, o.l). Feilidentifiseringen har synliggjort rollen til Startup og Shutdown-hendelser i FastAPI, spesielt ved integrering av databasemodeller og tredjeparts planleggere Jeg forstår nå hvordan SQLAlchemy ORMen fungerer, og lært å sette opp en universell SQLAlchemy ORM, som kan brukes på flere databasedrivere.
