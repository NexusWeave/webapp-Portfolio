---
date: 2025-12-17T00:00:00.000Z
title: Sikring av Referanseintegritet
ingress: |
  I denne runden har jeg dykka ned i integritetsfeil i et asynkront system. Etter å ha opplevd krasj med mange-til-mange-relasjoner, har jeg refakturert hele ID-styringen. Ved å bruke ORM-ens "Unit of Work"-mønster har jeg fått på plass en atomær lagring som faktisk holder vann, og sikra at relasjonene mellom prosjekter og språk lagres i riktig rekkefølge.
status: |
  #### Program informasjon
  **Teknologi** - Python, SQLAlchemy
  **Verktøy** - PostgreSQL

  #### Motivasjon & Energi - 8 / 10
  Dagen er så fin den kunne bli. Litt hodebry med relasjoner, men løsningen ble bra!
sources: ''
---

Etter at jeg fikk orden på hentingen av repoer og språk-data, dukka det opp en ny utfordring når jeg skulle koble dem sammen i databasen. Systemet krasja rett og slett fordi jeg prøvde å registrere koblingene før selve prosjektene og språkene var ferdig oppretta og hadde fått sine egne ID-er.

Målet var å sikre at alt ble lagret i riktig rekkefølge så vi slapp integritetsbrudd. Det ble som å prøve å skrive en kontrakt mellom to folk som ikke finnes ennå – systemet nekta selvfølgelig å godta det. Jeg trengte en smidigere måte å håndtere disse avhengighetene på.

For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har skrevet om `new_assoc_record` så den nå tar imot komplette modell-objekter istedenfor bare rå tall-ID-er.
* Jeg har overlatt ansvaret for ID-håndtering til systemets egen transaksjonshåndtering, som sørger for at alt lagres i rett rekkefølge.
* Jeg har integrert denne logikken direkte i arbeidsflyten så relasjonene opprettes atomært.
* Jeg har fjerna all risiko for `IntegrityError`-krasj som før oppsto på grunn av tidsavvik i det asynkrone miljøet.

Gjennom dette arbeidet har jeg fått en mye tryggere prosess for å lagre koblinger mellom prosjekter og språk. Ved å gå bort fra sårbar manuell ID-styring til en mer selvgående prosess, har jeg fjerna en stor feilkilde. Nå kan jeg stole 100% på at informasjonen som vises i databasen alltid stemmer med virkeligheten og at alt henger sammen som det skal.
