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

Koblingspunktet for henting av prosjektene mine som ligger på <abbr title="En sky tjeneste for lagring av kodeark">Github</abbr>, brukte for lang tid på å hente alle prosjekter; dette er en konsekvens av at systemet må hente og formatere data x antall ganger hvor x er antall prosjekter. Dette bidrar til at informasjonen hentes tregere for besøkende. Under testingen oppsto det to utfordringer ved at tabellene ikke ble pålitelig lagret ved oppstart, og `APScheduler`-logikken ble ikke installert i applikasjonens livssyklus, som er en konsekvens av at mellomlagrings-dataene aldri blir oppdatert.

Målet var å redusere tiden for at prosjekter ble vist for besøkende, som gjorde at oppgaven ble todelt. Jeg måtte fjerne det direkte koblingspunktet mellom Github og hjemmesiden til fordel for et databaselag for å redusere ventetiden, samtidig som jeg måtte omgjøre applikasjonens livssyklus til den nye standarden for lifespan context manager som er introdusert i V2. Dette ble gjort for å redusere det tekniske etterslepet i applikasjonen og sikre at applikasjonens prinsipper blir fulgt, for å forbedre lesbarheten og gjøre applikasjonen vedlikeholdsvennlig.

* Jeg fjernet den direkte koblingspunktet mellom Github og hjemmesiden og heller la til et **databaselag** som er basert på <abbr title="Object-Rational-Mapping - et verktøy for å kartlegge SQL spørringer for programmering">Orm</abbr>'en**SQLAlchemy**, med  **SQLite** driver, for å lagre den formaterte Github-informasjonen, slik at frontend-applikasjonen kan hente data og redusere ventetiden før brukeren har tilgang til prosjektene.
* Jeg slo sammen tilleggsinformasjonen om prosjektene som video-, demo- og prosjekt-lenker inn i den nye databasen for å sikre enhetlig datalagring og fjerne sekundære kall.
* Jeg utviklet <abbr title="En strukturert mal på hvordan den lagrede informasjonen skal se ut">databasemodell</abbr>ene for Prosjektdata, Bidragsytere og Programmeringsspråk, samt assosiasjonstabeller for å håndtere relasjoner via SQLAlchemy som <abbr title="En teknikk som forenkler prosessen med å bytte database ved behov.">ORM</abbr>.
* Jeg fjernet den utdaterte `@app.on_event`-definasjonen og la til nøkkel ordet `async` til livvsyklusen slik at den håndterer flere forespørsler samtidig.
* Jeg la til en `try/except`-blokk der motoren brukes til å kjøre den synkrone DDL-kommandoen via `await conn.run_sync()` for å sikre integriteten til tabellopprettelsen.
* Jeg separerte livssyklusen fra bindeleddet mellom applikasjonen og brukerens forespørsel ut av hovedapplikasjonen og plasserte dem i en dedikert konfigurasjonsklasse for å sikre separasjon av ansvar (SRP).

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
```

Gjennom denne omgjøringen har jeg ryddet og effektivisert nettsiden, slik at nettsiden viser kode prosjektene mine, raskere. Utfordringen angående `ASPScheduler` og database instansen er nå løst, og refaktorereringen forenklet vedlikeholdet og forståelsen av hovedapplikasjonen enn tidligere version. Ved å flytte konfigurasjonsdetaljer ut av hovedapplikasjonsfilen reduseres teknisk etterslep, og applikasjonen har nå en universell struktur som er kompatibel med flere databasedrivere som `SQLite`, `PostgreSQL` og andre relasjonelle databaser.

Denne feilsøkingen har vist meg viktigheten av å bruke korrekt dokumentasjon for bibliotekversjonen man bruker, og  jeg har lagt merke til hvor viktig det er å bruke applikasjonens livssyklus for ressurskontroll, for å garantere at tredjepartsverktøy starter og ned stenges pålitelig. Prosessen demonstrerte den praktiske verdien av <abbr title ="Seperation of concern">SRP</abbr> prinsippet i en mikrotjenestearkitektur, og jeg har mestret å sette opp en universell SQLAlchemy ORM som sikrer at fremtidig utvikling forenkles betraktelig.
