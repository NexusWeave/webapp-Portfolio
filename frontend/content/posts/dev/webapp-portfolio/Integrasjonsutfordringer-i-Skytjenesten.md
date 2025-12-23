---
created: 2025-12-23T00:00:00.000Z
tags:
  - dev-journey
title: Integrasjonsutfordringer i Skytjenesten
ingress: >
  Denne artikkelen tar for seg utfordringene som oppstår når en applikasjon
  migrerer fra et lokalt utviklingsmiljø til en profesjonell tjenestestruktur i
  Google Cloud. Gjennom feilsøking av brutte kommunikasjonslinjer mellom klient
  og tjeneste, belyses det av presis URL-adressering og korrekt oppsett av
  miljøvariabler. Erfaringen gir verdifull innsikt i hvordan produksjonsmiljøer
  krever en annen tilnærming enn utviklingsstadier, og reiser viktige
  arkitektoniske spørsmål rundt behovet for autentisering i leseoperasjoner
  kontra modifisering av data.
star: >
  ### Adresseringslogikk og Vurdering av Autentiseringsbehov


  #### Integresjon mellom Klient og Tjeneste


  I denne fasen var målet å etablere kommunikasjon mellom Klientsiden og
  tjenestesiden i Google Cloud. Sende en forespørsel fra klienten som tjenesten
  kan tolke og respondere på.


  Planen var å implementere en standard HTTPS-header for å definere datatypen og
  autentisere forespørseken ved hjelp av et Cloud-token.


  ```json

  {
    "Content-Type": "Application/json",
    "Authorization": "GCLOUD-TOKEN"
   }
  ```


  #### Korrupte Stier


  Selv om headerne var korrekt konfigurert, feilet integrasjonen. Utfordringen
  var ikke sikkerhetsmessig eller dataformatet, mend adresseringen.


  Ved inspeksjon viste det seg at stien ( URL/endpoint ) ikke var korrekt
  formulert. Dette er noe som er typisk at det skjer når man flytter fra et
  utviklermiljø til et Cloud miljø, som en konsekvens av koblings punktets
  struktur forandrer seg. Som regel trenger man en ‘/‘ eller må fjerne en ’/’ i
  stien. Dette gjør at forespørselen aldri kommer til riktig funksjon / i
  tjenesten.


  #### Isolasjon og Feilsøking


  For å identifisere kilden til hva som var ukorrekt, ble det uført en
  eliminerings prosess.


  ##### Isolering av variabler


  Autentiseringen ble fjernet for å sjekke om forespørselen kunne gjennomføres
  manuelt uten sikkerhetslagret. Da integrasjonen ikke var suksessfull, ble det
  bekreftet at utfordringen lå med selve adresseringen og token-valideringen.


  ##### Korreksjon av miljø variabler


  Da kilden ble identifisert som en korrupt sti, ble miljøvariabelen for
  tjenestens URL oppdatert. Dette innebar å sørge for at stien samsvarte
  nøyaktig med endepunktet i Google Cloud, inkludert korrekt bruk av skråstreker
  og base url.


  #### Etablert Kommunikasjon


  Etter denne oppdateringen av miljøvariablen ble forbindelsen mellom klient og
  tjenesten vellykket.  Det tok litt tid før oppdateringen skjedde eksternt, men
  kommunikasjonen er nå samløs.


  * Kan dKlienten sender JSON-data med korrekt header til riktig addresse

  * Tjenesten i Google Cloud mottar forespørselen, validerer autentiseringen og
  returnerer forventet respons. 


  #### Evaulering


  Gjennom løsningsprosessen ble det gjort to arkitektoniske funn


  ##### Autentiseringsbehov


  Det ble observert at dataene som vises på klientsiden i realiteten ikke har
  behov for autentisering. Siden klienten kun leser har read-only rettigheter.
  Dette gjør at sikkerhets modellen kan forenkles.


  ##### Miljøskifte


  Det ble tydligere at miljøet endrer karakter fra utviklingsstadiet til
  produksjon. Håndtering av disse forskjellene krever nøyaktighet i oppsettet av
  miljøvariabler og en forståelse for hvordan sky-infrastruktur ruter trafikken.
KildeHenvisning: ''
---

