---
date: 2025-12-01T00:00:00.000Z
title: Omgjøring fra Ustandardisert Logikk til ORM
ingress: |
  Jeg har gjennomført en omfattende fornyelse av databasetjenesten for å sikre en langt mer stabil og effektiv hverdag i prosjektet mitt. Ved å rydde opp i hvordan informasjon håndteres, har jeg skapt et skille som gjør løsningen min enklere å pleie og videreutvikle i fremtiden. Dette grepet reduserer risikoen for feil og sikrer at jeg kan levere nye funksjoner raskere. Resultatet er en ryddig og trygg oppbygging med stor verdi.
status: |
  #### Dagens Aktiviteter

  * Erstattet utdatert databaselogikk med `SQLAlchomy`-biblioteket for å sikre et pålitelig og fremtidsrettet system.
  * Skilte tekniske databaseoppgaver fra systemets logikk, noe som gjør løsningen modulær og reduserer risikoen for følgefeil ved fremtidige endringer.
  * Forenklet malen for håndtering av <abbr title="Create, Read, Update & Delete. De fire grunnleggende operasjonene for å håndtere data i databaser.">CRUD</abbr> basert informasjon, som sikrer lik praksis i hele koden og gjør den enklere for andre utviklere å forstå
  * Etablerte  nye og sikre koblingspunkter mot databasen, som forbedrer trafikkflyten og stabiliserer systemet.
  * Definerte <abbr title="En mal som forteller utvikleren hvilken data som er tillat">objektorienterte modeller</abbr>, dettesørger for at dataene alltid samsvarer med systemets krav, som reduserer logiske feil.
  * Fjernet teknisk etterslet og klargjorde arkitekturen for automatiserte tester, slik at fremtidige oppdateringer kan rulles ut stabilt.

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli !
sources: ''
---

Systemets måte å kommunisere med databasen på var utdatert. Selv om det fungerte, var det ikke verken pålitelig eller en optimalt system. Dette gjorde det vanskelig å vedlikeholde koden, og koden var ikke optimalisert for en fremtidige funksjonaliteter, 

Målet mitt var å bygge om dette systemet ved hjelp av biblioteket <abbr title="Et ORM basert bibliotek i programmeringsspråket python">`SQLAlchemy`</abbr>. Oppgaven handlet om å standardisere hvordan data lagres og hentes, slik at systemet er pålitelig, og klargjør tjenesten for framtidig vekst.

* Jeg separerte de tekniske databaseoppgavene fra selve forretningslogikken. Dette betyr at om vi endrer på databasen, påvirker det ikke resten av systemet.
* Med hjelp av <abbr title="Et python basert bibliotek, som validerer kode">`Pydandic`</abbr>-modeller har jeg  laget en felles mal for hvordan jeg legger til, leser eller sletter informasjon, som sikrer lik praksis i hele løsningen.
* Jeg satte opp nye, koblingspunkter mot databasen som håndterer flere forespørsler samtidig.
* Jeg sørget for at dataene i databasen alltid stemmer overens med slik systemet forventer å se dem, som reduserer sjansen for logiske feil.

Jeg har nå fjernet teknisk rot og sitter igjen med en ryddigere og en stabilisert plattform. Dette reduserer behovet for å vedlikehold i koden og gjør det tryggere å rulle ut nye oppdateringer. Systemet er nå også klargjort for automatiserte tester, for å sikre at funksjonaliteten gir et ønsket resultat.

Gjennom denne prosessen har jeg fått erfart verdien av prinsippet om å skille bekymringer ved bruk av <abbr title="Data Access Object">DAO</abbr>-mønsteret. Jeg har fått en dypere forståelse for hvordan `SQLAlchemy` og `Pydantic` sammen skaper en kontrakt-basert lag mellom kode og database, som reduserer logiske feil. Den viktigste erfaringen er at investering i arkitektur reduserer teknisk etterslep og gjør systemet klargjort  for både samarbeid og automatisert testing.
