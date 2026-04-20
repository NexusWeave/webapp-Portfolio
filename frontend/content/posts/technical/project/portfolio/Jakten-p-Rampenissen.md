---
date: 2025-12-18T00:00:00.000Z
title: Jakten på Rampenissen
ingress: |
  I moderne asynkron webutvikling kan samspillet mellom database og API-modeller
  by på uventede utfordringer, her omtalt som "rampenisser". Denne loggen
  dokumenterer feilsøkingen av en s`qlalchemy.exc.MissingGreenlet`-feil, utløst
  av ulovlig Lazy Loading i en asynkron sesjon. Ved å navigere fra en enkel
  spørring til en dypere, nøstet Eager Loading-struktur, belyses ikke bare den
  tekniske løsningen, men også de påfølgende konsekvensene for API-kontrakten.
  Gjennom en analyse av Pydantics computed properties og SQLAlchemys
  relasjonsstier, utforskes balansen mellom å hente komplette data og å unngå
  teknisk gjeld i presentasjonslaget.
sources: ''
---
### Eliminering av ulovlig Lazy Loading i SQLAlchemy

#### Rampenisser med asynkrone relasjoner


Under utvikling av API-endepunkter for å hente ut repositories og deres tilhørende språkdata, blir det benyttet av SQLAlchomey sin måte å hente ut databaserekorder. Da Pyndantic-modellen skulle validere og mappe dataene, oppsto utfordringen om `sqlalchemy.exc.MissingGreenlet`.

  ```python

  async def select_repositories(self) -> Sequence[RepositoryModel]:
    # Velge modelen som skulle hentes
    QUERY = select(RepositoryModel).options(

    # Koble opp assosiasjons modellen
      selectinload(RepositoryModel.lang_assosiations)

    # Vente på at serveren kjører Statement
     repo = await self.session.execute(QUERY)

     # Returnere alle databaserekorder
     return repo.scalars().all()
  ```


#### Rampenissen, Lazy Loading

Denne ukorrektheten oppstår som en konsekvens av at Pyndantic forsøkte å hente ut navnet på språket før relasjonen var lastet inn i minnet. I en asynkron sesjon tillater ikke SQLAlchemy slike rampestreker, da dette krever et synkront databasekall som blokkerer den asynkrone event-loopen. Dette resulterer til en krasj fordi driveren mangler kontekst for å utføre operasjon asynkront.

Elimineringen av Rampenissen og sikre at Pyndantic hadde en robust tilgang til satte data, ble databaseforespørselen utvidet. Det ble implementert en dypere nesting i selectinload-strukturen. Ved å koble på `.selectinload(LanguageAssosiationModel.language))` på den eksisterende relasjonen, instrueres SQLAlchomy til å hente språket fra `LanguageAssosiationModel` i samme operasjon.

```python
# Revidert kode
async def select_repositories(self) -> Sequence[RepositoryModel]:
  # Velge modelen som skulle hentes
  QUERY = select(RepositoryModel).options(

  # Koble opp assosiasjons modellen
  selectinload(RepositoryModel.lang_assosiations)
    
  #Hente språket fra LanguageAssosiationModel
  .selectinload(LanguageAssosiationModel.language))

  # Vente på at serveren kjører Statement
  repo = await self.session.execute(QUERY)

  # Returnere alle databaserekorder
  return repo.scalars().all()
  ```

#### Evaluering & Refleksjon

Statusen på situasjonen er løst, men implementeringen av dypere "Eager Loading" medførte en ny utfordring i presentasjonslaget. Ved å hente ut hele relasjonsstien, ble JSON-objektet i API-responsen mer komplisert med doble definisjoner av språkdata. Dette er en direkte konsekvens av at SQLAlchemy nå henter hele relasjonsstien, som inneholder både LanguageModel-entiteten og dataene som behandles av Pydantic-modellen.

Det har blitt observert at når man bruker `computed properties` i Pydantic for å forenkle grensesnittet på en robust måte, må man ekskludere de underliggende relasjonsfeltene for å unngå redundans i API-responsen. Selv om det er teknisk korrekt å hente all data, må det evalueres om datastrukturen bærer på teknisk gjeld fra databasens interne relasjonslogikk. Dette demonstrerer at løsningen på en backend-utfordring ofte krever en tilsvarende justering i API-kontrakten for å opprettholde en ryddig datastrøm til frontend.