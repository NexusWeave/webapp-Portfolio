---
date: 2025-12-31T11:25:24.822Z
title: Avsluttende prosjektlogg - Modernisering og sikring av intranett
ingress: |
  Gjennom en omfattende modernisering har vi profesjonalisert intranettet ved å erstatte ustabil kildekode med en legobasert arkitektur. Ved å innføre universell filhåndtering og streng tilgangsstyring har vi fjernet driftsfeil og styrket personvernet. Oppgraderingen gir oss full kontroll over systemets helse, reduserer teknisk etterslep og sikrer en pålitelig plattform som er klargjort for fremtidig vekst og effektiv drift.
status: |
  #### Program informasjon
  ** Teknologi** - C#
  ** Verktøy** - KI, TypeScript
  ** Prinsipper** - RBAC, Minste privilegium

  #### Dagens Aktiviteter
  * Denne loggen oppsummerer de viktigste aktivitetene, resultatene og læringspunktene fra prosjektperioden (November – Desember 2025).
  * Transformert intranettet til en stabil, sikker og profesjonell plattform for hele organisasjonen.

  #### Motivasjon & Energi - 10 / 10
  Prosjektet er fullført med gode resultater.
sources: ''

---

Dette prosjektet har handlet om å profesjonalisere bedriftens intranett. Ved å rydde opp i **ustabil kildekode** og innføre moderne sikkerhetsstandarder, har vi gått fra en sårbar løsning til en plattform som er klargjort for fremtidig vekst og effektiv drift.

##### Systemgjenoppretting og Universell Tilgang

Etter en automatisk flytting av kodespråk (fra **PHP** til **C#** via **KI**) krasjet intranettet for utviklere med plattformen **Mac** eller **Linux**. Dette skapte full stans i videreutviklingen.

Min oppgave var å finne feilen og sørge for at systemet fungerte uavhengig av hvilket operativsystem som brukes som publiserings løsningen.

* Jeg analyserte den KI-genererte koden og oppdaget at den kun forsto **Windows**-stier. Jeg erstattet dette med en universell løsning for filhåndtering og ryddet i logikken slik at koblingen mellom nettsiden og dokumentene ble pålitelig.

Vi fjernet tekniske skiller mellom ansatte og studenter, ved å fjernet risikoen for fremtidige krasj ved systembytter.

##### Fra Åpent til Sikkert (Rollebasert tilgang)

Systemet manglet kontroll på hvem som så hva. Sensitiv intern informasjon og navigasjonslenker var synlig for alle, inkludert studenter. Dette utgjorde en sikkerhetsrisiko og skapte et uoversiktlig arbeidsmiljø.

Etablere en sikkerhetsløsning **RBAC**) som skiller mellom roller og beskytter bedriftens data i alle ledd.

Jeg flyttet sikkerhetskontrollen fra brukeren til systemets backend. Jeg la til en *«To-pass algoritme»*<abbr> som håndterer rettigheter i mapper og mapperstrukturer, og brukte en <abbr title ="Den delen av koden som er den eneste kilden til sannhet">*«Singleton-tjeneste»* for å sikre at sikkerhetssjekken skjer raskt uten å belaste serveren.

Vi følger nå internasjonale standarder for personvern *«minst priviligum»*. Dette har fjernet teknisk støy for brukerne og tettet sikkerhetshull før de kunne bli utnyttet.

##### Redusere teknisk etterslep

Systemet var bygget som en helhet hvor alt hang sammen med alt. Små endringer kunne føre til uforutsette feil, og det var umulig å utføre automatisert **testing** for å sjekke om systemet faktisk var friskt.
Målet mitt var å strukturere Rydde i systemarkitekturen for å gjøre det enklere, tryggere og billigere å vedlikeholde over tid.

* Jeg separerte bedriftens regler fra den tekniske motoren ved bruk av *«DIP-prinsippet»*. Jeg fjernet over 50 linjer med overflødig kode og innførte det objektivt målesystemet <abbr title="Et Verktøy som måler systemets kvalitet i prosent">**Coverlet** dette forenkler prosessen med å identifisere systemets kvalitet.

Vi har redusert det tekniske etterslepet. Vi kan nå koble på nye datakilder eller oppgradere teknologien i fremtiden uten å måtte bygge om alt på nytt. Dette sparer bedriften for tid i fremtidig vedlikehold.

##### Erfaring og Hoved resultatet

Gjennom denne innsatsen har vi i dag en stabil plattform som flyter raskt uavhengig av brukerens utstyr. Vi har tettet sikkerhetshull ved å innføre prinsippet om *minste privilegium*, som beskytter bedriftens data i alle ledd. Den nye modulære arkitekturen har redusert vedlikeholds behovet betydelig og transformert vår utviklingskultur fra å styre etter antakelser til å styre etter objektive fakta. Resultatet er en trygg produksjonslinje som leverer kvalitet uten uforutsette avbrudd.

Prosjektet har gitt verdifull innsikt i betydningen av modulær systemutvikling og viktigheten av å bygge sikkerhet inn i selve grunnmuren fremfor å legge det på som et ettertanke. Har erfart ved å bruke objektive måleverktøy kan man styre prosjekter med langt større presisjon. Denne erfaringen har styrket min forståelse for hvordan tekniske valg direkte påvirker bedriftens smidighet ved å bygge systemer som «*Lego-klosser*» står vi nå langt sterkere rustet når behovene endrer seg i fremtiden.
