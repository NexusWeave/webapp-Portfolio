---
created: 2025-11-03T00:00:00.000Z
tags:
  - dev-journey
title: Bærekraftig Stihåndtering etter kritisk API-krasj
ingress: ''
star: >
  API-en til Intranettet,  krasjer ved innlogging, som resulterer at innholdet
  er utilgjengelig. 


  Målet var å identifisere kilden til denne konflikten og implementere en
  langsiktig bærekraftig løsning.


  Etter **fire timers feilsøking** ble utfordringen identifisert: API-et
  krasjet  som en konsekvens av en **ukorrekt sti** i koden, som hindret tilgang
  til riktige dokumenter. For å korrigere dette ble det etablert en todelt
  strategi.


  * Den umiddelbare, ukorrekte stien som ble sendt inn fra frontend-koden må
  korrigeres, med en kode for å kartlegge hvor dokumentene ligger.

  * Implementere bærekraftig kode for fremtidige håndteringer av ukorrekte
  stier. som 404-side.
---

