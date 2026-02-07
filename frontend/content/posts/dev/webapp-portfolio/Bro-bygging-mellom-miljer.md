---
created: 2025-12-22T00:00:00.000Z
tags:
  - dev-journey
title: Bro bygging mellom miljøer
ingress: >
  Denne læringsloggen dokumenterer overgangen fra et utviklingsmiljø til en
  produksjonsarkitektur på Google Cloud Run. Ved flytting av backend-logikk til
  skyen oppstod det utfordringer knyttet til isolasjon i Docker-containere og
  håndtering av lokale avhengigheter. Gjennom strategisk bruk av arbeidsområder
  (`WORKDIR`) og manipulering av `PYTHONPATH`, ble applikasjonens søkestier
  synkronisert for et "Cloud Native" miljø. Erfaringen gir teknisk innsikt i
  hvordan man delegerer driftsansvar til sky-infrastruktur samtidig som man
  beholder kontroll over komplekse interne biblioteksstrukturer.
star: >
  ### Håndtering av Docker-kontekst og PYTHONPATH i Google Cloud Run


  #### Fra utvikling til Produksjon


  Etter å ha stabilisert applikasjonen lokalt og sikret databasekommunikasjonen
  med Turso-databasen, har prosjektet nådd en viktig milepæl. Applikasjonen
  fungerer som forventet i utvikler miljøet og er klar for produksjon, for  å
  gjøre dette profesjonelt, sikkert og tilgjenglig, besluttes det å flytte
  applikasjonen til en stabil Cloud som Google Cloud. Plattformen lar os kjøre
  containeriserte applikasjoner i et miljø som er driftet av fagkyndige.


  * Dagen startet med en at Cloud run ikke fant de lokale avhengighetene som det
  interne biblioteket. Etter at denne utfordringen ble løst


  #### Utfordringer med Dockermiljøer og lokale avhengigheter


  Når en applikasjon blir flyttet fra utviklermiljøet til en dataplattform som
  Google Cloud Run, endre premissene for hvordan koden søker etter sine
  avhengigheter. Under oppstart i skyen oppstod det en utfordring med at Cloud
  Run ikke fant de lokale avhengighetene, som det interne biblioteket.


  * Dockercontainer er som en dokumentasjon som beskriver hvordan prosjektet
  skal kjøres for programmet. Hvis de interne avhengighetene ligger i en
  kategori som er utenfor applikasjonskoden lokalt, må utvikleren beskrive hvor
  de avhengighetene ligger.

  * Lokale referanser som fungerer for et utviklersystem, existerer ikke for
  andre plattformer sin infrastruktur.

  * Som alle andre dataplatformer forventer Cloud Run at alle avhengighetene
  blir installert gjennom en pakkebehandler eller er inkludert i containeres
  anvisninger.


  #### Synkronisering av filstruktur og Docker-kontekst


  Det ble konfigurert  en Dockerfile som etablerte et arbeidsområde (WORKDIR)
  inne i containeren.  Slik at alle relative stier har et felles utgangspunkt.


  For å sikre at Python finner både backend-koden og det interne biblioteket,
  ble miljøvariabelen PYTHONPATH konfiguert i Docker-instruksjonene.


  Ved å instaliserePYTHONPATH= til å inkludere de relevante mappene, kan
  applikasjonen importere interne moduler uavhengig av hvor de er plassert i den
  lokale filstrukturen. Dette overstyrerer standard søkestier og veileder
  systemet til å annerkjenne de interne bibliotekene som gyldige pakker.


  #### Vellykket Sky-eksponering


  Etter at PYTHONPATH og arbeidsomrpdet ble korrekt definert i
  Docker-konfigurasjonen, ble applikasjonen bygget og lastet opp på nytt.
  Container imaget ble vertifisert og lagret i Google Clouds arkiv, klart for
  distribusjon til Cloud Run-instansene. Applikasjonen ble tildelt en unik URL
  fra GOogle og backend-tjenesten rapporterte “Healthy" i status loggene.


  #### Containerisering og miljøkontroll


  Gjennom prosessen med å flytte applikasjonen til Google Cloud Run har jeg fått
  erfaring om skillet mellom lokalt oppsett og produksjons drift.


  * Jeg har lært at en Docker-container krever en detaljert beskrivelse av
  miljøet. Stiene eller bibliotekene kan ikke bli vagt beskrevet, dette må
  beskrives i applikasjonen.

  * Bruken av miljøvariabler som PYTHONPATH har vist seg å være et godt verktøy
  for å håndtere filstrukturer uten å måtte skrive om applikasjonslogikken.
  Dette gir  fleksibilitet med interne biblioteker.
KildeHenvisning: ''
---

```dockerfile
FROM python:3.13-slim

# Installering av arbeidsområdet
WORKDIR /code

# Kopierer fra den lokale mappen til containeren
COPY sti-til-mappe/requirements.txt .

# Installer pakkene
RUN pip install --no-cache-dir -r requirements.txt

# Kopier alt innholdet fra den lokale Rot-mappen inn i /code i containeren
COPY . .

# Sett PYTHONPATH så Python finner mappen som en pakke
ENV PYTHONPATH=/app:/app/sti-til-mappe

# Kommandoer for å starte applikasjonen
# 'sti-til-mappe.app' betyr: se i mappen sti-til-mappe, finn filen app.py
# ':app' betyr: finn applikasjons variabelen i koden inne i den filen
CMD ["python", "-m", "uvicorn", "sti_til_mappe.app:app", "--host", "0.0.0.0", "--port", "8080"]
```
