---
date: 2026-04-30T13:25:36.739Z
title: Systemforbedringer
ingress: ''
status: ''
sources: ''
---

#### Redaksjonell Kvalitet og Innholdsarkitektur

Flere blogginnlegg innen DevOps temaet hadde for mange It begreper og manglet struktur, dette gjorde det tungt for andre å lese blogginnleggene. Enkelte logger var også plassert i feil mappe, dette gjorde at informasjon flyten for leseren uoversiktlig.
Målet var å strukturere loggene og forenkle leser vennligheten for andre lesere.

* Jeg reviderte titler og ingresser for å forenkle språket for leseren og reviderte ingresser for sette en standard på 425 +- tegn.
* Jeg la til `<abbr>`-elementer for å gi umiddelbar kontekst til tekniske akronymer.
* Jeg flyttet logger til dedikerte emnemapper, for å forbedre strukturen på loggene.
  Resultatet forbedret innholdsuttrykket med økt lesbarhet og en intuitiv navigasjonsstruktur. Jeg erfarte at innholdsarkitektur er like viktig all annen arkitektur, hvis leseren ikke forstår begrepet eller finner frem, faller verdien av de tekniske loggene bort.

***

#### Brukergrensesnitt og Semantisk Struktur

Loggvisningen brukte ukorrekte tittel elementer som`<h1>` som bryter med det semantiske hierarkiet, og ubrukte footere skapte utfordringer for prosjektet.
Målet mitt er å optimalisere leseopplevelsen og sikre at siden følger industrielle standard for tilgjenglighet, ved å rydde i <abbr title="den grafiske plasseringen og organiseringen av tekst, bilder og elementer på en flate, som en nettside, bok eller avis">layouten</abbr>.

* Jeg byttet ut overskriften fra`<h1>` til `<h2>` for å skape korrekt dokumentstruktu
* Jeg fjernet overflødige komponenter som `Footer.vue` fra artikler, som løste en utfordring i koden med  <abbr title ="en feil i koden som betyr at koden prøver å bruke noe som ikke er definert">`undefined object`</abbr>, denne rettingen gir et renere design.

Resultatet er en fokusert leseopplevelse med forbedret <abbr title ="Universell Utforming - Å forme noe slik at flest mulig, kan benytte seg av tjenesten, uten behov for tilpasning">UU</abbr>-score  og en ryddigere visuell logg. Jeg erfarte at «less is more» i et brukergrensesnitt ved å fjerne elementer som ikke gir verdi, øker man brukerens fokus på hovedinnholdet.

***

#### Teknisk Refaktorering og Skalerbarhet

Etter at mappestrukturen for loggene hadde blitt forandret, oppsto det en feil i navigasjonen, som en konsekvens av at kartleggingsfunksjonaliteten benyttet seg av utdaterte stier. Samtidig inneholdt komponenten for kodeaktivitet, hadde en del ubrukt kode, som bare tok opp plass.
Målet var å oppdatere stiene i kartleggingsfunksjonaliteten, for å gjenopprette navigasjonen , samt fjerne ubrukt kode ifra kodeaktivitets komponenten

* Oppdaterte kartleggingslogikken for logger med de korrekte stiene til loggene.
* Jeg optimaliserte ytelsen til kodeaktivitets komponentet med `computed properties`,ga meg selv en renere kode.
* La til støtte for katalog-ikoner i sass koden for visualisere hint for etiketter.

Endringene resulterte i en pålitelig kartleggingsfunksjonalitet som leverer korrekte lenker. Systemet er nå pålitelig, og fjerningen av ubrukt kode har gjort komponenten mer lettlest og effektiv. Jeg erfarte hvor sårbare automatiserte stisystemer er for strukturelle endringer. Ved å rydde i utdatert kode samtidig som feil rettes, forhindrer jeg at teknisk etterslep skaper uforutsigbare feil i fremtiden.

***

#### Systemvedlikehold og Utvikleropplevelse (DX)

Kodebasen hadde over tid samlet opp ubrukt kode og ubrukte imports.
Målet var å effektivisere utviklingsmiljøet og fjerne teknisk etterslep for å redusere friksjon i fremtidig utvikling.

* Jeg ryddet bort ubrukte `imports` og sanerte koden i Vue-komponenter.

En lettere kodebase  som gjør feilsøking og videreutvikling betydelig mer effektivt. God hygene i kodebasen er ikke bare estetisk; det forenkler hverdagen til utvikleren og gjør det enklere å holde oversikt i applikasjonen.
