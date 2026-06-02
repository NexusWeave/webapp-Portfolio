---
date: 2025-12-22T00:00:00.000Z
title: Bro bygging mellom miljøer
ingress: |
  Her dokumenterer jeg reisen fra lokalt utviklingsmiljø til produksjon på Google Cloud Run. Det dukka opp litt krøll med Docker-containere og lokale avhengigheter når jeg flytta backend-logikken til skyen. Ved å styre `WORKDIR` og trikse litt med `PYTHONPATH`, fikk jeg synkronisert alt for et skikkelig "Cloud Native" oppsett.
status: |
  #### Program informasjon
  **Teknologi** - Docker, Google Cloud Run
  **Verktøy** - Python, Shell

  #### Motivasjon & Energi - 9 / 10
  Dagen er så fin den kunne bli. Det er digg å se appen kjøre i skyen!
sources: ''
---

Etter å ha fått appen til å rulle stabilt lokalt med Turso-databasen, var det på tide å ta steget ut i den store verden. For å gjøre det skikkelig valgte jeg å flytte alt til Google Cloud Run. Det er en ryddig måte å kjøre containeriserte apper på uten at jeg trenger å drifte selve serverne selv.

Problemet var bare at Cloud Run ikke fant de lokale avhengighetene mine når jeg først prøvde å deploye. Når du flytter kode fra din egen maskin til en plattform som Google Cloud, endrer spillereglene seg helt for hvordan koden leter etter bibliotekene sine.

For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har konfigurert en Dockerfile som setter opp et skikkelig arbeidsområde (`WORKDIR`) inne i containeren, så alle stier starter fra samme sted.
* Jeg har triksa med `PYTHONPATH` i Docker-instruksjonene for å sikre at Python finner både backend-koden og de interne bibliotekene mine uavhengig av filstruktur.
* Jeg har bygd og lasta opp container-imaget på nytt til Google Cloud sitt arkiv og verifisert at alt fungerer som det skal.
* Jeg har sjekka at backend-tjenesten rapporterer "Healthy" i loggene etter at Google tildelte meg en unik URL.

Gjennom dette arbeidet har jeg lært mye om skillet mellom lokalt oppsett og produksjonsdrift. Docker krever at man er pinlig nøyaktig med beskrivelsen av miljøet, og miljøvariabler som `PYTHONPATH` er gull verdt for å håndtere filstrukturer uten å måtte skrive om hele applikasjonslogikken.
