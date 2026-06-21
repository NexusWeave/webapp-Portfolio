---
date: 2026-06-10T13:30:00.000Z
title: Restaurering av TinaCMS-innlasting og miljøkonfigurasjon
ingress: |
  TinaCMS feilet med å laste ressurser i admin-panelet som en konsekvens av manglende miljøvariabler og statisk ressursgenerering. Utfordringen ble løst ved å opprette en lokal `.env`-fil samt integrere `dotenv-cli` og `tinacms build` i kjøreskriptene. Dette sikrer at administrasjonspanelet laster feilfritt i alle miljøer og gjenoppretter stabil tilgang til redigeringsverktøyet.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt.js, TinaCMS
  **Verktøy** - TypeScript, dotenv-cli
  **Prinsipper** - Miljøhåndtering, Statisk generering

  #### Dagens aktiviteter
  * Undersøke årsaken til at TinaCMS-ressurser ikke ble lastet inn korrekt.
  * Sikre tilgangen til miljøvariabler i byggeprosessen.
  * Gjenopprette full funksjonalitet for admin-panelet i alle miljøer.

  #### Motivasjon & Energi - 6 / 10
  Selv om dette stresset meg, har dagen vært fin.
---

Det ble registrert at redigeringsverktøyet Tina<abbr title="Content Management System">CMS</abbr> hadde utfordringer med å laste nødvendige ressurser i admin-panelet. Dette førte til feilmeldingen "Failed loading TinaCMS assets". Dette skjedde både i produksjonsmiljøet og under lokal kjøring. Utfordringen oppstod som en konsekvens av manglende miljøvariabler og manglende generering av statiske ressurser under byggeprosessen.

Hensikten var å sikre at miljøvariablene lastes inn korrekt og at admin-panelet blir tilgjengelig og funksjonelt for alle miljøer.

* opprettet en ny `.env` i `frontend`-mappen for å samsvare med applikasjonens kjørekontekst.
* Oppdaterte `package.json` til å inkludere `tinacms build` i byggeprosessen for automatisk generering av statiske admin-ressurser.
* La til verktøyet <abbr title="dotenv Command Line Interface">dotenv-cli</abbr> i kjøreskriptene for å tvinge innlasting av nødvendige variabler før verktøyene starter.

Konfigurasjonen ble stabilisert slik at admin-panelet nå laster feilfritt uavhengig av byggemiljø. Som en konsekvens av dette ble tilgangen til redigeringsverktøyet gjenopprettet for kunden, noe som sikrer en stabil og forutsigbar distribusjon. Erfaringen viser at nødvendige variabler må være til stede under bygging av ressurser for at siden skal fungere uten en lokal server.
