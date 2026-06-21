---
date: 2026-06-10T13:30:00.000Z
title: Restaurering av TinaCMS-innlasting og miljøkonfigurasjon
ingress: |
  TinaCMS feilet med å laste nødvendige ressurser i admin-panelet, noe som førte til feilmeldingen "Failed loading TinaCMS assets". Dette skjedde både i lokal utvikling og under bygging av prosjektet for produksjon. Utfordringen skyldtes at miljøvariabler manglet, og at systemet ikke genererte de statiske resursene.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt.js, TinaCMS
  **Verktøy** - TypeScript, dotenv-cli
  **Prinsipper** - Miljøhåndtering, Statisk generering

  #### Dagens aktiviteter
  * Finne årsaken til at TinaCMS-ressurser ikke ble lastet inn.
  * Sikre korrekt tilgang til miljøvariabler i byggeprosessen.
  * Gjenopprette full funksjonalitet for admin-panelet i alle miljøer.

  #### Motivasjon & Energi - 10 / 10
  Utfordringen ble løst systematisk, og systemet fungerer nå opplagt.
---

Det ble registrert at redigeringsverktøyet Tina<abbr title="Content Management System">CMS</abbr> hadde utfordringer med å laste nødvendige ressurser i admin-panelet. Dette førte til feilmeldingen "Failed loading TinaCMS assets". Dette skjedde både i produksjonsmiljøet og under lokal kjøring. Utfordringen oppstod som en konsekvens av manglende miljøvariabler og manglende generering av statiske ressurser under byggeprosessen.

Hensikten var å sikre at miljøvariablene lastes inn korrekt og at admin-panelet blir tilgjengelig og funksjonelt for alle miljøer.

* Laget til en ny `.env` i `frontend`-mappen for å samsvare med applikasjonens kjørekontekst.
* Oppdaterte `package.json` til å inkludere `tinacms build` i byggeprosessen for automatisk generering av statiske admin-ressurser.
* La til verktøyet <abbr title="dotenv Command Line Interface">dotenv-cli</abbr> i kjøreskriptene for å tvinge innlasting av nødvendige variabler før verktøyene starter.

Konfigurasjonen ble stabilisert slik at admin-panelet nå laster feilfritt uavhengig av bygge miljø. Som en konsekvens av dette ble tilgangen til redigeringsverktøyet gjenopprettet for kunden, noe som sikrer en stabil og forutsigbar distribusjon. Erfaringen viser at nødvendige variabler må være tilstede under bygging av ressurser for at siden skal fungere uten en lokal server.
