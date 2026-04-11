---
created: 2026-03-14T00:00:00.000Z
tags:
  - dev-journey
title: Oppsett av en månedlig data-oppdatering
ingress: |
  Denne loggføringen dokumenterer overgangen fra manuelt vedlikehold til en fullstendig automatisert datainnsamling. Ved å automatisere månedlig kjøreplan i skyen, sikrer jeg at oversikten over GitHub-prosjekter holdes oppdatert uten menneskelig innblanding, noe som optimaliserer ressursbruken i prosjektet.
---
Applikasjonen krevde manuell henting av nye Github prosjekter. Dette er en rutine som ikke har behov for mennesklig overvåkning, gjør dette til en ineffektiv oppgave.

Oppgaven var å automatisere denne prosessen slik at et spesifikt endepunkt på nettsiden blir aktivert automatisk den første hver måned** kl 00:00**.

* Jeg opprettet en jobb i "Google Cloud Scheduler" med en frekvens på 0 0 1 \* \* Som betyr at denne oppgaven skal kjøres hver første dag i hver måned.
* for å vertifisere at funksjonaliteten fungerte kjørte jeg en `force run` for å se om Oppgaven klarte å levere en GET-forespørsel til FastAPI-endepunktet.

Systemet er nå fullstendig automatisk, loggene bekrefter at instruksen blir levert og appen svarer med en 200 OK. Databasen blir nå oppdatert hver første dag, en gang i måneden.
