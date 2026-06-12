---
date: 2025-12-15T00:00:00.000Z
title: Sikring av Unikhet og Datakontrakt
ingress: |
  I denne runden har jeg tatt tak i stabiliteten i databaselaget. Ved å innføre en "Get or Create"-strategi og oppgradere Pydantic-modellene til V2, har jeg sikra oss mot irriterende valideringskrasj og duplikate data. Det meste begynner nå å falle på plass, selv om jeg fortsatt har en liten nøtt igjen å knekke i assosiasjonstabellen.
status: |
  #### Program informasjon

  #### Motivasjon & Energi - 10 / 10
  **Teknologi** - FastAPI, Pydantic
  **Verktøy** - Python, PostgreSQL
  Dagen er så fin den kunne bli. Digg å se at Pydantic V2 rydder opp!
sources: ''
---

Appen klarte fint å hente ned prosjekter fra GitHub, men den sleit med å lagre språkene i en egen tabell på en ryddig måte. Det oppsto ofte feil når systemet skulle opprette assosiasjoner mellom prosjekter og språk, noe som gjorde at hele dataflyten stoppa opp.

Hensikten var å sikre at vi bare lagrer unike språkobjekter og at dataene vi henter ut er komplette og pålitelige. Jeg ville også modernisere valideringen for å dra nytte av bedre ytelse og mer robuste kontrakter mellom backend og API.

For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har implementert en "Get or Create"-logikk som først sjekker om språket finnes i databasen før det eventuelt opprettes på nytt.
* Jeg har oppgradert Pydantic-modellene fra V1 til V2 for å få bedre datavalidering og kjappere ytelse.
* Jeg har rydda i modellene og fjerna alt som ikke er en del av selve datautvekslingen for å holde kontrakten ren og pen.
* Jeg har sikra at objektene som hentes ut av Repository-tabellen er fullstendige så ORM-en ikke kveles av manglende relasjonsdata.

Gjennom dette arbeidet har jeg fått på plass en mye mer stabil lagring av språkdata. Ved å bruke en skikkelig strategi for unike data har jeg fjerna `IntegrityError`-krasj, og de nye Pydantic-modellene sørger for at vi alltid har en nøyaktig refleksjon av databasestrukturen. Det gjør hele systemet langt mer forutsigbart og robust for videre utvikling.
