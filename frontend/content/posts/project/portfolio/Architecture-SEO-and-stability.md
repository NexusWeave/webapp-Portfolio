---
date: 2026-04-20T06:57:57.091Z
title: Arkitektur, SEO og stabilitet
ingress: |
  I dette skippertaket tok jeg tak i utfordringene med manuelt vedlikehold av navigasjon og SEO, som gjorde hele opplegget uoversiktlig og teknisk ustabilt. Ved å få på plass en felles sannhetskilde har jeg automatisert kjedelige rutineoppgaver og fjerna irriterende innlastingsfeil. Resultatet er en plattform som er klar for fremtiden med bedre ressursbruk og en bunnsolid struktur.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt.js
  **Verktøy** - TypeScript, KI
  **Prinsipper** - SEO

  #### Dagens Aktiviteter
  * Samlet styring av menyer og metadata i en dedikert logikk-modul.
  * Rettet kommunikasjonssvikten mellom server og nettleser i tidslinje-, bilde- og prosjektkomponenter.
  * La til menneskevennlige merkelapper for å dele den tekniske loggen inn i kategorier, som forbedrer lesbarhet og filtrering.
  * Standardisert bruk av `Suspense`
  * Fjernet unødvendige `debug`-logger og oppdaterte kodedokumentasjon.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli.
sources: ''
--- 

Prosjektet slet med en hybridløsning der jeg måtte dulle med navigasjon og SEO-info manuelt overalt. Det ble fort rotete. Samtidig var systemet litt treigt fordi ting skjedde synkront og låste opp ressurser, og det dukka opp feil når ting skulle lastes inn i nettleseren – noe som ga både visuell flimring og stygge advarsler i konsollen.

Hensikten var å få alt inn i en "Single Source of Truth" for å automatisere både navigasjon og SEO. Jeg skulle også rydde opp i innholdsarkivet og sørge for at alt lasta inn knirkefritt uten layout-skift eller hydrerings-tull.

* For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har bytta ut den manuelle menylista med et dynamisk system som også tar seg av SEO-biten, så søkemotorene alltid får riktig data.
* Jeg har fiksa et eget loggarkiv så det er lettere å filtrere på prosjekter og emner, og lagt inn skikkelige merkelapper på alt.
* Jeg har fjerna hydreringsfeil ved å bruke `<template>`-rammer på de rette stedene.
* Jeg har pakka inn asynkrone komponenter i `Suspense` for å ha kontroll på lastetilstander, så brukeren faktisk ser at ting skjer.
* Jeg har kasta ut debug-logger og rydda i navngivningen i dokumentasjonen for å unngå logiske feil senere.

Gjennom dette arbeidet har jeg fått en plattform jeg faktisk kan stole på. Navigasjon og SEO ruller av seg selv, og systemet tåler litt trøkk uten å låse seg helt. Innlastingsfeila er borte, og brukeropplevelsen føles mye proffere nå som ting flyter som det skal.
