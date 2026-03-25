---
tags:
  - dev-journey
date: 2025-11-23T00:00:00.000Z
title: Modernisering av GitHub-koblingen
ingress: |
  Jeg har byttet ut en utdatert bibliotek med en moderne løsning. Dette fjerner køer i systemet og gjør at nettsiden nå kan håndtere flere brukere samtidig uten at det blir utfordrende. Ved å rydde opp i støy og bruke AI-verktøy for sparring, har jeg redusert fremtidige vedlikehold og gjort plattformen rask. Resultatet er en stabil og mur som er klar for vekst og økt traffik.
parade: ''
star: |
  Jeg satt med en "hybrid" løsning der det meste av systemet var moderne og raskt, men koblingen mot GitHub hang igjen i et utdatert system (**Flask**). Jeg tok en besluttning om  å utsette denne oppgraderingen, for å forenkle og fokusere på en oppgradering om gangen, men dette førte til at satt jeg igjen med en bremset brukeropplevelse.

  Målet var å fjerne all "ventetid" i koden, slik at systemet kan håndtere flere forespørsler samtidig uten å stoppe opp.
  Oppgaven besto av å flytte GitHub-koblingen fra det utdaterte rammeverket og over til det moderne rammeverket.

  For å løse dette gjorde jeg tre ting:

  * Jeg laget til et digital filter som automatisk sjekker at dataene fra GitHub er riktige og lager dokumentasjon selv. Dette hindrer at feilmeldinger og lager dokumentasjon automatisk.
  * Jeg byttet ut det utdaterte verktøyet for nettsøk (**requests**) med et moderne nettsøk (**httpx**), som har flere forespørsler om gangen.
  * Jeg brukte AI-verktøy som **Copilot** & **Gemini**, som et verktøy for å sparre med under utviklingen., for å sikre at koden følger standarden i bransjen.

  Det utdaterte systemet nå helt fjernet. Løsningen tåler nå langt flere samtidige brukere, og brukerene slipper å vente på data. Fordi koden nå er ryddig og dokumentert, vil fremtidige endriger gå raskere og jeg har fjernet behovet for etterarbeid og bygget en mur som er klar for å vokse.
sources: ''
---

Dagens agenda

* Ryddet bort utdatert teknologi (Flask) som skapte kø i systemet. Dette fjerner unødvendig ventetid for besøkede.
* Laget et filter (Pydantic) som passer på at all data er riktig. Dette sikrer kvaliteten på dataen som kommer inn og reduserer feilmeldinger for brukerne og utviklere.
* Byttet ut det gamle søkeverktøyet med et moderne søkeverktøy (httpx). Systemet kan nå håndtere mange forespørsler samtidig i stedet for å lage en kø.
* Brukte Copilot og Gemini som sparrings partnere digitale eksperter for å sikre at koden følger standardene i bransjen.
* Designet systemet slik at det dokumenterer seg selv. Dette gjør at fremtidige endringer går raskere og blir rimligere å gjennomføre.
