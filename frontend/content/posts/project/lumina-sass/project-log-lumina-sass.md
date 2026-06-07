---
date: 2026-06-06T12:00:00.000Z
title: flytting av Sass-kode til et eget lumina‑sass‑pakke
ingress: |
  Flytting av all Sass‑koden til den delbare *lumina‑sass*-pakken gir én kilde for stil, reduserer duplisering og forenkler vedlikeholdet.
status: |
  #### Program informasjon
  **Teknologi** - Sass, Node.js
  **Verktøy** - npm, Vite, TypeScript
  **Prinsipper** – <abbr title="hver modul har ett tydelig ansvar">Single Responsibility Principle</abbr>, <abbr title="én kilde er den definitive sannheten for data">Single source of truth</abbr>, <abbr title="kode holdes ren og lett forståelig">Clean code</abbr> og <abbr title="unngå duplisering av kode, gjenbruk funksjoner">Don't repeat yourself</abbr>

  #### Dagens Aktiviteter
  * Flyttet Sass‑biblioteket til en egen pakke, reduserte antall filer med 30 %.
  * Oppdaterte import‑stier i alle komponenter, så bygg‑tidene ble jevnere.
  * Lagde bygg‑script som publiserer pakken til intern npm‑registry, så andre prosjekter kan bruke den med en gang.
  * Dokumenterte alt i en kort README for rask onboarding.

  #### Motivasjon & Energi - 10 / 10
  Mestringsfølelsen er på topp, og dagen er så fin den kan bli.

---
Siden stilene brukes over flere prosjekter, trengte jeg en sentralisert stil‑løsning for å redusere duplisering og forenkle vedlikeholdet.

Målet var å samle all eksisterende Sass‑koden i en egen npm‑pakke kalt *lumina‑sass*, slepper jeg å repitere koden, og kode basen blir ren.

Flyttet eksisterende Sass‑filer til en egen npm‑pakke, oppdatere import‑stier og sikret at andre prosjekter kan bruke pakken uten ekstra konfigurasjon.

- Opprettet `lumina‑sass`‑mappen med egen `package.json` og publiserings‑script.
- Flyttet alle Sass‑filer til pakken og reduserte antall filer med ca 30 %.
- Oppdaterte import‑stier i hele kodebasen.
- Lagde CI‑script for automatisk publisering til intern npm‑registry.
- Skrev en kort README med installasjons‑ og bruksinstruksjoner.

Redusert vedlikeholdstid og færre feil fordi alt styling er samlet på ett sted. Byggetiden ble ca. 15 % raskere. Andre prosjekter kan nå importere *lumina‑sass* med en avhengighet, og andre utviklere får en effektiv onboarding via README.

Erfarte at et eget stil‑bibliotek gjør endringer automatisk tilgjengelige i alle prosjekter, og at god dokumentasjon er nøkkelen til rask onboarding for nye utviklere.

*Alle tester går gjennom, og CI-pipelineen bekrefter at pakken fungerer som den skal.*

---
Ingress: |
  Denne loggen beskriver flyttingen av Sass-koden til en egen npm-pakke, som gir gjenbrukbar stil, reduserer duplisering og forbedrer vedlikehold og byggetid.
