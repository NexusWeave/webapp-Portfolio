---
date: 2026-06-23T14:50:00.000Z
title: Enhetstesting av navigasjon og kjerne-composables
ingress: |
  Opprettelsen av enhetstester for navigasjons- og karusell-composables har økt testdekningen og sikret at løsningen som er utviklet er pålitelig. Ved å innføre en test-helper, skrive spiontester for SEO-metadata, og legge til sikkerhetsbarrierer i kildekoden, garanteres en stabil og feilfri drift av applikasjonens kjernefunksjoner i miljøet.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini 3.5 Flash*
  **Teknologi** - Nuxt.js, Vitest
  **Verktøy** - TypeScript, Vitest Coverage
  **Prinsipper** - Enhetstesting, Pålitelige komponenter

  #### Dagens aktiviteter
  * Omgjøre karusell-composable til et beskrivende navn og skrive tilhørende enhetstester.
  * Utvikle testverktøy og spionfunksjoner for å verifisere ruteendringer og SEO-metadata i testing.
  * Sikre navigasjonslogikken mot udefinerte ruteobjekter under server-side-rendring og automatiserte tester.

  #### Motivasjon & Energi - 10 / 10
  Jeg er fornøyd med at testene styrker kvaliteten for prosjektet.
---
For å sikre portfolio-prosjektet mot fremtidige avvik under videreutvikling, hadde kildekoden et behov for å bli strukturert med funksjonstester, sjekker og spioner som dekker prosjektets navigasjons-, karusell- og datatransformasjons-<abbr title="Gjenbrukbar reaktiv logikk i Vue 3">composables</abbr>.  

Hensikten var å etablere en stabil og fremtidsrettet testsuite for kjerne-composables, samt sikre en pålitelig kildekode som er fullstendig uavhengig av eksterne rute- og rammeverkskontekster. Per nå dekker testen kjernelogikken for navigasjon, karusell og datatransformasjon.

* Omdøpte `useCarousel` til `useRotateCollections` for å beskrive samlingsfunksjonaliteten.
* Opprettet enhetstester med falske tidtakere for å teste `useRotateCollections` indeksering og tidsintervallene.
* Utviklet hjelpefunksjoner for å forenkle oppsett og mocking av Vue-komponenter i <abbr title="Et raskt og moderne testrammeverk for JavaScript og TypeScript">Vitest</abbr>.
* La til spion-baserte tester for `useNavigation` for å verifisere dynamiske sidetitler og metadata genereres og oppdateres korrekt.
* Utvidet `fetchCollection` til å boble opp feil direkte fra `useAsyncData` i stedet for å svelge dem, og skrev grundige tester som verifiserer feilhåndtering, tomme datasett og mapping av strukturerte data.
* La til sjekker i `sortbyDate` og `setDateFormat` for å håndtere manglende eller ufullstendige data, verifisert gjennom nylig tilføyde enhetstester.

Testingen sikrer at prosjektet har en pålitelig navigasjons- og databehandlingslogikk som kjører feilfritt på tvers av ulike kjøretidsmiljøer. Dette øker stabiliteten for nettsiden. Som en konsekvens av den nye teststrukturen blir endringer i navigasjons- og karusellfunksjonalitet validert.

Arbeidet med denne testsuiten har bidratt til å øke intressen og erfaringen på testing av moderne Vite- og Nuxt-applikasjoner. Ved å opprette testrutiner sikres prosjektet forblir stabil under videreutvikling. For å opprettholde kvalitet og strukturert tilnærming under utvikling av nye funksjoner, benyttes tre faste kjerneområder som en tommelfingerregel:

1. **Hva skal denne funksjonen gjøre når alt går perfekt? (Den glade sti / Happy Path)**
   * *Fokus:* Sikre at funksjonen løser kjerneoppgaven sin under normale omstendigheter, og returnerer nøyaktig det resultatet vi forventer.
2. **Hva skjer hvis dataene er tomme, feil eller mangler? (Feilhåndtering / Edge Cases)**
   * *Fokus:* Sikre at koden er robust og tåler uventede data (som `null` eller `undefined`) uten at hele applikasjonen krasjer.
3. **Snakker denne funksjonen med "verden utenfor"? (Avhengigheter / Sideeffekter)**
   * *Fokus:* Avdekke om funksjonen er helt selvstendig, eller om den er avhengig av eksterne rammeverk, ruting eller API-kall som vi må simulere (mocke/spionere på) i testen.
