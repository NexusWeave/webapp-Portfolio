---
created: 2025-12-09T00:00:00.000Z
tags:
  - dev-journey
title: Etablering av Test Coverage i .NET via Coverlet for kvalitetsikring
ingress: >
  En situasjon ble identifisert der .NET-utviklingsmiljøet manglet etablert
  funksjonalitet for å måle Test Coverage, noe som førte til blindsoner i
  vurderingen av teknisk gjeld og risiko. Gjennom målrettet feilsøking ble det
  funnet at den essensielle NuGet-referansen til Coverlet.MSBuild manglet i
  prosjektfilene. Etter korrigering og integrasjon genererer testkjøringen nå en
  konkret, målbar prosentandel for dekning. Dette gir utviklerne mulighet til å
  visualisere dekningen i sanntid og målrette refaktorering mot kompliserte,
  utestede deler av kodebasen. Læringen bekrefter at integrerte verktøy er
  essensielt for å eliminere risiko og sikre profesjonell utvikling.
star: >
  ### Test Coverage i .NET


  #### **Blindsoner i Testdekning**


  Utviklingsmiljøet manglet en etablert funksjonalitet eller et verktøy for å
  måle, rapportere og visualisere hvor stor andel av .NET-prosjektets kodebase
  som ble dekket av enhetstester. Dette skapte blindsoner i utviklingsprosessen
  og gjorde det umulig å objektivt vurdere risiko og teknisk gjeld knyttet til
  utestet kode.


  ### Etablering av Målingsmekanisme


  #### Automatisert verktøykjede for å genere test-coverage-rapporter. 


  Disse rapportene skal gi et objektivt grunnlag for å styre utviklingsarbeidet
  og målrette 


  testing mot utestede deler av applikasjonen. 


  ### VerktøyImplementering og Diagnosering


  #### Diagnosering og Etablering av Verktøykjede


  Etter en ukers målrettet feilsøking, som inkluderte testing av ulike
  arkitekturoppsett og konsistent dialog med AI


  Diagnosering og Løsning


  Det ble funnet at .NET-prosjektet manglet den essensielle referansen til
  NuGet-pakken Coverlet.MSBuild. Dette forhindret genreringen av dekningstall
  under testkjøring. Løsningen var å implementere referansen til
  Coverlet.MSBuild i testprosjektfilene.


  #### Etablert Målbar Kvalitetsikring


  Det ønskede resultatet ble oppnådd, Testverktøyet er nå fullt funksjonelle, og
  testkjøringen genererer en konkret prosentandel for testdekning. Dette gir et
  objektivt mål på hvor mye av kodebasen er dekket.


  Effekten av dette gir utviklerene muligheten til å visualisere dekningen i
  sanntid. Det  gjør utviklingen betydelig lettere. Det er nå mulig å
  identifisere avhengighetsfeil og andre svakheter som gjør enhetstesting
  komplisert, og dermed målrette refaktoreringen. 


  #### Test Coverage og blindsoner


  Læringen bekrefter at Test Coverage er essensielt for profesjonell utvikling.
  Uten et verktøy som Coverlet for å måle dekningen, oprerer teamet med
  blindsoner i teknisk gjeld og risko.


  Resultatet viser viktigheten av at testverktøyet er korrekt integrert i
  prosjektfilene for å sikre at byggeprosessen korrekt intstrumenterer og måler
  kodebasen.
KildeHenvisning: ''
---

