---
date: 2025-11-23T00:00:00.000Z
title: Modernisering av GitHub-koblingen
ingress: |
  Da deler av nettsiden ble hengende igjen i gammel teknologi, merket brukerne at ting gikk tregt. Jeg valgte å fornye selve motoren i systemet slik at den nå kan håndtere mange oppgaver samtidig i stedet for én og én. Ved å rydde i hvordan data hentes og kontrolleres, har jeg fjernet ventetiden og gjort siden langt mer pålitelig. Resultatet er en raskere opplevelse for gjestene og en løsning som er klar for fremtidig vekst.
status: |
  #### Dagens Aktiviteter

  * Ryddet bort utdatert teknologi (Flask) som skapte kø i systemet. Dette fjerner unødvendig ventetid for besøkede.
  * Laget et filter (Pydantic) som passer på at all data er riktig. Dette sikrer kvaliteten på dataen som kommer inn og reduserer feilmeldinger for brukerne og utviklere.
  * Byttet ut det gamle søkeverktøyet med et moderne søkeverktøy (httpx). Systemet kan nå håndtere mange forespørsler samtidig i stedet for å lage en kø.
  * Brukte Copilot og Gemini som sparrings partnere digitale eksperter for å sikre at koden følger standardene i bransjen.
  * Designet systemet slik at det dokumenterer seg selv. Dette gjør at fremtidige endringer går raskere og blir rimligere å gjennomføre.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli !
sources: ''
---

Jeg satt med en hybrid-løsning der det meste av systemet var moderne og raskt, men koblingen mot <abbr title="En skybasert tjeneste som lagrer kode og prosjektdata. I dette tilfellet fungerte GitHub som den eksterne datakilden systemet måtte hente informasjon fra.">GitHub</abbr> hang igjen i det utdaterte <abbr title="Et eldre og mer tradisjonelt teknologi-verktøy (rammeverk) som ofte brukes til enklere nettsider, men som kan bli tregt når mange ting skjer samtidig.">Flask</abbr> systemet. Jeg tok en besluttning om  å utsette denne oppgraderingen, for å forenkle og fokusere på en oppgradering om gangen, men dette førte til at satt jeg igjen med en bremset brukeropplevelse.

Målet var å fjerne all kode som gjorde en og en oppgave, slik at systemet kan håndtere flere forespørsler samtidig uten å stoppe opp. Oppgaven besto av å flytte GitHub-koblingen fra det utdaterte <abbr title= "Web Server Gateway Interface er en eldre standard som lar koden håndtere en og en oppgave samtidig">WSGI</abbr> standarden og over til det moderne <abbr title="Asynchronous Server Gateway Interface, en moderne standard som lar koden håndtere mange oppgaver samtidig">ASGI</abbr> standarden.

For å løse dette gjorde jeg tre ting:

* Jeg laget til et digital filter ved bruk av Pyndantic biblioteket som automatisk <abbr title="sjekke om data samsvarer">validerer</abbr> dataene fra GitHub er riktige og lager intern dokumentasjon selv. Denne teknikken reduserer feilmeldinger, og dokumenterer koden, som igjen påvirker stabiliteten.
* Jeg byttet ut det utdaterte <abbr title ="et synkront verktøy som søker etter informasjon på nettet">`request`-biblioteket</abbr>, som utfører bare en og en oppgave,  med et moderne nettsøkings <abbr title="et asynkront verktøy som søker etter informasjon på nettet">httpx-biblioteket</abbr> som utfører flere forespørsler samtidig.
* Jeg brukte AI-verktøy som **Copilot** & **Gemini**, som et verktøy for å sparre med under utviklingen., for å sikre at koden følger standarden i bransjen.

Det utdaterte systemet er nå fullstendig fjernet, og tregheten i brukeropplevelsen er fjernet. Ved å gå over til en løsning som kan håndtere flere forespørsler samtidig, tåler løsningen nå mer trafikk, noe som betyr at besøkende slipper ventetid på data. Jeg har sikret at koden er ryddigere, og pålitelig gjennom å bruke filtrerings teknikker for typesikkerhet og koden er selv-dokumenterende, noe som gjør at fremtidige endringer kan gjennomføres raskere og med lavere risiko for etterarbeid. Jeg har lagt et grunnlag som er klargjort for fremtidig vekst og skalering.

Denne prosessen erfarte jeg at det å utsette nødvendige oppgraderinger ofte kan føre til en bremset brukeropplevelse som krever mer arbeid senere. Jeg har sett kraften i å bytte fra <abbr title ="en teknikk innen for programvare utvikling der forespøsler skjer en og en">synkrone</abbr> verktøy som `requests` til <abbr title ="En teknikk innen programvare utvikling for å kjøre samtidige forespørsler">asynkrone</abbr> løsninger som `httpx`, og hvordan dette endrer systemets kapasitet. I tillegg erfarte jeg hvordan AI-verktøy som Gemini og Copilot fungerer som sparringspartnere for å sirke at koden holder en industristandard.
