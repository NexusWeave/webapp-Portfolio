---
date: 2026-06-06T12:00:00.000Z
title: Flytting av Sass-kode til et eget lumina‑sass‑pakke
ingress: |
  Siden stilene brukes på tvers av flere ulike prosjekter, ble all Sass-kode samlet i en egen, sentralisert pakke. Flyttingen til *lumina-sass* betyr at det nå eksisterer én eneste kilde for all stil, noe som dramatisk reduserer kodeduplisering. Det forenkler ikke bare vedlikeholdet betraktelig, men gjør også at byggetiden i prosjektene går raskere.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Sass, Node.js
  **Verktøy** - npm, Vite, TypeScript
  **Prinsipper** – <abbr title="hver modul har ett tydelig ansvar">Single Responsibility Principle</abbr>, <abbr title="en kilde er den definitive sannheten for data">Single source of truth</abbr>, <abbr title="kode holdes ren og lett forståelig">Clean code</abbr> og <abbr title="unngå duplisering av kode, gjenbruk funksjoner">Don't repeat yourself</abbr>

  #### Dagens Aktiviteter
  * Flyttet Sass‑biblioteket til en egen pakke, reduserte antall filer med 30 %.
  * Oppdaterte import‑stier i alle komponenter, så bygg‑tidene ble jevnere.
  * Lagde bygg‑script som publiserer pakken til intern npm‑registry, så andre prosjekter kan bruke den med en gang.
  * Dokumenterte alt i en kort README for rask onboarding.

  #### Motivasjon & Energi - 10 / 10
  Mestringsfølelsen er på topp, og dagen er så fin den kan bli.
--- 

Siden stilene brukes over flere prosjekter, var det behov for en sentralisert stil‑løsning for å redusere duplisering og forenkle vedlikeholdet.

Hensikten var å samle all eksisterende Sass‑kode i en egen npm‑pakke kalt *lumina‑sass*, for å unngå repetisjon av kode, og holde kodebasen ren.

- Flyttet eksisterende Sass‑filer til en egen npm‑pakke, oppdaterte import‑stier og sikret at andre prosjekter kan bruke pakken uten ekstra konfigurasjon.
- Opprettet `lumina‑sass`‑mappen med egen `package.json` og publiserings‑script.
- Flyttet alle Sass‑filer til pakken og reduserte antall filer med ca 30 %.
- Oppdaterte import‑stier i hele kodebasen.
- Lagde CI‑script for automatisk publisering til intern npm‑registry.
- Skrev en kort README med installasjons‑ og bruksinstruksjoner.

Byggetiden ble ca. 15 % raskere med redusert vedlikeholdstid og færre feil som en konsekvens av at all styling er samlet på ett sted. Alle prosjekter kan nå importere *lumina‑sass* som en avhengighet, og det blir mye enklere å sette seg inn i koden igjen senere via README. Dette understreker det som ble erfart; et eget stil‑bibliotek gjør endringer automatisk tilgjengelige overalt, og god dokumentasjon er nøkkelen til å jobbe effektivt over tid (*Alle tester går gjennom, og CI-pipelineen bekrefter at pakken fungerer som den skal*).

Ingress: |
  Denne loggen beskriver flyttingen av Sass-koden til en egen npm-pakke, som gir gjenbrukbar stil, reduserer duplisering og forbedrer vedlikehold og byggetid.
