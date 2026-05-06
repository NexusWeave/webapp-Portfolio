---
date: 2025-11-07T00:00:00.000Z
title: Sikring av Data og Brukertilganger
ingress: |
  For å øke sikkerheten har jeg lagt til en ny løsning for tilgang til systemet. Ved å skille tydelig mellom ansatte og studenter, sikrer vi at sensitiv informasjon ikke kommer på avveie. Systemet er nå organisert slik at rettigheter tildeles automatisk og effektivt ved pålogging. Dette fjerner manuelle feilkilder, sparer tid i den daglige driften og gir bedriften en trygg og profesjonell grunnmur for videre vekst.
status: |
  #### Program informasjon
  ** Teknologi** - C#
  ** Verktøy** - JSON, KI, TypeScript
  ** Prinsipper** - RBAC, SRP, Singleton

  #### Dagens Aktiviteter
  * Utviklet en løsning som skiller mellom ansatte og studenter for å sikre at brukere kun har tilgang til informasjon relevant for deres rolle.
  * Opprettet en JSON-basert oversikt over alle tilgangsregler for å forenkle styringen og fremtidig vekst.
  * Lagt til en ressurseffektiv tjeneste i systemets kjerne som gir rask tilgang til sikkerhetsreglene uten å belaste serveren unødvendig.
  * Integrert sikkerhetssjekken direkte i oppstartsprosessen. Dette sparer tid og ressurser ved at systemet kun trenger å verifisere tilgangskonfigurasjonen én gang.
  * Gjennomført teknisk kontroll av løsningen mot gjeldende bransjestandarder (ved bruk av Google Gemini) for å sikre moderne sikkerhetskrav.
  * Identifisert nåværende fordeler ved JSON-løsningen (rask utrulling og lav kostnad) samt dokumentert behovet for manuell oppfølging ved stor organisatorisk vekst.

  #### Motivasjon & Energi - 10 / 10
  Dagen har vært så fin den kunne bli.
sources: |
  1. **Google Gemini (AI-modell)**: Breftende for bransjestandard og læringsverktøy
  2. [Unntak for synkron I/O i Singleton-initialisering](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/best-practices?view=aspnetcore-8.0).
  3. [Prinsipp for Single Responsibility (SRP).](https://en.wikipedia.org/wiki/Single-responsibility_principle)
---

Bedriften hadde behov for å styrke sikkerheten og kontrollen rundt hvem som har tilgang til sensitivt innhold i systemet våres. Uten et rollebasert  system var det utfordrende å skille studenter fra ansatte på en trygg og oversiktlig måte etter hvert som organisasjonen vokser. Dette skapte risiko for at feil brukere hadde tilgang til skjermet informasjon.

Målet var å samle alle tilgangsregler i en felles oversiktlig fil som **JSON**, slik at sikkerheten er enkel å styre  og  systemet er bygget for å vokse. Dette ville sikre at de fordelte rollene kun får se den informasjonen som er nødvendig for deres spesifikke rolle og ingenting annet. Oppgaven min ble å innføre denne løsningen for rettighetsstyring (**RBAC**), slik bedriften har kontroll på hvem som ser hva.

For å løse dette på en rask og fremtidsrettet måte, valgte jeg en metode som sørger for at systemet alltid har en rask tilgang til reglene uten å belaste serveren unødvendig, dette kalles for **Singleton-tjeneste**.

* Jeg inkluderte sikkerhets sjekken i oppstarten, for å sjekke hvem som har tilgang en gang. Dette betyr at  systemet trenger å sjekke hvem som har tilgang en gang, noe som sparer tid og ressurser hver gang en bruker logger seg inn.
* Jeg vertifiserte løsningen mot bransje standarden (via Google Gemini) for å sikre at vi følger de nyeste sikkerhetsstandardene for moderne IT-systemer.
* Ved å bygge løsningen rett inn i systemets kjerne, har jeg sørget for koden er enkel å vedlikeholde for andre utviklere i fremtiden.

Systemet har nå en fungerende og sikker tilgangskontroll som sjekkes automatisk hver gang under oppstart av systemet, som gir bedriften kontroll på hvem som ser hva fra første oppstart. Ved å bruke en oversiktlig fil som JSON ble løsningen ferdigstilt og satt i drift raskt, som sparer tid i utviklings fasen. Vi har sikret at hver rolle ser kun det som er nødvendig på nettsiden, dette minimerer risikoen for datalekkasjer og jeg har identifisert at filen må oppdateres manuelt ved stor vekst, dette er en perfekt og rimlig løsning for prosjektets nåværende fase, som en konsekvens av at  det gir bedriften tryggheten til å videre utvikle.
