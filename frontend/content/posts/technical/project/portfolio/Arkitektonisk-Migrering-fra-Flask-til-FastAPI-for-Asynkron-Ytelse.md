---
star: |
  #### Dagens aktiviteter

  * Gjennomførte et arkitektonisk skifte ved å oppgradere applikasjonen fra <abbr title="Et tekonologi-verktøy">rammeverket</abbr> <abbr title="Et mikro verktøy for programmeringsspråket Python">"**Flask**</abbr> til <abbr title="Et mikro verktøy for programmeringsspråket Python">**FastAPI**.</abbr>
  * Erstattet den eldre standarden <abbr title= "Web Server Gateway Interface er en eldre standard som lar koden håndtere en og en oppgave samtidig">WSGI<abbr> med den moderne <abbr title="Asynchronous Server Gateway Interface, en moderne standard som lar koden håndtere mange oppgaver samtidig">ASGI</abbr>, som gjør det mulig for systemet å utføre mange oppgaver samtidig.
  * Installerte og konfigurerte <abbr title="En moderne og rask motor som kreves for å kjøre applikasjoner som håndterer mange oppgaver samtidig">Uvicorn</abbr>, en rask motor spesielt utviklet for å drive moderne og samtidige web-applikasjoner.
  * Gjennomførte en fullstendig rens av prosjektets biblioteker og avhengigheter for å sikre en lett og stabil installasjon.
  * Valgte en kontrollert utrulling ved å beholde eksisterende datastrukturer midlertidig. Dette ble gjort for å verifisere at ytelsen økte som forventet før videre strukturelle endringer gjøres med Pydantic.
  * Bekreftet at den nye arkitekturen fjernet tidligere kø-problematikk og økte systemets kapasitet betydelig.

  #### Motivasjon & Energi - 10 / 10

  Dagen er så fin den kan bli !
date: 2025-11-22T00:00:00.000Z
title: Modernisering av bindeledd for å øke ytelse og stabilitet
ingress: |
  For å standardisere og forbedre flyten i prosjektet har jeg oppgradert den tekniske grunnmuren til en moderne løsning. Ved å bytte ut verktøyene som håndterte dataene, har jeg fjernet køer og venting som tidligere gjorde siden treg. Dette har skapt et mer pålitelig system som kan gjøre mange oppgaver samtidig uten å stoppe opp. Resultatet er en raskere og tryggere nettside som enkelt kan vokse i takt med brukernes behov.
status: |
  #### Dagens Aktiviteter

  * Flyttet applikasjonen fra <abbr title="Et eldre og mer tradisjonelt teknologi-verktøy (rammeverk) som ofte brukes til enklere nettsider, men som kan bli tregt når mange ting skjer samtidig.">**Flask**</abbr> til <abbr title ="Et moderne teknologi verktøy som har muligheter for samtidige forespørsler">FastAPI</abbr> for å legge til rette for moderne IT-standarder og mer effektiv datahåndtering.
  * Gikk over fra den eldre <abbr title= "Web Server Gateway Interface er en eldre standard som lar koden håndtere en og en oppgave samtidig">WSGI</abbr>-standarden til den moderne <abbr title="Asynchronous Server Gateway Interface, en moderne standard som lar koden håndtere mange oppgaver samtidig">ASGI</abbr>-standarden, som gjør det mulig for systemet å håndtere mange forespørsler samtidig uten ventetid.
  * Installerte og konfigurerte Uvicorn som en motor for å drive den nye arkitekturen og sikre stabil drift under belastning.
  * Ryddet i prosjektets biblioteker og fjernet utdaterte koblinger for å skape en renere og mer oversiktlig kodebase.
  * Gjennomførte en trinnvis modernisering der ytelse ble prioritert først, mens strukturelle endringer ble planlagt som neste steg for å sikre kontinuerlig stabilitet.
  * Verifiserte at den nye løsningen eliminerte tidligere kø-problematikk og ventetid mot eksterne tjenester som GitHub.

  #### Motivasjon & Energi 10 / 10

  Dagen har vært så fin den kan bli
sources: ''
---

Da prosjektet vokste, ble det tydelig at den eksisterende arkitekturen basert på <abbr title="Et eldre og mer tradisjonelt teknologi-verktøy (rammeverk) som ofte brukes til enklere nettsider, men som kan bli tregt når mange ting skjer samtidig.">Flask</abbr> ikke lenger klarte å holde tritt med kravene til effektivitet. Applikasjonen fungerte primært som et bindeledd mot eksterne tjenester som <abbr title="En skybasert tjeneste som lagrer kode og prosjektdata. I dette tilfellet fungerte GitHub som den eksterne datakilden systemet måtte hente informasjon fra.">**GitHub**</abbr>, og den tradisjonelle metoden for å håndtere data førte til at hele systemet ble stående og vente på svar. Dette skapte en kø som begrenset systemets kapasitet og resulterte i en tregere opplevelse for sluttbrukerne etter hvert som datamengden økte.

Min oppgave var å gjennomføre en teknisk modernisering ved å oppgradere til et verktøyet som støtter moderne IT standarder for håndtering av flere oppgaver samtidig. Målet var ikke bare å øke hastigheten på datahenting, men også å utvikle en mer pålitelig og typesikker grunnmur som ville redusere fremtidige vedlikehold og  gjøre løsningen klar for å vokse.

For å løse dette utførte jeg følgende tiltak:

* Jeg oppgraderte verktøyet, fra **Flask** til verktøyet <abbr title ="Et moderne teknologi verktøy som har muligheter for samtidige forespørsler">FastAPI</abbr>. Dette innebar et skifte fra en eldre standard <abbr title= "Web Server Gateway Interface er en eldre standard som lar koden håndtere en og en oppgave samtidig">WSGI</abbr>  til et mer moderne standard <abbr title="Asynchronous Server Gateway Interface, en moderne standard som lar koden håndtere mange oppgaver samtidig">ASGI</abbr>. Denne oppgraderingen gjør det mulig for å håndterer opp til flere forespørsler samtidig.
* Jeg valgte å beholde eksisterende strukturen midlertidig og utsatte bruken av verktøyet <abbr title="Et verktøy som automatisk sjekker at dataene i systemet er korrekte og har riktig format.">**Pydantic**.
* Ryddet i prosjektets biblioteker og installerte verktøyet <abbr title="En moderne og rask motor som kreves for å kjøre applikasjoner som håndterer mange oppgaver samtidig">Uvicorn</abbr> som er optimalisert for den moderne standarden.

Oppgraderingen fjernet kø-problematikken helt. Resultatet er et system som kan håndtere langt flere forespørsler med de samme ressursene, noe som gir økt pålitelighet og lavere driftsrisiko. Den viktigste erfaringen var verdien av en trinnvis metodikk; ved å prioritere ytelse først, fikk jeg bekreftet at det arkitektoniske valget fungerte før koden ble videreutviklet.
