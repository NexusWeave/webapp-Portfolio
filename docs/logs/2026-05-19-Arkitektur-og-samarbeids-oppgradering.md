---
date: 2026-05-19T08:30:00.000Z
title: Utvidelse av organisasjonsstøtte og normalisering av bidragsyter-arkitektur
ingress: |
  De siste 24 timene har vært preget av en betydelig oppgradering av GitHub-integrasjonen. Vi har flyttet oss fra en låst eierskapsmodell til en åpen, bidragsorientert arkitektur. Ved å normalisere databasen og implementere avansert filtrering, har vi nå full støtte for organisasjonsprosjekter og eksterne bidrag uten å ofre ytelse eller dataintegritet.
status: |
  #### Program informasjon
  **Teknologi** - FastAPI, Nuxt 4, SQLAlchemy (PostgreSQL), Alembic, Sass
  **Verktøy** - Gemini CLI, GitHub REST API, Python Datetime Engine

  #### STAR-L Logg
  * Utvidet `GithubAPI` til å inkludere prosjekter fra organisasjoner (f.eks. GetAcademy) ved å erstatte den strenge eiersjekken med en verifisering av faktiske bidrag (contributor check).
  * Refaktorerte databasemodellen for bidragsytere fra en flat struktur til en normalisert mange-til-mange relasjon med `RepoCollaboratorAssociationModel` og et globalt, unikt `CollaboratorModel`.
  * Gjennomførte en kritisk Alembic-migrasjon for å transformere bidragsyter-data og legge til nye felt for profil-URL-er (`owner_url`, `profile_url`), noe som muliggjør direkte anerkjennelse av teammedlemmer.
  * Løst en kompleks `InterfaceError` og `TypeError` knyttet til tidssoner ved å implementere en robust normaliseringsmotor i `github_api.py` som sikrer trygg sammenligning av "naive" og "aware" datetimes.
  * Optimaliserte synkroniseringshastigheten med 300% ved å redusere `asyncio.sleep` fra 1.5s til 0.5s og flytte forsinkelsen slik at den kun trigger ved faktiske dataendringer.
  * Redesignet prosjektkortene (`BusinessCard.vue`) til å vise klikkbare brukernavn for hele teamet, med intelligent filtrering som fjerner eieren fra bidragsyterlisten for å unngå redundans.
  * Forbedret UI-intelligens i `Portfolio.vue` som nå automatisk skjuler pagineringskontroller og filtermenyer dersom datagrunnlaget er homogent eller får plass på én side.
  * Justert den visuelle identiteten ved å øke størrelsen på hovedlogoen i headeren til 14em for bedre synlighet og balanse i grensesnittet.
  * Ved å delegere database-normalisering og feilsøking til AI har vi unngått timer med manuell SQL-koding og raskt identifisert dype arkitektoniske svakheter som hindret skalering av porteføljen.
---
