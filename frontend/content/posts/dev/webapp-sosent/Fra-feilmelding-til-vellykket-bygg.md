---
created: 2025-12-24T00:00:00.000Z
tags:
  - dev-journey
title: Fra feilmelding til vellykket bygg
ingress: >
  Sikker håndtering av sensitiv data i byggeprosessen. Ved klargjøring av
  TinaCMS for produksjon oppstod det utfordringer knyttet til manglende
  autentisering og adgangskontroll. Denne loggen tar for seg hvordan man løser
  problemet med manglende miljøvariabler gjennom bruk av tredjepartsverktøyet
  `dotenv-cli`. Ved å sikre korrekt propagering av nøkler fra `.env`-filer til
  byggeverktøyet, etableres en løsning som ivaretar både sikkerhetsmessige
  hensyn og kravet om en sømløs byggeprosess uten hardkoding av sensitive data.
star: >
  ### Løsning av Autentiseringsfeil i TinaCMS med dotenv-cli


  #### Lokal Oppstart av CMS


  Under et forsøk på å bygge prosjektet til produksjon for videre utvikling av
  innholdshåndtering, oppstod det en feil i integrasjonen med TINACMS.
  Prosjektet nektet å bygge og returnerte en feilmelding. `Error: Client not
  configured properly. Missing clientId, token.`


  Dette skjedde i fasen hvor klienten forsøkte på å instansiere forbindelsen til
  innholds-API-et, men manglet nødvendige identifikatorene for å bli godkjent av
  skytjenesten.


  #### Manglende Miljøvariabler


  Feilmeldingene er spesifikke, den forteller at Klienten (TinaCMS SDK) ikke
  finner verdier for `clientId` og `token`.


  * Lokale miljø variabler er ikke definert eller lastet inn korrekt i
  utviklingsmiljøet.

  * `tina/config.ts` peker på variabler som ikke er definert i systemet.

  * Systemet beskytter mot sensitive nøkler, ikke ved å hardkode dem, men feiler
  når de ikke blir injisert under oppstart.


  Disse miljø nøklene skal aldri sjekkes inn i versjonskontroll, noe som betyr
  at hver utvikler må sette dette manuell eller gjennom en kryptert
  .env.production-fil ved første gangs oppsett.


  #### Midlertidig Lagring i Terminalen


  Siden det ikke var en .env.production / .env.development-fil i i systemet, men
  en .env-fil, måtte et tredjeparts programvare som dotenv-cli, bli installert
  på systemet, slik at klienten kunne hente variablene fra .env-filen og lagre
  det midlertidig i terminalen, under oppbyggningen av tinacms klienten.


  Først måtte variablene installeres til .env-filen, deretter ta med dotenv -e
  tinacms i kommandoen for å bygge TinaCMS.


  #### Introduksjon av dotenv-cli


  Ved å introdusere dotenv-cli ble integrasjonen mellom miljøvariablene og
  TinaCMS-klienten vellykket.


  #### Evaluering


  Med denne utfordringen fikk jeg kjennskap til  hvordan miljø propagerer i et
  prosjekt. Selv om variablene finnes i en fil, er de ikke automatisk
  tilgjengelig for alle tredjepartsverktøy.


  ##### Arkitektonisk innsikt


  Bruken av dotenv-cli er en robust måte å sikre at riktige variabler blir
  injisert i riktig miljø. Dette sikrer at sensitiv informasjon forblir i .env,
  men likevel er tilgjengelig for nødvendige byggeverktøy
KildeHenvisning: ''
---

