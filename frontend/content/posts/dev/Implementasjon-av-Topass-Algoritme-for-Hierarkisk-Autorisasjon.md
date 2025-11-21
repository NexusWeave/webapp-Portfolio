---
created: 2025-11-21T00:00:00.000Z
tags:
  - dev-journey
title: Implementasjon av Topass-Algoritme for Hierarkisk Autorisasjon
ingress: >
  En autorisasjonssårbarhet ble identifisert der uautoriserte brukere fikk
  innsyn i hierarkisk strukturerte navigasjonslenker fra en CSV-kilde.
  Sårbarheten skyldtes en designsvikt i den tidligere implementasjonen som ikke
  klarte å håndtere foreldre-barn relasjoner og effektiv per-enhet
  tilgangssjekk.Målet var å redesigne filtreringslogikken for å implementere
  rolle-basert tilgangskontroll i henhold til Prinsippet om Minst Privilegium
  ($Least\ Privilege$).Dette ble løst ved å implementere en Topass Algoritme
  (Tree Traversal). Algoritmen omdanner den flate CSV-dataen til en hierarkisk
  trestruktur i det første passet. I det andre passet sjekkes tilgangen på
  foreldrenivå og propagering av tilgang til underliggende elementer sikres,
  samtidig som man unngår foreldreløse elementer. Denne robuste
  serverside-filtreringen eliminerer den visuelle eksponeringen av uautoriserte
  lenker, og bekrefter at Topass Algoritmer er en effektiv tilnærming for å
  håndtere komplekse hierarkiske autorisasjonsdata.
star: >
  Applikasjonen trengte å vise en innholdsliste fra en CSV-fil med et hierarki
  struktur (foreldre-barn forhold). Forskjellige roller har tilgang til
  forskjellig innhold (e.g. foreldresti/\*, foreldresti1/\*). Den tidligere
  implementasjonen klarte ikke å håndtere


  * Hierarki relasjoner mellom kategorier.

  * Foreldre løse barn når foreldrene var filtrert ut.

  * Effektiv “per-enhet” tilgangs sjekker.



  Målet var å designe innholdsfiltreringen for å implementere rolle-basert
  tilgangskontroll med fokus på hierarki. Dette innebar fire hovedkrav


  * Brukere med tilgang til foreldre kategori automatisk får tilgang til alle
  barne dokumenter.

  * Sikre at ingen dokumenter er foreldreløse

  * Dynamisk bygge fullstendige stier fra hierarkiske relasjoner i CSV-dataen

  * Opprettholde seperasjon av ansvar mellom den generelle autorisasjonslogikken
  og CSV-spesifikke operasjoner.


  Ved bruken av Claude Sonnet 4.5, implementerte vi sammen en Topass Algortime
  ([Tree
  Traversal](https://www.geeksforgeeks.org/dsa/tree-traversals-inorder-preorder-and-postorder/))
  for å håndtere den hierarktiske filtreringen. 


  * Første pass i algoritmen  omdannet programmet det flate dokumentet til en
  hierarkisk trestruktur i minnet. 

  * Andre Pass - Utførelsen av selve autorasjonskontrollen
    * Algoritmen sjekket tilgangen for foreldre elementer hvis tilgangen ble invilget, ble stien og dens barneelementer automatisk inkludert og tilgangen propagert.

  Til slutt ble alle elementene som ikke ble inkludert gjennom
  foreldretilgangen, individuelt sjekket for å sikre at ingen gyldige elementer
  ble foreldreløse.


  Den tekniske implementasjonen av Topass-algortimen løste utfordringen med at
  uautoriserte brukere hadde tilgang til navigasjonsdataene. Prosjektet følger
  nå Prinsippet om Minst Privilegum


  Lærdommen fra dette arbeidet er at Topass Algoritmer er en robust og effektiv
  tilnærming som er i stand til å håndtere hierarkiske grupperinger av
  autorisasjonsdata. Dette  er grunnlag for implementasjon av Least
  privilege-prinispp når man arbeider med komplekse, rasjonelle datastrukturer
  som filtreres på serversiden.
KildeHenvisning: ''
---

