---
created: '2026-03-12T00:00:00.000Z'
tags:
  - dev-journey
KildeHenvisning: |
  Offisiell dokumentasjon : [docs.docker.com](https://docs.docker.com/engine/manage-resources/pruning/)
date: 2026-03-16T00:00:00.000Z
title: Fjerning av «spøkelses-disker»
ingress: |
  Etter observasjoner av "spøkelsesdisker" i Garuda, ble det identifisert at automatiske Docker-prosesser genererte uønskede virtuelle lag ved systemoppstart. Ved å identifisere aktive containere og deaktivere både Docker-tjenesten og dens socket-enhet, ble systemet tilbakestilt til en tilstand med full manuell kontroll over diskmontering.
parade: ''
star: |
  #### Fjerning av «spøkelses-disker» og optimalisering av oppstart

  Jeg oppdaget jeg en merkelig feil Operativ systemet mitt som heter Garuda, systemet viste flere lagringsdisker (stasjoner) som ikke eksisterte i virkeligheten – såkalte «spøkelses-disker». 

  Jeg mistenkte at dette skyldtes Docker, et verktøy som lager egne små arbeidsområder på maskinen, og at disse startet automatisk uten at jeg trengte dem.

  Jeg har operativsystemet garuda, jeg har oppdaget at systemet monterer disker som ikke eksisterer (spøkelses disk) og jeg antar at dette har noe med automatisk oppstart av Dockere.

  Oppgaven blir å slå av den automatiske handlingen av dockerne, slik at systemet ikke automatisk monterer dockere som ikke eksisterer.

  * Jeg startet med å sparre dette med AI og eventuelt høre om råd med denne situasjonen for å finne ut effektivt hvordan jeg håndterer denne situasjonen.
  * Siden jeg ikke aktivt bruker Docker i dette øyblikket valgte jeg å stoppe containerne med kommandoene under

  ```shell
  # Check for containers which running virtually( if list is empty they might run in the background)
  docker ps # This outputted a list with 3 different containers from 2 different projects.
  # Stopper docker container som er inaktive
  docker stop <container_id>

  # Clean up & disable services
  docker system prune
  sudo systemctl stop docker.socket docker.service
  sudo systemctl disable --now docker.service docker.socket.

  ```

  Det forventede resultatet er at Dockeren ikke starter automatisk ved oppstart av operativ systemet og at jeg kan manuelt mounte disken som normalt.
sources: ''
---

#### Dagens agenda 

* Finne årsaken til at systemet viser "falske" disker.
* Stoppe tunge programmer som kjører uten at de trengs.
* Endre innstillinger slik at jeg selv bestemmer når verktøyene skal starte.

#### Motivasjon & Energi 10 / 10

Dagen er så fin den kan bli.
