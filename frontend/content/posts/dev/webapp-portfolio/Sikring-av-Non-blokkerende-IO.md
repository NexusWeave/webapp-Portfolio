---
created: 2025-12-04T00:00:00.000Z
title: Sikring av Non-blokkerende I/O
ingress: >
  En sårbarhet ble identifisert der den underliggende logikken i Base Class
  benyttet et synkront I/O-kall. Dette hadde potensial til å forårsake
  trådblokkering i det asynkrone API-laget. For å løse dette ble Base
  Class-funksjonen refaktorert med `async def` og `await` i underklassene, samt
  integrering av et asynkront tredjepartsbibliotek. Resultatet var en
  eliminering av flaskehalsen, noe som bekrefter den kritiske viktigheten av
  non-blokkerende I/O for å oppnå robust systemskalerbarhet i asynkrone
  arkitekturer.
star: >
  ### Pontensiell stopp


  Den underliggende logikken i base klassen inneholdt et **synkront I/O-kall**.
  Dette hadde et **pontensiale** for å utgjøre en stopp i applikasjonen da det
  var **pontensielt mulig å forårsake trådblokkering** som hindrer serveren i å
  håndtere andre innkommende API-forespørsler effektivt.


  #### Migrering til ASynkrone Kall


  * Det må legges til asynkront funksjons kall til funksjonen som håndterer det
  asynkrone kallet.

  * Applikasjonen må integrere et tredjepartsbibliotek for å håndtere asynkrone
  kall


  #### Gjennomfør bare Tiltak for Eliminering av I/O Blokkeringen


  Definisjon av Asynkron Signatur & Implementering av Await


  Den eksisterende funksjonen i Base klassen ble omdefinert med nøkkelordet
  async def for å tillate ikke-blokkerende operasjoner, mens underklassene fikk
  en implementering av nøkkelordet await. Dette sikrer at alle kallene til
  funksjonen nå er ikke-blokkerende og fullt asynkront


  Integrering av Asynkrone Verktøy


  Det nødvendige asynkrone tredjepartsbiblioteket ble integrert for å erstatte
  den synkrone I/O-funksjonaliteten.


  #### Eliminering av Blokkering


  Den pontensielle blokkeringen i API-laget ble eliminert. Gjennom migreringen
  til asynkrone kall grigjør applikasjonen nå tråden for å håndtere andre
  forespørsler mens I/O operasjonen pågår. Dette sikrer at gjennomstrømmningen
  ikke lenger er kompromittert av de underliggende base klasse-kallet.  Alle
  underklasser ble oppdatert med et await-kall, som bekrefter at den asynkrone
  kjeden fra API-et ned til base funksjon er ikke-blokkerende og operasjonell.


  Migreringen understreker nødvendigheten av å benytte asynkrone kall framfor
  synkrone kall i applikasjoner med flere API-endepunkter og forventninger om
  høy gjennomstrømning. Dette bekrefter at i en asynkron arkitektur kan selv ett
  enkelt synkront kall i en base klasse være en risiko for en stopp som
  kompromitterer den generelle systemskalerbarheten. Dette poengterer
  viktigheten av å velsekundære biblioteker som støtter \`non-blokkerende I/O\`
KildeHenvisning: ''
---

