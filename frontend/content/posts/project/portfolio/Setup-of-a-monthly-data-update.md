---
date: 2026-03-14T00:00:00.000Z
title: Oppsett av en månedlig data-oppdatering
ingress: |
  Denne loggføringen dokumenterer overgangen fra manuelt vedlikehold til en fullstendig automatisert datainnsamling. Ved å automatisere månedlig kjøreplan i skyen, sikrer jeg at oversikten over GitHub-prosjekter holdes oppdatert uten menneskelig innblanding, noe som optimaliserer ressursbruken i prosjektet.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - FastAPI, Google Cloud Scheduler
  **Verktøy** - GitHub, Google Cloud Platform

  #### Dagens Aktiviteter
  * Opprettet en automatisert jobb i Google Cloud Scheduler for månedlig datainnsamling.
  * Verifisert at systemet leverer korrekte GET-forespørsler til API-endepunktet.
  * Automatisert vedlikeholdsrutiner for å fjerne behovet for menneskelig overvåkning.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli.
--- 

Situasjonen var at applikasjonen krevde manuell henting av nye Github-prosjekter. Dette er en rutine som ikke har behov for menneskelig overvåkning, noe som gjorde dette til en ineffektiv oppgave.

Hensikten var å automatisere denne prosessen slik at et spesifikt endepunkt på nettsiden blir aktivert automatisk den første hver måned kl 00:00.

* Opprettet en jobb i Google Cloud Scheduler med en frekvens på 0 0 1 \* \* som betyr at denne oppgaven skal kjøres hver første dag i hver måned.
* For å verifisere at funksjonaliteten fungerte, ble det kjørt en force run for å se om oppgaven klarte å levere en GET-forespørsel til FastAPI-endepunktet.

Systemet er nå fullstendig automatisk, og loggene bekrefter at instruksen blir levert og appen svarer med en 200 OK. Databasen blir nå oppdatert hver første dag, en gang i måneden.
