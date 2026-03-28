---
tags:
  - dev-journey
date: 2025-11-24T00:00:00.000Z
title: Make it Work til Make it Right
ingress: |
  Denne loggen dokumenterer et  arkitektonisk refaktorering, utløst av teknisk gjeld og uoversiktlig kode som følge av en "Make it work, Make it right, then make it fast"-metodikk. Ved å implementere kjerne-prinsippene SRP (Single Responsibility Principle) og DIP (Dependency Inversion Principle), ble all CSV-formatlogikk flyttet fra forretningslogikken til en dedikert, Interface-styrt tjeneste. Dette førte til en umiddelbar reduksjon på 57 kodelinjer i hovedfilen, sikret løs kobling og etablerte en robust, skalerbar arkitektur. Samtidig ble kritiske feil i navigasjonsstier identifisert og prioritert for utbedring før testing og fremvisning.
parade: ''
star: |
  Prosjektet hadde et preg av et økende vedlikeholdsetterslep som følge av hurtig utvikling i startfasen. Systemet fungerte, men manglet strukturen som kreves for stabil drift over tid. Oppbyggingen skapte en risiko der små endringer kunne føre til uforutsette feil, noe som kan risikere å bremset fremdriften

  Målet var å transformere systemet fra en sårbar struktur til en fleksibel og moderne arkitektur. Vi skulle skille ulike ansvarsområder slik at forretningsregler og datalagring ble uavhengige av hverandre, noe som sikrer at fremtidige utvidelser kan gjøres raskere og rimligere.

  For å oppnå dette har jeg gjennomført følgende tiltak:

  * Flyttet håndteringen av data bort fra kjernevirksomheten i koden, slik at hver del nå har et isolert og klart ansvarsområde.
  * Innførte universelle grensesnitt ("plug-and-play") mellom modulene, som fjerner behovet for spesialtilpasninger i hovedlogikken.
  * Begrenset tilgangen til interne prosesser for å hindre at endringer i én del av systemet utilsiktet ødelegger for en annen.

  Denne moderniseringen har transformert kildekoden til en pålitelig plattform med umiddelbare gevinster for videre drift. Ved å redusere kompleksiteten i hovedfilen med over 50 linjer har vi senket fremtidige vedlikeholdskostnader og lagt til rette for raskere opplæring av nye medarbeidere. Systemet er nå rigget for en effektiv videreutvikling, som betyr at vi kan koble på nye datakilder (som moderne databaser) uten ombygginger av kjernefunksjonaliteten. Samtidig har denne grundige gjennomgangen avdekket og korrigert skjulte logikkfeil før lansering, noe som sikrer en stabil brukeropplevelse og reduserer behovet for feilretting etter utrulling.
sources: ''
---

**Dagens Aktiviteter**

* Korrigere navigasjonsstiene som ble avdekket under refaktoreringen for å sikre at brukeropplevelsen er så stabil som mulig.
* Verifisere at den nye modulløsningen (isolasjon av data og forretningslogikk) fungerer nøyaktig som før, uten at funksjonalitet har gått tapt i flytteprosessen.
* Skrive en kort veiledning for hvordan de nye "plug-and-play"-koblingene fungerer, slik at fremtidige utviklere vet hvordan de legger til nye datakilder (f.eks. JSON/Database).
* Arkivere den gamle hovedfilen og oppdatere dokumentasjonen som viser den nye, reduserte filstørrelsen og den modulære strukturen.
* Fjerne eventuelle kommenterte kodesnutter eller gamle CSV-funksjoner som nå er erstattet av den dedikerte tjenesten.

**Motivasjon & Energi** **10** / **10**

Dagen er så fin den kan bli.
