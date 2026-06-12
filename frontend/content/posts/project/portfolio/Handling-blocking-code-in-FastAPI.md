---
date: 2025-11-22T00:00:00.000Z
title: Håndtering av Blokkerende Kode i FastAPI
ingress: |
  For å få hele systemet over på en moderne plattform, har jeg tatt det siste steget og flytta de gjenværende delene til FastAPI. Ved å samle alt under samme tak har jeg fjerna teknisk etterslep og gjort siden mye mer stabil. Med automatisk datavalidering og smart trådhåndtering er appen nå klar for å vokse uten at ytelsen kveles.
status: |
  #### Program informasjon
  **Teknologi** - FastAPI
  **Verktøy** - Python, Pydantic

  #### Dagens Aktiviteter
  * Flyttet det siste gjenværende endepunktet fra Flask til FastAPI for å fjerne teknisk etterslep og samle applikasjonen under én moderne ASGI-standard.
  * Konverterte den gamle logikken til Pydantic-modeller. Dette sikrer automatisk validering og høyere datakvalitet ved å stoppe ugyldig informasjon før den behandles.
  * Erstattet utdatert Flask-ruting med FastAPIs-routing `@app.get`.
  * Konfigurerte endepunktet til å kjøre i en separat trådpulje ved å definere funksjonen uten asynkronitet. Dette tillot sikker integrasjon av eksisterende kode uten å blokkere systemets hovedflyt.
  * Sikret at nettsiden forblir rask for sluttbrukerne ved å hindre at tunge dataoppgaver låser applikasjonens kapasitet til å håndtere andre forespørsler samtidig.
  * Etablert en mer robust plattform som er enklere å vedlikeholde, har lavere driftsrisiko og er klar for betydelig høyere trafikkvekst.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli. Det er deilig å endelig være helt over på FastAPI!
sources: ''
---

Etter at jeg starta flyttingen til FastAPI, hang `Announcement`-endepunktet fortsatt igjen i det gamle Flask-oppsettet. Siden Flask bruker WSGI og FastAPI bruker ASGI, ble det krøll når de skulle prøve å snakke sammen, og endepunktet fungerte rett og slett ikke som det skulle lenger.

Hensikten var å få alt over på FastAPI for å samle applikasjonen under én moderne standard. Utfordringen var å integrere den gamle, synkrone logikken uten at den skulle blokkere for alt det andre som skjer i systemet.

For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har skrevet om den gamle logikken til å bruke Pydantic-modeller for å få skikkelig typesikkerhet og automatisk validering.
* Jeg har bytta ut Flask-rutingen med FastAPIs `@app.get` direkte i hovedapplikasjonen.
* Jeg har definert endepunktet som en vanlig synkron funksjon (uten `async`), slik at FastAPI automatisk kjører den i en egen trådpulje.
* Jeg har sørga for at denne tunge I/O-logikken ikke blokkerer event-loopen, så resten av appen holder seg rask og responsiv.

Gjennom dette arbeidet har jeg fått en applikasjon som er mye lettere å drifte og som tåler langt mer trafikk. Ved å bruke rammeverkets innebygde mekanismer for trådhåndtering, fikk jeg flytta over den gamle koden trygt uten å måtte skrive om absolutt alt. Nå er det tekniske etterslepet borte, og fundamentet er bunnsolid.
