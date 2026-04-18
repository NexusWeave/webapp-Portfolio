---
date: 2025-11-22T00:00:00.000Z
title: Håndtering av Blokkerende Kode i FastAPI
ingress: |
  Denne loggen dokumenterer en strategisk migrering for å løse en hybrid arkitektur forårsaket av at Announcement-endepunktet var igjen i det synkrone Flask (WSGI)-rammeverket etter en større refaktorering. Målet var å integrere dette endepunktet i den nye, asynkrone FastAPI (ASGI)-strukturen uten å blokkere ytelsen.
status: |
  #### Dagens Aktiviteter

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli i øyblikket
sources: ''
---

Etter den første overflyttingen til <abbr title ="Et moderne teknologi verktøy som har muligheter for samtidige forespørsler">FastAPI</abbr>, ble  `Announcement`-<abbr title ="et bindeledd mellom logikken og nettleseren">endepunktet</abbr>  igjen i det eldre <abbr title="Et eldre og mer tradisjonelt teknologi-verktøy (rammeverk) som ofte brukes til enklere nettsider, men som kan bli tregt når mange ting skjer samtidig.">**Flask**</abbr> <abbr title="En samling av kode">rammeverk</abbr>et, som en konsekvens av at Flask-rammeverket er basert på <abbr title= "Web Server Gateway Interface er en eldre standard som lar koden håndtere en og en oppgave samtidig">WSGI</abbr>-standarden skapte det forskjell fra det nye <abbr title="Asynchronous Server Gateway Interface, en moderne standard som lar koden håndtere mange oppgaver samtidig">ASGI</abbr>-standarden FastAPI. Dermed fungerte ikke `announcements` endepunktet slik som forventet.

* Jeg konverterte den gamle logikken til å bruke en strukturert modell som **Pydantic**. Dette sikrer at koden blir automatisk validert gjennom <abbr title="en teknikk for Utvikling for å redusere feil marginer">typesikkerhet og automatisk validering, som er et kjennetegn ved FastAPI.
* Jeg la til FastAPIs ruting `@app.get` i hovedapplikasjonen for å erstatte den gamle Flask-rutingen, og dermed fullføre migrasjonen.

For å legge til den eksisterende, <abbr title="Betegnelse for å gjøre en og en oppgave">synkron</abbr>e <abbr title ="Data som kommer inn / data som kommer ut">I/O</abbr>-logikken i Announcement-endepunktet uten å blokkere FastAPIs event-loop, ble endepunktfunksjonen definert uten nøkkelordet `async`. FastAPI gjenkjenner dette og kjører automatisk den synkrone koden i en separat trådpulje. Dette tillot en rask og sikker overflytting av den foreldret koden, samtidig som det bevarte den <abbr title="En tilstand der programmet kan kjøre flere forespørsler samtidig">asynkrone</abbr> ytelsen for resten av applikasjonen.

Dette arbeidet har resultert i en betydelig pålitelig og fremtidsdrevent applikasjon. Ved å samle alle endepunkter under en moderne standard, har jeg fjernet den tekniske etterslepet mellom ulike systemer og redusert risikoen for driftsstans. Bruken av Pydantic gir meg høyere datakvalitet og færre feilmeldinger, da systemet nå automatisk stopper ugyldig informasjon før den behandles. Den strategiske bruken av trådpuljer betyr at nettsiden forblir rask og responsiv for sluttbrukerne, selv når tunge dataoppgaver kjøres i bakgrunnen. Resultatet er en moderne plattform som er vesentlig enklere å vedlikeholde, og som har kapasitet til å håndtere langt mer trafikk enn tidligere.

Verdien av å velge gradvis overflyttingsstrategi og utnytte <abbr title="en samling av kode">rammeverk</abbr>ets innebygde mekanismer. Forståelse for at synkron, blokkerende I/O-kode kan integreres i et ASGI-rammeverk, forutsatt at den kjøres i en trådpulje for å sikre at event-loopen forblir fri.
