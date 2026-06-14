---
date: 2026-05-08T17:06:44Z
title: Modernisering og stabilisering av redaktørpanelet og stilark
ingress: |
  Løst filstibindingsfeil i TinaCMS ved å erstatte absolutte baner (~/) med relative stier i kolleksjons- og maldefinisjoner. I tillegg er globale stilark refakturert for å forhindre stilkonflikter, og en ReferenceError i createPage-funksjonen er rettet.
status: |
  #### Program informasjon
  **Teknologi** - Nuxt.js
  **Verktøy** - TypeScript, TinaCMS, React
  **Prinsipper** - Arkitektur, Modulisering

  #### Dagens Aktiviteter
  * Løst kompileringsfeil i TinaCMS ved å rette opp i absolutte stier og alias-håndtering.
  * Rettet en `ReferenceError` i kjernefunksjonaliteten for sidegenerering i redaktørpanelet.
  * Refaktorert TinaCMS-kolleksjoner og maler til en mer modulær struktur for bedre oversikt.
  * Utforsket og implementert React-basert logikk for tilpasning av redaktørpanelets brukergrensesnitt.
  * Flyttet og organisert globale stilark for å sikre bedre separasjon av ansvarsområder.
  * Løst type-uoverensstemmelser mellom artikler og navigasjonselementer for å styrke typesikkerheten.
  * Ryddet i prosjektets konfigurasjonsfiler og låst avhengigheter for stabil drift.

  #### Motivasjon & Energi - 10 / 10
  Veldig tilfredsstillende å se systemet kjøre knirkefritt igjen!
sources: ''
---

Dagen startet med utfordringer i redaktørpanelet (TinaCMS), der build-prosessen feilet på grunn av problemer med filstier og en udefinert variabel i kjerne-logikken. Samtidig var det behov for å rydde opp i stilarkene og type-definisjonene for å sikre at prosjektet forblir oversiktlig og lett å utvide.
Hensikten var å raskt gjenopprette stabiliteten i redaktørpanelet, samtidig som jeg gjennomførte en nødvendig refaktorering av CMS-skjemaene. Jeg ønsket også å forbedre kodestil og typesikkerhet for å redusere risikoen for fremtidige "runtime errors".

* Jeg identifiserte at TinaCMS sin build-prosess ikke klarte å håndtere "~/"-aliaser for visse hjelpefiler. Ved å konvertere disse til relative stier i alle kolleksjons- og mal-filer, sikret jeg at build-verktøyet fant de nødvendige ressursene uavhengig av miljø.
* Jeg rettet en `ReferenceError` i `createPage`-funksjonen, der en variabel var feilstavet. Dette var en direkte årsak til at redaktørpanelet ikke klarte å generere sider basert på malene.
* Jeg gjennomførte en omfattende refaktorering av TinaCMS-oppsettet. Ved å splitte opp store filer i mindre, spesialiserte moduler (kolleksjoner, maler og hjelpefunksjoner), har jeg gjort det betydelig enklere å vedlikeholde innholdsmodellen.
* Siden TinaCMS benytter React for sitt grensesnitt, har jeg begynt å utforske og implementere React-logikk for å tilpasse redaktørpanelet. Dette innebar å redefinere deler av panelet for å skape en mer intuitiv brukeropplevelse for innholdsprodusentene.
* Jeg flyttet hovedstyling for artikler og komponenter til dedikerte stilark. Ved å skille ut "layout"-logikk fra "presentasjon", unngår vi uønskede bivirkninger (side effects) når vi endrer på designet.
* Jeg løste en type-konflikt i kartleggingen (mapping) av innhold, der artikler og navigasjonsobjekter hadde uventede forskjeller i strukturen. Ved å oppdatere mappers og typedefinisjoner, har vi nå full kontroll over dataflyten.

***

Arbeidet har resultert i et fullt operativt redaktørpanel som nå bygger raskt og uten feilmeldinger. Den nye, modulære strukturen i TinaCMS gjør det enkelt å legge til nye innholdstyper i fremtiden. Stilarkene er nå bedre organisert, noe som gir raskere feilsøking og mer forutsigbar styling. Typesikkerheten er styrket gjennom hele kjeden, fra CMS-data til ferdig visning i nettleseren.

Gjennom denne prosessen har jeg lært at selv om aliaser (som "~/") fungerer utmerket i Nuxt, kan eksterne verktøy som TinaCMS ha egne regler for filoppløsning som krever en mer tradisjonell tilnærming med relative stier. Jeg har også sett verdien av å modulisere CMS-skjemaer tidlig; en sentralisert "Single Source of Truth" for feltdefinisjoner sparer mye tid og reduserer duplisering av kode. Ved å jobbe med React-komponenter i et ellers Vue-basert prosjekt, har jeg fått en unik innsikt i hvordan man kan kombinere ulike teknologier for å utnytte det beste fra begge verdener. Dette har gitt meg en dypere forståelse for hvordan man bygger robuste broer mellom et hodeløst CMS og et moderne frontend-rammeverk.
