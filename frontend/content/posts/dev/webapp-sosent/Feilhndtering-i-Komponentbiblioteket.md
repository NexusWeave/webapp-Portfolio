---
created: 2025-12-29T00:00:00.000Z
tags:
  - dev-journey
title: Feilhåndtering i Komponentbiblioteket
ingress: >
  Under kvalitetskontroll ble det avdekket at ukorrekt bruk av
  `:download`-attributtet førte til en utforsigbar funksjonalitet for alle
  lenker. Ved å sentralisere logikken for sidebytte og innføre strengere sjekker
  for bilde-objekter som kan være `null`, har den uforutsigbare oppføselen blitt
  eliminert og økt komponentense tekniske integeritet.
star: >
  ### Boolean-attributter og Null-safety


  #### Utilsiktet nedlastning og komponent-krasj


  Det ble oppdaget to ukorrektheter i prosjektets komponent-bibliotek


  ##### Anker-komponentet


  Attributet `:download` ble aktivert for smatlige lenker, uavhengig om lenken
  pekte til en fil som skulle lastes ned eller ikke.  Det ble også oppdaget en
  ukorrekthet i bilde data-logikken som førte til en ukorrekt melding der
  systemet forventet at bilde-logikken skulle alltid være et objekt, i tilfeller
  der det ikke ble lagt inn data. ble dette levert som `null`


  #### Logiske Brister i Komponenten


  Det ble identifisert utfordringer med HTML-spesifikasjonen for
  Boolean-attributer, Manglende Null-sjekk for Bilde Objektet.


  ##### HTML-spesifikasjonen for Boolean-attributer


  I HTML fungerer :download attributtet om det er tilstede vil nettleseren tolke
  det som at nedlastning er aktivert. Ved å sende en Boolean verdi direkte, ble
  attributtet injisert i DOM-en på en måte som utløste nedlastningsdialogen for
  alle anker-tagger.


  ```javascript

  // Dette vil fortelle DOM-et at lenken er nedlastbar, som en konsekvens av at

  // erNedlastning er alltid noe

  :download="erNedlastning ? true : false"

  ```


  ##### Manglende Null-sjekk for objekter


  variabel objektet for bilder forårsaket en krasj som en konsekvens av at
  komponentet forsøkte å aksessere eganskaper på et objekt som ikke eksisterte.
  Det var en ukorrekthet mellom forventet data og faktiske data, dette bryter
  med prinsippene for type-sikkerhet


  #### Korrigering av logikk og datahåndtering


  ##### Anker-elementet


  Logikken for anker-elementet ble endret slik at :download-attributet kun
  renres dersom erNedlastning er sann 


  ```javascript

  // Korrekt måte å håndtere :download attributtet

  :download="erNedlastning ? '' : null"

  ```


  ##### Bilde objektet


  Det ble implementert en sjekk om det er noe i variabelen før at bilde
  komponenten skal rendres.


  #### Evaulering og Refleksjon


  Dette viser viktigheten av å forstå hvordan JavaScript håndterer logikk og
  hvordan HTML tolker attributter i DOM-et. Ved å innføre en sjekk for
  null-verdir har det blitt skapt et mer robust komponent som tåler manglende
  data uten å avbryte applikasjonens kjøring. Det bidrar til en mer forutsigbar
  brukeropplevelse og en høyere teknisk standard i komponentbiblioteket.
KildeHenvisning: ''
---

