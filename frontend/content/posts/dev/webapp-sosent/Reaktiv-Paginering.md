---
created: 2025-12-28T00:00:00.000Z
tags:
  - dev-journey
  - news
title: Reaktiv Paginering
ingress: >
  Det ble avdekket en ukorrekthet med synkroniseringen ved sidebytte i
  nyhetsarkivet. Denne loggen utforsker hvordan jeg sentraliserte
  navigasjonslogikken, bruken av computed properties og implementeringen av
  strengere type-sikkerhet som sikrer at applikasjonens tilstand og datalogikk
  alltid er i samsvar.
star: >
  ### Sentralisering av navigasjonslogikk og feilsøking av dataflyt


  #### Defekt dataflyt i nyhetsoversikten


  Under utviklingen av nyhetsarkivet ble det oppdaget en logisk feil i
  pagineringsfunksjonen, målet var at det skulle være mulig for besøkende å se
  arkiverte artikler og ha muligheten til å navigere gjennom de arkiverte
  artiklene side for side.


  * Det ble oppdaget at å ved trykk på pagineringskappen økte sidetallet i
  brukergrensesnittet, men de arkiverte nyhetskortene ble ikke byttet ut med
  eldre artikler. 

  * Underfeilsøkingen ble det også avdekket manglende type-sikkerhet i logikken
  som håndterte dataene, dette skapte usikkerhet i koden.


  ##### Statisk data og Type-feil


  Etter en teknisk gjennomgang ble det identifisert Manglende Reaktivitet i
  filtrerings funksjonen.


  #### Manglende Reaktivitet


  Funksjonen som filtrerer nyhetskortet “lyttet” ikke på endringene i
  sidetall-variablen. Siden dataene ble hentet kun en gang ved innlastning,
  forble listen statisk selv om variabelen for gjeldene side endret seg. 


  #### Synkronisering av State og Type-definasjoner


  For å rette denne ukorrektheten og sikre dataintegeritet, ble logikken for
  sidebytte sentralisert, oppdaterte knappe logikken og synkronserte med
  foreldrekomponentet.


  ##### Sentralisering av Logikk for sidebytte


  Det ble implementert en dedikert funksjon med hovedansvar for å håndtere
  endringer av sidetall. Dette sikrer at det eksisterer et kontrollpunkt for all
  sidenavigering.


  ##### Oppdatering av Computed Properties


  Knappe-logikken ble objektet oppdatert slik at den nye funksjonen ble
  inkludert. Dette sørger for at UI-elementene er direkte oppkoblet til logikken
  for sidebytte.


  ##### Synkronisering med foreldrekomponent


  Det ble implementert en watcher som fanger opp når sidetallet får en ny verdi.
  Denne verdien blir deretter sendt til foreldrekomponenten, slik at
  applikasjonen er synkronisert og kan filtrere kortene basert på sidetallet.


  #### Evaulering og resultat


  Dette arbeide viser at reaktivitet i moderne frontend-rammeverk krever en
  bevisst styring av dataflyten. Som utvikler er det mitt ansvar å designe
  løsniger der tilstanden og datalogikken alltid er synkronisert. Ved å innføre
  en strengere type-sikkerhet og sentralisert funksjonalitet, har det blitt
  skapt en kodebase som er enklere å diagnosere og er lettere å vedlikeholde.
KildeHenvisning: ''
---

