---
date: 2026-07-30T00:00:00.000Z
title: Fullstendig testdekning for artikkelkomponenter og semantisk strukturering i frontend
ingress: |
  I <abbr title="den delen av en webapplikasjon som brukeren samhandler med">frontend</abbr>-applikasjonen oppstod det et behov for å bygge fullstendig testdekning for artikkel<abbr title="En sammensattbar klosse">komponent</abbr>ene samt forbedre den semantiske <abbr title="HyperText Markup Language">HTML</abbr>-strukturen. Ved å lage enhetstester for layout- og artikkelkomponenter, <abbr title="Forenkling av komplekse underelementer under testkjøring">stubbe</abbr> asynkrone underelementer og refaktorere siderammen til ren HTML5, oppnås forutsigbarhet for brukergrensesnittet. Som en konsekvens av dette reduseres feilmarginen ved fremtidige oppdateringer, samtidig som universell utforming ivaretas for skjermlesere og søkemotorer.
status: |
  *Skrevet i samarbeid med KI - Gemini 3.7 Flash*

  #### Programinformasjon
  **Verktøy** - Vitest, Vue Test Utils, Nuxt Test Utils, TypeScript

  #### Dagens aktiviteter
  * Opprettet isolerte enhetstester for `<Footer />` og `<Header />` i layout-testsettet.
  * Opprettet type-trygge testdata og varianter for `<Head />`, `<Body />` og `<Page />` i artikkel<abbr title="En sammensattbar klosse">komponent</abbr>ene.
  * Implementering av 11 enhetstester som verifiserer alle betingede forgreininger (CTA, Media, Minimal, Innleggsside, Emneside og Fallback-stater).
  * Refaktorering av `<Page />`-komponenten til ren semantisk HTML5 ved bruk av `<article>` som rot-element fremfor nøytrale `<div>`-elementer.
  * <abbr title="Forenkling av komplekse underelementer under testkjøring">Stubbing</abbr> av asynkrone underelementer som `<MDC />` og `<ContentRenderer />` for å sikre at `<Suspense>` rendrer det forventede innholdet under testing.

  #### Motivasjon & Energi - 10 / 10
  Føler meg fantastisk over å ha vært så produktiv over de fire timene jeg arbeidet med prosjektet idag

sources: '[Vitest Docs](https://vitest.dev/) [Nuxt Test Utils Docs](https://nuxt.com/docs/getting-started/testing)'
---

For å forebygge feil i brukergrensesnittet for artikkel<abbr title="En sammensattbar klosse">komponent</abbr>ene, måtte <abbr title="delen av en webapplikasjon som brukeren samhandler med">frontend</abbr>-applikasjonen ha isolerte tester for layout- og artikkelkomponenter, refaktorere uhensiktsmessig markup, samt håndtere asynkron lasting i komponenter som benytter <abbr title="En Vue-komponent som håndterer asynkrone underelementer">Suspense</abbr>.

Hensikten var å opprette pålitelig og fullstendig teststruktur for grensesnittkomponentene samt sikre at både statiske og dynamiske tilstander verifiseres automatisk ved testkjøring.

* Opprettet nye enhetstester for `<Footer />` og validerte skjemaer samt lenker i layout-komponenten.
* La til isolert og type-trygg testdata med varianter i `articleData.ts` for å dekke alle tilstandene i `<Head />`, `<Body />` og `<Page />`.
* Refaktorerte `<Page.vue>` til en semantisk ren <abbr title="HyperText Markup Language 5">HTML5</abbr>-struktur ved å fjerne ubenyttet ytre `<div>` og plassere klasser og navigasjon direkte i rot-elementet `<article>`.
* Implementerte 11 enhetstester i `article.test.ts` som dekker katalogvisning, enkeltinnlegg, medietyper, fallback-visninger og emnesider.
* Verifiserte at rute-betinget visning (f.eks. at `<ArticleBody />` skjules på emnesider `/logs/tags/`) fungerer nøyaktig som forventet.

Enhetstestene for artikkel- og layoutkomponentene kjører nå 100% grønt og stabilt i Vitest. Som en konsekvens av disse tiltakene har feilmarginen blitt redusert ved fremtidige komponent oppdateringer og sikrer at den universelle utformingen blir ivaretatt for å sikre at skjermlesere og søkemotorer tolker arktitekturen korrekt.  Erfaringen viser at bevisst <abbr title="Forenkling av komplekse underelementer under testkjøring">stubbing</abbr> av asynkrone underelementer kombinert med presise testdata-varianter gir forutsigbarhet og integeritet for enhetstestene i et <abbr title="Et syntetisk nettlesermiljø for kjøring av tester i Node.js">JSDOM</abbr>-miljø.
