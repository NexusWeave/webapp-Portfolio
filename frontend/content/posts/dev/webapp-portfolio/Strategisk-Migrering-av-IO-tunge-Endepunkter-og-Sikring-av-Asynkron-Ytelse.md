---
created: 2025-11-23T00:00:00.000Z
tags:
  - dev-journey
title: Strategisk Migrering av I/O-tunge Endepunkter og Sikring av Asynkron Ytelse
ingress: >
  Denne læringsloggen dokumenterer målrettet migreringen av Github-endepunktet
  fra det foreldede Flask-rammeverket til FastAPI. Endepunktet ble bevisst
  utsatt for å minimere risiko under den innledende refaktoreringen, men dette
  etterlot en sårbar hybrid arkitektur. Hovedmålet med denne fasen var å
  eliminere den synkrone (WSGI) logikken og sikre full asynkronitet for
  I/O-tunge kall til Github REST API.


  Dette ble oppnådd ved å definere en typesikker Pydantic-modell, og kritiskst,
  ved å erstatte det blokkerende requests-biblioteket med den asynkrone
  HTTP-klienten httpx. Implementeringen av async def og await sikret at
  endepunktet utnytter FastAPIs event-loop optimalt, noe som resulterte i en
  dramatisk forbedring i ytelse og gjennomstrømning. Loggen demonstrerer en
  viktig faglig vekst ved å velge den arkitektonisk mest korrekte tilnærmingen
  (full asynkronisering) for å maksimere ASGI-gevinsten.
star: >
  Github endepunktet ble utsatt som en konsekvens av at vurderingen av å gjøre
  alt arbeidet på en gang ville øke risikoen for tretthet og feil vurderinger.
  Dette endepunktet ble ikke migrert til FastAPI, dette endepunktet beholdt sin
  foreldret versjon FLASK rammeverket.



  #### **Migrering av Github-endepunkt og sikring av full asynkronitet**


  * Definere en **Repository** **Pyndantic**-**modell** for å sikre
  typesikkerheten og valideringen av dataene fra Github REST API, dette
  genererer automatisk interaktivt dokumentasjon for prosjektet.

  * Erstatter det sykrone HTTP-biblioteket (request) med et asynkront bibliotek
  (httpx). Dette er ressursfull avgjørelse for å utnytte FastAPIs egenskap
  event-loop

  * Implementerer endepunktet ved bruk av `asyn def` for å kalle den asynkrone
  I/O logikken, dette sikrer at I/O-tunge kall **ikke blokkeres**


  I dette prosjektet integreres bruken av AI-verktøyene som (**Copilot** &
  **Gemini**) for å validere framgansmåten mot beste praksis for biblioteket &
  kodespråket.



  ### Full Asynkron Migrering


  #### **Definering av Datamodell**


  Respitory-modellen ble definert i samsvar med strukturen til dataene som
  returneres fra GIthub REST-API. Dette sikret typesikkerheten og valideringen
  av innkommende data, samtidig som den automatiske dokumentasjonen ble
  generert. Med hensyn til sikkerhet ble stiene for Github REST API deklarert
  som miljøvariabler.


  #### Asynkronisering av I/O-kall


  HTTP-klienten (`requests`) ble erstattet med den asynkrone klienten `httpx`.
  Dette var et kritisk skifte for å muligjøre den ikke-blokkerende I/O-logikken
  som er kjernen i ASGI


  #### **Implementasjon og routing**


  Ruten ble lagt til FastAPIs applikasjon. Ruten ble definert som et
  **asynkront** **kall** (`async def`) for å håndheve den ikke blokkerende
  strategien. Inne i funksjonen ble den asynkrone logikken fra `httpx` brukt med
  `await` inne i en `try/except`-blokk for å sikre robust feilhåndtering under
  eksterne API-kall. Endepunktet ble beriket med FastAPIs metadata
  (`response_model`, `summary` og `tags`).


  #### Løsning av Hybrid Arkitektur


  Det gamle Flask-endepunktet er nå fjernet. Arkitekturen er ren ASG. Det
  brekreftes at full asynkronitet med at httpx og async/await resulterte til en
  forbedring i håndteringen av Github REST API


  Faglig vekst

  Den viktigste lærdommen i dette prosjektet er verdien av å velge et fult
  asynkronisering for I/O kall for å maksimere ytelsen i ASGI-rammeverk. I
  motsetningen til den strategiske bruken av trådpuljen i forrige
  migreringslogg, har dette prosjektet demostrert


  * Velge den mest arkitektoniske korrekte tilnærmingen for I/O-tunge
  operasjoner

  * Utføre nødvendige kodebytte (fra requests til httpx) og den syntaktiske
  endringen (async/await) for å fullt ut utnytte ASGI.
KildeHenvisning: ''
---

