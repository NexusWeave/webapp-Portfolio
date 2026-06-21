---
date: 2026-05-19T08:30:00.000Z
title: Utvidelse av organisasjonsstøtte og normalisering av bidragsyter-arkitektur
ingress: |
  Det siste døgnet har jeg gitt GitHub-integrasjonen et skikkelig løft. Jeg har gått bort fra en låst modell og over til en åpen arkitektur som faktisk fanger opp hvem som bidrar. Ved å normalisere databasen og fikse filtreringen har vi nå full støtte for både organisasjonsprosjekter og eksterne bidragsytere uten at det går utover ytelsen.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - FastAPI, Nuxt 4, SQLAlchemy (PostgreSQL), Alembic, Sass
  **Verktøy** - Gemini CLI, GitHub REST API, SQLAlchemy

  #### Dagens Aktiviteter
  * Utvidet `GithubAPI` til å inkludere prosjekter fra organisasjoner ved å bruke faktiske bidrag (contributor check) istedenfor streng eiersjekk.
  * Refaktorerte databasemodellen til en normalisert mange-til-mange relasjon og gjennomførte Alembic-migrasjon for profil-URL-er.
  * Løst en kompleks tidssonefeil (`InterfaceError` / `TypeError`) ved å implementere en normaliseringsmotor.
  * Optimaliserte synkroniseringshastigheten med 300%.
  * Redesignet UI-kort for å showe teammedlemmer, forbedret pagineringsskjuling, og økte størrelsen på hovedlogoen.

  #### Motivasjon & Energi - 10 / 10
  Dagen har vært lang, men jeg har fått gjort utrolig mye. Dagen er så fin den kunne bli.
sources: ''
--- 

Før brukte prosjektet en litt for streng modell for GitHub-integrasjonen, noe som gjorde at vi ikke fikk med organisasjonsprosjekter (som GetAcademy) eller eksterne folk som bidro. Databasemodellen var for flat og manglet skikkelige relasjoner, og det oppstod ofte tidsone-feil når vi skulle synkronisere data.

Hensikten var å bygge om hele greia til en åpen og bidragsorientert arkitektur som støtter alt av organisasjoner og eksterne bidragsytere, samtidig som jeg fikk rydda opp i synkroniserings-tull og treig ytelse.

* For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har refaktorert databasen til en normalisert mange-til-mange-relasjon og kjørt migrasjoner for å få med profil-URL-er.
* Jeg har utvidet `GithubAPI` til å se på faktiske bidrag istedenfor bare hvem som eier repoet, og snekra sammen en motor for å normalisere tidssoner.
* Jeg har skrudd ned ventetiden på synkroniseringen så den nå er 300% raskere, og sørga for at den bare fyrer når det faktisk er endringer.
* Jeg har flikka på frontenden så vi ser klikkbare brukernavn for hele teamet, fiksa pagineringen og gitt hovedlogoen et løft.

Gjennom dette arbeidet har jeg fått på plass en arkitektur som skalerer mye bedre og føles mer responsiv. Det er utrolig hvor mye man sparer på å ha en skikkelig normalisert database i bunnen når man skal rydde opp i strukturelle svakheter.
