---
tags:
  - dev-journey
date: 2025-11-10T00:00:00.000Z
title: Løsning av kommunikasjonsfeil og korrekt klargjøring av tilgangskontroll
ingress: |
  Ved å løse en feil i systemets tilgangskontroll (RBAC), har vi sørget for at både kollegaer og studenter slipper avbrudd når de skal logge inn. Tidligere stoppet hele systemet opp fordi det ikke forsto sine egne sikkerhetsregler, noe som skapte unødvendige avbrudd i arbeidsdagen. Ved å rydde opp i denne kommunikasjonssvikten har vi fjernet risikoen for at ansatte blir låst ute, og dermed spart bedriften for tapt arbeidstid. Resultatet er en tryggere hverdag hvor sensitiv informasjon er godt beskyttet, og et system som alltid er klart til bruk når folk trenger det.
parade: ''
star: |
  Systemet har en Rollebasert tilgangs kontroll (**RBAC**) som har ansvaret for å skjerme informasjon for uvelkommende brukere. Ved oppstart oppsto det en feil der instruksjonslisten (JSON-data) ikke lot seg lese korrekt inn i systemet. Dette hindret tjenesten fra å lagre tilgangsreglene i korttidsminnet, noe som førte til at hele applikasjonen stoppet opp for å ivareta sikkerheten.

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

**Dagens Aktiviteter**

Motivasjon & Energi - 10/10
