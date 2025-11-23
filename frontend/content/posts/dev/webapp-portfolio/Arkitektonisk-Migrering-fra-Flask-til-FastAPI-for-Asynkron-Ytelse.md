---
created: 2025-11-22T00:00:00.000Z
tags:
  - dev-journey
title: Arkitektonisk Migrering fra Flask til FastAPI for Asynkron Ytelse
ingress: >
  Denne læringsloggen dokumenterer den arkitektoniske migreringen av en
  Python-applikasjon fra det synkrone **Flask**-rammeverket (WSGI) til det
  moderne, asynkrone **FastAPI**-rammeverket (ASGI). Flask ble funnet å være
  overflødig og ineffektivt for applikasjonens API-formål, spesielt ved
  håndtering av I/O-tunge operasjoner som eksterne API-kall (f.eks., Github).
  Hovedmålet var å utnytte **ASGI**-støtten for å redusere ventetid og forbedre
  gjennomstrømningen. Migreringen omfattet en omfattende refaktorering av
  konfigurasjon (ved bruk av** Pydantic Settings**) og konvertering av synkrone
  ruter til asynkrone funksjoner (`async def`). Den bevisste utsettelsen av
  Pydantic-datamodellering tillot en** isolert og verifiserbar test **av
  ASGI-gevinstene. Lærdommen understreker viktigheten av å velge et
  arkitektonisk korrekt rammeverk for å maksimere ytelsen i moderne API-design.
star: >
  Det eksisterende Flask-rammeverket ble **arkitektonisk** **overflødig** og
  ikke effektiv nok, da Python-applikasjonen kun fungerte som et API med et
  behov for både 


  * Rene endepunkter som kan håndtere  I/O-tunge operasjoner som
    (f.eks ved kall til eksterne API-er som Github ) . 

  Flask er bygget på den sykrone **WSGI**-standarden (**W**eb **S**erver
  **G**ateway **I**nterface) og er primært et lettvektig rammeverk for
  tradisjonelle webapplikasjoner. Dette står i kontrast til **FastAPI**, som er
  spesifikt designet for moderne API-er basert på den asynkrone
  **ASGI**-standarden (**A**synchronous **S**erver **G**ateway **I**nterface),
  som håndterer  I/O-tunge operasjoner mer effektivt.


  Hovedmålet med denne migreringen er å Utnytte **ASGI**-støtten for å forbedre
  ytelse ved I/O-venting.


  * Refaktorere requirements.txt, for å inneholde de nødvendige pakkene for
  prosjektet.

  * Refaktorere konfigurasjons filene

  * Refaktorere hovedfilen for applikasjonen


  ### Modernisering av Konfigurasjon


  Et nytt Python-miljø ble installert også ble avhengighetsstyringen
  refaktorert. Flask-spesifikke pakker ble fjernet fra requirements.txt og nye
  sentrale FastAPI-komponenter ble installert, primært FastAPI, Uvicorn og
  Pydantic for datamodellering.


  ### Konvertering av Ruter og Datamodellering


  Deretter ble applikasjonens konfigurasjonsfiler refaktorert. Håndteringen av
  typiske Flask variabler ble erstattet med typesikker konfigurasjon ved å arve
  BaseSettings fra Pydantic Settings. Dette sikrer en robust og automatisert
  validering av miljøvariabler ved oppstart, dette gjør også konfigurasjonen
  kompatibel med FastAPIs rammeverk


  ### Ruter og Modellering


  Selve migrasjonen av endepunktene var det mest kritiske steget. Jeg ønsket å
  lage en robust, samtidig vedlikeholdbart kode


  * Flasks synkrone ruter ble konvertert til FastAPIs asynkrone funksjoner ved
  bruk av async def. Dette utnytter ASGI-standarden fullt ut og gjør
  applikasjonen i stand til å håndtere I/O-tunge operasjoner, for å unngå
  blokkering. 

  * Konvertering av datastrukturene til Pydantic-modeller var ikke nødvendig,
  men er utsatt til neste implementasjon for å isolere migreringseffekten av
  ASGI og asynkronitet først. Dette tillater meg å vertifisere ytelsesgevinsten
  fra ASGI uavhengig av de strukturelle endringene Pydantic krever. 


  Migreringen til FastAPI var en suksess og sikret at applikasjonen effektivt
  utnytter asynkron I/O for i I/O-tunge operasjoner som Github-kall. Dette
  reduserer   ventetiden og forbedrer den generelle gjennomstrømningen
  (throughout) av API-et.


  Selv om Pydantic-datamodelleringen er utsatt, bekreftes det at den fremtidige
  bruken av Pydantic vil sikre at koden er typesikker og robust. 


  ### Faglig lærings utbytte


  Den viktigste lærdommen fra dette arbeidet er verdien av å velge et
  arkitektonisk riktig rammeverk for formålet. Ved å bytte fra synkron WSGI
  (Flask) til asynkron ASGI (FastAPI), har jeg demonstrert forståelse for
  hvordan moderne APIer håndterer I/O-venting.


  Videre var utsettelsen av Pydantic et viktig faglig valg som tillot meg å
  isolere testen av ASGI-gevinstene fra de strukturelle endringene Pydantic
  krever. Dette sikret en ryddig og verifiserbar migreringsprosess.
KildeHenvisning: ''
---

