---
date: 2026-06-10T13:30:00.000Z
title: Restaurering av TinaCMS-innlasting og miljøkonfigurasjon
ingress: |
  TinaCMS feilet med å laste nødvendige ressurser i admin-panelet, noe som førte til feilmeldingen "Failed loading TinaCMS assets". Dette skjedde både i lokal utvikling og under bygging av prosjektet for produksjon. Utfordringen skyldtes at miljøvariabler manglet, og at systemet ikke genererte de statiske resursene.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt.js, TinaCMS
  **Verktøy** - TypeScript, dotenv-cli
  **Prinsipper** - Miljøhåndtering, Statisk generering

  #### Dagens Aktiviteter
  * Finne årsaken til at TinaCMS-ressurser ikke ble lastet inn.
  * Sikre korrekt tilgang til miljøvariabler i byggeprosessen.
  * Gjenopprette full funksjonalitet for admin-panelet i alle miljøer.

  #### Motivasjon & Energi - 10 / 10
  Utfordringen ble løst systematisk, og systemet fungerer nå optimalt.
--- 

Kunden fikk ikke tilgang til redigeringsverktøyet, og sendte en forespørsel om jeg kunne sjekke dette. Jeg oppdaget at TinaCMS feilet med å laste nødvendige ressurser i admin-panelet, noe som førte til feilmeldingen "Failed loading TinaCMS assets" eller en <abbr title="En respons som sender brukeren videre">304-respons</abbr>. Dette skjedde både i produksjon og under bygging av prosjektet for produksjon. Utfordringen var en konsekvens av at miljøvariabler manglet, og at systemet ikke genererte de statiske resursene.

Hensikten var å sikre at miljøvariablene lastes inn korrekt og at admin-panelet blir tilgjengelig og funksjonelt i alle miljøer.

* Genererte en ny `.env`-fil i `frontend`-mappen for å samsvare med applikasjonens kjørekontekst.
* Oppdaterte `package.json` til å inkludere `tinacms build` i byggeprosessen for å generere statiske admin-ressurser.
* Implementerte <abbr title="Verktøy for å laste miljøvariabler fra en .env-fil">dotenv-cli</abbr> i skriptene for å tvinge innlastning av variabler som `TINA_CLIENT_ID` før verktøyene starter.

Konfigurasjonen ble stabilisert slik at admin-panelet nå laster feilfritt uavhengig av miljø. Erfarte at eksplisitt bygging av ressurser er nødvendig for at siden skal fungere uten en lokal server, noe som sikrer en robust og forutsigbar distribusjon. Dette gir et innblikk i hvor sensitive systemer kan være for å trigge feilmeldinger.
