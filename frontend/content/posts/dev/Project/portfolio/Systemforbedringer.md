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

Den eksisterende logikken i `mapBlogPost.ts` og `Progress.vue` var lite fleksibel og basert på utdatert rangeringsmetodikk, noe som hindret effektiv skalering av innholdstyper.
**Oppgave:** Modernisere innholdshåndteringen ved å innføre mer granulær logikk og øke typesikkerheten i frontend.
**Handling:** \* Utvidet mapping-logikken til å skille mellom 'tag' og 'dir' (kataloger).

* Refaktorerte `Progress.vue` med computed properties for bedre ytelse og renere kode.
* La til støtte for katalog-ikoner i `Anchor.vue` for visuelle hint i navigasjonen.
  **Resultat:** En robust og skalerbar arkitektur som håndterer komplekse metadata automatisk uten å øke vedlikeholdskostnadene.
  **Læring:** Jeg så verdien av å bruke typesikkerhet og computed properties tidlig; det gjør kodebasen mer selvdokumenterende og reduserer risikoen for logiske feil ved senere utvidelser.

***

#### Systemvedlikehold og Utvikleropplevelse (DX)

**Situasjon:** Kodebasen hadde over tid samlet opp "død kode" og ubrukte imports, og prosjektoppsettet i VSCode var ikke optimalisert for rask navigering mellom hyppig brukte komponenter.
**Oppgave:** Effektivisere utviklingsmiljøet og fjerne teknisk gjeld for å redusere friksjon i fremtidig utvikling.
**Handling:** \* Ryddet bort ubrukte imports og sanerte koden i Vue-komponenter.

* Konfigurerte VSCode-workspace med direkte tilgang til sentrale filer som `Form`.
  **Resultat:** En lettere kodebase og et raskere arbeidsverktøy som gjør feilsøking og videreutvikling betydelig mer effektivt.
  **Læring:** God "husvask" i kodebasen er ikke bare estetisk; det fjerner kognitiv belastning for utvikleren og gjør det enklere å holde oversikt over applikasjonens faktiske avhengigheter.
