---
date: 2025-12-07T00:00:00.000Z
title: Feilsøking av SQLAlchomy Persistering & FastAPI Livssyklus
ingress: |
  En feil ble identifisert der SQLAlchemy ORM-tabeller ikke ble pålitelig
  persistert ved oppstart av FastAPI-applikasjonen. Utfordringen var å sikre at
  synkron DDL-logikk (create\_all) ble utført i det asynkrone miljøet. Aksjonen
  involverte implementering av den korrekte asynkrone kommandoen
  (conn.run\_sync), men forsøket mislyktes. Konsekvensen av dette ble sporet til
  bruken av den forkastede (deprecated) livssyklushendelsen.
  @app.on\_event('startup'). Dette understreker  læringen om nødvendigheten av å
  følge med på rammeverkets utvikling, for robust håndtering av asynkrone
  ressurser og databaseinitiering i FastAPI.
status: ''
sources: ''
---

Applikasjon : `FastAPI`

``<abbr title="Object-Relation Mapping - en teknikk som kartlegger SQL-spørringer i programmering">ORM</abbr>: `SQLAlchemy`

Som det ble dokumentert i den tidligere loggen *[Smartere lagring forbedrer flyten i nettsiden](https://krigjo25.no/logs/records/implementering-av-vedvarende-caching-med-sqlalchemy-og-sqlite/)*, ble det identifisert en feil i hvordan database-tabellene alikavel ikke ble pålitelig lagret ved applikasjonsstart. Dette forhindret at systemet ikke lagret dataene fra koblingspunktene. De identifiserte feilene indikerer på en ukorrekthet i oppstartslogikken til applikasjonens livssyklushendelse.

Målet er å sikre at ORM-en klargjør de nødvendige databasetabellene før applikasjonen begynner å behandle forespørsler. Dette sikrer at mellomlagringen gir brukerene den raske opplevelsen som er forventet i en moderne nettside.

* For at livssyklusen til applikasjonen kan behandle flere forespørsler samtidig, ble det lagt til nøkkelordet `async` for at livssyklusen, kan håndtere flere forespørsler

```python
# FastAPI v1
@app.on_event("startup")
async def livssyklus_oppstart(app:FlaskAPI):
```

* For å gjøre systemet mer oversiktlig, har jeg samlet all database-logikk i en felles kjerne. Dette gjør det mulig å styre hele databasen fra ett sentralt punkt i systemet.
* Jeg la også  inn en sikkerhetsmekanisme som `try-except` blokk som forsøker å klargjøre alle tabellene når programmet starter.

```python

  try:
    async with SQLACHOMYDRIVER_INSTANCE.engine.begin() as conn:
      await conn.run_sync(BASE.metadata.create_all)
  except Exception as ex:
    # Håndter potensielle feil, slik at systemet ikke krasjer.
```

Forsøket på å sikre databaselagringen mislyktes i første omgang, da databasetabellene ikke ble opprettet pålitelig ved applikasjonsstart. Dette viste seg å være en konsekvens av at livssyklushendelsen `@app.on_event('startup')` er utdatert i moderne versjoner av rammeverket. Denne metoden er ikke en funksjonaitet forhåndtering av opprettelser av tabeller, noe som førte til en kritisk i oppstartingsfasen.

Erfaringen bekrefter at selve kommandoen for å klargjøre databasen, `await conn.run_sync(BASE.metadata.create_all)`, var korrekt programmert, men at den var plassert i et uegnet miljø. Løsningen ble derfor å flytte logikken over til en moderne livssyklus kontekst. Ved å bruke denne metoden sikrer vi en trygg håndtering av asynkrone ressurser, som database-initiering og tilkoblingspooler, før applikasjonen åpnes for trafikk. Dette understreker nødvendigheten av å følge tett med på utviklingen i rammeverket for å sikre en stabil og fremtidsrettet løsning.
