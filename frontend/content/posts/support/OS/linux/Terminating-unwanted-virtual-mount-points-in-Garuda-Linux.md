---
date: 2026-03-16T00:00:00.000Z
title: Fjerning av «spøkelses-disker»
ingress: |
  Etter observasjoner av spøkelsesdisker i Garuda Linux ble det identifisert at Docker-prosesser kjørte ved systemoppstart og genererte uønskede virtuelle lag. Aktive containere ble stanset og systemet ble ryddet for ubrukte ressurser. Ved å deaktivere Docker-tjenesten og dens socket-enhet ble systemet tilbakestilt til en tilstand med full manuell kontroll over diskmontering.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini*
  **OS** - Garuda Arch Linux / Windows 10 (Dual Boot)
  **Verktøy** - Docker, TypeScript

  #### Dagens aktiviteter
  * Identifisering av årsak til at systemet viser virtuelle spøkelsesdisker.
  * Stansing av inaktive bakgrunnsprosesser for å frigjøre systemressurser.
  * Konfigurering av oppstartsinnstillinger for manuell kontroll av tjenester.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli.
sources: |
  Offisiell dokumentasjon : [docs.docker.com](https://docs.docker.com/engine/manage-resources/pruning/)
---

Under oppstart av operativsystemet ble det observert flere uventede lagringsstasjoner i systemoversikten, såkalte spøkelsesdisker. Det oppstod antagelse om at  Docker-prosessene startet automatisk som en prosess under oppstart av operativsystemet.

Hensikten er å deaktivere den automatiske bakgrunnsprosessen som starter opp ved oppstart av operativsystemet og fjerne de virtuelle monteringspunktene for å sikre en korrekt systemoversikt.

* Inspiserte Dockers bakgrunnsprosesser med kommandoen `docker ps`  og det ble oppdaget at tre inaktive containere fra tidligere prosjekter ble kjørt i bakgrunnen.
* Stanset de identifiserte containerne  ved bruk av kommandoen `docker stop` for å frigjøre ressurser.
* Utførte en systemopprydding med kommandoen `docker system prune` for å fjerne midlertidige lagringsrester og ubrukte volumer.
* Deaktiverte Docker-tjenesten ved systemoppstart ved hjelp av kommandoen `sudo systemctl disable --now docker.service docker.socket`.

De virtuelle spøkelsesdiskene ble fjernet, og systemet starter nå uten uønskede bakgrunnstjenester. Som en konsekvens av dette ble lagringsoversikten normalisert og unødig ressursbruk redusert. Erfaringen viser at bakgrunnstjenester kan påvirke systemets visuelle visning uventet, og at deaktivering av inaktive verktøy bidrar til en mer stabil systemdrift.
