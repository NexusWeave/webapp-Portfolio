---
date: 2026-04-02T07:33:30.027Z
title: Health Check system oppgraderinger
ingress: |
  For å sikre full kontroll over prosjektet har jeg utviklet et eget varslingssystem som overvåker alle koblinger i sanntid. Ved å bytte ut generelle feilmeldinger med detaljerte statusrapporter, har jeg fjernet usikkerheten rundt hvor feil oppstår. Dette betyr at jeg kan løse utfordringer umiddelbart fremfor å lete i blinde. Resultatet er en mer stabil tjeneste for brukerne og en effektiv arbeidsflyt der teknisk rusk stoppes raskt.
status: |
  #### Dagens Aktivitet

  * Bygget om systemets sentrale endepunkt for helsesjekk. Systemet leverer nå detaljerte statusrapporter per tjeneste fremfor kun generelle feilmeldinger.
  * Lagt til funksjonalitet som lister opp samtlige tilgjengelige koblinger og viser nøyaktig sanntidstilstand for hver enkelt.
  * Identifisert og utbedret svakheter i feilhåndteringen for å skille mellom feil i egen kildekode og problemer hos eksterne tjenesteleverandører.
  * Redusert responstiden ved feilretting, som resulterer i en mer robust og stabil løsning for sluttbrukerne.

  #### Motivasjon & Energi 9 / 10

  Kjenner at jeg er klar for en ferie :)
sources: ''
---

Jeg hadde ingen oversiktlig måte å vite om en utfordring skyldtes min egen kode eller om det var utfordringer hos de eksterne tjenestene jeg henter data fra. Dette gjorde det vanskelig å vite hvor jeg skulle starte feilsøkingen når noe stoppet opp fremgangen av prosjektet.

Målet var å lage et et varslingssystem som gir meg svar med en gang på om alle koblinger fungerer, slik at jeg slipper å lete i blinde når noe ikke virker.

* Jeg har laget en helt ny, egen modul som kun har som oppgave å sjekke tilkoblingene mine mot interne kilder.
* Jeg har bygget om systemets hovedpunkt for helsesjekk slik at det gir en detaljert statusrapport for hver enkelt tjeneste i stedet for bare en generell melding.
* Jeg har lagt til en funksjon som lister opp alle tilgjengelige koblinger og viser nøyaktig hvilken tilstand hver enkelt av dem er i.

Dette reduserer tiden det tar å feilsøke en feil. Nå er det lettere å finne ut hvilken tjeneste som har problemer med en gang det skjer, noe som gjør at løsningen min er mye mer stabil for de som bruker den.
