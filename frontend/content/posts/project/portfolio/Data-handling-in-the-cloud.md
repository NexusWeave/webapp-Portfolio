---
date: 2025-12-21T00:00:00.000Z
title: Datahåndtering i skyen
ingress: |
  Når man skal lansere noe skikkelig, må man ofte tenke nytt rundt hvordan data lagres. Her går jeg gjennom flyttingen fra en lokal SQLite-løsning til den skybaserte plattformen Turso. Jeg tar for meg de arkitektoniske valgene, som overgangen til synkron tilkobling, og hvordan jeg har sikra alt med skikkelig miljøstyring.
status: |
  #### Program informasjon
  **Teknologi** - Python, SQLAlchemy
  **Verktøy** - Turso, libSQL

  #### Motivasjon & Energi - 9 / 10
  Dagen er så fin den kunne bli. Det føles bra å ha databasen trygt plassert i skyen!
sources: ''
---

SQL-prosjektet mitt har kommet så langt at det var på tide med en skikkelig lansering, og da holdt det ikke lenger å bare ha databasen liggende lokalt. Jeg bestemte meg for å flytte alt over til Turso, som er en skybasert plattform som passer perfekt for utviklingsprosjekter uten at det koster skjorta.

Målet var å delegere ansvaret for infrastruktur og sikkerhet til proffene hos Turso, så jeg kan fokusere mer på selve koden istedenfor database-administrasjon. Men overgangen fra SQLite til libSQL førte med seg noen endringer i hvordan appen må kommunisere.

For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har installert bibliotekene `libsql-client` og `sqlalchemy-libsql` for å få SQLAlchemy til å snakke med Turso.
* Jeg har justert konfigurasjonen til å bruke synkron tilkobling istedenfor asynkron, siden den nåværende driveren til Turso krever det for å være stabil.
* I denne prosessen fjerna jeg alt av `async` og `await` i selve tilkoblingsdetaljene for å sikre full kompatibilitet.
* Jeg har gjemt bort alle sensitive tilkoblingsdetaljer i en `.env`-fil så ingenting kommer på avveie.

Gjennom dette arbeidet har jeg fått en mye dypere forståelse for hvordan SQLAlchemy fungerer under panseret, og ikke minst hvordan man veksler mellom synkron og asynkron kode avhengig av verktøyene man bruker. Nå ruller datakommunikasjonen feilfritt mot skyen, og fundamentet er klart for produksjon.
