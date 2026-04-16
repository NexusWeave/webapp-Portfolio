---
date: 2025-12-15T00:00:00.000Z
title: Sikring av Unikhet og Datakontrakt
ingress: |
 Arbeidet med å stabilisere databaselaget har ført til viktige utbedringer i håndteringen av prosjekt- og språkdata. Ved å legge til en `Get or Create`-strategi og oppgradere <abbr title ="Et typesikkert bibliotek for datavalidering og innstilling av data i Python, dette reduserer risiko marginen.">Pydantic</abbr>-modeller til <abbr title="Versjon 2">V2</abbr>, er lagring av unike språkobjekter og datahenting nå sikret mot `IntegrityError` og valideringskrasj. To av tre hovedfeil er løst, mens gjenstående arbeid fokuserer på å rette en krasj i assosiasjonstabellen for å sikre full systemintegritet.
status: |

sources: ''
---
Applikasjonen klarte å laste ned prosjekter fra Github, men feilet i å lagre de unike kode språkene til en dedikert språk-tabell. Denne tabellen er viktig for å sikre at språk data lagres effektivt. Feilen indikerte at lagringen av selve språk-<abbr title =" Samling av data">objekt</abbr>ene sviktet.

Funksjonaliteten for å hente de lagrede prosjektene krasjer som en konsekvens av at <abbr title="Object-Relational Mapping - er en teknikk som bygger en bro mellom to forskjellige måter å organisere informasjon ">ORM</abbr>'en ikke klarte å å fullføre opprettelsene når dataen skulle opprettes.

Etter at applikasjonen har hentet prosjektene og språkene, feilet forsøket på å opprette assosiasjoner mellom prosjektene og språkene i <abbr title="en tabell som lagrer relasjoner mellom prosjekter og språk">assosiasjons-tabellen</abbr>.

* Jeg identifiserte, feilsøkte og løste de tre separate, men relaterte, ukorrekthetene i ORM- og datatilgangslagene.
* Sikret unik og pålitlig lagring av språkobjektene
* Korrigerte Mange-til-mange assosiasjonen mellom språk og prosjekter
* Sikret at objektet som blir hentet ut av Repository-tabellen er pålitlige og fullstendige, og at de ikke krasjer ORM-et som en konsekvens av ufullstendige relasjonsdata.


### Stabilisering av Språkpersistens

Det ble identifisert at språkobjektene aldri ble korrekt lagret i databasen. Selve koden for lagring av språkene krasjet før de ble lagret, noe som forhindret alle påfølgende operasjoner. For å isolere utfordringen og verifisere resten av datalastingens flyt, ble den defekte kodeseksjonen midlertidig kommentert ut.

For å sikre en unik og pålitelig lagring av språk, ble følgende logikk lagt til
* En sjekk ble lagt til som først forsøkte å hente ut språket bassert på navnet fra databasen.

* Dersom språket allerede fantes, ble språk objektet instansert og lagt til sesjonen, dersom språket ikke fantes i databasen, ble det instansert og lagt til i databasen.

<abbr title ="Et typesikkert bibliotek for datavalidering og innstilling av data i Python, dette reduserer risiko marginen.">Pydantic</abbr>-modellen ble grundig revidert for å sikre full integritet med databasestrukturen.

* Modellen ble omstrukturert fra Pydantic <abbr title="Versjon 1">V1</abbr> → <abbr title="Versjon 2">V2</abbr>, for å dra nytte av forbedringer i datavalidering og ytelse, og for å sikre at den nøyaktig reflekterer de dataene som hentes fra ORM-kontrakten.
* Modellen ble oppdatert til å inkludere de nødvendige dataene, for en komplett representasjon av det hentede objektet.
* Alle Klassemedlemmene som ikke var en del av datautvekslingen ble fjernet fra modellen. For å sikre at datakontrakten mellom ORM-laget og <abbr title="Application Programming Interface, et bindeledd mellom ulike programvarekomponenter">API</abbr>-svaret var komplett, pålitelig og fri for forstyrrende elementer.

To av de tre utfordringene i databaselaget er nå løst, og arbeidet har bekreftet viktigheten av presis arkitektur. Lagring av unike språkobjekter er stabilisert ved hjelp av en pålitelig "Get or Create"-strategi, som effektivt forhindrer `IntegrityError`-krasj og sikrer dataintegriteten. Samtidig er feil ved henting av data eliminert gjennom en grundig revisjon av Pydantic-modellene. Disse modellene fungerer nå som en nøyaktig refleksjon av dataene fra ORM-kontrakten, noe som er kritisk da ufullstendige modeller eller fremmede klassemedlemmer ellers vil krasje valideringen ved datahenting.

Denne feilsøkingen har validert viktigheten av “Get or Create”-logikk for data som skal være unike, for å forhindre `IntegrityError`-krasj og sikre dataintegriteten. Det ble markert hvor viktig det er at Pydantic-modeller er en nøyaktig refleksjon av den underliggende ORM-strukturen. Ufullstendige Pydantic-modeller eller modeller med fremmede klassemedlemmer vil krasje valideringen når data hentes.

Til tross for disse forbedringene gjenstår det fortsatt en krasj i assosiasjonstabellen, og dette er det neste fokuset for å fullføre stabiliseringen av systemet. Erfaringen fra denne feilsøkingen har tydeliggjort at både pålitelig logikk for unike data og streng samsvar mellom Pydantic-modeller og den underliggende ORM-strukturen er helt nødvendig for en stabil drift.
