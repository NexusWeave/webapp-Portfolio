---
created: 2025-12-04T00:00:00.000Z
tags:
  - dev-journey
title: >-
  Hvorfor jeg måtte forkaste Unit Testing for å verifisere serverens
  API-kontrakt
ingress: >
  Å bygge en robust applikasjon krever mer enn bare å teste intern logikk det
  handler om å validere samspillet mellom komponentene. Da jeg skulle sikre
  dataflyt mellom server og eksterne API-endepunkter, startet jeg med Unit
  Testing. Jeg innså imidlertid raskt at denne metoden, med sin bruk av mocking,
  ikke bekreftet den faktiske nettverkskommunikasjonen. Dette krevde en
  strategisk endring. Denne historien dykker ned i “hvorfor” jeg valgte å
  korrigere kursen til Integrasjonstesting for å oppnå en testdekning som
  garanterte en funksjonell, ende-til-ende kommunikasjonskjede.
star: >
  For å sikre dataflyten mellom den interne logikken og de eksterne
  API-endepunktene, var det et strategisk valg å implementere Tester, som er
  essensielt for å garantere at systemet var robust nok til å håndtere korrekt
  kommunikasjon og datakontrakter med tredjepartstjenestene.


  #### Utarbeiding av Robust Teststrategi, som Vertifiserer Pålitligheten til
  koden.


  Denne teststrategien inkluderte to funksjoner


  * 1\. At serveren sendte gyldig forespørsler til det eksterne API-et

  * 2\. At backend-logikken mottok dataene fra API-et


  #### Flere Typer Teststrategier?


  Første forsøk var å isolere og bekrefte logikken i tjenestene som håndterte
  API-kallene. Det ble insett etter par timer at Unit Testingen som involverte
  mocking av den eksterne API-avhengigheten, ikke bekreftet målet om faktiske
  live-kontakten. Strategien ble korrigert til å bruke Integrasjonstesting (
  teste-host ). Dette tillot meg å kjøre en full, end-to-end test mot API
  endepunktet uten å mocke selve kommunikasjonen.


  #### Unittesting til integrasjonstesting


  Ved å bytte til Integrasjonstesting oppnådde jeg en robust testdekning som
  garanterte at hele kommunikasjonskjeden var funksjonell. Dette reduserer
  risikoen for feil i produksjon betydelig. 


  Gjennom å teste Apiene lærte jeg at det finnes flere typer tester, enn å
  validere intern logikk, men også å validere samspillet mellom
  systemkomponenter (Integrasjonstesting).
KildeHenvisning: ''
---

