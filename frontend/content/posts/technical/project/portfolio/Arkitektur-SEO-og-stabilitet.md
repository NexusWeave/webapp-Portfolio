---
date: 2026-04-20T06:57:57.091Z
title: 'Arkitektur, SEO og stabilitet'
ingress: ''
status: |
  #### Dagens aktiviteter

  * Samlet styring av menyer og metadata i en dedikert <abbr title ="selvstendig del av systemet som håndterer regler og beregninger på serveren">logikk-modul</abbr>.
  * Rettet kommunikasjonssvikten mellom server og nettleser i tidslinje-, bilde- og prosjektkomponenter.
  * La til menneskevennlige merkelapper for å dele den tekniske loggen inn i kategorier, som forbedrer lesbarhet og filtrering.
  * Standardisert bruk av <abbr title="En teknikk innen programmering som sikrer kontrollert datainnhenting og forhindrer at elementer på siden hopper under lasting">`Suspense`</abbr>
  * Fjernet unødvendige `debug`-logger og oppdaterte kodedokumentasjon.
sources: ''
---

Prosjektet hadde belastning av en hybridløsning der navigasjon og SEO-informasjon krevde manuelt vedlikehold over flere filer. Dette begrenset oversikten gjorde strukturen uoversiktlig. Samtidig var systemet begrenset av synkron databehandling som låste ressurser, og det oppstod tekniske avvik under innlastningen i nettleseren, som skapte visuell ustabilitet og advarsler.

Målet var å etablere en <abbr title ="En felles sannhetskilde">Single Source of Truth</abbr> for å automatisere navigasjon og <abbr title ="Search Engine Optimization / søkemotoroptimalisering - en teknikk i utvikling som lar roboter skanne nettsiden ">SEO</abbr>. Samtidig skulle jeg rydde opp i innholdsarkivet for å forbedre brukervennligheten, og sikre en feilfri teknisk innlasting uten <abbr title="Når elementer på nettsiden hopper eller flytter på seg under innlasting, som ofte fører til at man trykker feil">layout-skift</abbr> eller hydreringsfeil.

* Jeg erstattet menylisten med et dynamisk system som også skulle ha ansvaret for å håndtere nettsidens SEO. SEO-ansvar (titler/beskrivelser) ble flyttet til Navigasjonsmodulen for å sikre at søkemotorer alltid mottar korrekt data.
* Opprettet et dedikert loggarkiv, slik at brukeren kan lettere filtrere basert på prosjekter og andre emner. Oppdaterte <abbr title="Dokumentasjon for hvordan man kan bruke komponenten">typedefinasjonen</abbr> til å inkludere menneskevennlige merkelapper som forbedrer filtreringen av informasjonen som er vist.
* Fjernet hydreringsfeil ved å bruke <abbr title="En teknikk innen vue for å skape usynlige elementer">`<template>`</abbr>-rammer.
* Jeg pakket asynkrone komponenter inn i `Suspense` for å kontrollere lastetilstander, som forbedrer brukeropplevelsen med å fortelle brukeren at innholdet holder på å laste inn.
* Jeg fjernet debugging-logger og standardiserte navnekonvensjoner `Post` i kodedokumentasjonen. Dette forhindrer logiske feil og kontrollerer at riktig data blir sendt inn i komponentene

Resultatet er en pålitelig og fremtidsdreven plattform der visningslaget er renset og optimalisert. Navigasjon og SEO oppdateres nå automatisk, og systemet håndterer høy belastning effektivt uten å låse seg. innlastnings feilene er redusert, noe som gir en flytende brukeropplevelse fra første sekund.

Gjennom denne omgjøringen har jeg erfart at en applikasjon aldri er sterkere enn sitt svakeste ledd, selv en synkron funksjon eller ett feilplassert HTML-element kan påvirke hele systemets stabilitet. Ved å delegere ansvar til dedikerte logikk-moduler og opprettholde streng symmetri mellom server og klient, har jeg redusert teknisk etterslep og lagt til rette for enklere vedlikehold i fremtiden.

***

### **Dagens aktiviteter**
