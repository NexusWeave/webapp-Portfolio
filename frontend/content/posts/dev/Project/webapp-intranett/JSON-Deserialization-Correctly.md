---
tags:
  - dev-journey
date: 2025-11-10T00:00:00.000Z
title: Løsning av kommunikasjonsfeil og korrekt klargjøring av tilgangskontroll
ingress: |
  Da en feil i systemet hindret kollegaer i å logge inn, identifiserte jeg årsaken i hvordan de digitale tilgangsreglene ble lest på. Ved å korrigere hvordan systemet klargjør nødvendig sikkerhetsinformasjon, har jeg nå fjernet alle avbrudd ved oppstart. Resultatet er en stabil og trygg innlogging som beskytter sensitiv informasjon og sikrer at alle ansatte kan utføre jobben sin helt uavbrutt. Dette gir bedriften en trygg mur for digital trygghet.
parade: ''
star: |
  #### Løsning på innloggingsfeil

  Systemet har en Rollebasert tilgangs kontroll som har ansvaret for å skjerme informasjon for uvelkommende brukere. Ved oppstart oppsto det en feil der instruksjonslisten ikke lot seg lese korrekt inn i systemet. Dette hindret tjenesten fra å lagre tilgangsreglene i minnet, noe som førte til at hele applikasjonen stoppet opp for å ivareta sikkerheten.

  Oppgaven min var å feilsøke for å finne ut grunnen til at instruksjonslisten og mottakeren i systemet ikke lenger kommuniserte på samme språk.
  Som en konsekvens av at de to systemene er avhengig av hverandre for at sikkerhets laget skal fungere, var målet mitt å korrigere feilene slik at systemet kunne vertifisere tilganger og sikre en normal oppstart.

  Jeg gjennomførte en systematisk feilsøkingsprosess i sikkerhetstjenesten for å identifisere hvorfor de tilgangsreglene ikke ble akseptert av systemet.
  Ved dykke ned i koden oppdaget jeg at kilden til utfordringen var en manglende klargjøring av klassen `AccessService` som skulle ta imot dataene.

  * Jeg sikret for at systemet nå oppretter en ny og klar instans av `AccessService` klassen før selve innlastingen av reglene begynner.
  * Ved å sikre at klassen var klargjort i tide, kunne systemet korrekt overføre verdiene fra instruksjonslisten til de interne egenskapene i koden uten avbrudd.

  Instruksjonslisten blir lest riktig, sikkerhetskontrollen skjermer informasjon for brukere uten tilgang, og alle tilgangsregler er trygt lagret i systemets minne. Dette har fjernet avbruddene ved oppstart og sørget for at alle ansatte kan logge inn og gjøre jobben sin uten avbrudd i systemet. Ved å fikse dette har vi fjernet risikoen for at andre blir låst ute fra systemet, noe som forenkler hverdagen til kollegaer og studenter.

  Gjennom dette arbeidet har jeg erfart at det ikke holder å bare fortelle systemet at en klasse finnes; man må faktisk gjøre den klar og åpne den før man kan fylle den med informasjon. Denne innsikten har gitt oss en velfungerende sikkerhetskontroll som er selve muren i bedriftens trygghet. Det betyr at vi nå har en oppskrift for fremtiden som garanterer at informasjon alltid er beskyttet og at systemet forblir stabilt.
sources: ''
---

#### Dagens Aktiviteter

* Analyserte hvorfor systemet stoppet opp og hvorfor JSON-data med instruksjonslisten ikke ble lest inn i minnet.
* Gjennomførte en feilsøkings prosess for å finne ut hvorfor sikkerhetslaget hindret verifisering av tilganger.
* Oppdaget at klassen `AccessService` ikke var klargjort (instansiert) før dataene ble forsøkt overført.
* Endret koden slik at en ny instans av `AccessService` opprettes før innlastingen av regler starter.
* Bekreftet at verdier fra instruksjonslisten nå flyter uavbrutt til de interne egenskapene i koden.
* Sikret at sikkerhetskontrollen fungerer som den skal, slik at ansatte og studenter igjen kan logge inn uten utfordringer.
* Etablert en stabil metode for fremtidig håndtering av klasser og data som sikrer vedvarende systemstabilitet.

#### Motivasjon & Energi - 10 / 10

Dagen har vært så fin den kunne bli
