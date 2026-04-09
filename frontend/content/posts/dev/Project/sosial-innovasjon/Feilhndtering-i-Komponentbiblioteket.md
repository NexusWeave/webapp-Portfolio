---
tags:
  - dev-journey
date: 2025-12-29T00:00:00.000Z
title: Optimalisering for en Tyggere Nettside og Økt Pålitelighet
ingress: |
  Ved å rydde opp i usynlige logikkfeil har jeg gjort nettsiden mer robust og brukervennlig. Jeg har fjernet ismåfeil som forstyrret kundene, og sørget for at systemet nå tåler manglende data uten å krasje. Dette betyr i praksis en mer profesjonell digital bilde av kunden, færre kundeklager og betydelige besparelser i fremtidige vedlikeholdskostnader fordi jeg nå slipper unødvendig raske fiks.
parade: ''
star: |
  #### Utilsiktet nedlastning og komponent-krasj

  Det ble oppdaget to ukorrektheter i prosjektets komponent-bibliotek som skapte en uventet brukeropplevelse. Feilene førte til at nettsiden oppførte seg ustabil for brukeren.

  Oppgaven min var å kartlegge de ukorrekthetene og sørge for at komponentene ble pålitelige . Målet var å sikre systemet forsto forskjellen på en vanlig lenke og en nedlastning, samt sørge for at nettsiden ikke krasjer selv om bildeinformasjonen, midlertidig manglet.

  * Jeg endret logikken hvordan systemet kommuniserer med nettleseren. Ved å bytte ut "sant/usant"-verdier til en logikk som fjerner kommunikasjonen helt når den ikke trengs, stoppet jeg de uønskede effekten av nedlastningsvarslene.
  * Jeg la til logikk for en sjekk som spør systemet om bilde er tilgjenglig i konteksten, hvis svaret er **usant**, så hopper systemet elegant over bilde-delen i stedet for å krasje hele siden.
  * Jeg ryddet opp i logikken for hvordan data blir levert til komponentene for å redusere feil marginen og sikrer at dataen som brukes er pålitelig og forutsigbar.

  Jeg har skapt et mer pålitelig komponentbibliotek som tåller uforutsette datafeil uten at det påvirker kunden. Ved å fjerne uønskede nedlastninger og hindre krasj, har jeg økt kvaliteten på produktet. Dette reduserer antall feilmeldinger for brukere og sparer raske fiks i fremtiden. Nettsiden fremstår nå som mer forutsigbart, profesjonelt og pålitelig.
sources: ''
---

**Dagens aktiviteter**

* Stoppe uønskede nedlastningsvarsler som forstyrrer brukere.
* Innføring av "smart-sjekker" som sørger for at nettsiden forblir oppe, selv når data mangler.
* Gjennom gang av hvordan nettsiden er mer påliteleig under panseret.
* Øke datakvaliteten, for å spare kostbar feilsøking og raske fiks i fremtiden.
* Oppsummere hvordan en forutsigbar nettside øker tilliten hos sluttbrukeren.

**Motivasjon** & **Energi** - **10** / **10**

Dagen har vært så fin den kunne bli.
