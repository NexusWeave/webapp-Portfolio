---
created: 2025-11-14T00:00:00.000Z
tags:
  - dev-journey
title: Testbarhet av Role Based Access Control -funksjonallitet
ingress: >
  Den opprinnelige implementasjonen av **R**ole-**B**ased **A**ccess **C**ontrol
  skapte en kritisk utfordring for vedlikehold, da brudd på **S**ingle
  **R**esponsibility **P**rinciple førte til at **enhetstester** ble avhengig av
  ekstern **infrastruktur I/O**. For å oppnå ekte enhetstesting ble
  **forretningslogikken** separert fra **infrastrukturen**. Denne
  omstruktureringen, i tråd med **D**ependency **I**nversion **P**rinciple,
  sikrer at **RBAC**-**logikken** nå er isolert, robust og kan testes uavhengig
  av filsystemet.
star: >
  Opprinnlige implementasjonen av **R**ole **B**ased **A**ccsess **C**ontrol
  -**funksjonaliteten** brøt med **S**ingle **R**esponsibility **P**rinciple
  (**SRP**). Tjenesten hadde to ansvarsområder som


  * \*\*foretningslogikk \*\*(tilgangsjekk)

  * **infrastruktur I**/\*\*O \*\*(filinnlesning).


  Dette gjorde det vanskelig å skrive rene og isolerte **Enhetstester** for
  **RBAC-logikken**.  Testene krevde eksisterende fil, noe som bryter med
  **C**lean **C**ode **P**rinsippene.


  Målet er å oppnå ren, isolert og robust testing av RBAC-logikken. For å oppnå
  dette målet ansvaret for infrastrukturen og foretningslogikken separeres.


  Refaktoreringen ble gjennomført ved å introdusere et nytt abstraksjonslag for
  datahenting, i tråd med Dependency Inversion Principle.


  1. Abstrahering av I/O logikk
     1. Det ble opprettet en ny fil med ansvaret for å sjekke filstien og laste inn data bassert på denne stien. Dette isolerte all filsysteminteraksjon.
  2. Abstrahering av Formateringen
     1. En dedikert fil ble opprettet for å hpndtere JSON-deserialisering og formatering, dermed sikret at rådata ble konvertert til den nødvendige datastrukturen.
  3. Refaktorering av RBAC-tjenesten
     1. Selve tilgangsfilen ble refaktorert til å kun motta de ferdige formaterte dataene i sin konstruktør (gjennom D.I.). Tjenesten er nå frikoblet fra all I/O- og formateringslogikk.

  Målet er oppnådd. RBAC-logikken er isolert i en egen tjeneste som er frikoblet
  fra I/O-avhengigheter, og oppfyller SRP.


  Enhetstester kan nå skrives rent og raskt ved å injisere mock-data direkte i
  konstruktøren, uten behov for en eksisterende fil.


  Prinsipp for testing

  Det er viktig at infrastrukturen og foretningslogikken separeres for å oppnå
  ekte enhetstestinger


  Denne tilnærmingen bekrefter CC-Prinsippene ( som SRP & DIP ) er direkte
  koblet mot robusthet og vedlikeholdbarhet
KildeHenvisning: ''
---

