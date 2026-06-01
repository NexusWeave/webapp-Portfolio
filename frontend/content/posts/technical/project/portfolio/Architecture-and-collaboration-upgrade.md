---
date: 2026-05-19T08:30:00.000Z
title: Utvidelse av organisasjonsstøtte og normalisering av bidragsyter-arkitektur
ingress: |
  De siste 24 timene har vært preget av en betydelig oppgradering av GitHub-integrasjonen. Vi har flyttet oss fra en låst eierskapsmodell til en åpen, bidragsorientert arkitektur. Ved å normalisere databasen og implementere avansert filtrering, har vi nå full støtte for organisasjonsprosjekter og eksterne bidrag uten å ofre ytelse eller dataintegritet.
status: |
  #### Program informasjon
  **Teknologi** - FastAPI, Nuxt 4, SQLAlchemy (PostgreSQL), Alembic, Sass
  **Verktøy** - Gemini CLI, GitHub REST API, SQLAlchemy

  #### Dagens Aktiviteter:

  * Utvidet `GithubAPI` til å inkludere prosjekter fra organisasjoner ved å bruke faktiske bidrag (contributor check) istedenfor streng eiersjekk.
  * Refaktorerte databasemodellen til en normalisert mange-til-mange relasjon og gjennomførte Alembic-migrasjon for profil-URL-er.
  * Løst en kompleks tidssonefeil (`InterfaceError` / `TypeError`) ved å implementere en normaliseringsmotor.
  * Optimaliserte synkroniseringshastigheten med 300%.
  * Redesignet UI-kort for å vise teammedlemmer, forbedret pagineringsskjuling, og økte størrelsen på hovedlogoen.

  #### Motivasjon & Energi - 8 / 10

  Dagen har vært lang, men produktiv.
sources: ''
---

Tidligere brukte prosjektet en streng og låst eierskapsmodell i GitHub-integrasjonen som forhindret inkludering av organisasjonsprosjekter (som GetAcademy) og eksterne bidragsytere. Databasemodellen var flat og manglet relasjoner, og systemet opplevde tidsone-feil ved datasynkronisering.

Målet var å bygge om plattformen til en åpen og bidragsorientert arkitektur som gir full støtte for organisasjonsprosjekter og eksterne bidragsytere, samt utbedre feil med synkronisering og ytelse.

* Vi har refaktorert databasen til en normalisert mange-til-mange relasjon (via `RepoCollaboratorAssociationModel`) og utført Alembic-migrasjoner for å legge til profil-URL-er.
* Vi har utvidet `GithubAPI` til å fange opp bidrag i stedet for bare eierskap, og laget en tidsone-normaliseringsmotor for sikre dato-sammenligninger.
* vi har redusert synkroniserings-forsinkelsen (sleep) for en 300% hastighetsøkning, som nå kun utløses ved dataendringer.
* Vi har justert frontenden for å vise klikkbare brukernavn for hele teamet (uten duplikater), implementert intelligent skjuling av pagineringskontroller, og forbedret designet med en større header-logo.

Resultatet er en vesentlig mer skalerbar og responsiv portefølje-arkitektur med god dataintegritet. Læringen ligger i hvor verdifullt database-normalisering og AI-delegert SQL-koding er for å raskt identifisere og utbedre underliggende strukturelle svakheter i et prosjekt.
