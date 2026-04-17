---
date: 2026-04-30T17:59:38.807Z
title: Arkitektonisk optimalisering av nettsiden
ingress: ''
status: |
  #### Dagens Aktiviteter

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli !
sources: ''
---

Etter at en 2 uker gammel lansering førte uforutsette feil på kundens nettside, ble det nødvendig å rulle tilbake til en tidligere versjon som fungerte. Denne eldre versjonen  hadde <abbr title="ustrukturert kode">tekniske etterslep</abbr> og utfordringer som påvirket brukeropplevelsen, men var stabil. Versjonen hadde mange feilmeldinger i bakgrunnen, og en uoversiktlig kodestruktur som gjorde det tidkrevende å rette de gamle feilene uten å introdusere nye feil.
Hovedmålet var å raskt stabilisere den eldre versjonen etter tilbakerullingen, samtidig som jeg fjernet noe av det teknisk etterslepet. Ønsket jeg å skape en flytende brukeropplevelse og forbedre det tekniske bilde  som forenkler videreutviklingen av nettsiden uten at det tekniske etterslepet forhindrer fremdriften.

* Jeg omgjorde verktøyet som henter innholdet til nettsiden for å håndtere kartleggingen av innholdet universelt og direkte. Ved å integrere kartleggingslogikken i selve hentefasen, returneres det en ferdig formatert data til <abbr title="En byggeklosse">komponentene</abbr>. Dette separerer ansvaret mellom logikken som kjører i nettleseren og logikken som kjører i byggeprosessen på en ryddig måte og automatiserer kartleggingen og minimaliserer belastningen på nettleseren, for å unngå en uventet oppførsel.
* Jeg samlet alle navigasjonsrelaterte <abbr title="En teknikk innen utvikling for å redusere feilmarginer">typedefinisjoner</abbr> til en felles kilde. Ved å rydde opp i mappestrukturen og forene filene, forenklet jeg prosjektets arkitektur og skapte et felles utgangspunkt for alle navigasjonskomponenter.
* Jeg utviklet dedikerte funksjoner for å håndtere egenskaper i skjemaene. Ved å sentralisere logikken for svarfeltene, sikret jeg at de fremtidige skjemaene på nettsiden nå har en dynamisk håndtering av egenskapene. Som gjør det enklere å gjenbruke det samme feltet flere ganger.
* Jeg ryddet opp `skjema-komponentene` og løste en utfordring som hindret ikoner i å vises i ledetekstene. Ved å å koble fra alle komponenter fra `ikon-komponenten`, dette forbedrer gjenbrukbarheten og reduserer utviklingstid.
* Jeg fjernet utdaterte komponenter og La til <abbr title="En teknikk som brukes når koden skal bare kjøres i nettleser">`clientOnly`</abbr>-elementet for søkeverktøyet og endret instillingene for hvordan rammeverket skulle reagere på komponentene for å stoppe konflikter som oppstår mellom server og nettleser.
* Jeg forbedret nettsidens semantikk ved å erstatte generiske `div`-elementer med beskrivende elementer.
* Jeg endret bildevariabler til mer presise betegnelser og innførte <abbr title="Verdier som automatisk oppdaterer seg når dataene endres">computed-egenskaper</abbr> for å stabilisere visningen. Dette sikrer at visuelle elementer håndteres mer effektivt av rammeverket, reduserer risikoen for visningsfeil og gjør koden lettere å vedlikeholde for andre utvikl

***

Arbeidet har resultert i en feilfri oppstart av hjemsiden der alle de gamle feilmeldingene i bakgrunnen er fjernet. Ved å flytte databehandlingen til hentingsfasen og rydde i den visuelle strukturen, har siden fått bedre ytelse og en mer responsiv følelse for sluttbrukeren. Den forbedrede semantikken og <abbr title=" UU - Praksis for å gjøre nettsider tilgjengelige for alle uavhengig av funksjonsevne">universelle utformingen</abbr> gjør siden mer pålitelig for både søkemotorer og brukere med hjelpemidler. Viktigst av alt har jeg snudd en utfordrende situasjon til en mulighet for modernisering; koden er nå så oversiktlig og logisk organisert at kunden har en plattform som er trygg, rask og enkel å videreutvikle.

Gjennom denne prosessen har jeg erfart at når man ruller tilbake til en versjon med teknisk etterslep, er det avgjørende å adressere grunnstrukturen med en gang fremfor å bare lappe på enkelte feil. Jeg har sett verdien av sentralisert transformasjonslogikk og en Single Source of Truth for tekniske typer, som gir en stabilitet man ikke oppnår når logikken er spredt. Gjennom løskobling av komponenter har jeg erfart hvordan man bygger pålitlige moduler som tåler fremtidige endringer. Til slutt bekreftet arbeidet at teknisk kvalitet i detaljene – fra arkitektur til navngivning – er den beste forsikringen mot uforutsette feil ved fremtidige lanseringer.
