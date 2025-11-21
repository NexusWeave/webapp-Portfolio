---
created: 2025-11-20T00:00:00.000Z
tags:
  - dev-journey
title: Læring om Servertrygghet og Least Privilege
ingress: >
  En autorisasjonssårbarhet ble avdekket hvor sensitive URL-stier ble visuelt
  eksponert i navigasjonen for uautoriserte brukere. Den tekniske analysen
  identifiserte at rotårsaken lå i manglende serverside-filtrering under
  konverteringsprosessen fra CSV-filer. Denne svikten utgjorde et direkte brudd
  på Prinsippet om Minst Privilegium (*Least Privilege*). Læringsloggen
  konkluderer med at all fremtidig utvikling må sikre at navigasjonsdata
  filtreres utelukkende på serversiden, basert på brukerens autoriserte rolle,
  før de utleveres til klienten.
star: >
  En **autorisasjonssårbarhet** ble identifisert på nettsiden. Lenker som
  brukere ikke har tilgang til, ble **visuelt eksponert** i navigasjonen for
  uautoriserte brukere. Dette utgjorde en **pontensiell lekkasje av intern
  informasjon** ved at sensitive URL-stier ble avdekket. Sårbarheten er en
  konsekvens av at systemet ikke hadde en autorisasjonsfiltrering i
  backend-prosessen, som resulterte at klient-side logikken, viste
  navigasjonene. 


  * **Identifisere årsaken** til utlevering av sensitiv URL-stier, 

  * Vurdere denne analysen mot **anerkjente sikkerhetsprinsipper**.


  Jeg gjennomførte en analyse av autorisasjonsflyten og identifiserte at det
  **ikke ble utført en filtrering av stiene i løpet av konverteringsprossesen**
  fra CSV-filer til det endlige dokumentet som skulle fremvises.



  Analysen bekrefter at systemet brøt** Prinsippet om** **[Minst
  Privilegium](https://learn.microsoft.com/en-us/entra/identity-platform/secure-least-privileged-access)**. 


  * For å følge dette prinsippet **må** det **implementeres** en funksjon som
  filtrerer ut stiene basert på brukerens autoriserte rolle og tilgangsnivå i
  systemet. dette **må** skje i serversidens prosess etter at CSVHelper har lest
  dokumentet. 
    * Least Privilege prinsippet krever at en bruker skal bare ha innsyn i det minimale av URL-stier, som er nødvendig.
  * Implementeringen av en funksjon som filterer ut stiene basert på brukerens
  autoriserte rolle og tilgangsnivå, skal skje i prossesen etter at CSVhelper
  har lest dokumentet. 


  Fra denne sårbarheten lærte jeg  at at URL-stiene **skal** sjekkes opp mot
  hvilken rolle brukeren har, for å håndheve **Prinsippet om Minst
  Privilegium**.
KildeHenvisning: ''
---

