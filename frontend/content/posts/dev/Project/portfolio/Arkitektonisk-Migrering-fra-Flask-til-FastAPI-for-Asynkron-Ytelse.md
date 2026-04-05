---
tags:
  - dev-journey
date: 2025-11-22T00:00:00.000Z
title: Arkitektonisk Migrering fra Flask til FastAPI for Asynkron Ytelse
ingress: |
  Denne læringsloggen dokumenterer den arkitektoniske migreringen av en Python-applikasjon fra det synkrone **Flask**-rammeverket (WSGI) til det moderne, asynkrone **FastAPI**-rammeverket (ASGI). Flask ble funnet å være overflødig og ineffektivt for applikasjonens API-formål, spesielt ved håndtering av I/O-tunge operasjoner som eksterne API-kall (f.eks., Github). Hovedmålet var å utnytte **ASGI**-støtten for å redusere ventetid og forbedre gjennomstrømningen. Migreringen omfattet en omfattende refaktorering av konfigurasjon (ved bruk av\*\* Pydantic Settings\*\*) og konvertering av synkrone ruter til asynkrone funksjoner (`async def`). Den bevisste utsettelsen av Pydantic-datamodellering tillot en\*\* isolert og verifiserbar test \*\*av ASGI-gevinstene. Lærdommen understreker viktigheten av å velge et arkitektonisk korrekt rammeverk for å maksimere ytelsen i moderne API-design.
parade: ''
star: |
  Da prosjektet vokste, ble det tydelig at den eksisterende arkitekturen basert på <abbr title="Et eldre og mer tradisjonelt teknologi-verktøy (rammeverk) som ofte brukes til enklere nettsider, men som kan bli tregt når mange ting skjer samtidig.">**Flask**</abbr> ikke lenger klarte å holde tritt med kravene til effektivitet. Applikasjonen fungerte primært som et bindeledd mot eksterne tjenester som <abbr title="En skybasert tjeneste som lagrer kode og prosjektdata. I dette tilfellet fungerte GitHub som den eksterne datakilden systemet måtte hente informasjon fra.">**GitHub**</abbr>, og den tradisjonelle metoden for å håndtere data førte til at hele systemet ble stående og vente på svar. Dette skapte en flaskehals som begrenset systemets kapasitet og resulterte i en tregere opplevelse for sluttbrukerne etter hvert som datamengden økte.

  Task (Oppgave)

  Min oppgave var å gjennomføre en teknisk modernisering ved å migrere applikasjonen til et rammeverk som støttet moderne standarder for parallell håndtering av oppgaver. Målet var ikke bare å øke hastigheten på datahenting, men også å bygge en mer robust og typesikker grunnmur som ville redusere fremtidige vedlikeholdskostnader og gjøre det enklere å skalere løsningen.

  Action (Handling)

  For å løse dette utførte jeg følgende tiltak:

  Arkitektonisk skifte: Migrerte fra Flask (WSGI) til FastAPI (ASGI) for å muliggjøre asynkron håndtering av tunge dataoperasjoner.

  Isolert migreringsstrategi: Valgte å beholde eksisterende datastrukturer midlertidig og utsatte full implementering av Pydantic. Dette ble gjort for å isolere og verifisere ytelsesgevinsten fra den asynkrone driften før man gjorde omfattende strukturelle endringer.

  Modernisering av konfigurasjon: Refaktorerte hvordan systemet håndterer miljøvariabler ved å innføre typesikker validering, som sikrer at systemet ikke starter med feilaktige innstillinger.

  Optimalisering av avhengigheter: Ryddet i prosjektets biblioteker og installerte en moderne webserver (Uvicorn) som er optimalisert for den nye asynkrone standarden.

  Result & Learning (Resultat og læring)

  Migreringen resulterte i et API med betydelig høyere gjennomstrømning og redusert ventetid, spesielt ved tunge integrasjoner mot eksterne kilder. Ved å fjerne blokkeringer i koden kan systemet nå håndtere langt flere forespørsler samtidig med de samme ressursene, noe som gir direkte kostnadsbesparelser og en bedre brukeropplevelse. Den viktigste faglige lærdommen var verdien av en metodisk tilnærming; ved å isolere testen av ytelsesgevinsten fra de strukturelle endringene, sikret jeg en risikofri overgang og fikk bekreftet at det arkitektoniske valget var riktig før prosjektet ble bygget videre.
sources: ''
---

