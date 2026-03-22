---
date: 2026-03-19T00:00:00.000Z
title: Intelligent filtrering og kategorisering for å øke brukervennlighet
ingress: 'Jeg har transformert et ustabilt overvåkingssystem til en pålitelig og selvgående løsning som fjerner unødvendig støy og sikrer datakvalitet. Ved å automatisere sortering og lagring, leveres nå prosjekter ferdig kategorisert direkte til skyen. Dette fjerner behovet for manuelt vedlikehold og feilsøking, samtidig som det gir besøkende tilgang til relevante data for raskere og mer presise analyser.'
parade: ''
star: |
  Overvåkningssytemet GitHub-prosjekter var ustabilt og ineffektivt.
  Det ble overbelastet av unødvendige skoleprosjekter, noe som utfordret systemet for å skille prosjekter fra støy.
  Målet var å stabilisere systemet og sikre henting av relevante prosjekter.
  Utfordringen var å filtrere ut uvelkommende skoleprosjekter, uten at dette påvirket overvåkingen av relevante prosjekter.
  for å oppnå dette målet, utførte jeg en systematisk  serivice for Github-systemet:
  Jeg laget til et filter, for Github-systemet for å filtrere ut støy basert på en liste med uvelkommede eiere.
  For å unngå at Github-systemet ikke blokkerer forespørslene vi sender, som en konsekvens av for mange samtidige forespørsler, la jeg til et kø system for hver av oppgavene.
  Ved å bruke (asyncio.Semaphore) kontrollerer jeg antall aktive oppgaver, noe som sikrer stabil drift uten avbrudd fra Githubs sikkerhetssystem.
  Senere ble det identifisert at standardinnstillingen for tilkobling (httpx.Timeout(connect=10.0)) avbrøt tunge spørringer før de var fullført.
  Ved å øke tidsbegrensningen til  120 sekunder, ga jeg systemet nødvendig tid til å prosessere omfattende prosjekter uten unødvendige avbrudd.
  Ved overføring til skyen identifiserte jeg en feil som jeg hadde tidligere benyttet datetime.isoformat(), som konverterte datoer til tekst, dette aksepterte ikke databasen.
  Ved å fjerne denne konverteringen og sende informasjonen som rene dato-objekter, sørget jeg for at biblioteket SQLAlchemy kunne lagre dataene korrekt i databasen, uten konflikter.

  Jeg har nå stabilisert systemet til et pålitelig og selvgående system, som kjører uten behov for manuelle avbrudd eller løpende feilsøking.
  Ved å kombinere stabilitet med logisk sortering, leveres dataene direkte til skylagring, noe som at all prosjektinformasjon er umiddelbart tilgjengelig ved uthenting.
  For å øke nytteverdien ytterligere har jeg laget et automatisk system for kategorisering med etiketter for backend, frontend og fullstack for hvert prosjekt.
  Dette forenkler filteringen for besøkende og gjør datasettet langt mer oversiktlig for videre analyse.

sources: ''
---

