---
created: 2025-11-18T00:00:00.000Z
title: Dynamisk RBAC-Navigasjon med Statisk CSV
ingress: >
  Oppgaven var å konvertere en statisk CSV-basert innholdsliste til en dynamisk,
  autorisert navigasjonsstruktur ved å integrere den med systemets Role-Based
  Access Control (RBAC)-logikk. Dette krevde en strategisk løsning for
  datahåndtering og autorisasjon: Innholdslisten måtte leses asynkront og
  deretter kartlegges og omdefineres streng for streng for å valideres mot
  brukerens tilgangsrettigheter i en dedikert tjenesteklasse. Målet er å
  dynamisk filtrere navigasjonsmenyen, slik at brukere kun ser lenker til
  innhold de faktisk har tilgang til.
star: >
  Systemet bruker en CSV-fil som kilde for innholdslisten og den globale
  navigasjonen. Utfordringen var å integrere denne statiske listen med det
  eksisterende Role-Based Access Control (RBAC)-systemet for å sikre at brukere
  kun ser lenker/innhold de har tilgang til.


  Designe og implementere et system som sjekker om en autorisert bruker har
  rettigheter til å se innholdet i navigasjonslenkene, og dermed dynamisk
  filtrere og presentere kun tilgjengelige lenker.


  Løsningen krever en strategisk integreasjon av CSV-databehandling og RBAC
  -logikk i en funksjonell enhet.


  **Datahåndtering**


  CSV-filen blir lest gjennom å bruke `CSVHelper` som leser filen inn til en
  variabel. Dette er en prosess som skjer i innholdsliste-endepunktet.


  For hver del av CSV-filen skal programmet sjekke om at brukeren har
  rettigheter, til den stien


  Om den bolske verdien er sann, skal den delen av CSV-filen legges inn i en
  streng og når programmet er ferdig blir strengen sendt tilbake til endepunktet
  og videre sendt til frontend.


  **Integrasjonspunkt**


  Denne sjekken skal i utgangspunktet sjekkes i en egen tjeneste klasse, for å
  isolere foretningslogikken.


  **Autorisasjons logikk**


  For at jeg skal kunne sjekke CSV-logikken


  CSV-filen splites ved hjelp av det definerte separasjonsstegnet.


  Kartlegges strengen og om defineres til tilgangs logikken, slik at det sjekkes
  at det er en del av den tillate stien.


  Hver enkelt splittede streng sjekkes opp mot brukerens rettigheter.


  Stier som returnerer en boolsk verdi legges inn i en ny datastruktur for
  presentasjon
KildeHenvisning: ''
---

