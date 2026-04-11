---
tags:
  - dev-journey
date: 2025-12-16T00:00:00.000Z
title: Erfaringer med assembly-konflikter og mappehierarki
ingress: |
  Ved å gjennomføre en strategisk reorganisering av systemarkitekturen har vi i dag fjernet tekniske sperrer som hindret stabil drift og videreutvikling. Ved å forenkle og standardisere måten systemet er bygget opp på, har vi redusert risikoen for feil og lagt til rette for en mer kostnadseffektiv og forutsigbar produksjonslinje. Dette sikrer at bedriftens digitale løsninger leveres med høyere kvalitet og færre avbrytelser.
status: |
  #### Dagens Aktiviteter

  * Identifisert og fjernet systemfeil som hindret programvaren i å starte korrekt, noe som sikrer uavbrutt fremdrift i prosjektet.
  * Reorganisert systemets interne mappestruktur for å fjerne forvirring i automatiserte prosesser, som resulterer i en raskere og mer pålitelig vei fra koding til ferdig produkt.
  * Implementert et standardisert rammeverk som forhindrer at duplikate filer og tekniske konflikter oppstår på nytt.
  * Fjernet skjulte svakheter i systemarkitekturen som kunne ført til kostbar nedetid og uforutsette feil ved fremtidige oppdateringer.
  * Sikret at systemets interne komponenter nå har korrekte "veibeskrivelser" til hverandre, noe som gjør det enklere og billigere å vedlikeholde løsningen over tid.

  #### Motivasjon & Energi - 10 / 10

  Dagen er så fin den kan bli

sources: ''
---
Bedriftens sentrale programvareoppsett opplevde tekniske konflikter som hindret systemet i å bli ferdigstilt og tatt i bruk. Ulike deler av systemet "snakket forbi hverandre", noe som førte til feilmeldinger og stans i hele produksjonslinjen for programvaren. For organisasjonen betydde dette uforutsigbarhet og risiko for forsinkelser i leveranser.

Hovedmålet var å fjerne de tekniske blokkeringene og sikre at systemet kunne bygges feilfritt hver gang. Dette krevde en dypere analyse av hvordan filene i prosjektet var organisert, for å fjerne duplikater og sikre at alle komponenter fant hverandre i systemstrukturen.

* Gjennomførte en gjennomgang av hvordan systemet genererer sine egne startfiler for å isolere kilden til de gjentakende feilmeldingene.
* Identifiserte at en for dyp og uoversiktlig mappestruktur skapte forvirring for systemets interne søkeverktøy.
* Flyttet sentrale styringsfiler til et mer logisk og standardisert nivå for å sikre korrekte baner og stabil referansehåndtering.
* Testet ut ulike strategier for å deaktivere unødvendige autogenererte filer som skapte støy i byggeprosessen.

Ved å rydde opp i prosjektets grunnmur har vi nå oppnådd en 100% stabil og forutsigbar byggeprosess. Alle tekniske konflikter er fjernet, noe som betyr at utviklingstiden kan brukes på verdiskapende funksjonalitet fremfor teknisk brannslukking. Vi har redusert den tekniske gjelden betydelig ved å innføre et standardisert oppsett som er mindre sårbart for feil, noe som sikrer bedriften en tryggere og mer effektiv digital produksjon i tiden fremover.