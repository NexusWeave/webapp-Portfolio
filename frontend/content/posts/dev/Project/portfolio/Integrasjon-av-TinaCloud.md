---
tags:
  - dev-journey
date: 2025-11-05T00:00:00.000Z
title: Separering av kode og innhold i et moderne prosjekt
ingress: |
  Ved å skille nettsidens tekniske kode fra selve tekstene, har jeg utviklet et system som er både enklere å vedlikeholde og tryggere å bruke. Denne loggen beskriver hvordan jeg løste utfordringer med mappestrukturer for å sikre at bilder og innhold alltid flyter feilfritt. Resultatet er en stabil plattform som er kalr for fremtidig vekst og enklere samarbeid.
parade: ''
star: |
  #### Prosjektanalyse

  For å forenkle innholdsstyringen i porteføljen min, la jeg til et redaktør panel kalt <abbr title= "Headless Content Management System er uavhengig av visuell teknologi som brukes på nettsiden">**TinaCMS**</abbr>. Utfordringen lå i prosjektets struktur, hvor <abbr title = "visuelle teknologien"> nettsiden </abbr> lever i en undermappe som Dette skapte synkroniserings utfordringer med <abbr title="Tina Cloud er bindleddet som kontrollerer og kobler sammen redaktørpanelet med innholdet">**Tina Cloud**</abbr>, som i utgangspunktet ikke klarte å lese innholdsgrenen hvor dokumentasjonen og tekstene lagres.
  Målet var å etablere en effektiv og feilfri flyt mellom redaktørpanelet og selve kildekoden til nettsiden. Dette krevde oppsettsmetode for hvordan panelet tolker mappestrukturen min. I tillegg måtte jeg sikre at alle filer, bilder og ressurser ble lastet korrekt, selv om de ligger lagret i ulike undermapper i prosjektet.

  Jeg utførte en systematisk feilsøking og rekonfigurering:

  * Jeg bekreftet først at digitale "nøkler og adgangskort" fungerte som de skulle. Dette gjorde jeg for å avklare om utfordringene skyldtes manglende tilgang, eller om det var selve koblingen til riktig mappe i GitHub som var utfordringen.
  * I oppsettet hos leverandøren la jeg inn stien til konfigurasjonsfilene. Dette tvinger <abbr title="TinaCMS">bindeleddet</abbr> å lete på riktig sted i prosjektet.
  * Jeg korrigerte stien for den såkalte "publicFolder". Dette løste utfordringen med brutte bildelenker i redaktørpanelet ved å peke systemet direkte til mappen hvor bildene faktisk ligger lagret.
  * Underveis identifiserte og skilte jeg ut urelaterte tilkoblingsfeil som ikke hadde med selve panelet å gjøre. Dette sikret at feilsøkingen forble fokusert, effektiv og målrettet.

  Det som har blitt lagt til har resultert i en pålitelig arkitektur som følger en struktur som tåler vekst. Ved å konfigurere systemet for underkataloger er løsningen nå fleksibel nok til å tåle fremtidige strukturelle endringer uten behov for omfattende rekonfigurering. Dette danner et grunnlag for videre vekst i prosjektet.

  Gjennom å dedikere en gren i github for dokumentasjon og innholdsproduksjonen, har jeg etablert en effektiv arbeidsflyt basert på prinsippet om en <abbr title = "Dette prinsippet handler om å skille innholdet fra kodebasen">"**Decoupled Workflow**"</abbr>. Dette gir en trygghet i utviklingsløpet, da innhold nå kan redigeres uten risiko for å påvirke eller ødelegge den underliggende applikasjonslogikken.

  Til slutt har arbeidet løftet den tekniske kvaliteten i hele prosjektet. Ved å fjerne feilmeldinger i konsollen og optimalisere ressurslastingen, sikres en rask og stabil brukeropplevelse i redaktørpanelet. Resultatet er en plattform hvor alle visuelle ressurser fungerer intakt, og hvor skillet mellom teknologi og innhold er fullstendig optimalisert.
sources: ''
---

#### **Dagens Aktiviteter**

* Integrerte <abbr title="Headless Content Management System er uavhengig av visuell teknologi som brukes på nettsiden">TinaCMS</abbr> for å forenkle styringen av dokumentasjon og innhold.
* Bekreftet at digitale "nøkler og adgangskort" fungerte korrekt for å utelukke autentiseringsfeil.
* Løste utfordringer med at <abbr title="Den visuelle teknologien">nettsiden</abbr> ligger i undermapper ved å definere nøyaktige stier for konfigurasjonsfiler hos <abbr title="Tina Cloud er bindeleddet som kontrollerer og kobler sammen redaktørpanelet med innholdet">leverandøren</abbr>.
* Korrigerte banen for "publicFolder", som fikset brutte bildelenker og sørget for at alle ressurser vises korrekt i panelet.
* Identifiserte og skilte ut urelaterte tilkoblingsfeil for å sikre en målrettet og effektiv prosess.
* Dedikerte en egen gren i GitHub for dokumentasjon, som muliggjør en <abbr title="Dette prinsippet handler om å skille innholdet fra selve kodebasen">"Decoupled Workflow"</abbr> der innhold kan redigeres uten risiko for kildekoden.
* Fjernet feilmeldinger i konsollen og optimaliserte ressurslastingen for en raskere og mer stabil brukeropplevelse.

#### **Motivasjon** & **Energi** - **10** / **10**

Dagen er så fin den kan bli !
