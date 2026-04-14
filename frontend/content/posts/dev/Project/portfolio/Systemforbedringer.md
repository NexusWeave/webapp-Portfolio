---
date: 2026-04-30T13:25:36.739Z
title: Systemforbedringer
ingress: ''
status: ''
sources: ''
---

##### Datakartlegging og Systemarkitektur

Håndteringen av rådata fra \<abbr="En skytjeneste for utviklere">GitHub</abbr>-bindeleddet var ustrukturert i forhold til hva som trengtes i frontend. Dette skapte utfordringer med å opprettholde konsistent sortering og formatering av teknologistatistikk,  og resulterte i et unødvendig komplekst grensesnitt mellom backend og frontend.
Målet er å etablere et pålitelig bro mellom server og den visuelle delen av nettsiden for å sikre typesikkerhet, øke ytelsen og forenkle videreutvikling.

* Jeg utviklet en funksjonalitet for å kartlegge dataene  til et frontend-vennlig format, som inkluderer automatisk sortering, kartlegging av bilder og organisering av min kildekode statistikk.
* Jeg omstrukturerte bindeleddet mellom nettsiden og serveren for å legge til et kartleggings-verktøy, slik at den nå returnerer en ferdig vasket, <abbr title ="En funksjonalitet i vue som gjør at koden lytter til forandringer">reaktiv</abbr> liste med ressurser og en innebygd 'refresh' funksjonalitet.
* Jeg Optimaliserte server modellen ved å fjerne unødvendig felt for bilder og typer, noe som forenklet JSON-responsen og reduserer båndbreddebruk.

Denne omgjøringen gir kodebasen en slankere og mer <abbr title = "å dele noe opp i flere biter (legoklosser)">komponentaktig</abbr> arkitektur hvor komponenter nå er helt frikoblet fra bindeleddlogikken. Dette reduserer belastningen for utviklere ved fremtidige vedlikehold og lagt til rette for en stabil og forutsigbar informasjonsflyt i hele nettsiden. Ved å flytte kartleggingen ut av visningslaget oppnår man en <abbr title=" Separation of Concerns - Å separere ansvaret i forskjellige lag">separasjon av ansvar</abbr> som forenkler kodebasen for å teste, feilsøke og utvide i takt med nye krav.
