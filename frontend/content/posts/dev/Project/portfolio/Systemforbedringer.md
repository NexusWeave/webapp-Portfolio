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

Denne omgjøringen gir kodebasen en slankere og mer <abbr title = "å dele noe opp i flere biter (legoklosser)">komponentaktig</abbr> arkitektur hvor komponenter nå er helt frikoblet fra bindeleddlogikken. Dette reduserer belastningen for utviklere ved fremtidige vedlikehold og lagt til rette for en stabil og forutsigbar informasjonsflyt i hele nettsiden.

Ved å flytte kartleggingen ut av visningslaget oppnår man en <abbr title=" Separation of Concerns - Å separere ansvaret i forskjellige lag">separasjon av ansvar</abbr> som forenkler kodebasen for å teste, feilsøke og utvide i takt med nye krav.

#### Brukergrensesnitt og Merkevarekonsistens

De visuelle hovedelementene som datoer, ikoner og teknologietiketter ble presentert på ulike måter på tvers av nettstedet. Denne mangelen på en felles standard skapte et uventet inntrykk som undergravde tilliten til den digitale identiten og gjorde brukeropplevelsen uforutsigbar for besøkende.
Målet var å samle og standardisere all visuell presentasjon under én felles logikk for å sikre en gjenkjennelig, standardisert og tillitvekkende brukeropplevelse.

* Jeg gjennomførte en omfattende standardisering av datovisning i komponentene ved hjelp av strengere typesikkerhet og et sentralt verktøy for å formatere dato.
* Jeg gjorde endringer i Github kortene for å gi en detaljert og enhetlig visning av teknologier, jeg inkluderte visualisering av bytes og spesifikke språktyper i [om meg som utvikler siden](https://krigjo25.no/dev).
* Jeg synkroniserte medie komponentene slik at de følger den samme strukturelle logikken over hele nettstedet.

Denne omgjøringen resulterte til et visuelt helhetlig grensesnitt hvor all informasjon følger det samme standard, som styrker identiteten og øker det visuelle appealet for brukere. Dette gir en direkte positiv påvirkning på brukernes engasjement.

## Konsistens er fundamentet i en brukeropplevelse. Små visuelle avvik kan virke som bagateller isolert sett, men i det helhetlige er detaljene nettsiden oppleves som stabilt eller uprofesjonelt.

#### Navigasjon, Tilgjengelighet og Synlighet

Hoved navigasjonen i <abbr title ="Toppen av en nettside / element">Header</abbr>> var veldig kompleks og media komponentet manglet en presis måte å håndtere bildetekster på, noe som førte til at bildene ikke hadde en beskrivelse. Dette svekker både brukeropplevelsen, <abbr title ="Universell Utforming - å forme noe som passer de fleste forbrukere uten tilpassning"> UU.
Målet var å forenkle navigasjonsstrukturen for å gi besøkende en smidigere brukeropplevelse og legge til en kontrollert løsning for <abbr title ="Skjult beskrivende data om bilde / video">metadata</abbr> som sikrer at riktig innhold vises i riktig situasjon.

* Jeg forenklet oppbyggingen av Hovednavigasjonen ved å ta i bruk <abbr title = "En teknikk i vue der koden lytter til forandringer i data">`computed properties`</abbr> for navigasjons- og håndtering av logo. \[^6]
* Jeg forbedret logikken i i bildene slik at riktig bildetekst vises basert på bildetypen, i stedet for å falle tilbake på rotete standardtekster.
* Jeg utvidet støtten for lenkerog blogg- kartlegging til å inkludere nye ikon-typer, for forbedre den visuelle kategorisering av innhold.

Denne omgjøringen resulterte til en raskere og mer responsiv meny, som reduserer friksjon i brukeropplevelsen, dette forbedrer inntrykket på nettsiden.
En forenklet brukeropplevelse og korrekt metadata er avgjørende for å forbedre opplevelsen andre.
