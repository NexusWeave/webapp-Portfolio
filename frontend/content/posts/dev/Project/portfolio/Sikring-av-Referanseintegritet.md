---
date: 2025-12-17T00:00:00.000Z
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
star: |
sources: ''
---

Etter vellykket  henting av repositories og tilhørende språk-data, oppstod det en utfordring under opprettelsen av relasjonene i assosisjonstabellen. Utfordringen manifisterte seg som en krasj i lagrings-laget når applikasjonen forsøkte å binde sammen språk-entiteter med de respektive repositoriene.

Utfordringen oppsto som en konsekvens av at applikasjonen prøvde å koble sammen prosjekter og språk i feil rekkefølge. Den forsøkte å registrere koblingen mellom dem i en oversiktsliste før selve prosjektet og språket var ferdig opprettet og hadde fått sine egne "ID-kort" i systemet. Siden systemet har strenge regler for at alt som kobles sammen må eksistere fra før, oppsto det en krasj. Det blir som å prøve å skrive en kontrakt mellom to personer som ennå ikke er registrert i folkeregisteret – systemet nekter å godta koblingen fordi partene den viser til, offisielt sett ikke finnes ennå.

##### Tidligere utfordrende vrtdo.

Etter vellykket <abbr title="Asynchronous - en måte å kjøre flere operasjoner samtidig">asynkron</abbr> henting av repositories og tilhørende språk-data, oppstod det en utfordring under opprettelsen av relasjonene i assosiasjonstabellen. Utfordringen manifesterte seg som en krasj i lagrings-laget når applikasjonen forsøkte å binde sammen språk-entiteter med de respektive repositoriene.
Etter vellykket asynkron henting av prosjekter og tilhørende språk-data, oppstod det en utfordring under opprettelsen av relasjonene i assosiasjonstabellen. Utfordringen manifesterte seg som en krasj i lagrings-laget når applikasjonen forsøkte å binde sammen språk-entiteter med de respektive prosjektene.

Denne feilen oppsto fordi applikasjonen prøvde å koble sammen prosjekter og språk i feil rekkefølge. Den forsøkte å registrere koblingen i en oversiktsliste før selve prosjektet og språket var ferdig opprettet og hadde fått sine egne "ID-kort" i systemet. Siden systemet har strenge regler for at alt som kobles sammen må eksistere fra før, oppsto det en krasj. Det blir som å prøve å skrive en kontrakt mellom to personer som ennå ikke er registrert i folkeregisteret – systemet nekter å godta koblingen fordi partene den viser til, offisielt sett ikke finnes ennå.

#### Tidligere utfordrende design

I det tidligere designet for `new_assoc_record` opererte metoden med rå ID-er for både repository og språk.

```python
def new_assoc_record(self, repo: int, lang: int, code_bytes: int):
  # Her brukes rå ID-er som kanskje ikke eksisterer i databasen ennå
  association_obj = LanguageAssosiationModel(repo_id = repo.repo_id, lang_id = language.id, code_bytes = code_bytes)
  self.session.add(association_obj)
```
Dette skapte en risiko for `IntegrityError`-krasj, spesielt i et asynkront miljø hvor rekkefølgen av operasjoner ikke er garantert. Hvis metoden ble kalt før objektene var fullstendig opprettet, ville forsøket på å bruke ugyldige fremmednøkler føre til systemstans.

#### Smidigere løsning med ORM-objekter
For å løse utfordringen med manglende identifikatorer, laget jeg metoden `new_assoc_record` på nytt. I stedet for å operere med rå tall-ID-er, tar metoden nå imot komplette instanser av `RepositoryModel` og `LanguageModel`.

Ved å knytte selve modellobjektene sammen, overlates håndteringen av avhengigheter til systemets innebygde <abbr title="(Unit of Work) - en måte å håndtere transaksjoner og endringer i en database på">transaksjonshåndtering</abbr>. Dette sikrer at koblingen først lagres når de relaterte objektene har fått gyldige ID-er, noe som fjerner bruddet på integritetsreglene.
```python
  def new_assoc_record(self, repo: RepositoryModel, lang: LanguageModel, code_bytes: int) -> None:
    association_obj = LanguageAssosiationModel(repository = repo, language = lang, code_bytes = code_bytes)
    self.session.add(association_obj)
  ```
Etter at jeg omgjorde funksjonen, ble integritetsbruddene fjernet. Ved å integrere logikken direkte i arbeidsflyten, sikres det at relasjonene opprettes i riktig rekkefølge. Dette har resultert i en pålitelig prosess der koblinger mellom prosjekter og språk lagres stabilt.


Erfaringen bekrefter at operasjoner med rå fremmednøkkel-ID-er i et asynkront miljø medfører en stor risiko for tekniske feil. Arbeidet har gitt en dypere forståelse for hvordan rekkefølgen i en database fungerer; selv om dataene hentes samtidig, må de lagres korrekt for at koblingene skal være gyldige. Ved å bruke hele modellobjekter som argumenter, har jeg sørget for at systemet tåler tidsavvik og alltid finner riktig informasjon.

Verdien av mitt arbeid med denne oppdateringen ligger i overgangen fra en sårbar håndtering av data til en selvgående prosess som jeg har utviklet. Ved å sikre at systemet nå alltid kontrollerer informasjonen før den lagres, har jeg fjernet en feilkilde som tidligere førte til systemstans og mangelfulle rapporter. Mitt grep sørger for at jeg har fjernet risikoen for feilaktige data, slik at informasjonen som vises alltid stemmer med virkeligheten.

Konklusjonen er at den nye løsningen fungerer som en intelligent oppdateringsmekanisme som hindrer at samme informasjon lagres flere ganger. Dette fjerner behovet for utfordrende feilretting senere og sikrer at databasen holder seg ryddig over tid. Ved å løse problemet på denne måten har jeg redusert teknisk rot og fjernet fremtidig tidsbruk knyttet til reparasjon av data. Jeg har bygget et fundament som tåler vekst, noe som gir en direkte besparelse i form av spart arbeidstid og full tillit til det systemet leverer. Dette er helt avgjørende for at jeg kan garantere en stabil og forutsigbar drift.