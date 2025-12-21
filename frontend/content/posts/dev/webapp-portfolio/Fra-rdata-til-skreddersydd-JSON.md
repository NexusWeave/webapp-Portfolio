---
created: 2025-12-18T00:00:00.000Z
tags:
  - dev-journey
  - news
title: Fra rådata til skreddersydd JSON
ingress: >
  Etter å ha overvunnet asynkrone utfordringer i backend, oppstår ofte nye
  utfordringer som “Hvordan presentere komplekse datastrukturer på en ryddig og
  effektiv måte?” Denne loggen utforsker fenomenet "Ekkoet fra API-responsen",
  der duplikasjoner av data skaper støy i kommunikasjonen mellom backend og
  frontend. Ved å utnytte Pydantic sin funksjonalitet for ekskludering av felt
  og computed properties, demonstreres en overgang til en "Single Source of
  Truth"-modell. Artikkelen belyser viktigheten av Separation of Concerns, der
  backend tar det fulle ansvaret for datatransformasjon for å levere et
  skreddersydd og profesjonelt grensesnitt som avlaster frontenden.
star: >
  ### Bruk av Pyndantic for en robust “Source of Truth”


  #### Ekkoet fra API-responsen


  Etter at utfordringen med asynkron innlastning (`MissingGreenlet`) ble løst,
  oppstod det en ny situasjon i presentasjonslaget. Selv om dataene nå var
  tilgjengelige, innehold JSON-responsen duplikate data. API-et returnerer både


  * Rå relasjonsdata fra databasen

  * Bearbeidede data som er genert av Pydantic sin `computed_property`.


  #### Single Source of Truth


  Det var kun den bearbeidede dataen som skulle returneres. Å sende rådataen i
  tillegg skapte forvirring for endepunktet og  økte duplikasjon i API-et. Det
  er en standard praksis å vise tillit til bibliotek som Pyndantic og at
  modellen er robust nok til å transformere dataen korrekt, uten lekasje i den
  underliggende databasestrukturen.


  #### Ekskludering av rådata i Pyndantic modellen


  For å rydde den duplikate responsen, valgte jeg å følge standarden i Pydantic
  modellen, ved å ekskludere Feltet som peker mot tabellen. Ved å markere
  relasjonsfeltet med exclude = True, sikret jeg at dataene er tilgjenelige for
  den interne logikken, men skjult for sluttbrukeren.


  Teknisk implementering


  ```python


  class GithubModel(BaseModel):
      
      #   Initialize methods and database

      lang_assosiations: List[LanguageAssociationModel] = Field(..., exclude= True)

      @computed_field
      @property
      def languages(self) -> List[Dict[str, str | int]]:
          
          languages: List[Dict[str, str | int]] = []

          for assec in self.lang_assosiations:
              
              if assec.language.id == assec.lang_id and self.repo_id == assec.repo_id:
                  languages.append({"language": assec.language.language, "bytes": assec.code_bytes})
          return languages
  ```


  Dette gjør at Pundantic filtrerer språk informasjonen.


  Den tar inn databasestrukturen (Eager Loading), utforer transforasjonen, og
  leverer kun den ferdige bearbeidede listen med språknavn tilbake til
  endepunktet.


  #### Skreddersydd API-respons


  Ved å bruke exclude-True ble JSON-outputen fra API-et nøyaktig slik som
  frontenden hadde behov for. All duplikat data detaljer er fjernet fra
  responsen. Resultatet er et rent og forutsigbart grensesnitt hvor
  informasjonen som deles er begrenset til det som er nødvendig for frontenden
  til å utføre sine oppgaver.


  #### Arkitektonisk modenhet


  Ved å følge bibliotek-standarder og bruke innebygde funksjonalitet, oppnår man
  med det vi kaller for en robust løsning som er enklere å vedlikeholde.


  #### Seperation of Consern


  Gjennom denne prosessen har det tydliggjort at bearbeiding av data er en ren
  backend oppgave. Ved å forenkle komplekse relasjoner, til strukturert data før
  de sendes over nettverket. Opprettholder vi et skille mellom lagene i
  applikasjonen


  * Backend håndterer databaselogikk, asynkrone relasjoner og transformerer
  rådata til strukturert data.

  * Frontend Presenterer dataen for brukeren, uten håndtere komplekse
  databaselogikk og rådata.
KildeHenvisning: ''
---

