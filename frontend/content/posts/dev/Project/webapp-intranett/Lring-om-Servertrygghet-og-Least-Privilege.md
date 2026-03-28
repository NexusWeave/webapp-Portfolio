---
tags:
  - dev-journey
date: 2025-11-20T00:00:00.000Z
title: Læring om Servertrygghet og Least Privilege
ingress: |
  En autorisasjonssårbarhet ble avdekket hvor sensitive URL-stier ble visuelt eksponert i navigasjonen for uautoriserte brukere. Den tekniske analysen identifiserte at rotårsaken lå i manglende serverside-filtrering under konverteringsprosessen fra CSV-filer. Denne svikten utgjorde et direkte brudd på Prinsippet om Minst Privilegium (*Least Privilege*). Læringsloggen konkluderer med at all fremtidig utvikling må sikre at navigasjonsdata filtreres utelukkende på serversiden, basert på brukerens autoriserte rolle, før de utleveres til klienten.
parade: ''
star: ''
sources: |
  1. **[Minst Privilegium](https://learn.microsoft.com/en-us/entra/identity-platform/secure-least-privileged-access)**
---

