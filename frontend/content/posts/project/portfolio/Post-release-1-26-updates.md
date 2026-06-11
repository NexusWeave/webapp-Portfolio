---
date: 2026-06-11T20:30:00.000Z
title: Optimalisering og kvalitetsheving etter versjon 1.26
ingress: |
  Etter at den nye versjonen av nettsiden ble lansert, ble det tydelig at det var behov for å rydde litt i kulissene og gjøre koden enklere å forstå. Det handlet spesielt om å sikre at nettsiden er bygget opp på en logisk måte med riktig <abbr title="HyperText Markup Language">HTML</abbr>. Jeg ønsket å gjøre systemet enklere å vedlikeholde, og fikk på plass bedre verktøy som automatisk sjekker at ting fungerer som de skal, i tillegg til tydeligere veiledninger.
status: |
  #### Program informasjon
  **Teknologi** - Nuxt
  **Verktøy** - GitHub Actions, Sass
  **Prinsipper** - Semantikk, UU
---
* La til et verktøy som automatisk sjekker at nettsiden er bygget opp riktig.
* Skrev om veiledningene og dokumentasjonen til et enklere og tydeligere språk.
* Ryddet opp og endret navn på noen mapper slik at det er lettere å finne frem i koden for nettsidens utseende.
* Gjorde designet luftigere ved å øke avstanden mellom tekst og ikoner.
* Gjorde det enklere å sortere og filtrere på emneknagger (<abbr title="Nøkkelord for kategorisering">tags</abbr>) på loggsiden, og fjernet overflødig "støy" som logget i bakgrunnen.
* Fjernet en gammel og ubrukt oppgave knyttet til systemet på tjeneren (<abbr title="Logikk og databehandling på tjener">backend</abbr>) som kjørte under testingen i <abbr title="Plattform for automatisering av arbeidsflyt">GitHub Actions</abbr>.

Disse endringene gjør at nettsiden nå er ryddigere, raskere og lettere å jobbe videre med. De nye automatiske testene og oppryddingen i rutinene for oppdatering av nettsiden (kalt <abbr title="Continuous Integration / Continuous Deployment (Kontinuerlig integrasjon og utrulling av kode)">CI/CD</abbr>-pipelinen), sparer tid og passer på at nettsiden alltid følger kravene til god brukervennlighet for alle. At loggsiden nå er enklere å filtrere og har mer luft, gjør den mer behagelig å bruke. Samtidig vil den nye, ryddige mappestrukturen og de tydelige veiledningene gjøre det mye enklere å sette seg inn i prosjektet når nye ting skal lages (<abbr title="Innføringsprosess for nye prosjektdeltakere">onboarding</abbr>). Samlet sett betyr dette færre tekniske snubletråder og et mye mer stabilt fundament for fremtiden.