---
date: 2026-04-30T17:59:38.807Z
title: Arkitektonisk optimalisering av nettsiden
ingress: ''
status: |
  #### Dagens Aktiviteter

  #### Motivasjon & Energi 10 / 10
sources: ''
---

Etter at en nylig lansering førte uforutsette feil på kundens nettside, ble det nødvendig å rulle tilbake til en tidligere versjon som fungerte. Denne eldre versjonen  hadde tekniske etterslep og utfordringer som påvirket brukeropplevelsen, men var stabil. Versjonen hadde mange feilmeldinger i bakgrunnen, og en lite oversiktlig kodestruktur som gjorde det tidkrevende å rette de gamle feilene uten å introdusere nye feil.
Hovedmålet var å raskt stabilisere den eldre versjonen etter tilbakerullingen, samtidig som jeg fjernet teknisk støy og etterslep". Jeg ønsket å skape en flytende brukeropplevelse og bygge en moderne grunnmur som gjorde det trygt og effektivt å videreutvikle siden uten at den tekniske etterslepet hindret fremdriften.

* Jeg omgjorde verktøyet som henter innholdet til kunden til å håndtere kartleggingen av innholdet universelt og direkte. Ved å integrere kartleggingslogikk i selve hentefasen, da returneres ferdig formatert data til komponentene. Dette fjernet behovet for manuell kartlegging i brukergrensesnittet og minimerer belastningen på nettleseren, og separer ansvaret mellom klient og server på en ryddig måte.
  Jeg samlet alle navigasjonsrelaterte typedefinisjoner til en felles kilde. Ved å rydde opp i mappestrukturen og forene filene, forenklet jeg prosjektets arkitektur og skapte et felles utgangspunkt for alle navigasjonskomponenter.
* Jeg La til dedikerte funksjoner for kontroll av inndatafelt for å forbedre valideringen og ryddet opp skjema komponentene og løste en utfordring som hindret ikoner i å vises.
* Jeg forenklet logikken ved å la ikoner eie sin egen styling internt, noe som koblet dem fri fra andrekomponenter og forbedret gjenbrukbarheten.
* Jeg fjernet den foreldede `UtilsTags`-komponenten og La til `clientOnly` for informasjonssøkeverktøyet og endret instillingene for hvordan rammeverket skulle reagere på komponentene for å stoppe konflikter som oppstår mellom server og nettleser.
* Jeg forbedret sidens semantikk ved å erstatte generiske `div`-elementer med beskrivende `sections`.
* Jeg endret bildevariabler til det mer presise navn og la til `computed`-egenskaper for å stabilisere visningen.

***

Arbeidet har resultert i en feilfri oppstart av hjemsiden der alle de gamle feilmeldingene i bakgrunnen er fjernet. Ved å flytte databehandlingen til hentingsfasen og rydde i den visuelle strukturen, har siden fått bedre ytelse og en mer responsiv følelse for sluttbrukeren. Den forbedrede semantikken og universelle utformingen (UU) gjør siden mer pålitelig for både søkemotorer og brukere med hjelpemidler. Viktigst av alt har jeg snudd en utfordrende situasjon til en mulighet for modernisering; koden er nå så oversiktlig og logisk organisert at kunden har en plattform som er trygg, rask og enkel å videreutvikle.

Gjennom denne prosessen har jeg erfart at når man må rulle tilbake til en versjon med teknisk etterslet, er det avgjørende å adressere grunnstrukturen med en gang fremfor å bare "lappe" på enkelte feil. Jeg har sett verdien av sentralisert transformasjonslogikk og en "Single Source of Truth" for tekniske typer, som gir en stabilitet man ikke oppnår når logikken er spredt. Gjennom løskobling av komponenter (som ikoner og ankere) har jeg erfart hvordan man bygger pålitlige moduler som tåler fremtidige endringer. Til slutt bekreftet arbeidet at teknisk kvalitet i detaljene – fra arkitektur til navngivning – er den beste forsikringen mot uforutsette feil ved fremtidige lanseringer.
