---
date: 2026-03-19T00:00:00.000Z
title: dsdss
ingress: ''
parade: ''
star: |
  S – Situasjon (Situation)

  Systemet for å overvåke GitHub-repoer var ustabilt. Det led av tre hovedproblemer:

  Datadrukning: Programmet hentet hundrevis av irrelevante skoleoppgaver (code50, getacademy).

  Systemkollaps: Hyppige ConnectTimeout på nøyaktig 10,0 sekunder stanset alle kjøringer.

  Database-avvisning: Forsøk på å lagre data feilet med en 500 Error på grunn av feil format på tidsstempler.

  T – Taske/Oppgave (Task)

  Oppgaven var å transformere en "støyete" og skjør prototype til en robust produksjonsklar tjeneste som:

  Kun lagrer dine relevante prosjekter.

  Håndterer nettverksforsinkelser uten å gi opp.

  Leverer data i det nøyaktige formatet PostgreSQL-databasen krever.

  A – Aksjon (Action)

  Vi utførte en systematisk "hovedservice" på koden:

  Logisk Filter-reparasjon: Byttet ut or med and i list-comprehension. Dette tvang koden til å kreve både innhold OG godkjent eier før et repo ble vurdert.

  Innføring av "Dørvakt" (Semaphore): Implementerte asyncio.Semaphore(5) inne i hver oppgave. Dette begrenset samtidige tilkoblinger og hindret at GitHub blokkerte oss.

  Justering av "Tålmodighet" (Timeout): Identifiserte at connect=10.0 var en hard sperre i httpx.Timeout. Økte denne til 60 sekunder for å gi tunge prosjekter tid til å "håndhilse".

  Type-konvertering: Oppdaget at .isoformat() gjorde om datoer til tekststrenger. Fjernet metoden slik at last\_update ble sendt som et rent datetime-objekt, slik SQLAlchemy/PostgreSQL forventer.

  R – Resultat (Result)

  Datakvalitet: Antall repoer som prosesseres ble redusert fra over 100 til kun de få relevante (f.eks. TeamOppgave2), noe som sparer både tid og lagringsplass.

  Flyt: Den magiske 10-sekunders timeout-grensen er brutt. Programmet fullfører nå dypanalyser av kodespråk (JS, HTML, CSS) og identifiserer om prosjektet er Frontend/Backend/Fullstack.

  Sømløs Lagring: Databasen aksepterer nå alle "inserts" uten feilmeldinger, og hele køen av prosjekter blir nå lagret i én sammenhengende operasjon.
sources: ''
---

