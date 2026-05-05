---
date: 2025-12-28T00:00:00.000Z
title: Sikring av Feilfri Navigasjon og Medlemsinformasjon i Nyhetsarkivet
ingress: |
  Dette arbeidet handler om å sørge for at organisasjonens digitale identitet virker korrekt. Ved å løse utfordringene med navigasjonen i nyhetsarkivet har jeg sikret at medlemmene faktisk finner informasjonen de leter etter, noe som bygger tillit og profesjonalitet. Samtidig har jeg ryddet i logikken på nettsiden slik at den blir enklere å vedlikeholde. Jeg har redusert teknisk etterslep for å sikre at budskapet når helt frem.
status: |
  #### Program informasjon
  ** Teknologi** - Nuxt, Vue.js, TypeScript
  ** Verktøy** - Nyhetsarkiv

  #### Dagens Aktiviteter

  * Finne ut hvorfor nyhetene ikke bytter side når man trykker på knappene.
  * Flytte kontrollen for sidebytte til en felles fil. Dette gjør at nettsiden får bedre kontroll og reagerer riktig hver gang noen prøver å bla i arkivet.
  * Legge inn en funksjonalitet som passer på knappene, slik at nye artikler dukker opp med en gang man trykker.
  * Gå gjennom koden og redusere støy. Dette gjør at systemet får nøyaktig beskjed om hva det skal gjøre, noe som hindrer at nettsiden oppfører uventet eller viser feil innhold.
  * Ved å rydde opp nå, sørger jeg for at det blir mye enklere og raskere å gjøre endringer på siden senere. Dette sparer utviklere for både tid og hodebry.

  #### Motivasjon & Energi - 10 / 10

  Dagen har vært så fin den kunne bli.
sources: ''
---

Jeg utviklet et nyhetsarkiv slik at besøkede kunne kunne finne eldre artikler. Under testingen av løsningen, oppdaget jeg at navigasjonen oppførte seg på en uventet måte. Når man trykket på knappen «Neste side», endret sidetallet seg, men artiklene på skjermen forble det samme. Selv om side tallet forandret seg.

Oppgaven var å sikre at innholdet oppdaterte seg når brukere navigerte til neste eller forrige side. For organisasjonen er dette viktig, om besøkende ikke finner artiklene de leter etter, mister brukerene interessen og organisasjonen kan miste trafikk og fremstå som uprofesjonelle. Jeg hadde derfor som en oppgave om å koble sammen logikken, slik at siden alltid viser riktig informasjon til riktig tid.

* Jeg flyttet logikken for sidebytte til en felles komponent, dette gir oss full kontroll over side navigeringen og komponentet kan sende tilbake en oppdatering når besøkede reduserer elller øker side telleren.
* Det ble installert en lytter som følger med på hvilken knapp som er trykket på, slik at systemet reagerer umiddelbart.
* la til typesikkerhet for å rydde opp i hvordan dataene håndteres og sikre at systemet alltid får korrekt informasjon, dette fjerner usikkerhet og skjulte feil i koden.

Besøkede kan nå navigere feilfritt gjennom hele arkivet til organisasjonen, noe som sikrer at innholdet deres blir lest, kunden kan bli trygg på at medlemmene sine får oppdatert informasjon om arbeidet organisasjonen gjør. Over tid vil dette gjøre det enklere og raskere for utviklere å vedlikeholde siden. Systemet er nå en pålitelig løsning som hindrer at organisasjonen fremstår som uprofesjonell på grunn av tekniske mangler.
