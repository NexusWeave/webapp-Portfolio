---
date: 2026-03-19T00:00:00.000Z
title: Intelligent filtrering og kategorisering for å øke brukervennlighet
ingress: |
  Jeg har transformert et ustabilt overvåkingssystem til en pålitelig og selvgående løsning som fjerner unødvendig støy og sikrer datakvalitet. Ved å automatisere sortering og lagring, leveres nå prosjekter ferdig kategorisert direkte til skyen. Dette fjerner behovet for manuelt vedlikehold og feilsøking, samtidig som det gir besøkende tilgang til relevante data for raskere og mer presise analyser.
status: |
  #### Program informasjon
  **Teknologi** - Python, asyncio, SQLAlchemy
  **Verktøy** - GitHub API, httpx

  #### Dagens Aktiviteter
  * Implementert filter for uønskede GitHub-prosjekter basert på eier-lister.
  * Utviklet et køsystem med asyncio.Semaphore for å kontrollere aktive oppgaver.
  * Konfigurert utvidede timeouts for å håndtere omfattende spørringer uten avbrudd.
  * Sikret dataintegritet ved å sende rene dato-objekter til SQLAlchemy.
  * Automatisert kategorisering av prosjekter med etiketter for backend, frontend og fullstack.

  #### Motivasjon & Energi - 10 / 10
  Systemet er nå stabilt og driftssikkert.
sources: ''
---

Situasjonen var at overvåkningssystemet for GitHub-prosjekter var ustabilt og ineffektivt. Det ble overbelastet av unødvendige skoleprosjekter, noe som utfordret systemet når det gjaldt å skille relevante prosjekter fra støy.

Hensikten var å stabilisere systemet og sikre henting av relevante prosjekter. Utfordringen var å filtrere ut uønskede prosjekter uten at dette påvirket overvåkingen av relevante data. For å oppnå hensikten ble det utført en systematisk gjennomgang av GitHub-tjenesten:

* Laget et filter for GitHub-systemet for å fjerne støy basert på en liste med uønskede eiere.
* For å unngå at GitHub blokkerer forespørsler som en konsekvens av for mange samtidige kall, ble det lagt til et køsystem for oppgavene.
* Ved å bruke asyncio.Semaphore kontrolleres antall aktive oppgaver, noe som sikrer stabil drift uten avbrudd.
* Identifiserte at standardinnstillingen for tilkobling avbrøt tunge spørringer før de var fullført, og økte derfor tidsbegrensningen til 120 sekunder.
* Rettet en feil der datoer ble konvertert til tekst, noe databasen ikke aksepterte; ved å sende informasjonen som rene dato-objekter kan SQLAlchemy nå lagre dataene korrekt.

Systemet er nå transformert til en pålitelig og selvgående løsning som kjører uten behov for manuelle avbrudd. Ved å kombinere stabilitet med logisk sortering leveres dataene direkte til skylagring, noe som gjør prosjektinformasjonen umiddelbart tilgjengelig. For å øke nytteverdien ytterligere er det innført et automatisk system for kategorisering med etiketter for backend, frontend og fullstack, noe som forenkler filtreringen for besøkende og gjør datasettet mer oversiktlig.
