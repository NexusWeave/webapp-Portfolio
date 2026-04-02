---
date: 2026-04-02T07:33:30.027Z
title: Optimalisering av rammeverk for søkbar kunnskapsdeling
ingress: |
  Ved å endre rammeverkets regler har jeg åpnet lukkede informasjonskanaler og gjort nettsiden til en aktiv læringskilde for AI. Ved å koble systemet direkte til min innholdsoversikt, blir min kunnskap søkbar og anvendelig.
  Mine prosjektresultater fungerer nå som et bevis på kompetansen, noe som sparer tid og gjør det langt enklere for andre å forstå hvordan jeg jobber.
parade: ''
star: |
  ### Health Check System Improvements

  Jeg hadde ingen god måte å vite om feil skyldtes min egen kode eller om det var problemer hos de eksterne tjenestene jeg henter data fra. Dette gjorde det vanskelig å vite hvor jeg skulle starte feilsøkingen når noe stoppet opp.

  Oppgave ble å lage til et varslingssystem som gir meg svar med en gang på om alle koblinger fungerer som de skal, slik at jeg slipper å lete i blinde når noe ikke virker.

  * Jeg har laget en helt ny, egen modul som kun har som oppgave å sjekke tilkoblingene mine mot interne kilder. \[^1]
  * Jeg har bygget om systemets hovedpunkt for helsesjekk slik at det gir en detaljert statusrapport for hver enkelt tjeneste i stedet for bare en generell melding. \[^2]
  * Jeg har lagt til en funksjon som lister opp alle tilgjengelige koblinger og viser nøyaktig hvilken tilstand hver enkelt av dem er i. \[^1]

  Jeg har redusert tiden det tar å fikse feil betraktelig. Nå er det lettere å finne ut hvor utfordringen ligger med en gang det skjer, noe som gjør at løsningen min er mye mer stabil for de som bruker den.

  ***

  ### API Endpoint and Handler Enhancements

  De forskjellige "veiene" og funksjonene i systemet mitt manglet klare navn, noe som gjorde det uoversiktlig å holde styr på hva som faktisk var i drift og hvordan de presterte.

  Oppgaven ble å gi hver del av systemet et tydelig navn for å få bedre kontroll og gjøre det lettere å bygge ut prosjektet senere uten at eksisterende ting går i stykker.

  * Jeg har oppdatert alle definisjonene i systemet med unike merkelapper for å gjøre det lettere å kjenne igjen hver enkelt rute. \[^3]
  * Jeg har forbedret måten systemet rapporterer sin egen tilstand på ved å bruke disse nye navnene i oversikten. \[^4]
  * Jeg har fjernet gamle og utdaterte sjekkfunksjoner som lå spredt rundt, og samlet alt ansvaret i den nye modulen jeg laget.

  Dette gir meg full oversikt over driften. Det er nå mye tryggere for meg å legge til nye funksjoner i fremtiden fordi jeg har stålkontroll på hvordan de ulike delene snakker sammen.

  ***

  ### Web Scraping and Crawler Improvements

  Verktøyet jeg bruker for å hente informasjon var tregt og tok ofte med seg mye unødvendig "støy" fra nettsidene, noe som krevde mye tid på å vaske dataene i etterkant.

  Jeg ønsket å gjøre informasjonsinnhentingen raskere og sørge for at jeg bare sitter igjen med den informasjonen som faktisk har verdi for sluttproduktet.

  * Jeg har oppgradert logikken i innsamlingsverktøyet mitt slik at det nå automatisk kjenner igjen og filtrerer bort uinteressant innhold. \[^5]
  * Jeg har lagt til nye metoder for å vaske nettsidene for unødvendige elementer før dataene lagres. \[^5]
  * Jeg har gjort det mulig for verktøyet å utføre mange innsamlinger samtidig i stedet for å måtte vente på én og én, noe som øker farten voldsomt. \[^5]
  * Jeg har forsterket måten systemet håndterer feilmeldinger fra nettsider på, slik at det ikke stopper opp ved små avbrudd.

  Jeg får nå levert ferdig vaskede data med mye høyere nøyaktighet og på mye kortere tid. Dette øker kvaliteten på informasjonen jeg leverer uten at jeg trenger å bruke tid på manuelt etterarbeid.

  ***

  ### Versioning for Key Classes

  Jeg manglet en oversikt over hvilken utgave av logikken som ble brukt i de forskjellige delene av koden, noe som skapte usikkerhet ved vedlikehold og oppdateringer.

  Jeg bestemte meg for å innføre en fast standard for merking av de viktigste verktøyene mine for å ha full kontroll på nøyaktig hva som kjører til enhver tid.

  * Jeg har lagt inn et fast versjonsnummer på verktøyet som snakker med GitHub. \[^6]
  * Jeg har merket databasemodulen min med en egen versjonskode for bedre sporing. \[^7]
  * Jeg har lagt til versjonsmerking på oppsettet for selve klienten. \[^8]
  * Jeg har innført versjonskontroll på innsamlingsverktøyet (Scanneren) slik at jeg vet nøyaktig hvilken logikk som ble brukt. \[^9]

  Jeg har nå full kontroll og sporbarhet i alt jeg gjør. Dette fjerner all usikkerhet ved vedlikehold og gjør det mye enklere og tryggere å gjøre store oppgraderinger senere.
sources: ''
---

**Dagens Aktivitet**

* Kartlegge hvilke regler i rammeverket som blokkerer ekstern datainnsamling (scannere).
* Konfigurere rammeverket slik at spesifikke loggsider tillater forespørsler fra andre datasystemer.
* Validere at systemet fungerer som et digitalt bevis på kompetanse, slik at min kunnskap blir søkbar og tidsbesparende for eksterne parter.

**Motivasjon & Energi** **9** / **10**

Kjenner at jeg er klar for en ferie :)
