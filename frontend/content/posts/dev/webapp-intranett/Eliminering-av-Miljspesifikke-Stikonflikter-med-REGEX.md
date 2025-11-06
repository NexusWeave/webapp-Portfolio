---
created: 2025-11-04T00:00:00.000Z
tags:
  - dev-journey
title: Eliminering av Miljøspesifikke Stikonflikter med REGEX
ingress: >
  Kritisk feilsøking av Intranettets navigasjons-API avdekket en utfordrende
  diagnostiserbar, miljøspesifikk feil som manifesterte seg kun ved lokal
  kjøring på Linux / MacOS. Denne utfordringen krevde en omfattende
  feilsøkingsprosess for å identifisere kilden til inkonsekvensen mellom ulike
  operativsystemer. Løsningen ble en arkitektonisk forbedring basert på regulære
  uttrykk (REGEX), som sikrer universell stihåndtering og eliminerer fremtidig
  regresjonsfare i alle driftsmiljøer.
star: >
  **Situasjon**

  Navigasjonen for Intranettet, var utilgjengelig i applikasjonen ved lokal
  kjøring. Målet var å identifisere at kilden som forhindret at C#-APIet viste
  denne navigasjonen i applikasjonen. Utfordringen var både utfordrende og
  kritisk, da den indikerte en potensiell inkonsekvens mellom ulike
  driftsmiljøer.


  **Mål/Oppgaver**

  Det ble utført en omfattende feilsøkingsprosess som involverte både API-koden
  og klientkoden som hentet dataene.



  **Handling**


  Etter en hel arbeidsdag ble kilden identifisert en uforutsett feil i koden som
  hentet API-dataene for innholdsvisningen. Feilen var miljøspesifikk (rettet
  mot Windows-miljøet), noe som gjorde det utfordrende å diagnostisere, da koden
  ikke oppførte seg korrekt i andre miljøer.


  For å eliminere miljøavhengigheten ble det valgt å implementere en løsning
  basert på regulære uttrykk (REGEX). Denne metodikken sikrer at håndteringen av
  stier og formateringer fungerer på tvers av ulike operativsystemer (Linux,
  macOS og Windows).


  **Resultat / Erfaring

  **Jeg erfarte at miljøspesifikke feil er de utfordringene som kan være mest
  utfordrende å identifisere og krever et utvidet feilsøkningsomfang. Den
  viktigste læringen er at ved implementering av funksjonalitet som håndterer
  stier eller formatering, er det avgjørende å velge miljøuavhengige verktøy
  (f.eks REGEX) for å sikre en universell robusthet og forhindre regress i både
  utviklingsmiljø og produksjonsmiljø.
---

