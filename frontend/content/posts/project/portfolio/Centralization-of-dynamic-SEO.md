---
date: 2026-05-06T14:30:00.000Z
title: "Sentralisering av dynamisk SEO"
ingress: |
  I dag har jeg fokusert på å kverke en irriterende 500-feil under bygging og rydde opp i dokumentasjonen. Ved å flytte den dynamiske SEO-logikken over til en sentralisert composable, har jeg blitt kvitt hydreringsfeil og fått en stabil prerendering. Resultatet er en arkitektur som skiller klart mellom statisk metadata og det som skjer i runtime.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - Nuxt 4, Vue 3
  **Verktøy** - TypeScript, Nuxt Content

  #### Dagens Aktiviteter
  * Diagnostiserte og fikset en "Cannot read properties of undefined (reading 'params')" feil under prerendering.
  * Refaktorerte `useNavigation`-composablen til å håndtere dynamisk tittelgenerering basert på rute-parametre.
  * Ryddet i `definePageMeta` på tvers av logg-sidene for å overholde Nuxt sine krav til statisk metadata.
  * Oppdaterte globale preferanser for å sikre verdi-fokuserte commit-meldinger i fremtiden.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli. Veldig deilig å løse en dyp teknisk feil og samtidig få skikk på standardene i prosjektet.
sources: ''
--- 

Appen ble plutselig litt ustabil når jeg skulle bygge den, og spytta ut 500-feil i hytt og gevær. Det viste seg at jeg prøvde å aksessere rute-parametre inni `definePageMeta`, noe man ikke kan gjøre siden den evalueres før ruten er helt klar. I tillegg trengte jeg en bedre oversikt over alle sidene i prosjektet etter hvert som det har vokst.

Hensikten var å få dokumentert alle sidene ordentlig for å gjøre det lettere å vedlikeholde, og selvfølgelig fikse byggfeilen ved å skille mellom det som er statisk og det som er dynamisk SEO-logikk.

* For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har identifisert at `definePageMeta` er en compiler macro som krever statiske verdier, og fiksa sluggen ved å bruke statiske strenger istedenfor dynamiske labels.
* Jeg har utvidet navigasjons-logikken med en `watch` som følger med på side-stien og formaterer slugs til menneskevennlige titler for `useSeoMeta`.
* Jeg har oppdatert de globale instruksene for prosjektet så alle fremtidige commits følger Conventional Commits-standarden.

Gjennom dette arbeidet har jeg fått en feilfri byggprosess uten tull. Nå håndterer `definePageMeta` den statiske biten, mens `useNavigation` tar seg av alt det dynamiske mot brukeren og søkemotorene. Det har gjort systemet mye mer forutsigbart og fjerna en god del teknisk gjeld.
