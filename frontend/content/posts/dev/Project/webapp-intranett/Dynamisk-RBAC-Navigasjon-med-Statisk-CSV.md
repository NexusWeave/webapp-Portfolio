---
date: 2025-11-18T00:00:00.000Z
title: Dynamisk RBAC-Navigasjon med Statisk CSV
ingress: |
  Vi har innført en intelligent navigasjonsløsning som automatisk tilpasser menyer etter den enkeltes rettigheter. Ved å filtrere bort utilgjengelig innhold før det når skjermen, har vi fjernet unødvendig støy og styrket sikkerheten for både ansatte og studenter. Den nye strukturen sikrer en profesjonell brukeropplevelse og reduserer fremtidige kostnader, da vi nå kan oppdatere innhold og tilgangsnivåer manuelt uten behov for omfattende omprogrammering.
parade: ''
star: |
  Systemet vårt benytter en sentral oversikt (en CSV-fil ved bruk av [`CsvHelper`](https://joshclose.github.io/CsvHelper/getting-started/#reading-a-csv-file)) for å styre innholdslister og hovedmenyer. Utfordringen var at denne listen var statisk; alle brukere så de samme lenkene og menyvalgene, uavhengig av hvilke rettigheter de faktisk hadde i systemet. Dette skapte en uoversiktlig brukeropplevelse og potensielle sikkerhetsspørsmål, da brukere kunne se navigasjonsstier de ikke hadde tillatelse til å besøke.

  Målet var å designe og skape en intelligent løsning som automatisk kobler menyoversikten sammen med brukernes rettighetsnivå (**RBAC**). Oppgaven var å skape en dynamisk navigasjon som filtrerer bort utilgjengelig innhold, slik at hver enkelt bruker kun presenteres for de lenkene og funksjonene de faktisk har tilgang til å bruke.

  For å løse dette har jeg utviklet en ny tjeneste som fungerer som et filter mellom datakilden og brukerflaten:

  * Jeg satte opp en løsning i som leser den sentrale oversikten og tolker innholdet systematisk.
  * Selve kontrollen av rettigheter er lagt til en egen, skjermet modul. Dette sikrer at sikkerhetsreglene er adskilt fra resten av systemet for enklere vedlikehold.
  * Systemet bryter ned hver enkelt sti i navigasjonen og verifiserer den mot brukerens unike rettighetsprofil.
  * Kun de godkjente delene av oversikten blir satt sammen på nytt og sendt videre til brukerens skjerm.
  *

  Vi har nå fått en skreddersydd og sikker brukeropplevelse der systemet automatisk tilpasser seg både ansattes og studentens ansvarsområde. Ved å fjerne utilgjengelige lenker før de i det hele tatt når brukerens skjerm, har vi fjernet unødvendig støy og styrket bedriftens sikkerhet. Samtidig har vi lagt til rette for en mer kostnadseffektiv drift den nye løsningen er bygget slik at vi i fremtiden kan endre tilgangsnivåer eller legge til nytt innhold uten behov for tidkrevende omprogrammeringer. Resultatet er et profesjonelt verktøy som øker både ansattes og studentens effektivitet.
sources: ''
---

**Dagens Aktiviteter**

* Konstruert en ny tjeneste som automatisk fjerner utilgjengelige lenker fra systemets menyer, slik at ansatte og studenter kun ser det de har tillatelse til.
* Implementert en logikk som går gjennom hver enkelt sti i navigasjonen og bekrefter at den samsvarer med godkjente tilgangsnivåer.
* Etablert en oversiktlig og sentralisert metode (JSON) for manuell tildeling av brukertilganger, noe som gir full kontroll og enkel administrasjon av rettigheter.
* Skilt ut selve "dørvakt-funksjonen" i en egen modul for å sikre at fremtidige oppdateringer av regelverket kan gjøres raskt og trygt uten å påvirke resten av systemet.
* Verifisert at systemet nå bygger opp en ryddig og skreddersydd oversikt for hver enkelt bruker, noe som reduserer digital støy og øker effektiviteten i hverdagen.

**Motivasjon & Energi** - **10** / **10**

Dagen er så fin den kan bli.
