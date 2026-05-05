---
date: 2026-04-14T06:59:45.401Z
title: Gjenoppretting av nettverksmaskinvare etter systemkrasj
ingress: |
  Denne tekniske loggen dokumenterer feilsøking av et nettverksbrudd i et dual-boot-system etter en krasj i Garuda Linux. Gjennom en metodisk tilnærming, fra programvarebasert tilbakestilling til dypere analyse av BIOS, ble feilkilden identifisert som et fysisk kontaktbrudd i maskinvaren. Ved å remontere PCIe-kortet ble internett og Bluetooth gjenopprettet, noe som viser at man alltid bør sjekke maskinvaren når BIOS-oppstarten svikter.
status: |
  #### Program informasjon
  **OS** - Garuda Arch Linux / Windows 10 (Dual Boot)
  ** Verktøy** - MSI Z270 Gaming Pro hovedkort med ASUS PCIe WiFi-kort

  #### Dagens Aktiviteter

  * Oppdaget at både Wi-Fi og Bluetooth forsvant fullstendig etter en systemkrasj i Garuda Arch Linux.
  * Forsøkte å starte NetworkManager på nytt og brukte kommandoen nmcli radio all, som rapporterte maskinvaren as "missing".
  * Forsøkte å løse problemet ved å rulle tilbake operativsystemet til en tidligere snapshot for å utelukke feil i driveroppdateringer.
  * Utførte en "power flush" ved å koble fra strømmen og tømme hovedkortet for reststrøm for å nullstille låst maskinvare.
  * Gikk inn i maskinens BIOS/UEFI for å sjekke om hovedkortet i det hele tatt registrerte nettverkskortet. Bekreftet at enheten var usynlig på maskinvarenivå.
  * Åpnet kabinettet og remonterte det fysiske ASUS PCIe WiFi-kortet for å sikre god elektrisk kontakt med hovedkortet.

  #### Motivasjon & Energi - 8 / 10

  Ble litt stresset av utfordringen når jeg ikke hadde mulighet til å gjøre jobben min den dagen, men jeg er fornøyd med at det ordnet seg. Dagen er så fin den kunne bli !
sources: ''
---

Etter en uventet systemkrasj i Garuda Linux, oppstod det svikt i nettverksfunksjonaliteten. Utfordringen påvirket både Linux og Windows-partisjonen; verken trådløst nettverk (Wi-Fi) eller Bluetooth var tilgjengelig. Siden maskinen nylig hadde gjennomgått en systemoppdatering før krasjen, var mistanken rettet mot programvarekonflikter eller korrupte drivere.
Målet var å stabilisere maskinvaren og gjenopprette forbindelsen til internett og Bluetooth-enheter.

Følgende handling gjorde jeg for å fikse maskinen.

* Siden jeg hadde nettopp gjennomført en system oppgradering før krasjen antok jeg at det var systemet som hadde tullet med nettverkskortet for både windows og Linux systemet, så jeg startet med å rulle tilbake til en tidligere snapshot.
* Siden krasjen inntraff etter en systemoppgradering, ble det først antatt at oppdateringen hadde forårsaket en konflikt som påvirket nettverkskortet på tvers av operativsystemene. Jeg forsøkte derfor å rulle tilbake Linux-systemet til et tidligere fungerende «snapshot». Dette medførte ingen endring, og nettverket forble utilgjengelig.
* Da programvare-tilbakestillingen mislyktes, utførte jeg en <abbr title="En teknikk for å tømme maskinvare for strøm - Slå av, koble maskinvaren fra strømkilden, deretter hold inne startknappen for å tømme strømrester">strømtømming</abbr> av maskinen. Hensikten var å tvinge nettverkskortet ut av en eventuell låst tilstand. Situasjonen forble uendret etter omstart.
* for å undersøke maskinen nærmere undersøkte jeg <abbr title="Basic Input/Output System - en unik programvare brikke som ligger på hovedkortet">BIOS</abbr>-innstillingene. Her ble det lagt merke til at nettverkskortet ikke var registrert i oversikten over integrerte komponenter. Dette var et interessant funn som bekreftet at feilen ikke lå i <abbr title ="Operativ system ">OS</abbr> konfigurasjon, men at hovedkortet hadde ikke kontakt med nettverkskortet.
* Jeg åpnet kabinettet for å inspisere <abbr title="Nettverks kortet- Kortet som kommuniserer med nettet og maskinen">ASUS PCIe WiFi-kortet</abbr>. Jeg koblet komponenten fra hovedkortet, kontrollerte kontaktene, og satte kortet på plass igjen i <abbr title ="et sport i hovedkortet som har dedikert plass for nettverkskort">PCIe-sporet</abbr> for å sikre kontakt med BIOS.

Etter at jeg remonterte nettverkskortet ble nettverkskortet umiddelbart gjenkjent i BIOS, og funksjonaliteten ble gjenopprettet i både Windows og Linux.
Hendelsen viser at systemkrasj eller vibrasjoner over tid kan føre til at komponenter mister kontakt eller havner i en tilstand hvor de ikke lenger registreres av hovedkortet. I dual-boot-systemer er manglende synlighet i BIOS det sikreste tegnet på at feilsøking må flyttes fra programvare til fysisk maskinvare.
