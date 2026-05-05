---
date: 2025-12-16T00:00:00.000Z
title: Håndtering av Electron-tilbakerulling i Garuda-Linux
ingress: |
  En oppdatering av utvikler verktøyet `VS Code` skapte en feil i menyene som stoppet alt arbeid. I stedet for tidkrevende feilsøking, valgte jeg strategisk å rulle tilbake  til forrige stabile versjon med linux verktøyet `downgrade`. Dette gjenopprettet arbeidsflyten raskt og fjernet nedetid uten risiko for datatap. Beslutningen var å prioritere rask fremdrift fremfor unødvendig detaljfokus.
status: |
  #### Program informasjon
  **OS** - Garuda Arch Linux
  ** Verktøy** - VS Code, downgrade, KDE-Plasma

  #### Dagens Aktiviteter

  * Finne årsaken til at menyene i programmet VS Code forsvant.
  * Gjenopprette arbeidsverktøyet raskest mulig.
  * Utføre en trygg tilbakestilling av en spesifikk programvarepakke.

  #### Motivasjon & Energi - 10/10

  Dagen har vært så fin den kunne bli.
sources: ''
---

Etter en oppdatering av programmet VS Code i operativsystemet, oppsto det en uforutsett feil som deaktiverte hovedmenyen. Dette gjorde det umulig å navigere i prosjekter eller bruke vanlige menyvalg. feilsøkingen viste at det var en konflikt mellom VS Code og skrivebordsmiljøet, spesifikt knyttet til hvordan grafikken i menyene blir tegnet.

Siden dette er mitt primære arbeidsverktøy for tekniske prosjekter, var målet å bringe systemet tilbake til en fungerende versjon så raskt som mulig. Oppgaven var å finne feilen og installere en stabil versjon av programmet, uten å risikere tap av data eller endre på andre deler av maskinen.

For å løse situasjonen effektivt utførte jeg følgende tiltak:

* Jeg bekreftet raskt at feilen kun gjaldt VS Code og ikke hele maskinen. Selv om feilen oppsto etter en systemoppdatering, var utfordringen koblet til selve programpakken.
* Jeg forsøkte først å tvinge programmet til å tegne menyene på en annen måte inne i innstillingene, men da dette ikke ga ønsket resultat, prioriterte jeg en mer effektiv løsning.
* Jeg benyttet jeg verktøyet `downgrade` for å manuelt installere den tidligere `versjonen 1.106`. Ved å bruke kommandoen `sudo downgrade visual-studio-code-bin` fikk jeg installert versjonen som fungerte feilfritt med systemet mitt.

VS Code fungerer igjen. Ved å velge en målrettet nedgradering fremfor una full gjenoppretting av hele maskinen, ble feilen funnet med minimal nedetid. Den viktigste erfaringen er at i et aktivt utviklingsmiljø er en rask tilbakestilling ofte bedre enn dyp feilsøking hvis målet er å komme raskt i gang med arbeidet igjen. Jeg har nå bekreftet at `downgrade` er et effektivt verktøy for å håndtere slike konflikter i et Linux-basert system.
