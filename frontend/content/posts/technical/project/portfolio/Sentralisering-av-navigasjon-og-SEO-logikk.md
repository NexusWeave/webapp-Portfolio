---
date: 2026-04-17T10:29:04.937Z
title: Sentralisering av navigasjon og SEO-logikk
ingress: ''
status: |
  #### Dagens Aktiviteter

  * Utviklet et system som genererer menyer automatisk basert på ruter, noe som fjerner behovet for manuelt vedlikehold.
  * Samlet ansvar for sidetitler og metadata i én felles modul for bedre kontroll og konsistens.
  * Forente den visuelle navigasjonsstrukturen og metadataene for å sikre at informasjonen alltid er synkronisert.
  * Renset visningsfiler for tung logikk ved å flytte datahenting og meta-håndtering til en bakgrunnsmodul.
  * Lagt til rette for at nye sider automatisk inkluderes i systemet uten behov for ekstra konfigurering.
sources: ''
---

### \*\*\*\*

Jeg satt med en hybridløsning der navigasjonsmenyen krevde manuelt vedlikehold av lister, samtidig som SEO-informasjon (som titler og beskrivelser) var spredt rundt i de enkelte sidekomponentene. Dette gjorde arkitekturen uoversiktlig og økte risikoen for at metadata ble utdatert eller manglet ved endringer.

Målet var å automatisere navigasjonsstrukturen og sentralisere SEO-ansvaret i én felles kilde. Ved å etablere en **Single Source of Truth**, ønsket jeg å fjerne manuelle rutineoppgaver og sikre at både den visuelle menyen og søkemotoroptimaliseringen alltid er synkronisert og korrekt.

* Jeg erstattet manuelle lister med et dynamisk system i `useNavigation`, som genererer hovedmenyen automatisk basert på applikasjonens ruter.
* Jeg flyttet ansvaret for meta-tagger, titler og beskrivelser inn i den samme modulen. Dette sikrer at søkemotorer og sosiale medier alltid får korrekt informasjon.
* Ved å flytte denne logikken ut av `LayoutHeader` og sidekomponentene, har jeg rendyrket visningslaget. Komponentene henter nå ferdigbehandlet data fra én kilde.

Arbeidet har resultert i en langt mer vedlikeholdsvennlig struktur der nye sider automatisk inkluderes i både meny og SEO-oppsett. Ved å fjerne unødvendig kode i visningslagene har jeg redusert prosjektets kompleksitet og sikret en teknisk optimalisert plattform for både brukere og søkemotorer.

Jeg har erfart verdien av å delegere ansvar til dedikerte logikk-moduler (composables). Ved å skille mellom datahåndtering og visning, oppnår man en robust arkitektur. Erfaringen bekrefter at jo mindre manuelt vedlikehold som kreves for rutineoppgaver, jo færre feil oppstår i det lange løp.
