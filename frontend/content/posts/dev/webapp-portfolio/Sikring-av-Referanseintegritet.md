---
created: 2025-12-17T00:00:00.000Z
tags:
  - dev-journey
title: Sikring av Referanseintegritet
ingress: >
  Denne artikkelen er en fortsettelse på Sikring av Unikhet og Datakontrakt og
  utforsker løsningen på integritetsfeil i et asynkront datasystem. Ved å
  analysere krasj i persistenslaget knyttet til mange-til-mange-relasjoner,
  belyses risikoen ved manuell håndtering av fremmednøkler før
  databaseinitialisering. Gjennom en refaktorering fra rå ID-styring til bruk av
  ORM-ens "Unit of Work"-mønster og objektbaserte assosiasjoner, demonstreres
  det hvordan man sikrer atomær lagring og referanseintegritet i komplekse
  relasjonsdatabaser.
star: >
  ### Fra rå ID-håndtering til objektbasert assosiasjon


  #### Brudd på relasjonell Integeritet


  Etter vellykket asynkron henting av repositories og tilhørende språk-data,
  oppstod det en utfordring under opprettelsen av relasjonene i
  assosisjonstabellen. Utfordringen manifisterte seg som en krasj i
  presistenslaget når applikasjonen forsøkte å binde sammen språk-entiteter med
  de respektive repositoriene.


  #### Teknisk Analyse av Kilden


  Diagnosen viste at feilen var en konsekvens av et brudd på
  fremmednøkkel-restriksjoner. Applikasjonen forsøkte å persistere kombinasjoner
  av språk-ID og repository-ID i assosiasjonstabellen før de respektive
  entitetene var ferdig initialisert og tildelt unike identifikatorer i
  databasen. Dette medførte at asspsoasjonstabellen refererte til nøkler som
  ikke eksisterte i foreldretabellene.


  ##### Tidligere utfordrende Desing.


  ```python

  def new_assoc_record(self, repo: int, lang: int, code_bytes: int):
    association_obj = LanguageAssosiationModel(repo_id = repo.repo_id, lang_id = language.id, code_bytes = code_bytes)
    self.session.add(association_obj)

  ```


  Implementering av objektbasert assosiasjon


  For å løse utfordringen med manglende identifikatorer ved initialisering, ble
  metoden new\_assoc\_record redesignet. I stedet for å operere med
  fremmednøkkel-ID-er, tar metoden nå i mot komplette instanser av
  RepositoryModel og LanguageModel.


  Ved å knytte selve modellobjektene til LanguageAssosiationModel, overlates
  håndteringen av nøkkelavhengigheter til ORM-ens enhet-av-arbeid-mønster (Unit
  of Work). Dette sikrer at assosiasjonen først persisteres når de relaterte
  objektene har gylldige identifikatorer, dette eliminerer bruddet på
  integritetsreglene.


  ##### Ny og Robust Design


  ```python

  def new_assoc_record(self, repo: RepositoryModel, lang: LanguageModel,
  code_bytes: int) -> None:
    association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
    self.session.add(association_obj)

  ```


  #### Eliminering av integritetsbrudd


  Etter implementeringen av det nye designet for new\_assoc\_record, ble
  Integeritetsbruddene eliminert. Ved integrerelogikken for assosiasjonstabellen
  direkte i arbeidsflyten for lagring av repositories, sikres det at relasjonene
  opprettes i rekkefølge. Dette har resultert til en robust prosess der
  koblinger mellom repositories og språk presisteres stabilt og i tråd med
  databasens integritetskrav.


  #### Evaulering og Refleksjon


  Erfaringen bekrefter, operasjoner med råd fremmednøkkel-ID'er i et asynkront
  miljø medfører høy risiko for IntegertyError. 


  Arbeidet har gitt en dypere forståelse for rekkefølgeavhengigheten i
  relasjonsdatabaser. Selv om dataene skrives asynkront, må dataene persisteres
  sekvensielt for at fremmednøkler skal være gyldige. Bruken av modellobjekter
  som argumenter i new\_assoc\_record sikrer at systemet er robust mot tidsfeil.


  Konklusjonen er at den nye implementeringen fungerer som en intelligent
  oppdateringsmekanisme som forebygger duplikater i assosiasjonstabellen. Dette
  reduserer behovet for kompleks feilhåndtering senere i logikken og sikrer en
  renere databasetilstand over tid. 
KildeHenvisning: ''
---

### Teknisk beskrivelse av modellen

#### **LanguageAssosiationModel**

##### **Modell arkitektur**

Modellen fungerer som en assosiasjonstabell som dekomponerer mange-til-mange-relasjonen mellom Language og RepositoryModel. I stedet for en enkel kobling, lagrer den også metadata om relasjonen, som kode\_byte.

Ved å definere en relasjon slik, sikrer vi at

* Et repository kan være knyttet til ulike språk.
* Ett Språk (som C#) kan være også knyttet til flere Repositorier
* Som en konsekvens av unikheten, forhindrer dette redundante data.

#### Modellens Ansvar

Modellen fungerer som knutepunktet i databasen. Definering av relasjonen på denne måten oppnår vi tre arkitektoniske fordeler

* Mange-til-mange-fleksibilitet
  * Et repository kan være knyttet til flere ulike språk som (C# og C)
* Don't Repeat Yourself
  * Ett enkelt språk, kan knyttes til ubegrenset antall repositorier ved å være unik.
* Data-normalisering
  * Som en konsekvens av unikheten i koblingene, forhindrer  modellen redundante data. Sikrer at databasen forblir konsistent og effektiv under skalering.
