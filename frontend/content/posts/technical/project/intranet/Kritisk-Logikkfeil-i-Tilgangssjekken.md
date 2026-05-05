---
date: 2025-11-10T00:00:00.000Z
title: Forbedre flyt og tryggere styring av systemtilganger
ingress: |
  Ved å rette en logikkfeil i systemets tilgangskontroll har vi fjernet tekniske hindringer som tidligere låste ute ansatte med tilgang. Feilen førte til unødvendig avbrudd i arbeidet. Gjennom en systematisk opprydding har vi sørget for at sikkerheten er både streng og sikker. Dette sikrer at de ansatte får gjort jobben sin effektivt, samtidig som bedriften har full kontroll på dataene. Arbeidet gir oss en mer stabil og forutsigbar drift i fremtiden.
status: |
  #### Program informasjon
  
  ** Verktøy** - RBAC, JSON

  #### Dagens Aktiviteter
  * Gjennomførte en systematisk analyse for å finne grunnen til at ansatte ble utelukket fra mapper og verktøy de rettmessig skulle ha tilgang til.
  * Identifiserte og rettet en logikkfeil i tilgangsstyringen som gjorde sikkerhetsreglene unødvendig strenge og til hinder for arbeidet.
  * Ryddet opp i feilaktige tegn og uoverensstemmelser i systemets oppsett for å sikre at roller og rettigheter blir gjenkjent korrekt.
  * Kontrollerte at rettelsene fungerer etter hensikten, slik at ansatte og studenter nå kan jobbe uten tekniske avbrytelser.
  * Fjernet rot i systemet, noe som sparer organisasjonen for tapt arbeidstid og frustrasjon.
  * Utarbeidet innsikt om viktigheten av nøyaktige data og faste maler for å sikre en stabil og forutsigbar drift i fremtiden.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli
sources: ''
---

Systemets rollebasert tilgangs kontroll (RBAC) hadde en logikkfeil som gjorde den altfor streng. Når ansatte hadde fått tillatelse til flere kategorier ved hjelp av en "samlenøkkel" (stjerne-symbolet \*), forsto ikke systemet instruksjonen. Selv om de ansatte var godkjente i systemet og skulle hatt tilgang, ble de nektet å åpne tillate filer og verktøy. Ansatte mistet tid fordi de ble stående foran en ei side de egentlig hadde tilgang til.

Målet mitt var å finne ut hvorfor  tilgangslogikken ikke forsto sine egne instruksjoner når det ble brukt samletegn. Oppgaven ble å rette denne logikken slik at sikkerhetslaget skjermer innholdet for brukere uten spesifikke roller. Dette handler om å sikre at de ansatte får gjort jobben sin uten tekniske hindringer, samtidig som bedriften har kontroll på hvem som har tilgang til hva.

Jeg gjennomførte en systematisk feilsøkningsprosess for å finne ut hvorfor systemet ikke kjente igjen rollene som var lagt inn.

* Ved å sammenligne hvordan tilgangene var skrevet i konfigurasjonsfilen med hvordan systemet leste dem, oppdaget jeg en liten skrivefeil. Det var lagt inn et ekstra tegn i filstiene som gjorde at mønsteret ikke stemte overes med rollen.
* Jeg fjernet de unødvendige tegnene fra alle stiene i instruksjonsfilen.
* Etter rettingen kontrollerte jeg at systemet nå klarte å koble sammen samletegnet med de riktige mappene slik at sikkerhetsreglene ble fulgt som planlagt.

Den rollebaserte tilgangskontrollen fungerer som planlagt. Ansatte og studenter blir ikke avbrutt med tekniske feil når de påner mapper og filer de har rettigheter til å se. Ved å fikse denne logikken har vi fjernet unødvendig tidsbruk, slik at alle kan bruke tiden sin på jobb isteden for motstand fra systemet.

Gjennom arbeidet har jeg fått en innsikt som gjør bedriften tryggere og mer effektiv i fremtiden. Det har blitt erfart at selv et lite tegn på avveie i systemets instruksjonsbok kan skape utfordringer. For at sikkerheten skal være både streng og smidig, må informasjonen som legges inn være nøyaktig og følge samme mal hver gang. Det er også erfart at vi må rydde bort all informasjon med en gang den kommer inn i systemet. Dette hindrer at små feil får tilgang til å stanse funksjoner som pålogging og tilgang.
