---
date: 2025-12-04T00:00:00.000Z
title: Sikring av Non-blokkerende I/O
ingress: |
  En sårbarhet ble identifisert der den underliggende logikken i Base Class benyttet et synkront I/O-kall. Dette hadde potensial til å forårsake trådblokkering i det asynkrone API-laget. For å løse dette ble Base Class-funksjonen refaktorert med `async def` og `await` i underklassene, samt integrering av et asynkront tredjepartsbibliotek. Resultatet var en eliminering av flaskehalsen, noe som bekrefter den kritiske viktigheten av non-blokkerende I/O for å oppnå robust systemskalerbarhet i asynkrone arkitekturer.
status: |
  Dagens Aktiviteter

  #### Motivasjon & Energi 10 / 10

  Dagen er så fin den kan bli
sources: ''
---

Den underliggende logikken i hoved klassen for <abbr title="Application Programming Interface – en kobling som lar to systemer utveksle informasjon på en trygg måte">API</abbr>-konfigurasjoner inneholdt et <abbr title="En metode der systemet må vente på at én oppgave blir ferdig før neste kan starte">synkront</abbr> <abbr title="Innhenting og utsending av informasjon">I/O</abbr>-kall, med denne teknikken var det et pontensiale for at applikasjonen kunne stoppe uventet, som en konsekvens at det kunne hindre applikasjonen i å håndtere andre innkommende API-forespørsler effektivt.

Målet er at programmet skal kunne håndtere flere forespørsler samtidig. Oppgaven blir å bytte ut det nåværende biblioteket `requests` med et <abbr title="en teknikk som lar programmet håndtere flere forespørsler samtidig">asynkront</abbr> bibliotek som `httpx`, for å legge til asykront funksjonalitet.

* De eksisterende funksjonene i API-konfigurasjons klassen ble omdefinert med nøkkelordet `async` for å tillate at funksjonen kan sende flere forespørsler samtidig, mens jeg la til nøkkel ordet `await` i arve klasseneDette sikrer at alle kallene til funksjonen nå kan håndtere flere forespørsler samtidig.

Ved å erstatte teknikkene for tjenestene, kan vi stole på at systemet frigjør ressurser mens I/O-operasjoner pågår, programvaren kan nå håndtere flere forespørsler samtidig. Dette sikrer at gjennomstrømmingen ikke lenger begrenses av kall til baseklassene. Alle underklasser er oppdatert med `await`, som bekrefter at den asynkrone kjeden fra <abbr title="Application Programming Interface">API</abbr>-et ned til basisfunksjonene frigjør ressurser etter behov.

Erstattningen understreker hvorfor det er viktig å benytte asynkrone kall framfor synkrone kall i applikasjoner med flere API-endepunkter og forventninger om høy gjennomstrømning. Dette bekrefter at i en asynkron arkitektur kan selv ett enkelt synkront kall i en base klasse være en risiko for en stopp som kompromitterer den generelle systemskalerbarheten. Dette poengterer viktigheten av å velsekundære biblioteker som støtter `non-blokkerende I/O`
