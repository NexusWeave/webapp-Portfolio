---
created: 2025-12-19T00:00:00.000Z
tags:
  - dev-journey
title: Fra Global Forbirring til Lokal Kontroll
ingress: >
  I et utviklingsløp er kontroll over kjøretidsmiljøet fundamentalt, men
  Linux-systemets standardprioriteringer kan ofte skape utfordringer for
  isolerte prosjekter. Denne artikkelen utforsker en situasjon der manglende
  systemstier førte til at utviklingsverktøy ignorerte virtuelle miljøer til
  fordel for globale installasjoner. Ved å manuelt etablere en lokal
  sti-infrastruktur via `~/.local/bin`, demonstreres det hvordan man tar
  kontroll over systemets søkehierarki. Gjennom praktisk feilsøking og
  konfigurasjon belyses viktigheten av å bygge manuell infrastruktur for å oppnå
  en forutsigbar, sikker og reproduserbar programvarekjøring.
star: ''
KildeHenvisning: ''
---

### Overstyring av systemets standardvalg for et isolert Python-miljø

#### Oppsett av Python-miljø

Under oppsettet av et existerende utviklingsprosjekt oppsto det en konflikt mellom systemet og utviklingsverktøyet, systemet nektet å bruke dette miljøet og i steden falte tilbake til den globale installasjonen, som en konsekvens at de lokale stiene ikke var tilgjengelig for systemet. Når utviklings verktøyet forsøkte å sjekke etter lokale miljøer, fant de ingen referanser til `.local/bin` eller `.venv`.

Uten denne stien i systemets konfigurasjon, har ikke systemet instruksjoner om å lete internt i prosjektet før den sjekker de globale mappene, som resulterte til at systemet hoppet over det isolerte miljøet og falt direkte til den globale installasjonen.

#### Opprettelse av lokal sti-infrastruktur

For å løse utfordringen, der systemet ikke kunne finne lokale referanser, ble det manuelt opprettet systemets mappestruktur. Ved å kjøre kommandoen under.

```bash
mkdir -p ~./local/bin
```

ble den nødvendige infrastrukturen for lokale binærfiler etablert. Dette sikret at systemet hadde en fysisk destinasjon for lokale installasjoner og verktøy, som igjen tillot utviklingsverktøyet å koble seg korrekt til det virtuelle miljøet for prosjektet.

Etter etableringen av mappen viste which python, den korrekte stien til det virtuelle python miljøet.

#### Systemkontroll og Sti-prioritering

Denne prosessen har gitt en dypere forståelse for hvordan Linux håndterer miljøer. Det er tydelig at Linux systemet har behov for en konkret mappe for å legge variabler, stier og aliaser som skal sjekkes før standardene velges.

Det har gitt en forståelse av at man kan ikke stole på at systemet finner  de lokale miljøene automatisk, og at infrastrukturen må noen ganger bygges manuelt. Å ha kontrollen over stien er det første steget mot en reproduserbar og sikker programvarekjøring.
