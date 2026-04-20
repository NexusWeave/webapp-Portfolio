---
date: 2026-04-17T17:59:38.807Z
title: Arkitektonisk optimalisering av nettsiden
ingress: |
  Da en ny lansering skapte uforutsette feil, valgte jeg å gå tilbake til en eldre, men stabil versjon av nettsiden. Denne hadde imidlertid flere svakheter under overflaten som gjorde vedlikeholdet krevende. Gjennom en målrettet opprydding har jeg forvandlet denne versjonen til en pålitelig plattform. Ved å forenkle hvordan informasjon hentes og vises, er siden nå blitt både raskere og langt tryggere for absolutt alle brukerne.
status: |
  #### Dagens Aktiviteter

  * Identifiserte utfordringer i siste lansering og gjennomførte kontrollert tilbakerulling til forrige stabile versjon for å sikre drift.
  * Omgjorde verktøyet for innholdshenting til å håndtere datakartlegging universelt i selve hentefasen.
  * Separert ansvaret mellom byggeprosess og klientlogikk for å minimere belastningen på nettleseren.
  * Sentralisert alle navigasjonsrelaterte <abbr title="En teknikk innen utvikling for å redusere feilmarginer">typedefinisjoner</abbr> til en felles kilde for å forenkle prosjektets arkitektur.
  * Ryddet i mappestruktur og forent spredte filer til en <abbr title="SST - Eneste kilden for sannhet">Single Source of Truth</abbr>.
  * Utviklet dedikerte funksjoner for sentralisert håndtering av egenskaper i skjemafelt.
  * Løst visningsfeil for ikoner i ledetekster ved å løskoble skjemakomponenter fra ikon-komponenten.
  * Forbedret gjenbrukbarhet av komponenter for å redusere fremtidig utviklingstid.
  * Fjernet konflikter mellom server og nettleser ved å implementere <abbr title="En teknikk som brukes når koden skal bare kjøres i nettleser">`clientOnly`</abbr> for søkeverktøyet.
  * Fjernet utdaterte komponenter og finjustert <abbr title="en samling av kode">rammeverk</abbr>ets konfigurasjon for mer stabil oppstart.
  * Innført <abbr title="Verdier som automatisk oppdaterer seg når dataene endres">`computed`</abbr>-egenskaper for bildehåndtering for å sikre reaktiv og stabil visning.
  * Erstattet generiske `div`-elementer med beskrivende semantiske elementer for å styrke SEO og tilgjengelighet.
  * Sikret at nettsiden følger prinsipper for <abbr title=" UU - Praksis for å gjøre nettsider tilgjengelige for alle uavhengig av funksjonsevne">universelle utformingen</abbr> for brukere med hjelpemidler.

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
* Jeg fjernet utdaterte komponenter og La til <abbr title="En teknikk som brukes når koden skal bare kjøres i nettleser">`clientOnly`</abbr>-elementet for søkeverktøyet og endret instillingene for hvordan <abbr title="en samling av kode">rammeverk</abbr>et skulle reagere på komponentene for å stoppe konflikter som oppstår mellom server og nettleser.
* Jeg forbedret nettsidens semantikk ved å erstatte generiske `div`-elementer med beskrivende elementer.
* Jeg endret bildevariabler til mer presise betegnelser og innførte <abbr title="Verdier som automatisk oppdaterer seg når dataene endres">`computed`</abbr>-egenskaper for å stabilisere visningen. Dette sikrer at visuelle elementer håndteres mer effektivt av rammeverket, reduserer risikoen for visningsfeil og gjør koden lettere å vedlikeholde for andre utvikl

***

Arbeidet har resultert i en feilfri oppstart av hjemsiden der alle de gamle feilmeldingene i bakgrunnen er fjernet. Ved å flytte kartleggingen til hentingsfasen og rydde i den visuelle strukturen, har jeg forbedret ytelsen og forbedret flyten på nettsiden. Den forbedrede semantikken og <abbr title=" UU - Praksis for å gjøre nettsider tilgjengelige for alle uavhengig av funksjonsevne">universelle utformingen</abbr> gjør siden pålitelig for både søkemotorer og brukere med hjelpemidler. Viktigst av alt har jeg snudd en utfordrende situasjon til en mulighet for modernisering og læring en del av koden er nå logisk organisert at kunden har en plattform som er trygg, rask og enkel å videreutvikle.

Gjennom denne prosessen har jeg erfart at når man ruller tilbake til en versjon med teknisk etterslep, er det avgjørende å adressere grunnstrukturen med en gang fremfor å bare lappe på enkelte feil. Jeg har sett verdien av å kombinere hente- og kartleggingslogikken  som en <abbr title="SST - Eneste kilden for sannhet">Single Source of Truth</abbr> noe som gir en stabilitet man ikke oppnår når logikken er spredt. Ved å løskoble komponenter har jeg erfart hvordan man bygger pålitelige moduler som tåler fremtidige endringer.
