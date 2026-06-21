---
date: 2026-05-08T22:00:00.000Z
title: Teknisk drift og arkitekturoptimalisering gjennom AI-integrasjon
ingress: |
  I dag har jeg jobba med å få datamodellene og det som faktisk vises på skjermen til å snakke bedre sammen. Ved å bruke AI som en aktiv sparringspartner har jeg fått synkronisert språkteknologiene i backend, fiksa noen irriterende bygg-feil med ressursmapping, og polert litt på brukeropplevelsen i porteføljen.
status: |
  #### Program informasjon
  *Skrevet i samarbeid med AI - Gemini*
  **Teknologi** - FastAPI, Nuxt 4, SQLAlchemy, Sass
  **Verktøy** - Gemini CLI, Git, Shell-integrasjon

  #### Dagens Aktiviteter
  * Vi forbedret `GithubDatabaseHandler` funksjonaliteten som automatisk synkroniserer språkbytes og tvinger alle språknavn til små bokstaver for å sikre at dataen er korrekt.
  * Identifiserte og rettet skrivefeil i ikon-referanser (nunjucks/liquid) og oppdaterte whitelisten for å sikre feilfrie produjonsbygg under Nuxt-prerendering.
  * Standardiserte ikonstørrelser og oppdaterte layout-begrensninger i porteføljen.
  * Orkestrerte en kontrollert merge mellom `documentation` og `main`.

  #### Motivasjon & Energi - 10 / 10
  Dagen har vært skikkelig produktiv. Samarbeidet med AI har tatt unna mye manuelt dritarbeid, og det føles godt å se ting falle på plass. Dagen er så fin den kunne bli.
sources: ''
--- 

Datamodellene i systemet og det visuelle hang ikke helt sammen, noe som førte til bygg-feil og en litt luggete brukeropplevelse, spesielt når det kom til mapping av ressurser og ikoner.

Hensikten var å tette dette gapet ved å rydde opp i dataene i backend og flikke litt på frontenden, slik at vi endelig fikk en feilfri produksjonsbygg.

* For å løse dette har jeg gjennomført følgende tiltak:

* Jeg har forbedret `GithubDatabaseHandler` slik at den automatisk synkroniserer språkbytes og teknologi fra GitHub, og tvinger alle språknavn til små bokstaver for å holde dataen ryddig.
* Jeg har funnet og fiksa skrivefeil i ikon-referansene og oppdatert whitelisten for å slippe unna feil under Nuxt-prerendering.
* Jeg har standardisert ikonstørrelser, fjerna border-radius på tekniske logoer, og lagt inn en grense på 81 tegn for prosjektbeskrivelser så griden ser bra ut.
* Jeg har kjørt en merge av `documentation` inn i `main` og brukt AI-agenten til å kjapt skjønne de mer komplekse sammenhengene.

Gjennom dette arbeidet har jeg fått redusert teknisk gjeld og gjort portefølje-visningen mye mer stabil. Samarbeidet med AI har vist hvor effektivt man kan optimalisere på tvers av stacken, og jeg sparte sikkert 4-6 timer med kjedelig manuelt arbeid.
