---
date: 2026-04-20T06:57:57.091Z
title: Arkitektur, SEO og stabilitet
ingress: |
  Dette prosjektet tok for seg utfordringene med manuelt vedlikehold av navigasjon og SEO, som skapte en uoversiktlig oppbygging og teknisk ustabilitet. Ved å etablere en felles sannhetskilde har jeg automatisert viktige rutineoppgaver og fjernet innlastingsfeil. Resultatet er en fremtidsrettet plattform med optimalisert ressursbruk, forbedret brukeropplevelse og en stabil struktur som sikrer både synlighet og videre vekstmuligheter.
status: |
  #### Program informasjon
  ** Teknologi** - Nuxt.js
  ** Verktøy** - TypeScript, KI
  ** Prinsipper** - SEO

  #### Dagens Aktiviteter

  * Samlet styring av menyer og metadata i en dedikert logikk-modul.
  * Rettet kommunikasjonssvikten mellom server og nettleser i tidslinje-, bilde- og prosjektkomponenter.
  * La til menneskevennlige merkelapper for å dele den tekniske loggen inn i kategorier, som forbedrer lesbarhet og filtrering.
  * Standardisert bruk av `Suspense`
  * Fjernet unødvendige `debug`-logger og oppdaterte kodedokumentasjon.

  #### Motivasjon & Energi - 10 / 10

  Dagen er så fin den kan bli.
sources: ''
---

Prosjektet hadde belastning av en hybridløsning der navigasjon og SEO-informasjon krevde manuelt vedlikehold over flere filer. Dette begrenset oversikten gjorde strukturen uoversiktlig. Samtidig var systemet begrenset av synkron databehandling som låste ressurser, og det oppstod tekniske avvik under innlastningen i nettleseren, som skapte visuell ustabilitet og advarsler.

Målet var å etablere en Single Source of Truth for å automatisere navigasjon og SEO. Samtidig skulle jeg rydde opp i innholdsarkivet for å forbedre brukervennligheten, og sikre en feilfri teknisk innlasting uten layout-skift eller hydreringsfeil.

* Jeg erstattet menylisten med et dynamisk system som også skulle ha ansvaret for å håndtere nettsidens SEO. SEO-ansvar (titler/beskrivelser) ble flyttet til Navigasjonsmodulen for å sikre at søkemotorer alltid mottar korrekt data.
* Opprettet et dedikert loggarkiv, slik at brukeren kan lettere filtrere basert på prosjekter og andre emner. Oppdaterte typedefinasjonen til å inkludere menneskevennlige merkelapper som forbedrer filtreringen av informasjonen som er vist.
* Fjernet hydreringsfeil ved å bruke `<template>`-rammer.
* Jeg pakket asynkrone komponenter inn i `Suspense` for å kontrollere lastetilstander, som forbedrer brukeropplevelsen med å fortelle brukeren at innholdet holder på å laste inn.
* Jeg fjernet debugging-logger og standardiserte navnekonvensjoner `Post` i kodedokumentasjonen. Dette forhindrer logiske feil og kontrollerer at riktig data blir sendt inn i komponentene

Resultatet er en pålitelig og fremtidsdreven plattform der visningslaget er renset og optimalisert. Navigasjon og SEO oppdateres nå automatisk, og systemet håndterer høy belastning effektivt uten å låse seg. innlastnings feilene er redusert, noe som gir en flytende brukeropplevelse fra første sekund.

Gjennom denne omgjøringen har jeg erfart at en applikasjon aldri er sterkere enn sitt svakeste ledd, selv en synkron funksjon eller ett feilplassert HTML-element kan påvirke hele systemets stabilitet. Ved å delegere ansvar til dedikerte logikk-moduler og opprettholde streng symmetri mellom server og klient, har jeg redusert teknisk etterslep og lagt til rette for enklere vedlikehold i fremtiden.
