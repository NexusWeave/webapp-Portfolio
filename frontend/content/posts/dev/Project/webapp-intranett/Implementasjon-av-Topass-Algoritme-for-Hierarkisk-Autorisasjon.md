---
tags:
  - dev-journey
date: 2025-11-21T00:00:00.000Z
title: Styrket informasjonssikkerhet og etterlevelse gjennom ny modell for tilgangsstyring
ingress: |
  Vi har implementert en ny og sikrere modell for tilgangsstyring som fjerner risikoen for at sensitiv informasjon havner i feil hender. Ved å modernisere hvordan systemet håndterer rettigheter i komplekse dokumentstrukturer, har vi skapt en løsning som automatisk sikrer at ansatte alltid har tilgang til de riktige verktøyene og dokumentene de trenger for å utføre jobben sin effektivt. Denne oppgraderingen styrker bedriftens evne til å etterleve strenge krav til personvern (compliance), reduserer risiko og legger til rette for en mer pålitelig og kostnadseffektiv drift av våre digitale systemer.
parade: ''
star: |
  Nettsiden viser innhold fra CSV-baserte datalister med komplekse hierarkier (foreldre-barn-relasjoner som også er kalt for content-nodes). Tidligere manglet systemet en pålitelig metode for å kontrollere at brukere kun så det innholdet de faktisk hadde rettighet til, spesielt når tilgangen var avhengig av hvor i "trestrukturen" informasjonen lå.

  Målet med dette arbeidet var å redesigne innholdsfiltreringen for å implementere en pålitelig rollebasert tilgangskontroll som ivaretar logikken i et hierarki. Jeg var oppmerksom på om at tilgangen automatisk skulle arves fra foreldrekategorier til underliggende dokumenter, samtidig som at vi måtte garantere at ingen dokumenter ble utilgjengelige ved en feil. Det var avgjørende å bygge fullstendige navigasjonsstier dynamisk fra rådataene og samtidig sikre et ryddigere skille mellom den generelle sikkerhetslogikken og de spesifikke dataoperasjonene for å forenkle fremtidig vedlikehold og revisjon.

  For å løse disse kravene implementerte vi en såkalt "To-pass algoritme" (Tree Traversal) i samarbeid med **Claude 3.5 Sonnet**\[1]. Følgende tiltak ble gjennomført:

  I algoritmens første fase omdannes flate dokumentlister til en logisk trestruktur i systemets minne for å kartlegge alle relasjoner.

  I andre fase utføres selve tilgangssjekken på øverste nivå i treet, hvor tilgang automatisk rulles ut til alle barneelementer dersom forelderen er godkjent.

  Vi la inn en spesifikk sjekk for elementer som ikke ble fanget opp av den automatiske arven, for å sikre at ingen legitime dokumenter blir stående utenfor strukturen.

  Gjennomføringen har resultert i en løsning som effektivt tetter tidligere sikkerhetshull og sikrer at brukere uten tilgang ikke har innsyn lenger i sensitiv navigasjonsdata, dette reduserer virksomhetens operasjonelle risiko betydelig. Ved å ta i bruk denne metodikken følger prosjektet nå "Prinsippet om minste privilegium" (Least Privilege), som styrker bedriftens evne til å overholde strenge krav til personvern og datasikkerhet (compliance). Denne investeringen i systemarkitekturen fjerner manuelle feilkilder og sikrer at ansatte alltid har korrekt tilgang til nødvendig beslutningsgrunnlag uten avbrudd. Resultatet er en pålitelig plattform som er rimeligere å drifte over tid og som danner en trygg grunnmur for fremtidig håndtering av komplekse datasett i hele organisasjonen.
sources: |
  1. [Tree Traversal](https://www.geeksforgeeks.org/dsa/tree-traversals-inorder-preorder-and-postorder/)
---

**Dagens aktiviteter**

* Utviklet en modul som omdanner flate lister til en logisk trestruktur i systemets minne. Dette gir full kontroll over informasjonsrelasjoner og fjerner teknisk risiko knyttet til uoversiktlige datasett.
* Programmert logikk for automatisk rettighetsarv, slik at tilgang gitt på hovednivå automatisk flyter ned til alle underliggende dokumenter. Dette sikrer en effektiv og feilfri brukeropplevelse.
* Etablert en spesifikk kontrollmekanisme som verifiserer at ingen legitime dokumenter blir "foreldreløse" eller utilgjengelige, noe som garanterer at ansatte alltid har tilgang til nødvendig beslutningsgrunnlag.
* Skilt ut sikkerhetslogikken fra de tekniske dataoperasjonene. Dette forenkler fremtidig vedlikehold og gjør det betydelig lettere å dokumentere etterlevelse (compliance) overfor revisorer.
* Ferdigstilt filtreringslogikk som sikrer at brukere kun har innsyn i data de er autorisert for. Dette tetter tidligere sikkerhetshull i navigasjonsdata og reduserer virksomhetens operasjonelle risiko for datalekkasjer.
* Etablert en robust teknisk grunnmur for håndtering av komplekse datasett, noe som gjør løsningen mer pålitelig og rimeligere å drifte over tid.

**Motivasjon & Energi** **10** / **10**

Dagen er så fin den kan bli.
