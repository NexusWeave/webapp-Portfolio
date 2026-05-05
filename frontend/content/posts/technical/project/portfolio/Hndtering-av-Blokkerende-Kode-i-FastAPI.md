---
date: 2025-11-22T00:00:00.000Z
title: Håndtering av Blokkerende Kode i FastAPI
ingress: |
  For å standardisere og fremtidssikre applikasjonen har jeg fullført flyttingen til en moderne plattform. Ved å samle alle tjenester under samme system har jeg fjernet teknisk etterslep og gjort siden mer stabil. Innføring av automatisk kontroll av data betyr færre feil og høyere pålitelighet. Resultatet er en raskere og mer effektiv nettside som håndterer mye trafikk uten ventetid, og som nå er enkel å utvikle videre.
status: |
  #### Dagens Aktiviteter

  * Flyttet det siste gjenværende endepunktet fra Flask til FastAPI for å fjerne teknisk etterslep og samle applikasjonen under én moderne ASGI-standard.
  * Konverterte den gamle logikken til Pydantic-modeller. Dette sikrer automatisk validering og høyere datakvalitet ved å stoppe ugyldig informasjon før den behandles.
  * Erstattet utdatert Flask-ruting med FastAPIs-routing `@app.get`.
  * Konfigurerte endepunktet til å kjøre i en separat trådpulje ved å definere funksjonen uten asynkronitet. Dette tillot sikker integrasjon av eksisterende kode uten å blokkere systemets hovedflyt.
  * Sikret at nettsiden forblir rask for sluttbrukerne ved å hindre at tunge dataoppgaver låser applikasjonens kapasitet til å håndtere andre forespørsler samtidig.
  * Etablerte en mer robust plattform som er enklere å vedlikeholde, har lavere driftsrisiko og er klar for betydelig høyere trafikkvekst.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli i øyblikket
sources: ''
---

Etter den første overflyttingen til FastAPI, ble  `Announcement`-endepunktet  igjen i det eldre Flask rammeverket, som en konsekvens av at Flask-rammeverket er basert på WSGI-standarden skapte det forskjell fra det nye ASGI-standarden FastAPI. Dermed fungerte ikke `announcements` endepunktet slik som forventet.

* Jeg konverterte den gamle logikken til å bruke en strukturert modell som **Pydantic**. Dette sikrer at koden blir automatisk validert gjennom <abbr title="en teknikk for Utvikling for å redusere feil marginer">typesikkerhet og automatisk validering, som er et kjennetegn ved FastAPI.
* Jeg la til FastAPIs ruting `@app.get` i hovedapplikasjonen for å erstatte den gamle Flask-rutingen, og dermed fullføre migrasjonen.
* For å legge til den eksisterende, synkrone I/O-logikken i Announcement-endepunktet uten å blokkere FastAPIs event-loop, ble endepunktfunksjonen definert uten nøkkelordet `async`. FastAPI gjenkjenner dette og kjører automatisk den synkrone koden i en separat trådpulje. Dette tillot en rask og sikker overflytting av den foreldret koden, samtidig som det bevarte den asynkrone ytelsen for resten av applikasjonen.

Dette arbeidet har resultert i en betydelig pålitelig og fremtidsdrevent applikasjon. Ved å samle alle endepunkter under en moderne standard, har jeg fjernet den tekniske etterslepet mellom ulike systemer og redusert risikoen for driftsstans. Bruken av Pydantic gir meg høyere datakvalitet og færre feilmeldinger, da systemet nå automatisk stopper ugyldig informasjon før den behandles. Den strategiske bruken av trådpuljer betyr at nettsiden forblir rask og responsiv for sluttbrukerne, selv når tunge dataoppgaver kjøres i bakgrunnen. Resultatet er en moderne plattform som er vesentlig enklere å vedlikeholde, og som har kapasitet til å håndtere langt mer trafikk enn tidligere.

Verdien av å velge gradvis overflyttingsstrategi og utnytte rammeverkets innebygde mekanismer. Forståelse for at synkron, blokkerende I/O-kode kan integreres i et ASGI-rammeverk, forutsatt at den kjøres i en trådpulje for å sikre at event-loopen forblir fri.
