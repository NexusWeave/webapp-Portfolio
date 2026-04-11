---
tags:
  - dev-journey
date: 2025-11-14T00:00:00.000Z
title: Redusert risiko og lavere vedlikeholdskostnader
ingress: |
  Vi har styrket systemets grunnmur for å fjerne risikoen for feil i daglig drift. Ved å skille virksomhetens regler fra den tekniske motoren, har vi skapt en løsning som er langt enklere å kontrollere. Dette gir en stabil sikkerhet som fungerer slik det er planlagt, samtidig som vi reduserer tidsbruk til vedlikehold. Resultatet er en trygg investering som raskt kan tilpasses nye behov i organisasjonen uten økt sårbarhet og risiko.
parade: ''
star: |
  Systemets funksjon for tilgangsstyring var organisert på en måte som blandet foretningslogikken med infrastruktur. Dette bruddet på prinsippet om klare ansvarsforhold som gjorde det utfordrende å vertifisere sikkerhetslogikken isolert , som øker risiko for feil ved fremtidige endringer og gjorde det vanskelig å etablere automatiske kontroller som bekrefter at systemet fungerer som planlagt.

  Målet var å separere ansvarsområdene i systemet for å sikre at reglene kan kontrolleres uavhengig av tekniske lagringsløsninger. Oppgaven var å øke systemets pålitelighet og bygge et rammeverk for effektiv og automatisert kvalitetssikring.

  Jeg har ryddet i systemets oppbygging.

  * Skilt ut logikken for tilgangskontroll slik at denne kan kontrolleres uten å påvirke resten av infrastrukturen.
  * Sørget for at systemet kan simulere ulike sikkerhetsscenarioer uten å være avhengig av eksterne filer.
  * Utviklet testrutiner som umiddelbart gir svar på om logikken fungerer korrekt.

  Vi har nå en pålitelig og forutsigbar arkitektur som gir både økt trygghet  og integeritet for at tilgangsstyringen fungerer nøyaktig som planlagt – også når vi gjør endringer i fremtiden. Ved å fjerne de tekniske koblingene har vi redusert tiden det tar å kontrollere og vedlikeholde systemet.

  Denne fremgangsmåten sikrer at vi følger anerkjente standarder for systemarkitektur, noe som er direkte koblet til økt motstandsdyktighet mot feil. Ved å prioritere rene ansvarsforhold har vi lagt til rette for en mer kostnadseffektiv videreutvikling og en betydelig høyere grad av vedlikeholdbarhet over tid.
sources: ''
---

#### Dagens aktiviteter

* Identifisert og kartlagt svakheter i nåværende tilgangsstyring, med fokus på å skille virksomhetens regler fra tekniske avhengigheter.
* Gjennomført en omfattende opprydding i systemets oppbygging for å sikre klare ansvarsforhold mellom sikkerhetslogikk og infrastruktur.
* Skilt ut logikken for tilgangskontroll slik at denne kan kontrolleres og oppdateres uavhengig av resten av systemet.
* Tilrettelagt for simulering av ulike sikkerhetsscenarioer uten behov for eksterne filer, noe som gjør kontrollarbeidet betydelig raskere.
* Implementert nye rutiner som gir umiddelbare svar på om sikkerhetslogikken fungerer korrekt, noe som styrker systemets integritet.
* Bekreftet at den nye arkitekturen følger anerkjente standarder for økt motstandsdyktighet mot feil og enklere fremtidig vedlikehold.

#### Motivasjon & Energi 10 / 10

Dagen har vært så fin den kunne bli
