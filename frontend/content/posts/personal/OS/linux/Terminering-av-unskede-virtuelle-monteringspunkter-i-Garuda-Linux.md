---
created: '2026-03-12T00:00:00.000Z'
tags:
  - dev-journey
KildeHenvisning: |
  Offisiell dokumentasjon : [docs.docker.com](https://docs.docker.com/engine/manage-resources/pruning/)
date: 2026-03-16T00:00:00.000Z
title: Fjerning av «spøkelses-disker»
ingress: |
  Etter observasjoner av spøkelsesdisker i Garuda, ble det identifisert at automatiske Docker-prosesser genererte uønskede virtuelle lag ved systemoppstart. Ved å identifisere aktive containere og deaktivere både Docker-tjenesten og dens socket-enhet, ble systemet tilbakestilt til en tilstand med full manuell kontroll over diskmontering.
parade: ''
star: |
  #### Fjerning av «spøkelses-disker» og optimalisering av oppstart

  I mitt nåværende oppsett med operativsystemet Garuda, oppdaget jeg en merkelig feil. Systemet viste flere lagringsdisker i oversikten som ikke eksisterte i virkeligheten – såkalte «spøkelses-disker». Jeg mistenkte at dette skyldtes <abbr title = "et verktøy som lager egne små arbeidsområder på maskinen">**Docker**</abbr>, og at disse ble koblet til automatisk ved oppstart uten at jeg hadde bruk for dem.

  Målet var å stoppe denne automatiske handlingen for å hindre at maskinen monterte disse falske diskene ved oppstart. Dette ble gjort for at oversikten over lagringsplass ble korrekt og at systemet ikke brukte unødvendige ressurser på tjenester som ikke var i bruk.

  For å løse dette utførte jeg følgende tiltak:

  * Jeg undersøkte hvilke tjenester som kjørte i det skjulte. Ved å bruke kommandoen <abbr title="En kommando som lister opp alle aktive pakker (containere) som kjører på maskinen akkurat nå.">`docker ps`</abbr>, oppdaget jeg at tre ulike containere fra to tidligere prosjekter sto og kjørte virtuelt uten at de ble brukt aktivt.
  * For å frigjøre systemressurser umiddelbart, stoppet jeg de inaktive prosessene manuelt med kommandoen <abbr title = "Stopper en spesifikk prosess som kjører i bakgrunnen.">`docker stop`</abbr>. Dette avsluttet koblingen mellom de virtuelle arbeidsområdene og systemets filoversikt.
  * Jeg kjørte en grundig rengjøring med kommandoen <abbr title = "En kraftig oppryddingskommando som sletter alt som er ubrukt fra Docker.">`docker system prune`</abbr>. Dette slettet midlertidige filer og rester som skapte rot i listene over disker, slik at de falske stasjonene forsvant.
  * For å være sikker på at utfordringen ikke oppstår igjen ved neste oppstart, deaktiverte jeg selve tjenesten helt med kommandoen <abbr title = "En instruks til operativsystemet om at et program ikke skal starte av seg selv når PC-en slås på.">`sudo systemctl disable --now`</abbr>. Dette endret maskinens innstillinger slik at **Docker**-motoren forblir avslått frem til jeg selv velger å starte den manuelt.

  Resultatet ble at de falske «spøkelses-diskene» forsvant umiddelbart. Nå starter maskinen opp helt rent, og jeg kan manuelt koble til de diskene jeg faktisk trenger. erfaringen jeg sitter igjen med var at bakgrunnstjenester kan påvirke systemets visuelle oversikt, og at det er lurt å deaktivere tunge verktøy man ikke bruker daglig.
sources: ''
---

#### Dagens agenda 

* Finne årsaken til at systemet viser "falske" disker.
* Stoppe tunge programmer som kjører uten at de trengs.
* Endre innstillinger slik at jeg selv bestemmer når verktøyene skal starte.

#### Motivasjon & Energi 10 / 10

Dagen er så fin den kan bli.
