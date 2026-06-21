---
date: 2026-06-21T09:25:00.000Z
title: Konfigurering av Vitest testmiljø og universell utforming med Axe
ingress: |
  I arbeidet med å etablere automatisert testing var det behov for å sette opp et korrekt testmiljø for Nuxt og enhetstester. Siden standard testing mangler støtte for virtuelle moduler som `#imports` og Vue-komponenter, krevdes det et tilpasset oppsett i vitest.config.ts. Løsningen ble å konfigurere et asynkront testmiljø og samtidig integrere automatiserte tilgjengelighetsrevisjoner for å erstatte den eldre semantiske HTML-sjekkeren.
status: |
  #### Program informasjon
  **Teknologi** - Nuxt.js, Vitest
  **Verktøy** - vitest-axe, jsdom
  **Prinsipper** - Universell utforming, Testdrevet utvikling
  *Skrevet i samarbeid med AI - Gemini Flash (Low)*

  #### Dagens Aktiviteter
  * Etablere et isolert testmiljø for <abbr title="Et javascript bibliotek">Nuxt</abbr>-komponenter og enhetstester.
  * Erstatte den statiske semantiske valideringstesten med automatiserte tilgjengelighetsrevisjoner.
  * Konfigurere asynkron lasting av .vue-filer i Vitest.

  #### Motivasjon & Energi - 5 / 10
  Opplever at hode er anspent, noe som trekker ned på energien jeg har, men ellers er dagen er så fin den kan bli.
--- 

I arbeidet med å konfiguere automatisert testing, innså jeg at testmiljøet ikke var korrekt i henhold til [Nuxt dokumentasjonen](https://nuxt.com/docs/4.x/getting-started/testing), dette utløste behovet for å rette opp testmiljøet som følger standarden for Nuxt og enhetstester. Som en konsekvens av at standard testing mangler støtte for virtuelle moduler som `#imports` og Vue-komponenter, kreves det et tilpasset oppsett i `vitest.config.ts`. Løsningen ble å konfigurere et asynkront testmiljø og samtidig integrere automatiserte tilgjengelighetsrevisjoner for å erstatte den eldre semantiske HTML-sjekkeren.

Hensikten var å lage et stabilt, pålitelig og korrekt isolert testmiljø med Vitest i Nuxt, samt implementere automatiserte tilgjengelighetsrevisjoner for alle nettsider.

* Opprettet en prosjektbasert teststruktur i `vitest.config.ts` ved bruk av <abbr title="En hjelpefunksjon for å definere Nuxt-spesifikke testmiljøer i Vitest">defineVitestProject</abbr> for å separere Node-enhetstester fra Nuxt-avhengige tester.
* Konfigurerte <abbr title="En JavaScript-implementering av nettstandarder for bruk med Node.js">jsdom</abbr> som det kjørende DOM-miljøet for Nuxt-testprosjektet.
* Integrerte <abbr title="Et verktøy for tilgjengelighetstesting integrert med Vitest">vitest-axe</abbr> som erstatning for den tidligere semantiske HTML-sjekkeren.
* Antigravity-cli la til en ny testsuite `accessibility.test.ts` som monterer og sjekker alle sider for tilgjengelighetsavvik ved å simulere korrekte rammeverklandemerker.

Konfigurasjonen ble oppdatert og testene kjører nå feilfritt. Personlig erfarte jeg at `Vitest` prosjektkonfigurasjoner må løses asynkront i `vitest.config.ts` for å sikre at Nuxt-miljøet og Vue-kompilatorer lastes inn korrekt før importanalyse starter. Dette sikrer at fremtidige endringer ikke bryter retningslinjer for <abbr title="Universell utforming av IKT-løsninger">universell utforming</abbr>, som stabiliserer nettsiden, forbedrer kvaliteten på nettsiden og gjør nettsiden søkbar.
