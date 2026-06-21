---
date: 2026-06-18T15:00:00.000Z
title: Kvalitetsheving og arkitekturforbedringer
ingress: |
  Prosjektet har gjennomgått en rekke oppdateringer for å heve kodekvaliteten, forbedre ytelsen og styrke funksjonaliteten. Det ble lagt til ny funksjonalitet for deling til eksterne plattformer, samtidig som integrasjonen mot eksterne dataforbindelser fikk lagt inn hastighetsbegrensninger. Det ble også lagt til testrutiner for både stilsett og frontend-logikk for å forbedre kodekvaliteten.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - <abbr title="Bibliotek for brukergrensesnitt">Vue</abbr>, <abbr title="Type-sikker JavaScript">TypeScript</abbr>, <abbr title="Språk for å lage stilark">Sass</abbr>
  **Verktøy** - <abbr title="Verktøy for å kjøre tester">Vitest</abbr>, <abbr title="Verktøy for versjonshåndtering">git</abbr>, <abbr title="Plattform for automatisk bygging og utrulling">GitHub Actions</abbr>
  **Prinsipper** - Enhetstesting, Feilhåndtering, Grensesnitt-design

  #### Dagens Aktiviteter
  * Lagt til en ny tjeneste for deling av innlegg til LinkedIn.
  * oppdatert hastighetsbegrensningen for forespørsler mot eksterne datakilder.
  * Strukturert og modernisert testmiljøet for stilarkverktøy ved overgang til en ren kompilatormodell.
  * Standardisert datoformatering og tidssone-innstillinger for publiserte logger.
  * Omgjort dokumentasjonen til et mer tilgjengelig og konsekvent språk.
  

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kan bli, selv om jeg oppdaget at jeg hadde noen øyblikk med høy puls under refaktoreringen.
--- 

Prosjektet manglet enhetstesting på hjelpefunksjonene. I tillegg ble det oppdagetat en del av systemet overskide kvotene sine mot Github- rest api og visse stil elementer manglet tilstrekkelig fleksibilitet.

Hensikten var å styrke systemets robusthet, øke ytelsen i testinfrastrukturen, samt etablere mer pålitelige integrasjoner mot eksterne tjenester.

* Laget en ny integrasjon for deling til <abbr title="Sosialt nettverk for profesjonelle">LinkedIn</abbr> inkludert tilhørende bakgrunnstjenester og automatiserte byggesteg.
* Lagt til hastighetsbegrensning (rate-limiting) på forespørsler mot <abbr title="Nettbasert vertstjeneste for programvareutvikling">GitHub</abbr> sitt programmeringsgrensesnitt for å forhindre avbrudd i tjenesten.
* Oppgraderte stilbiblioteket <abbr title="CSS-rammeverk for stiler">lumina-sass</abbr> til versjon 3.3.5 for å sikre de nye fiksene.
* Sammenslo stilarktestingen fra <abbr title="Verktøy for enhetstesting">Vitest</abbr> over til en direkte kompilator-basert testsuite.
* Omgjorde hjelpefunksjonene i prosessoren til å bruke standardiserte importer, og lagt til enhetstesting av disse.
* Standardisert tidssonen for visning av publiseringstider til Europe/Oslo for å hindre tidsavvik mellom lokale tester og den automatiserte testkjøringen.
* Oversatt og ryddet i dokumentasjonsfiler for å sikre en konsekvent språkbruk på tvers av prosjektet.

Endringene har resultert til forbedring av kodekvaliteten gjennom de nye testene, samtidig forbedret påliteligheten for koblingspunktet som håndterer ekstern datakommunikasjon uten faren for kvoteoverskidelser. Loggene blir også delt på LinkedIn.

Erfaringen av å lage verifiseringstester i Vitest sikrer en mer stabil utviklingshverdag, styrker prosjektets pålitelighet og reduserer fremtidige vedlikeholdsetterslep.
