---
date: 2025-12-06T00:00:00.000Z
title: Smartere lagring forbedrer flyten i nettsiden
ingress: |
  For å gi besøkende en rask opplevelse har jeg fjernet ventetiden ved visning av mine prosjekter. Ved å lage et eget digitalt arkiv som samler alt på ett sted, slipper nettsiden å hente informasjon fra andre steder hver gang man trykker på en lenke. Systemet rydder og oppdaterer seg nå automatisk om natten når det er få brukere. Dette gir en ryddig og effektiv nettside som alltid viser frem siste nytt uten irriterende venting.
status: |
  #### Program informasjon

  Frontend - NUXT

  **Applikasjon** : FastAPI

  **ORM** -  SQLAlchemy

  **Bibliotek** - APScheduler

  #### Dagens Aktiviteter

  * Fjernet direkte kobling mellom GitHub koblings punktet og frontend for å fjerne ventetid.
  * Satt opp et nytt databaselag med `SQLAlchemy` og `SQLite` for lokal mellomlagring av data.
  * la til tilleggsdata direkte i databasen for å samle alt på ett sted.
  * Utviklet tre hovedmodeller for datalaget
    * Prosjektdata,
    * Bidragsytere,
    * Programmeringsspråk.
  * La til to assosiasjonstabeller for å håndtere relasjoner mellom disse.
  * Gjennomført engangshenting, formatering og lagring av rådata fra GitHub i det nye systemet.
  * Konfigurert APScheduler for daglig synkronisering av data (planlagt mellom kl. **02:00** – **05:00**) for å sikre ferske data uten belastning på dagtid.
  * Klargjort logikken for produksjon og verifisert at ORM-strukturen er kompatibelt med andre database systemer.

  #### Motivasjon & Energi - 10/10

  Dagen er så fin den kan bli
sources: ''
---

Koblingspunktet for henting av prosjektene mine som ligger på <abbr title="En sky tjeneste for lagring av kodeark">Github</abbr>, brukte for lang tid på å hente alle prosjekter; dette er en konsekvens av at systemet må hente og formatere data x antall ganger hvor x er antall prosjekter. Dette bidrar til at informasjonen hentes tregere for besøkende. Under testingen oppsto det to utfordringer ved at tabellene ikke ble pålitelig lagret ved oppstart, og APScheduler-logikken ble ikke installert i applikasjonens livssyklus, som er en konsekvens av at mellomlagrings-dataene aldri blir oppdatert.

Målet var å redusere tiden for at prosjekter ble vist for besøkende, som gjorde at oppgaven ble todelt. Jeg måtte fjerne det direkte koblingspunktet mellom Github og hjemmesiden til fordel for et databaselag for å redusere ventetiden, samtidig som jeg måtte omgjøre applikasjonens livssyklus til den nye standarden for lifespan context manager som er introdusert i V2. Dette ble gjort for å redusere det tekniske etterslepet i applikasjonen og sikre at applikasjonens prinsipper blir fulgt, for å forbedre lesbarheten og gjøre applikasjonen vedlikeholdsvennlig.

* Jeg fjernet den direkte koblingspunktet mellom Github og hjemmesiden og heller la til et **databaselag** som er basert på <abbr title="Object-Rational-Mapping - et verktøy for å kartlegge SQL spørringer for programmering">Orm</abbr>'en**SQLAlchemy**, med  **SQLite** driver, for å lagre den formaterte Github-informasjonen, slik at frontend-applikasjonen kan hente data og redusere ventetiden før brukeren har tilgang til prosjektene.
* Jeg slo sammen all tilleggsinformasjon om prosjektene som video-, demo- og prosjekt-lenker direkte inn i den nye databasen for å sikre enhetlig datalagring og fjerne sekundære kall.
* Utviklet <abbr title="En strukturert mal på hvordan den lagrede informasjonen skal se ut">databasemodell</abbr>ene for Prosjektdata, Bidragsytere og Programmeringsspråk, samt assosiasjonstabeller for å håndtere relasjoner via SQLAlchemy som <abbr title="En teknikk som forenkler prosessen med å bytte database ved behov.">ORM</abbr>.
* Slo sammen all tilleggsinformasjon om prosjektene som video-, demo- og prosjekt-lenker direkte inn i den nye databasen for å sikre enhetlig datalagring og fjerne sekundære kall.
* Konfigurert APScheduler for daglig synkronisering av data (planlagt mellom kl. 02:00 – 05:00) for å sikre ferske data uten belastning på dagtid.
* Fjernet den utdaterte `@app.on_event`-definasjonen og implementerte den nye lifespan-metoden som en asynkron context manager.
* Implementerte en try/except-blokk der den asynkrone motoren brukes til å kjøre den synkrone DDL-kommandoen via `await conn.run_sync()` for å sikre integriteten til tabellopprettelsen.
* Trakk lifespan-funksjonaliteten og middleware-instansene ut av hovedapplikasjonen og plasserte dem i en dedikert konfigurasjonsklasse for å sikre separasjon av ansvar (SRP).

```python
@asynccontextmanager
async def lifespan_function(app:FastAPI):
  try:
    #  Database Initialization
    async with DB_INSTANCE.engine.begin() as conn:
      await conn.run_sync(BASE.metadata.create_all)
        
  except Exception as e:
    raise e

  await DB_INSTANCE.connection

  #  Scheduler Start up 
  SCHEDULER = AsyncIOScheduler()
  SchedulerConfig().configure_jobs(SCHEDULER)
  SCHEDULER.start()
  
  yield

  SCHEDULER.shutdown()

#  Initialize FastAPI app.
app = FastAPI(lifespan=lifespan_function)

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

# Teknisk Logg: Smartere lagring og moderne livssyklushåndtering


### Oppgave

### Handling

```
