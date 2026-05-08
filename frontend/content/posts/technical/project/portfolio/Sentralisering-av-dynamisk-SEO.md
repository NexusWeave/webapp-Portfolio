---
date: 2026-05-06T14:30:00.000Z
title: "Sentralisering av dynamisk SEO"
ingress: |
  Dagens arbeid fokuserte på å løse en kritisk 500-feil under bygging og forbedre applikasjonens dokumentasjon. Ved å flytte dynamisk <abbr title="Search Engine Optimization">SEO</abbr>-logikk fra sideoppsett til en sentralisert composable, har jeg fjernet <abbr title="Uoverensstemmelse mellom den server-genererte HTML-en og den klient-side JavaScript-en">hydreringsfeil</abbr> og sikret en stabil <abbr title="Prosessen med å generere statiske HTML-sider på forhånd for bedre ytelse og SEO">prerendering</abbr>. Resultatet er en mer robust arkitektur som skiller klart mellom statisk metadata og runtime-dynamikk, samtidig som brukeropplevelsen er ivaretatt gjennom konsistente sidetitler.
status: |
  #### Program informasjon
  ** Teknologi** - Nuxt 4, Vue 3
  ** Verktøy** - TypeScript, Nuxt Content

  #### Dagens Aktiviteter
  * Diagnostiserte og fikset en "Cannot read properties of undefined (reading 'params')" feil under prerendering.
  * Refaktorerte `useNavigation`-composablen til å håndtere dynamisk tittelgenerering basert på rute-parametre.
  * Ryddet i `definePageMeta` på tvers av logg-sidene for å overholde Nuxt sine krav til statisk metadata.
  * Oppdaterte globale preferanser for å sikre verdi-fokuserte commit-meldinger i fremtiden.

  #### Motivasjon & Energi - 10 / 10

  Veldig tilfredsstillende å løse en dyp teknisk feil og samtidig styrke prosjektets standarder.
sources: ''
---

Applikasjonen opplevde teknisk ustabilitet under bygging, manifestert som en 500-feil. Dette skjedde som en konsekvens av at dynamiske rute-parametre ble forsøkt aksessert inne i `definePageMeta`-makroen, som evalueres før ruten er fullstendig instansiert. Samtidig manglet prosjektet en oppdatert oversikt over sidestrukturen, noe som gjorde det utfordrende å navigere i den voksende mengden sider og ruter.

Målet var todelt. For det første å dokumentere alle sider for å øke vedlikeholdbarheten. For det andre å løse byggfeilen ved å skille statisk metadata fra dynamisk SEO-logikk, uten å miste evnen til å vise beskrivende sidetitler basert på innholdet.

* For å løse 500-feilen, identifiserte jeg at `definePageMeta` er en <abbr title="En funksjon eller instruksjon som prosesseres av kompilatoren fremfor å kjøres som vanlig kode i nettleseren">compiler macro</abbr> som krever statiske verdier. Jeg refaktorerte <abbr title="Den delen av en URL som identifiserer en spesifikk side i et menneskevennlig format">sluggen</abbr> ved å erstatte dynamiske labels med statiske strenger.
* Jeg utvidet funkasjonaliteten for å lage en dynamisk-navigering med en `watch` som ser etter forandringer i side stien. Inne i denne funksjonaliteten la jeg til logikk som sjekker for slugs. Hvis en slug finnes, formateres denne til en menneskevennlig tittel (fjerner bindestreker, stor forbokstav) som sendes til `useSeoMeta`.
* Jeg oppdaterte prosjektets globale instrukser for å sikre at fremtidige commits følger Conventional Commits-standarden med fokus på arkitektonisk verdi.

Resultatet er en feilfri byggprosess uten prerendering-avvik. Applikasjonen har nå en tydelig skillelinje `definePageMeta` håndterer statisk organisering og rute-rekkefølge, mens `useNavigation` håndterer den dynamiske presentasjonen mot bruker og søkemotorer. Dette har redusert teknisk gjeld og gjort systemet mer forutsigbart.

Denne runden har erfart meg å forstå forskjellen mellom <abbr title="Kodesnutter som kjøres under kompileringsfasen for å transformere eller generere kode">build-time macros</abbr> og <abbr title="Logikk som kjøres mens applikasjonen er aktiv i nettleseren">runtime logic</abbr> i moderne rammeverk som Nuxt. Selv om det er fristende å gjøre alt på ett sted, fører det ofte til hydreringsfeil eller build-krasj. Ved å flytte kompleksitet til dedikerte composables oppnår man ikke bare stabilitet, men også en mer gjenbrukbar og testbar kodebase.
