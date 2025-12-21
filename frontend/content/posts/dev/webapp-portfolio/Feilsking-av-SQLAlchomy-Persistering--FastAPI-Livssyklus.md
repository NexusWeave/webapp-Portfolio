---
created: 2025-12-07T00:00:00.000Z
tags:
  - dev-journey
title: Feilsøking av SQLAlchomy Persistering & FastAPI Livssyklus
ingress: >
  En feil ble identifisert der SQLAlchemy ORM-tabeller ikke ble pålitelig
  persistert ved oppstart av FastAPI-applikasjonen. Utfordringen var å sikre at
  synkron DDL-logikk (create\_all) ble utført i det asynkrone miljøet. Aksjonen
  involverte implementering av den korrekte asynkrone kommandoen
  (conn.run\_sync), men forsøket mislyktes. Konsekvensen av dette ble sporet til
  bruken av den forkastede (deprecated) livssyklushendelsen.
  @app.on\_event('startup'). Dette understreker  læringen om nødvendigheten av å
  følge med på rammeverkets utvikling, for robust håndtering av asynkrone
  ressurser og databaseinitiering i FastAPI.
star: >
  ## Håndtering av Presisteringsfeil i FastAPI - SQL


  Som det ble dokumentert i den tidligere loggen (datert 06-12-25), ble det
  identifisert en feil i FastAPI-applikasjonen.


  Database objektene  ble opprettet gjennom **SQLAlchemy ORM**, men alikavel ble
  de **ikke pålitelig lagret ved applikasjonsstart**. Dette kompromitterte det
  vedvarende caching-laget og forhindret at systemet ble operatvt. Dette peker
  mot en ukorrekt implementasjon av oppstartslogikken i Fast-API's
  livssyklushendelse


  ### Korrigering av Implementasjon av Applikasjonens Oppstart Hendelser


  målet vil sikre at SQLAlchemy korrekt oppretter og presisterer alle nødvendige
  databasetabeller før FastAPI starter å behandler innkommende forespørsler.
  Dette er en essensiell del av programmeringen for å sikre at caching-laget er
  funksjonell.


  ### Refaktorering & Løsning


  FastAPI-livssyklus


  Siden livssyklusen til FastAPI er Asynkron, ble det etablert en asynkron
  livssyklus for FastAPI-applikasjonen ved bruk av 


  ```python

  @app.on_event("startup") # Deperached in FlaskAPI v2

  async def livssyklus_oppstart(app:FlaskAPI):

  ```


  #### Håndteringen av Presisteringsfeilen


  Det etablert en felles kjerne, for å håndtere den modulære database-logikken.
  Dette innebar import av variabelen som inneholdt declarative\_base og
  Driver-klassen. Denne strukturen er essensiell i applikasjonen for å kunne
  instansiere hele SQLAlchemy-applikasjonen fra ett sentralt punkt. 


  Inne i livssyklusen til FastAPI ble det etablert en try except-blokk, for å
  prøve å starte opp en context mananger av Databasen. Der alle tabellene, ble
  definert og klar gjort for å ta i mot data. 


  ```python

  try:
    async with SQLACHOMYDRIVER_INSTANCE.engine.begin() as conn:
      await conn.run_sync(BASE.metadata.create_all)
  except Exception as ex:
    # Do Something when an exception occurs
  ```


  #### Mislykket Persistering


  Førsøket på å sikre databasepersistering mislyktes. Databasetabellene ble ikke
  opprettet pålitelig ved applikasjonsstart. Dette er en konsekvens av at den
  implementerte livssyklyshendelsen @app.on\_event('start-up') har blitt
  forkastet i moderne versjoner av FastAPI og var ikke lenger pålitelig for
  DDL-logikk. Den moderene metoden er nå å definere en funksjon og bruke
  lifespan context.


  Oppdatering av Livssyklus


  Dette understreker nødvendigheten av å følge med på rammeverkets utvikling.
  Bruken av den utdaterte @app.on\_event førte til en feil i
  initialiseringsfasen.


  #### Asynkron DDL og Feilhåndtering


  Læringen bekrefter at den korrekte asynkrone DDL-kommandoen(await
  conn.run\_sync(BASE.metadata.create\_all), var korrekt, men at det var
  plassert i feil container. Løsningen på dette er å bruke lifespan context
  mananger for å pålitelig håndtere asynkrone ressurser som ( database-initering
  og tilkoblingspooler) i FastAPI.
KildeHenvisning: ''
---

