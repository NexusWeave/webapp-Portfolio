---
date: 2026-06-10T07:57:30+02:00
title: opprydding i dokumentasjon og arkitektur
ingress: |
  For å sikre et solid fundament fremover, har det blitt tatt en skikkelig opprydding i både dokumentasjonen og mappestrukturen i lumina-sass. Ved å fjerne utdatert innhold og tette gapet mellom teksten og den faktiske koden, er biblioteket nå langt enklere å vedlikeholde. Det betyr at koden raskt kan gjenbrukes i andre prosjekter uten unødvendig forvirring.
status: |
  #### Program informasjon
  **Teknologi** - Sass, Node.js, Markdown
  **Verktøy** - npm, JavaScript
  **Prinsipper** – <abbr title="Single source of truth er prinsippet om at informasjon skal lagres på ett sted.">Single source of truth</abbr>, <abbr title="Clean code er prinsippet om å skrive kode som er lett å lese og forstå.">Clean code</abbr>, <abbr title="Single responsibility principle er prinsippet om at en modul skal ha ett ansvarsområde.">Single Responsibility Principle</abbr> og <abbr title="Don't repeat yourself er prinsippet om å unngå duplisering av logikk eller informasjon.">Don't repeat yourself</abbr>

  #### Dagens Aktiviteter
  * Skrev om og moderniserte 19 Markdown-filer for å sikre at all nødvendig informasjon er samlet lett tilgjengelig på ett sted.
  * Ryddet opp i den rotete mappestrukturen ved å fjerne utdaterte mapper og sette opp enklere, mer direkte eksporter i prosjektet.
  * Gjorde en omstrukturering av koden ved å flytte mixins for å rydde opp i hvem som har ansvaret for hva, og løste flere navnekræsj underveis.
  * Utviklet helt nye tester for å være sikker på at alt fungerer akkurat som det skal når modulene hentes inn i nye prosjekter.

  #### Motivasjon & Energi - 10 / 10
  Det gir en mestringsfølelse å få ryddet skikkelig opp i gammelt rot. Nå føles biblioteket utrolig mye lettere å jobbe med og bygge videre på.
---

Biblioteket hadde over tid samlet opp en del rot, og trengte en skikkelig opprydding både i hvordan teksten var skrevet og i selve koden. Dokumentasjonen var litt tunglest med for mange filer som lå strødd rundt, og prosjektstrukturen gjorde det unødvendig vanskelig å skjønne hvordan modulene skulle brukes ved integrasjon i nye prosjekter.

Hensikten for dagen var å heve kvaliteten på språket i all dokumentasjon, slette mapper som ikke lenger var i bruk, og samtidig lage en helt trygg og sikker måte å teste at alle eksportene fra biblioteket faktisk fungerer i praksis.

- Gikk systematisk gjennom og skrev om 19 Markdown-filer til et mye mer naturlig engelsk, samtidig som unødvendige tall i overskriftene ble fjernet for å få på plass en tydelig Single source of truth for all informasjon.
- Slettet den gamle `modules/`-mappen som bare skapte forvirring, og satte heller opp enklere og mer direkte eksporter i `package.json` for å følge retningslinjene til Clean code.
- Flyttet `assert-contrast`-mixinen over til `mix`-modulen der den egentlig hører hjemme, for å passe mye bedre overens med reglene i Single Responsibility Principle.
- Skrev en helt egen test i `test/module-test.js` for å sjekke at alle modulene faktisk er tilgjengelige og kan hentes inn uten feilmeldinger.
- Fikset et navnekræsj i `map`-modulen som plutselig dukket opp under testingen, slik at koden nå følger Don't repeat yourself-prinsippet uten at ting blir dobbelt opp.

Prosjektet fremstår nå langt mer profesjonelt, og den ryddige arkitekturen gjør at koden kan tas i bruk umiddelbart uten å måtte bruke unødvendig mye tid på å skjønne oppsettet. Dette ble erfart som en massiv forbedring for vedlikeholdet fremover, som en konsekvens av at både språket og koden endelig er skikkelig samkjørt og testet.
