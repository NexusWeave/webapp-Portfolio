---
date: 2026-07-20T12:34:00.000Z
title: Opprette enhetstester for dato- og layoutkomponenter
ingress: |
  Det oppstod et behov for å sikre stabiliteten til datoformateringen og layout-strukturen på nettstedet ved hjelp av automatiserte tester. Dette behovet oppstod som en konsekvens av hyppige oppdateringer i grensesnittet, noe som økte risikoen for visuelle feil og ødelagte koblinger. Opprettelse av tester ble igangsatt for å fange opp slike regresjoner tidlig i utviklingsløpet.
status: |
  #### Programinformasjon
  *Skrevet i samarbeid med AI - Gemini 3.5 Flash*
  **Verktøy** - Git, VS Code, Vitest
  **Teknologi** - Vue 3, Nuxt, Vitest, TypeScript
  **Prinsipper** - Enhetstesting, Type-sikkerhet, Regresjonstesting

  #### Dagens aktiviteter
  * Opprette enhetstester for dato- og årskomponenter.
  * Opprette enhetstester for header- og footerkomponenter.
  * Tilrettelegge gjenbrukbar mock-data for referansetester.
  * Rette variabelbinding med feilaktig casing i topplinjen.
  * Eksportere grensesnittet for dato-props til testmiljøet.

  #### Motivasjon & Energi - 10 / 10
  Robust testdekning på kjernekomponenter gir økt trygghet under videreutvikling og hindrer visuelle feil.
---

Det ble oppdaget at enhetstestene for komponenter for layout-strukturen ikke var dekket ved hjelp av <abbr title="programvare som verifiserer funksjonalitet automatisk">automatiserte tester</abbr>. Som øker risikoen forvisuelle feil og ødelagte koblinger. Opprettelse av testene for brukergrensesnittet ble igangsatt for å fange opp slike <abbr title="uforutsette feil som oppstår i eksisterende kode etter oppdateringer">regresjoner</abbr> tidlig i utviklingsløpet.

Hensikten var å opprette <abbr title="Testing av isolerte kodedeler som funksjoner eller enkeltkomponenter">enhetstester</abbr> for dato- og <abbr title="strukturelle byggeklosser i brukergrensesnittet">layoutkomponenter</abbr>, samt rette opp i avdekket <abbr title="casing-feil - avvik i bruk av store og små bokstaver">casing-feil</abbr> og manglende <abbr title="type-eksport - tilgjengeliggjøring av typedefinisjoner for andre moduler">type-eksport</abbr> for å sikre at byggingen blir feilfri.

* Opprette nye <abbr title="testing av isolerte kodedeler som funksjoner eller enkeltkomponenter">enhetstester</abbr> for datokomponentene for å verifisere korrekt formatering av publiserte og oppdaterte datoer.
* Opprette strukturerte tester for layoutkomponenter for å sikre at navigasjonslenker, stilklasser og strukturelle tagger rendres riktig.
* Tilrettelegge gjenbrukbar <abbr title="simulerte testdata som erstatter ekte data under kjøring av tester">mock-data</abbr> for referanser i en egen testdatafil for å mate testene med stabile objekter.
* Korrigere en <abbr title="kobling av programvarevariabler til mal-elementer">variabelbinding</abbr> med feilaktig casing i topplinjen som ble avdekket under testing.
* Eksportere grensesnittet for dato-<abbr title="egenskaper som sendes fra en foreldrekomponent til en barnekomponent">props</abbr> slik at filen blir tilgjengelig for testmiljøet.

De nye enhetstestene vertifiserer komponenter som topplinjen og datovisningen fungerer feilfritt ved fremtidige endringer. Ved å avdekke bindingfeilen i mal-filen ble det tydeliggjør automatisert testing sparer tid under feilsøking. Erfaringene viser at testing av asynkrone komponenter i <abbr title="Vue-basert rammeverk for ruting og rendering">Nuxt</abbr> krever funksjoner som <abbr title="testverktøy for å rendre asynkrone Nuxt-komponenter isolert">mountSuspended</abbr> for å simulere riktig kontekst. Videre viser erfaringen at gjenbrukbare <abbr title="TypeScript-definisjoner som validerer datastrukturer under kompilering">typer</abbr> må eksporteres for at testkjøreren skal kunne kompilere testfilene uten feil.
