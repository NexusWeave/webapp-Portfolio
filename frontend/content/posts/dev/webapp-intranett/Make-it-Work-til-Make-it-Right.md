---
created: 2025-11-24T00:00:00.000Z
tags:
  - dev-journey
title: Make it Work til Make it Right
ingress: >
  Denne loggen dokumenterer et  arkitektonisk refaktorering, utløst av teknisk
  gjeld og uoversiktlig kode som følge av en "Make it work, Make it right, then
  make it fast"-metodikk. Ved å implementere kjerne-prinsippene SRP (Single
  Responsibility Principle) og DIP (Dependency Inversion Principle), ble all
  CSV-formatlogikk flyttet fra forretningslogikken til en dedikert,
  Interface-styrt tjeneste. Dette førte til en umiddelbar reduksjon på 57
  kodelinjer i hovedfilen, sikret løs kobling og etablerte en robust, skalerbar
  arkitektur. Samtidig ble kritiske feil i navigasjonsstier identifisert og
  prioritert for utbedring før testing og fremvisning.
star: >
  ### Uoversiktlig Hovedfil og Teknisk Gjeld


  Hovedfilen hadde en del **teknisk gjeld** og ble uoversiktlig som en
  konsekvens av å utivkle etter  prinsippet "**Make it work**, **Make it
  right**, **then make it fast**". Dette har skapt **uklare**
  ansvarsfordelinger, og det er et akutt behov for å restrukturere logikken ved
  bruk av Objektorientert programmering (**OOP**) dedikere filer for de unike
  oppgavene


  #### CSV logikken flyttes fra forretningslogikken som en dedikert tjeneste


  Logikken isoleres i flere dedikerte filer, som Implementerer et interface med
  en metode, og en klasse som to metoder:


  * Den første funksjonen har ansvaret for å lese og henter data fra CSV-filen.

  * Den andre funksjonen har ansvaret for å serialisere dataen tilbake til
  CSV-formatet som en streng


  #### &#xA;Implementering av SRP & DIP


  Jeg startet med å implementere et Interface (IMenneskeUtvikling), som
  definerer utviklingen videre for klassene(MenneskeArter). Som definerer å
  "minst" ha en metode. (Bevisthet)


  Implementering av Klasse


  Klassen som ble definert, ble definert med to funksjoner, der den ene
  funksjonen var kun for klasse bruk (private ) mens den andre var registert for
  å innfri kravet fra interface.


  Integrering av DIP


  Interfacet ble integrert i konstruktøren og all Direkte Instansering ble
  fjernet fra klassen i hovedlogikken


  #### &#xA;Økt overiskt og Skalerbarhet


  Refaktoreringen ga målbare resultater som Kvantifisertbart Gevinst, Klar
  Ansvarsfordeling, Ferdigstillelse


  **Kvantifiserbar Gevinst**


  Hovedfilen ble mer oversiktlig og fikk en reduksjon på 57 linjer med kode.


  **Klar Ansvarsfordeling**


  Ansvaret for forretningslogikken og tjeneste logikken er nå separert.


  **Skalering (DIP)**


  Prosjektet er nå skalerbart. takket være vår gode venn Interface, CSV
  utskrivnings-logikken kan byttes ut med andre data kilder som (`JSON`, `XML`,
  osv), uten å endre foretningslogikken


  **Kvalitetsikrig**


  Det ble oppdaget at enkelte navigsjonsstier ikke oppfører seg som de er
  tiltenkt. Dette skal adresseres og løses før testing og fremvisning.
KildeHenvisning: ''
---

