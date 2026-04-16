---
date: 2026-03-24T00:00:00.000Z
title: Modernisering for feilfri drift og enklere videreutvikling
ingress: |
  Jeg har gjennomført en modernisering av prosjektet [SosialInnovasjon](https://sosent.no) for å sikre en raskere og mer stabil brukeropplevelse. Ved å rydde i systemets grunnmur har jeg fjernet hindringer som tidligere skapte visuelle feil og treghet. Resultatet er en profesjonell digital flate hvor informasjon alltid vises korrekt. Dette sparer meg for vedlikehold og gjør det enklere å videreutvikle siden i tråd med bedriftens behov i fremtiden.
status: |
  #### Dagens Aktiviter 

  * Jeg har skrevet om logikken som styrer artikler, forfattere og arrangementer. Dette betyr at systemet nå automatisk sorterer arrangementer etter dato og kobler riktig forfatter til riktig artikkel, noe som sparer manuelt arbeid og sikrer riktig informasjon.
  * Jeg har lagt inn tekniske sikkerhetsmekanismer (fallbacks) som hindrer at nettsiden oppleves som om den er  tom eller krasjer dersom innholdet bruker litt tid på å laste. Dette gir en rask brukeropplevelse uten avbrudd.
  * Jeg har fjernet store mengder utdatert og ubrukt kode. Samtidig har jeg rettet opp i hvordan systemet gjenkjenner  medlemskap  og  partnerskap , slik at kunden kan legge ut sine medlemmer på nettsiden sin.
  * Ved å rydde i systemets kjerne har jeg sørget for at dataene som flyter gjennom nettsiden er mer nøyaktige. Dette gjør det enklere for foreningen å rulle ut nye artikler i fremtiden uten å støte på uventede feil.

  #### Motivasjon & Energi 9 / 10 

  Dagen har vært så fin den kunne bli, selv om det har vært litt små irriterende med uforutsigbare feil.
sources: ''
---

Prosjektet tekniske fundament hadde over tid blitt oppdelt. Forskjellige deler av siden brukte ulike metoder for å vise frem innhold, som artikler, forfattere og arrangementer. Dette gjorde siden tyngre å laste, økte risikoen for småfeil i visningen (som feil datoformater), og gjorde det tidkrevende for selv små endringer uten at noe annet ble påvirket.

Målet var å rydde opp i nettsidens logikk for å sikre en mer stabil og profesjonell brukeropplevelse. Oppgaven innebar å standardisere hvordan legoklossene brukes, forenkle logikken bak visning av innhold, og fjerne gammel "gjeld" (ubrukt kode) som bare tok opp plass.

Jeg har gjennomført en omfattende forbedring av nettsidens kjerne:

* Jeg har skrevet om logikken for hvordan artikler, forfattere og arrangementer hentes frem. Nå blir for eksempel arrangementer automatisk sortert etter dato, og forfatterprofiler kobles alltid riktig sammen med sine artikler.
* Jeg har lagt inn sikkerhetsmekanismer (fallbacks) som gjør at siden ikke "krasjer" eller ser tom ut hvis et bilde eller en tekst bruker litt lang tid på å laste.
* Jeg har fjernet utdatert og ubrukt kode, samt ryddet i hvordan systemet gjenkjenner medlemskap og partnerskap, slik at de blir vist på en sikkelig måte for brukere.

Gjennom denne omgjøringen har jeg skapt en mer profesjonell og driftssikker nettside. Kundene og brukerne opplever nå en raskere side med korrekt informasjon og en logisk flyt, noe som bygger tillit og reduserer frustrasjon. For foreningen  betyr dette at de har gått fra et komplekst og sårbart system til en ryddig og pålitelig plattform. Dette reduserer også fremtidige vedlikehold og gjør at jeg kan rulle ut nye funksjoner mye raskere enn før, ettersom jeg nå jobber med standardiserte byggeklosser fremfor å drive brannslukking av småfeil. Datakvaliteten sikrer også at viktig informasjon, som **medlemsfordeler** og **partnerskap**, alltid vises korrekt til de riktige målgruppene.