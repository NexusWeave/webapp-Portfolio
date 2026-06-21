---
date: 2025-12-18T00:00:00.000Z
title: Fra rådata til skreddersydd JSON
ingress: |
  Etter å ha fiksa de asynkrone greiene i backend, var neste utfordring å få presentert dataene på en ryddig måte. Jeg har tatt et dypdykk i Pydantic for å fjerne "ekkoet" i API-responsen – duplikater som bare skaper støy. Ved å skille klart mellom hva backend beregner og hva frontenden trenger, har jeg fått på plass et skreddersydd og profesjonelt grensesnitt.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*

  #### Motivasjon & Energi - 10 / 10
  **Teknologi** - Python, Pydantic
  **Verktøy** - FastAPI
  Dagen er så fin den kunne bli. Ingenting er som en ren og pen JSON-respons!
sources: ''
--- 

Selv om dataene nå var tilgjengelige etter mye hodebry med asynkron innlastning, oppsto det et nytt irritasjonsmoment: API-responsen inneholdt alt for mye duplikate data. Den spytta ut både rå relasjonsdata og de ferdig bearbeida feltene mine samtidig, noe som bare skapte forvirring og unødvendig støy.

Hensikten var å få på plass en "Single Source of Truth" der bare de bearbeida dataene blir returnert. Jeg ville vise at backend kan ta fullt ansvar for transformasjonen så frontenden slipper å drive med tung logikk for å vise en enkel liste med språk.

* For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har brukt `exclude=True` i Pydantic-modellen på feltene som peker direkte mot databasetabellene.
* Jeg har snekra sammen `computed_field` properties som transformerer de rå relasjonsdataene til en enkel liste med språk og bytes.
* Jeg har sørga for at Pydantic filtrerer alt internt (Eager Loading) før det leveres til endepunktet.
* Jeg har rydda opp i hele modellen så JSON-outputen ble akkurat slik frontenden vil ha den – kort, konsis og uten tull.

Gjennom dette arbeidet har jeg fått en mye mer moden arkitektur. Ved å bruke innebygd funksjonalitet i Pydantic har jeg fått en løsning som er mye enklere å vedlikeholde. Det er nå krystallklart at backend fikser dataene, mens frontenden bare viser dem frem, akkurat slik det skal være i et skikkelig prosjekt.
