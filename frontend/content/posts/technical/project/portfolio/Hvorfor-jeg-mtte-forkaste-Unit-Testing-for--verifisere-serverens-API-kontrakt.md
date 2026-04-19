---
date: 2025-12-04T00:00:00.000Z
title: |
  Hvorfor jeg måtte forkaste Unit Testing for å verifisere serverens
  API-kontrakt
ingress: |
  Å bygge en robust applikasjon krever mer enn bare å teste intern logikk det handler om å validere samspillet mellom komponentene. Da jeg skulle sikre dataflyt mellom server og eksterne API-endepunkter, startet jeg med Unit Testing. Jeg innså imidlertid raskt at denne metoden, med sin bruk av mocking, ikke bekreftet den faktiske nettverkskommunikasjonen. Dette krevde en strategisk endring. Denne historien dykker ned i “hvorfor” jeg valgte å korrigere kursen til Integrasjonstesting for å oppnå en testdekning som garanterte en funksjonell, ende-til-ende kommunikasjonskjede.
status: ''
sources: ''
---

For å sikre dataflyten mellom den interne logikken og de eksterne <abbr title="Application Programming Interface – en kobling som lar to systemer utveksle informasjon på en trygg måte">API</abbr>-<abbr title="Den adressen der informasjonen hentes fra">endepunktene</abbr>, var det et strategisk valg å legge til tester, som er essensielt for å garantere at systemet var pålitelig nok til å håndtere korrekt kommunikasjon og datakontrakter med tredjepartstjenestene.

Denne teststrategien inkluderte to funksjoner

* At serveren sendte gyldig forespørsler til det eksterne API-et
* At backend-logikken mottok dataene fra API-et

Første forsøk var å isolere og bekrefte logikken i tjenestene som håndterte API-kallene. jeg innså etter par timer at Unit Testingen som involverte mocking av den eksterne API-avhengigheten, bekreftet ikke om de faktiske live-kontakten. Dette ble korrigert til å validere samspillet mellom systemkomponentene. Dette tillot meg å kjøre en full, `end-to-end` test mot API endepunktet uten å <abbr title="sende liksom data for å simulere en ekte situasjon">`mocke`</abbr> selve kommunikasjonen.

Ved å validere samspillet mellom systemkomponentene oppnådde jeg en pålitelig testdekning som garanterte at hele kommunikasjonskjeden var funksjonell. Dette reduserer risikoen for feil i produksjon betydelig.
Gjennom å teste Apiene erfarte jeg at det finnes flere typer tester, enn å validere intern logikk, men også å validere samspillet mellom systemkomponentene.
