---
tags:
  - dev-journey
date: 2025-11-20T00:00:00.000Z
title: Læring om Servertrygghet og Least Privilege
ingress: |
  En autorisasjonssårbarhet ble avdekket hvor sensitive URL-stier ble visuelt eksponert i navigasjonen for uautoriserte brukere. Den tekniske analysen identifiserte at rotårsaken lå i manglende serverside-filtrering under konverteringsprosessen fra CSV-filer. Denne svikten utgjorde et direkte brudd på Prinsippet om Minst Privilegium (*Least Privilege*). Læringsloggen konkluderer med at all fremtidig utvikling må sikre at navigasjonsdata filtreres utelukkende på serversiden, basert på brukerens autoriserte rolle, før de utleveres til klienten.
parade: ''
star: |
  Det ble oppdaget en sårbarhet knyttet til tilgangsstyring på nettsiden. Navigasjonslenker som skulle skjermes var eksponert for brukere. Dette var en konsekvens av at det ikke har vært lagt inn et filter for å filtrere vekk dataen i backend. Dette utgjorde en lekasje av intern informasjon om systemets struktur.

  Min oppgave var å finne ut hvorfor denne informasjonen ble lekket og vurdere risikoen opp mot anerkjente sikkerhetsstandarder og lage en løsning som sikrer at bedriftens interne data forblir skjulte for brukere uten tilgang.

  Jeg undersøkte hvordan dataene ble hentet ut og oppdaget at sikkerhetskontrollen ble gjort for sent i prosessen (hos brukeren istedenfor på serveren).

  * Jeg fant ut av at det manglet en filtrering i øyblikket da dataen ble hentet ut av systemtes underliggende filer.
  * Jeg sammenlignet dagens praksis med "Prinsippet om minste privilegium" – en viktig standard innen IT-sikkerhet som sier at “ingen skal se mer enn det som er strengt nødvendig for å utføre jobben sin”.
  * Jeg utarbeidet en plan for sikre at de stiene ble fjernet før den nådde brukerensskjerm
sources: |
  1. **[Minst Privilegium](https://learn.microsoft.com/en-us/entra/identity-platform/secure-least-privileged-access)**
---

