---
date: 2026-12-31T11:25:24.822Z
title: 'Avsluttende prosjektlogg: Modernisering og sikring av intranett'
ingress: |
  Gjennom en omfattende modernisering har jeg flyttet vårt intranett fra å bruke snarveier til strategisk kontroll. Ved å erstatte utdatert logikk med en modulær "plug-and-play"-arkitektur, har vi eliminert operativsystem-feil, styrket personvernet gjennom intelligent tilgangsstyring og redusert fremtidige vedlikeholdskostnader betydelig.
parade: ''
star: |
  **Introduksjon**

  Dette prosjektet har handlet om å profesjonalisere bedriftens intranett. Ved å rydde opp i ustabil kildekode og innføre moderne sikkerhetsstandarder, har vi gått fra en sårbar løsning til en plattform som er rigget for fremtidig vekst og effektiv drift.

  **Høydepunkt 1: Systemgjenoppretting og Universell Tilgang**

  Etter en automatisk flytting av kodespråk (fra **PHP** til **C#** via **AI**) krasjet intranettet for brukere med plattformen **Mac** og **Linux**.

  Dette skapte full stans i videre utviklingen.

  Min oppgave var å finne feilen og sørge for at systemet fungerte uavhengig av hvilket operativsystem som brukes i publiserings løsningen.

  Jeg analyserte den AI-genererte koden og oppdaget at den kun forsto Windows-stier. Jeg erstattet dette med en universell løsning for filhåndtering og ryddet i logikken slik at koblingen mellom nettsiden og dokumentene ble pålitelig.

  Systemet var i full drift på fire timer. Vi fjernet tekniske skiller mellom ansatte og fjernet risikoen for fremtidige krasj ved systembytter.

  **Høydepunkt 2: Fra Åpent til Sikkert (Rollebasert tilgang)**

  Systemet manglet kontroll på hvem som så hva. Sensitiv interninformasjon og navigasjonslenker var synlig for alle, inkludert studenter. Dette utgjorde en sikkerhetsrisiko og skapte et uoversiktlig arbeidsmiljø.

  Etablere en sikkerhetsløsning (RBAC) som skiller mellom roller og beskytter bedriftens data i alle ledd.

  Jeg flyttet sikkerhetskontrollen fra overflaten (hos brukeren) til systemets lukkede kjerne (backend). Jeg implementerte en "To-pass algoritme" som håndterer komplekse rettigheter i mapper og mapperstrukturer, og brukte en "Singleton-tjeneste" for å sikre at sikkerhetssjekken skjer lynraskt uten å belaste serveren.

  Vi følger nå internasjonale standarder for personvern (Least Privilege). Dette har fjernet digital støy for brukerne og tettet kritiske sikkerhetshull før de kunne bli utnyttet.

  **Høydepunkt 3: Teknisk modernisering (Reduserte vedlikeholdskostnader)**

  Systemet var bygget som en kaotisk helhet hvor alt hang sammen med alt. Små endringer kunne føre til uforutsette feil, og det var umulig å utføre automatisert testing for å sjekke om systemet faktisk var friskt.

  Rydde i systemarkitekturen for å gjøre det enklere, tryggere og billigere å vedlikeholde over tid.

  Jeg separerte bedriftens regler fra den tekniske motoren (DIP-prinsippet). Jeg fjernet over 50 linjer med overflødig kode og innførte et objektivt målesystem (Coverlet) som gir oss "røntgenbilder" av systemets kvalitet.

  Vi har redusert snarveiene som er tatt tidligere betydelig. Systemet er nå "plug-and-play", som betyr at vi kan koble på nye datakilder eller oppgradere teknologien i fremtiden uten å måtte bygge om alt på nytt. Dette sparer bedriften for store summer i fremtidig vedlikehold.

  **Hva som har blitt lært løpet av prosjektet**

  Arbeidet har gitt meg verdifull innsikt som styrker min rolle som utvikler og rådgiver for bedriften:

  * Jeg har sett verdien av å bygge systemer i moduler ("Lego-klosser"), noe som gjør oss mer fleksible når forretningsbehovene endrer seg.
  * Ved å innføre måleverktøy har jeg lært å styre prosjekter etter fakta fremfor antakelser. Jeg vet nå nøyaktig hvor systemet er sterkt og hvor det trenger tilsyn.
  * Jeg har fått forståelse for at sikkerhet ikke er noe som legges  til slutt, men noe som må bygges inn i selve grunnmuren av systemet for å være effektivt.
sources: ''
---

Periode: **November** – **Desember** 2025

Ansvarlig: **Kristoffer Gjøsund**

**Formål med loggen**

Denne loggen oppsummerer de viktigste aktivitetene, resultatene og læringspunktene fra prosjektperioden. Fokus har vært å transformere intranettet til en stabil, sikker og profesjonell plattform for hele organisasjonen.
