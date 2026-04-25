---
date: 2025-12-07T00:00:00.000Z
title: Overgang til moderne livssyklus for database
ingress: |
  For å sikre en stabil nettside har jeg fornyet måten systemet starter opp på. Ved å flytte viktige forberedelser til en moderne løsning, unngår vi nå tekniske feil som tidligere gjorde siden treg og ustabil. Jeg har samlet styringen på ett sted og lagt inn sikkerhetsmekanismer som hindrer krasj. Resultatet er en trygg og rask opplevelse for alle besøkende, hvor informasjon alltid er klar til bruk uten unødvendig venting.
status: |
  #### **Programvare informasjon**

  **Applikasjon** - `FastAPI` <abbr title="Object-Relation Mapping - en teknikk som kartlegger SQL-spørringer i programmering">**ORM**</abbr> - `SQLAlchemy`

  #### Dagens Aktiviteter

  * Analyserte feil i applikasjonsstarten der database-tabeller ikke ble opprettet som forventet.
  * Identifiserte at hovedårsaken var bruken av den utdaterte hendelsen `@app.on_event('startup')`. Jeg konkluderte med at denne metoden ikke gir nødvendig pålitelighet nåværende versjon av applikasjonen for opprettelser av tabellstrukturer.
  * Jeg etablerte en felles kjerne for systemet for å samle all database-logikk på ett sted.
  * Importerte og konfigurerte sentrale komponenter som `declarative_base` og driver-klassen. Dette grepet sikrer at hele ORM-strukturen kan instansieres og styres fra ett sentralt punkt, som gjør koden enklere å vedlikeholde.
  * Jeg introduserte en `try-except`-blokk rundt oppstartslogikken for å hindre systemkrasj ved oppstartsproblemer.
  * Jeg brukte en teknikk for å håndtere flere forespørsler i konteksthåndtering `async with` som sikrer at databaseforbindelser åpnes og lukkes korrekt under oppsett.
  * Flyttet logikken for tabellopprettelse `conn.run_sync(BASE.metadata.create_all)` fra de utdaterte hendelsene til en moderne livssyklus kontekst.
  * la til nøkkelordet `async`for å sikre at systemet kan håndtere flere oppgaver parallelt uten å hindre andre oppgaver.
  * Dette sikrer at databasen og mellomlagringen er operative før applikasjonen begynner å ta imot eksterne forespørsler.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli
sources: ''
---

Som det ble dokumentert i den tidligere loggen *[Smartere lagring forbedrer flyten i nettsiden](https://krigjo25.no/logs/records/implementering-av-vedvarende-caching-med-sqlalchemy-og-sqlite/)*, ble det identifisert en feil i hvordan database-tabellene alikavel ikke ble pålitelig lagret i oppstartsfasen. Dette forhindret at systemet ikke lagret dataene fra koblingspunktene. De identifiserte feilene indikerer på en ukorrekthet i oppstartslogikken til applikasjonens livssyklushendelse.

Målet er å sikre at ORM-en klargjør de nødvendige databasetabellene før applikasjonen begynner å behandle forespørsler. Dette sikrer at mellomlagringen gir brukerene den raske opplevelsen som er forventet i en moderne nettside.

* For at livssyklusen til applikasjonen kan behandle flere forespørsler samtidig, ble det lagt til nøkkelordet `async` slik at livssyklusen, kan håndtere flere forespørsler samtidig

```python
# FastAPI v1
@app.on_event("startup")
async def livssyklus_oppstart(app:FlaskAPI):
```

* For å forbedre overskiten for systemet, har jeg samlet all database-logikken i en felles kjerne. Dette gjør det mulig å styre hele databasen fra ett sentralt punkt i systemet.
* Jeg la også  inn en sikkerhetsmekanisme som `try-except` blokk som forsøker å klargjøre alle tabellene når programmet starter.

```python
  try:
    async with SQLACHOMYDRIVER_INSTANCE.engine.begin() as conn:
      await conn.run_sync(BASE.metadata.create_all)
  except Exception as ex:
    # Håndter potensielle feil, slik at systemet ikke krasjer.
```

Forsøket på å sikre databaselagringen mislyktes i første omgang, da databasetabellene ikke ble opprettet i opprettningsfasen. Dette viste seg å være en konsekvens av at livssyklushendelsen `@app.on_event('startup')` er utdatert i moderne versjoner av applikasjonen.. Erfaringen bekrefter at selve kommandoen for å klargjøre databasen, `await conn.run_sync(BASE.metadata.create_all)`, var korrekt programmert, men at den var plassert i et uegnet miljø. Løsningen ble derfor å flytte logikken over til en moderne livssyklus kontekst. Ved å bruke denne metoden sikrer vi en trygg håndtering av asynkrone ressurser, som database-initiering og tilkoblingspooler, før applikasjonen åpnes for trafikk. Dette understreker nødvendigheten av å følge tett med på utviklingen i rammeverket for å sikre en stabil og fremtidsrettet løsning.

```python
  async def livssyklus_oppstart(app:FlaskAPI):
    try:
      async with SQLACHOMYDRIVER_INSTANCE.engine.begin() as conn:
        await conn.run_sync(BASE.metadata.create_all)
    except Exception as ex:
      # Håndter potensielle feil, slik at systemet ikke krasjer.
```
