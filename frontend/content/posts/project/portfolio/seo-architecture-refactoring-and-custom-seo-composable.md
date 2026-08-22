---
date: 2026-07-31T00:00:00.000Z
title: Refaktorering av SEO-arkitektur med gjenbrukbar useCustomSeo, Sitelinks og sikkerhetspolicy
ingress: |
  I <abbr title="Den delen av webapplikasjonen som brukeren samhandler med">frontend</abbr>-applikasjonen var <abbr title="Search Engine Optimization - Søkemotoroptimalisering">SEO</abbr>-strukturen uoversiktlig, da enkelte <abbr title="En sammensattbar klosse">komponent</abbr>er overskrev metadata via eldre watch-løkker. Ved å bygge en gjenbrukbar useCustomSeo-<abbr title="En gjenbrukbar funksjon som pakker inn reaktiv logikk i Vue">composable</abbr>, utvide Schema.org (<abbr title="JavaScript Object Notation for Linked Data">JSON-LD</abbr>) for <abbr title="Lenker til undersider som vises direkte under hovedresultatet i Google">Sitelinks</abbr> og Breadcrumbs, opprette security.txt med tilhørende sikkerhetspolicy i bunnteksten samt tilrettelegge for dynamisk metadata, sikres forutsigbarhet for brukergrensesnittet. Som en konsekvens av dette elimineres dupliserte metadata-kall, mens original-lenker og OpenGraph-tagger automatiseres med 100 % grønn testdekning i Vitest.
status: |
  *Skrevet i samarbeid med KI - Gemini 3.7 Flash*

  #### Programinformasjon

  **Verktøy** - Nuxt 3, Vue 3, Vitest, Schema.org (JSON-LD), TypeScript

  #### Dagens aktiviteter
  * Lagt til standardisert `security.txt` under `public/.well-known/` for å tilfredsstille <abbr title="Request for Comments 9116 - IETF-standard for sikkerhetskontakter">RFC 9116</abbr> for sikkerhetskontakter, og utviklet en egen side for ansvarlig rapportering av sikkerhetshull i bunnteksten på nettsiden.
  * Opprettet typesikre grensesnitt for composable-funksjonen.
  * Utviklet composable-funksjonen for reaktiv håndtering av original-lenker, OpenGraph og sidetitler, samt utvidet Zod-skjemaet og kartleggingsfunksjonaliteten for valgfri frontmatter-overstyring.
  * Utvidet Schema.org-skjemaet med typedefinisjoner, integrert tilpasset SEO-funksjonalitet på alle navigasjonssidene, og opprettet et eget enhetstestsett.
  * Fjernet utdaterte spiontester.

  #### Motivasjon & Energi - 10 / 10
  Dagen har gitt en ryddig, modularisert commit-historikk og et helhetlig SEO-løft for hele porteføljen.

sources: '[Google Search Central](https://developers.google.com/search) [Nuxt SEO Docs](https://nuxt.com/docs/getting-started/seo-meta) [IETF RFC 9116 security.txt](https://www.rfc-editor.org/rfc/rfc9116)'
---
<abbr title="Search Engine Optimization - Søkemotoroptimalisering">SEO</abbr>-oppsettet var uoversiktlig, da enkelte <abbr title="En sammensattbar klosse">komponent</abbr>er overskrev sidetitler og OpenGraph-meta gjennom eldre <abbr title="En funksjon som overvåker dataendringer og kjører koden på nytt automatisk">watch-løkker</abbr>. Det manglet i tillegg en metode for å håndtere dynamisk metadata på logginnlegg og undersider, samtidig som struktureringen for <abbr title="underside lenker som vises direkte under hovedresultatet i Google">Sidelenker</abbr>, sikkerhetspolicy og original-nettadresser var mangelfull.

Hensikten for forandringene var å samle metadatabyggingen i en gjenbrukbar og type-sikker <abbr title="En bue basert gjenbrukbar funksjon som pakker inn reaktiv logikk">composable</abbr>, styrke sidetreet for søkemotorer via utvidet <abbr title="JavaScript Object Notation for Linked Data">JSON-LD</abbr>, samt bygge en empatisk ramme for sikkerhetsrapportering.

* Lagt til standardisert `security.txt` under `public/.well-known/` for å tilfredsstille <abbr title="Request for Comments 9116 - IETF-standard for sikkerhetskontakter">RFC 9116</abbr> for sikkerhetskontakter, og utviklet en egen side for ansvarlig rapportering av sikkerhetshull i bunnteksten på nettsiden.
* Opprettet typesikre grensesnitt for composable-funksjonen.
* Utviklet composable-funksjonen for reaktiv håndtering av original-lenker, OpenGraph og sidetitler, samt utvidet Zod-skjemaet og kartleggingsfunksjonaliteten for valgfri frontmatter-overstyring.
* Utvidet Schema.org-skjemaet med typedefinisjoner, integrert tilpasset SEO-funksjonalitet på alle navigasjonssidene, og opprettet et eget enhetstestsett.
* Fjernet utdaterte spiontester.

Som en konsekvens av disse tiltakene har applikasjonen oppnådd en konkret og reaktiv metadatastyring med en ønsket gjenbrukbarhet i koden. Søkemotorer mottar nå teoretisk sett korrekte instruksjoner for sidelenker og original-lenker for både å strukturere søkemotor-innhold og hindre indeksering av duplikater, samtidig som delinger i sosiale medier viser de korrekte sidetitlene og kortene. Erfaringen viser at samling av metadatastyring i en reaktiv composable forhindrer overskrivinger og gjør hele kodebasen lettere å vedlikeholde i et <abbr title="Server-Side Rendering - Servergenerert HTML">SSR</abbr>-miljø. I tillegg viser erfaringen at verdien av å være åpen om sikkerhetspolicyen bygger tillit, viser tilgjengelighet samt inviterer besøkende til et etisk og trygt samarbeid mellom mennesker.
