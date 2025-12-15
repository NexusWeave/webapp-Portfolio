---
created: 2025-12-15T00:00:00.000Z
title: Sikring av Unikhet og Datakontrakt
ingress: >
  En feilsøkingsprosess ble igangsatt for å adressere tre relaterte feil i ORM-
  og persisteringslagene. Utfordringene involverte manglende unikhet ved lagring
  av kodespråk, krasj ved datahenting på grunn av ufullstendige
  Pydantic-modeller, og feil i Mange-til-Mange-assosiasjonen. De to første
  feilene er nå løst:Språkpersistens ble stabilisert gjennom en robust "Get or
  Create"-strategi for å sikre unikhet i språk-tabellen.Datakontrakten ble
  sikret ved en opprydning og migrering av Pydantic-modellen (V1 $\rightarrow$
  V2) for å nøyaktig reflektere ORM-dataene og fjerne forstyrrende
  klassemedlemmer. .Til tross for disse forbedringene, gjenstår krasj i
  assosiasjonstabellen som hovedfokus for neste steg i stabiliseringen av
  databaselaget.
star: >
  ### Feil i Lagring av Mange-til-Mange Assosiasjon


  #### Lagring av de tilhørende språkene for Repository


  Applikasjonen klarte å laste ned repositorier fra Github, men feilet i å lagre
  de unike kode språkene til en dedikert Kode Språk-tabell. Denne tabellen er
  esensiell for å sikre effektiv lagring av språk-data. Feilen indikerte at
  presistensen av selve språk-objektiene sviktet. 


  #### Krasj ved Henting av Data


  Funksjonaliteten for å hente de lagrede repositoriene krasjer som en
  konsekvens av at ORM ikke klarte å å fullføre opprettelsene når dataen skulle
  opprettes.


  #### Krasj i Assosiasjonstabell


  Etter at applikasjonen har hentet repositoriene, språkene, feilet forsøket på
  å opprette assosiasjoner mellom repoene og språkene.


  ### Stabilisere ORM-relasjoner og Datatilgang


  #### Identifisere, Diagnosere og Løse De Tre Seperate, men Relaterte,
  Ukorrekthetene i ORM- og Datatilganslagene.


  * Sikre unik og pålitlig lagring av språkobjekter

  * Korrigere Mange-til-mange assosiasjonen mellom språk og repositorier

  * Sikre at objektet som blir hentet ut av Repository-laget er pålitlige og
  fullstendige, og at de ikke krasjer ORM-et som en konsekvens av ufullstendige
  relasjonsdata.


  ### Stabilisering av Språkpersistens


  #### Diagnose og isolering


  Det ble identifisert at språkobjektene aldri ble korrekt presistert i
  databasen. Selve koden for persistering av språkene krasjet før de ble lagret,
  noe som forhindret alle påfølgende operasjoner.  For isolering av utfordringen
  og vertifisere resten av datalastingens flyt, ble den defekte kodeseksjonen
  midlertidig kommentert ut.


  #### Get or Create


  For å sikre en unik og pålitelig lagring av språk, ble følgende logikk
  implementert


  * En sjekk ble lagt til som først forsøkte å hente ut språket bassert på
  navnet fra databasen.

  * Dersom språket allerede fantes, ble språk objektet instansert og lagt til
  sesjonen, dersom språket ikke fantes i databasen, ble det instansert og lagt
  til i databasen.


  #### Oppryddning av Datakontrakten


  Pydantic-modellen ble grundig revidert for å sikre full integritet med
  databasestrukturen.


  * Modellen ble migrert fra Pydantic V1 → V2

  * Modellen ble oppdatert til å inkludere de nødvendige dataene, for en
  komplett representasjon av det hentede objektet.

  * Alle Klassemedlemmene som ikke var en del av datautvekslingen ble fjernet
  fra modellen.


  Dette sikrer at datakontrakten mellom ORM-laget og API-svaret var komplett,
  pålitelig og fri for forstyrrende elementer.


  ### Status & Læringsutbytte


  To av de tre feilene er nå løst


  * Lagring av unike språkobjekter er stabilisert ved hjelp av en robust Get or
  Create strategi

  * Feilen ved å henting av data er midlertidig eliminert gjennom en grundig
  revisjon av Pyndantic-modellen, som nå nøyaktig reflekterer de dataene som
  hentes fra ORM-kontrakten.

  * Til tross for disse forbedringene i koden, gjenstår krasj i
  assosiasjonstabell. Dette er neste fokuset for å fullføre stabiliseringen av
  databaselaget.


  #### Læringsutbytte


  #### Unikhet i Data


  Denne feilsøkingen har validert viktigheten av “Get or Create”-logikk for data
  som skal være unike, for å forhindre IntegertyError-krasj og sikre
  dataintegriteten.


  #### Integeritet i Kontrakt


  Det ble markert hvor viktig det er at Pyndantic-modeller er en nøyaktig
  refleksjon av den underliggende ORM-strukturen. Ufullstendige
  Pyndantic-modeller eller modeller med fremmede klassemedlemmer vil kresje
  valideringen når data hentes.
KildeHenvisning: ''
---

