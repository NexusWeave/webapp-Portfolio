---
created: 2025-11-20T00:00:00.000Z
tags:
  - dev-journey
title: Læring om Servertrygghet og Least Privilege
ingress: >
  En autorisasjons sårbarhet ble avdekket hvor uautoriserte brukere ble
  presentert i interne navigasjonslenker. Den umiddelbare oppgaven var å
  revidere den initiale, ukorrekte  analysen og identifisere rotårsaken til at
  sensitive URL-stier ble utlevert til klienten. Gjennomført analyse avdekket at
  ukorrektheten lå i manglende serverside filtrering av stiene før rendering.
  Dette dokumentet oppsummerer læringen:  All autorisasjon håndteres på
  serversiden for å forhindre datalekkasje og understreker viktigheten av å
  følge prinsippet om Minst Privilegium
star: >
  En autorisasjonssårbarhet ble identifisert på nettsiden. Lenker som brukere
  ikke har tilgang til, ble visuelt eksponert i navigasjonen for uautoriserte
  brukere. Dette utgjorde en pontensiell lekkasje av intern informasjon ved at
  sensitive URL-stier ble avdekket. Sårbarheten er en konsekvens av at systemet
  ikke hadde en autorisasjonsfiltrering i backend-prosessen, som resulterte at
  klient-side logikken, viste navigasjonene. 


  * Identifisere årsaken til utlevering av sensitiv URL-stier, 

  * Vurdere denne analysen mot anerkjente sikkerhetsprinsipper.


  Jeg gjennomførte en analyse av autorisasjonsflyten og identifiserte at det
  ikke ble utført en filtrering av stiene i løpet av konverteringsprossesen fra
  csv-filer til det endlige dokumentet som skulle fremvises.


  * Analysen bekrefter at systemet brøt Prinsippet om **Minst Privilegium**. 


  For å følge dette prinsippet må det implementeres en funksjon som filtrerer ut
  stiene basert på brukerens autoriserte rolle og tilgangsnivå i systemet. dette
  må skje i serversidens prosess etter at CSVHelper har lest dokumentet. 
  Lærdommen av denne situasjonen er Prinsippet om Minst Privilegium


  Least Privilege prinsippe krever at en bruker skal bare ha innsyn i det
  minimale av URL-stier, som er nødvendig. 


  Implementeringen av en funksjon som filterer ut stiene basert på brukerens
  autoriserte rolle og tilgangsnivå, skal skje i prossesen etter at CSVhelper
  har lest dokumentet.


  Lærdommen fra denne sårbarheten er at URL-stiene skal sjekkes opp mot hvilken
  rolle brukeren har, før ferdig parset CSV dokument sendes til frontend.
KildeHenvisning: >
  1
  [https://joshclose.github.io/CsvHelper/getting-started/#reading-a-csv-file](https://joshclose.github.io/CsvHelper/getting-started/#reading-a-csv-file)
---

