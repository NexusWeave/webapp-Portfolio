---
date: 2025-12-04T00:00:00.000Z
title: |
  Hvorfor jeg måtte forkaste Unit Testing for å verifisere serverens
  API-kontrakt
ingress: |
  Pålitelig systemutvikling krever validering av samspill mellom komponenter, ikke bare intern logikk. Ved sikring av dataflyt mot eksterne <abbr title="Application Programming Interface">API</abbr>-<abbr title="Adressen informasjonen hentes fra">endepunkter</abbr>, startet jeg med unit-testing, men innså at <abbr title="Simulering av ekte data">mocking</abbr> ikke bekreftet faktisk kommunikasjon. Ved å skifte strategi til <abbr title="en teknikk for å validere samspillet mellom systemkomponentene">integrasjonstesting</abbr>, oppnådde jeg en testdekning som garanterer en funksjonell kommunikasjonskjede og minimerer risikoen for feil.
status: |
  #### Dagens Aktiviteter

  * Jeg valgte å prioritere testdekning for dataflyt mellom intern logikk og eksterne <abbr title="Application Programming Interface – en kobling som lar to systemer utveksle informasjon på en trygg måte">API</abbr>-<abbr title="Den adressen der informasjonen hentes fra">endepunkter</abbr> for å sikre pålitelig at dataene kommuniserer.
  * Utviklet tester som bekrefter at serveren sender gyldige forespørsler, og at backend-logikken håndterer mottatt data korrekt.
  * Identifiserte begrensninger ved unit-testing og <abbr title="sende liksom data for å simulere en ekte situasjon">mocking</abbr>, da dette ikke verifiserte den faktiske kommunikasjonen med tredjepartstjenester.
  * Skiftet fokus fra isolert testing til `end-to-end-testing` uten mocking, for å validere samspillet mellom systemkomponentene.
  * Verifiserte hele kjeden fra utgående kall til lagring, noe som reduserer risikoen for feil i produksjonsmiljøet.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli !
sources: ''
---

For å sikre dataflyten mellom den interne logikken og de eksterne <abbr title="Application Programming Interface – en kobling som lar to systemer utveksle informasjon på en trygg måte">API</abbr>-<abbr title="Den adressen der informasjonen hentes fra">endepunktene</abbr>, var det et strategisk valg å legge til tester, som er essensielt for å garantere at systemet var pålitelig nok til å håndtere korrekt kommunikasjon og datakontrakter med tredjepartstjenestene.

Denne teststrategien inkluderte to funksjoner

* At serveren sendte gyldig forespørsler til det eksterne API-et
* At backend-logikken mottok dataene fra API-et

Første forsøk var å isolere og bekrefte logikken i tjenestene som håndterte API-kallene. jeg innså etter par timer at Unit Testingen som involverte mocking av den eksterne API-avhengigheten, bekreftet ikke om de faktiske live-kontakten. Dette ble korrigert til å validere samspillet mellom systemkomponentene. Dette tillot meg å kjøre en full, `end-to-end` test mot API endepunktet uten å <abbr title="sende liksom data for å simulere en ekte situasjon">`mocke`</abbr> selve kommunikasjonen.

Ved å validere samspillet mellom systemkomponentene oppnådde jeg en pålitelig testdekning som garanterte at hele kommunikasjonskjeden var funksjonell. Dette reduserer risikoen for feil i produksjon betydelig.
Gjennom å teste Apiene erfarte jeg at det finnes flere typer tester, enn å validere intern logikk, men også å validere samspillet mellom systemkomponentene.
