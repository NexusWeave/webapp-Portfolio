---
date: 2025-11-21T00:00:00.000Z
title: Styrket informasjonssikkerhet
ingress: |
  Jeg har utviklet en løsning for rollebasert tilgangskontroll i hierarkiske datalister. Ved å bruke en « <abbr title = "En prosess som går gjennom dataen to ganger for å bli ferdig med jobben">*to-pass-algoritme*</abbr>» arves rettigheter korrekt i trestrukturer, mens sensitive data skjermes etter prinsippet om <abbr title ="Prinsippet sier at brukere skal bare ha de nødvendige tilgangene de trenger for å gjøre jobben sin">*minste privilegium*</abbr>. Arbeidet reduserer manuelle feilkilder, tetter sikkerhetshull og sikrer uavbrutt tilgang til innhold. Dette gir en stabil grunnmur for bedriftens datasikkerhet.
status: |
  #### Program informasjon
  ** Teknologi** - C#
  ** Verktøy** - KI
  ** Prinsipper** - To-pass algoritme, Minste privilegium

  #### Dagens Aktiviteter
  * Utviklet en modul som omdanner flate lister til en logisk trestruktur i systemets minne. Dette gir full kontroll over informasjonsrelasjoner og fjerner teknisk risiko knyttet til uoversiktlige datasett.
  * Programmert logikk for automatisk rettighetsarv, slik at tilgang gitt på hovednivå automatisk flyter ned til alle underliggende dokumenter. Dette sikrer en effektiv og feilfri brukeropplevelse.
  * Skilt ut sikkerhetslogikken fra de tekniske dataoperasjonene. Dette forenkler fremtidig vedlikehold og gjør det betydelig lettere å dokumentere etterlevelse overfor revisorer.
  * Ferdigstilt filtreringslogikk som sikrer at brukere kun har innsyn i data de er autorisert for. Dette tetter tidligere sikkerhetshull i navigasjonsdata og reduserer virksomhetens operasjonelle risiko for datalekkasjer.
  * Etablert en robust teknisk grunnmur for håndtering av komplekse datasett, noe som gjør løsningen mer pålitelig og rimeligere å drifte over tid.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kunne bli.
sources: |
  1. [Tree Traversal](https://www.geeksforgeeks.org/dsa/tree-traversals-inorder-preorder-and-postorder/)
---

Nettsiden viser innhold fra CSV-baserte datalister med komplekse hierarkier (foreldre-barn-relasjoner som også er kalt for content-nodes). Tidligere manglet systemet en pålitelig metode for å kontrollere at brukere kun så det innholdet de faktisk hadde rettighet til, spesielt når tilgangen var avhengig av hvor i trestrukturen informasjonen lå.

Målet med dette arbeidet var å omstrukturere innholdsfiltreringen for å implementere en pålitelig rollebasert tilgangskontroll som ivaretar logikken i et hierarki. Jeg var oppmerksom på om at tilgangen automatisk skulle arves fra foreldrekategorier til underliggende dokumenter, samtidig som at vi måtte garantere at ingen dokumenter ble utilgjengelige ved en feil. Det var avgjørende å bygge fullstendige navigasjonsstier dynamisk fra rådataene og samtidig sikre et ryddigere skille mellom den generelle sikkerhetslogikken og de spesifikke dataoperasjonene for å forenkle fremtidig vedlikehold og revisjon.

For å løse disse kravene la jeg til en <abbr title="en prosess innen informatikk for å besøke hver node i en tre-datastruktur en gang">`Tree Traversal`</abbr> algoritme i samarbeid med **Claude 3.5 Sonnet ([1](https://www.geeksforgeeks.org/dsa/tree-traversals-inorder-preorder-and-postorder/))**.
ølgende tiltak ble gjennomført:

* I algoritmens første fase omdannes flate dokumentlister til en logisk trestruktur i systemets minne for å kartlegge alle relasjoner.
* I andre fase utføres selve tilgangssjekken på øverste nivå i treet, hvor tilgang automatisk rulles ut til alle barneelementer dersom forelderen er godkjent.
* Jeg la inn en spesifikk sjekk for elementer som ikke ble fanget opp av den automatiske arven, for å sikre at ingen legitime dokumenter blir stående utenfor strukturen.

Gjennomføringen har resultert i en løsning som effektivt tetter tidligere sikkerhetshull og sikrer at brukere uten tilgang ikke har innsyn lenger i sensitiv navigasjonsdata, dette reduserer virksomhetens risiko for lekasjer. Ved å ta i bruk denne metodikken følger prosjektet nå Prinsippet om <abbr title ="Prinsippet sier at brukere skal bare ha de nødvendige tilgangene de trenger for å gjøre jobben sin">«minste privilegium»</abbr>, som styrker bedriftens evne til å overholde strenge krav til personvern og datasikkerhet. Denne investeringen i systemarkitekturen fjerner manuelle feilkilder og sikrer at ansatte alltid har korrekt tilgang til nødvendig beslutningsgrunnlag uten avbrudd. Resultatet er en pålitelig plattform som er rimeligere å drifte over tid og som danner en trygg grunnmur for fremtidig håndtering av komplekse datasett i hele organisasjonen.
