---
created: 2025-11-27T00:00:00.000Z
tags:
  - dev-journey
title: Sikring av DIP gjennom Prosjektstrukturell Separering
ingress: >
  En strukturell blokkering i prosjektets eksisterende kodebase forhindret all
  testing, da Forretningslogikken var tett koblet til infrastrukturlaget
  (Fil-I/O og tredjepartsbiblioteker). For å adressere dette, ble det igangsatt
  en tredelt refaktoreringsoppgave. Første fase, som nå er fullført, involverte
  en vellykket konvertering fra monolittisk til flerlagsløsning. Denne
  strukturelle separasjonen – som sikret at Domene ble uavhengig av
  Infrastruktur – eliminerte blokkeringen og etablerte det nødvendige
  fundamentet for Dependency Inversion Principle (DIP). Hovedlæringen er at høy
  testbarhet og Clean Architecture må sikres på prosjektstrukturelt nivå.
star: >
  ### Clean Architecture-prinsippene. 


  Eksisterende kode i prosjektet brøt med Clean Architecture-prinsippene.
  Foretningslogikken var direkte avhengig av infrastrukturlagene, inkludert Fil-
  I/O og spesifikke tredjepartsbiblioteker. Dette gjør at det ikke er mulig å
  teste prosjektet.


  #### Eliminering av den strukturelle blokkeringen for tilgang til testkoden


  Oppgaven var tredelt, først må prosjekt strukturen refaktoreres, filene må
  refaktoreres til den nye prosjekt arkitekturen og til slutt må testene
  skrives.


  #### Refaktorering av prosjektstrukturen


  Prosjektet måtte konventeres fra en monolittisk arikitektur til en
  flerlagsløsning for å implementere Prinsippet om Clean-architecture


  #### Kode- og Filflytting


  Prosjektet ble konvertert fra en monolittiske arkitekturen til en
  flerlagsløsning for å implementere Prinsippet om Dependency Intervension
  Principple ( DIP ). Dette involverte opprettelsen av fire seperate prosjekter
  (Domain, Infrastructure, Test, APIj) og etableringen av korrekte
  avhengighetspreferanser mellom disse prosjektene.


  #### Strukturell Mål Nådd


  Den strukturelle blokkeringen for tilgang til testkoden ble eliminert.
  Løsningen består av fire seperate prosjekter og er klar for filflytting.



  #### Dependency Inversion Principle


  Hovedinnsikten er at DIP må sikres på prosjektstrukturnivå ved å separere
  Domene fra Infrastruktur. Dette er en forutsetning for høy testbarhet og
  opprettholdelse av Clean Architecture
KildeHenvisning: ''
---

