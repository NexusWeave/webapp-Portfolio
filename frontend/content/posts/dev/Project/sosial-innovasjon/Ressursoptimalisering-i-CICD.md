---
tags:
  - dev-journey
date: 2025-12-23T00:00:00.000Z
title: Fra manuell rutine til selvgående CI/CD prossees
ingress: |
  Ved å la prossesen fra ferdig kode til publisering, gå av seg selv, har jeg skapt en løsning som sparer både tid og penger. Jeg har valgt et rimlig alternativ som forlenger bygge minutter i Github. Resultatet er et selvgående system som reduserer både kostnader og utviklertid for å utføre manuelle rutine oppgaver.
parade: ''
star: |
  #### Github Actions-Kvoter

  Jeg skulle innføre en automatisk rutine av versjonering, Utvikler notater og bygging av nettsiden for prosjektet, slik at prosjektet automatisk kjører rutiner, ved en produksjons klar programvare.I Github har man en fast månedlig kvote på** 2000 gratis bygge minutter** for både offentlige og private prosjekter.

  #### Oversikt over Githubs Multiplikator.

  | **Operativsystem** | **Multiplikator** | **Forbruk per minutt** |
  | ------------------ | ----------------- | ---------------------- |
  | Linux              | 1x                | 1 minutt               |
  | Windows            | 2x                | 2 minutt               |
  | macOS              | 10x\*             | 10 minutt              |

  Min oppgave var å løse utfordringen på hvordan jeg kunne bruke de byggeminuttene i Github maksimalt, for å ha en rimlig løsning, både for meg selv og kunden, uten om å betale mer enn nødvendig.

  * Under undersøkingenen av dokumentasjonen om [Github Action billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions), oppdaget jeg at mac-maskiner i skyen har en multiplier på 10, som vil si at 1min med bygging koster 10min av bygge kvoten.
  * Som tabellen over viser at Linux kun har en kostnad på 1x per minutt, besluttet jeg i å kjøre alle prosessene på Linux. Dette er klart det rimligste alternativet som gir mest verdi for meg.
  * Istedet for at maskinen starter opp hver gang det skjer en liten endring, satte jeg opp systemet til å kun kjøre når koden blir sammenslått til hovedprosjektet. Dette sparer store mengder med tid, da det er ofte behov for mange endringen løpet av et prosjekt.

  I stedet for å gjøre alt dette manuelle arbeidet hver gang en ny versjon, lanseres, har jeg laget en prosess som kjører av seg selv på en rask og rimlig måte og jeg sikrer at kvoten på 2 000 bygge minutter varer så lenge som mulig. Dette reduserer unødvendig bruk av ressurser og at jeg har full kontroll på utgiftene knyttet til sky-tjenesten.
sources: ''
---

**Dagens aktiviteter**

* Gjennomgang av GitHubs kvote på 2000 bygge-minutter og hvordan jeg kan unngå å gå tom.
* Avsløring av "10x-fellen" – hvorfor jeg velger Linux fremfor Mac for å få 10 ganger mer arbeid for pengene.
* Hvordan vi sparer tid ved å la maskinene hvile helt til koden er klar for produksjon.
* Erstatte manuelt rutinearbeid med en selvgående prosess (CI/CD) for versjonering og nettsidebygging.
* Oppsummering av hvordan jeg kutter utviklingstid.

**Motivasjon** & **Energi** - **10** / **10**

Dagen har vært så fin, som det har vært mulig
