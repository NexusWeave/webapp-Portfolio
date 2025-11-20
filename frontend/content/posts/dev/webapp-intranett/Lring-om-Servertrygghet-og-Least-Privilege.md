---
created: 2025-11-20T00:00:00.000Z
tags:
  - dev-journey
title: Læring om Servertrygghet og Least Privilege
ingress: >
  En alvorlig autorisasjonssårbarhet ble avdekket hvor uautoriserte brukere, ble
  presentert interne navigasjonslenker. Den umiddelbare oppgaven var å revidere
  den initiale, ukorrekte  analysen og identifisere rotårsaken til at sensitive
  URL-stier ble utlevert til klienten. Gjennomført analyse avdekket at
  ukorrektheten lå i manglende serverside filtrering av stiene før rendering.
  Dette dokumentet oppsummerer læringen:  All autorisasjon håndteres på
  serversiden for å forhindre datalekkasje og understreker viktigheten av å
  følge prinsippet om Minst Privilegium
star: >+
  Det finnes en autorisasjonssårbarhet på nettsiden. Lenker som brukere ikke har
  tilgang til, er presentert i nettleseren.  Dette er en konsekvens av at det
  ikke finnes en funksjon for **Dynamisk Autorisert Navigasjon**. Dette bryter
  prinsippet om **[Minst
  Privilegium](https://cyberhoot.com/no/cybrary/least-privilege/)** og er en
  pontesiell lekasje av intern informasjon til feil brukere.


  Oppgaven er å identifisere årsaken til utlevering av sensitiv URL-stier,
  vurdere denne analysen mot anerkjente sikkerhetsprinsipper og utarbeide et
  sikkerhetsarkitetonisk korrektiv som sikrer at filtreringen håndteres på
  serversiden.



  Gjennom å lage et funksjon som filtrerer ut stiene til den autoriserte
  brukeren, vil brukeren ikke motta navigasjons sider, som de ikke kan bruke. 


  Jeg gjennomførte en analyse av autorisasjonsflyten og identifiserte at det
  ikke ble utført en filtrering av stiene i løpet av autorisasjons prosessen,
  før det ble returnert ut til frontend. 

KildeHenvisning: >
  1
  [https://joshclose.github.io/CsvHelper/getting-started/#reading-a-csv-file](https://joshclose.github.io/CsvHelper/getting-started/#reading-a-csv-file)
---

