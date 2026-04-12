---
date: 2025-12-19T00:00:00.000Z
title: Automatisert Infrastruktur for Isolerte miljøer (CI/CD) Prosesser
ingress: |
  Hvordan sikrer man at datamaskinen alltid finner frem til de riktige verktøyene uten mennesklig hjelp? Ved å etablere en fast struktur for digitale matbokser, har jeg laget et selvgående system som automatisk kobler seg til riktig miljø. Løsningen sikrer en pålitelig og reproduserbar arbeidsflyt, der systemet selv finner de nødvendige oppskriftene for en sikker og rask programvarekjøring uavhengig av hvilken maskin som benyttes.
status: |
  #### Dagens Aktiviteter

  * Identifiserte at operativsystemet ikke fant det <abbr title="forkortet :venv  - Et miljø som er isolert mot andre miljøer">Virtuelt miljøet</abbr>, noe som hindret tilgang til nødvendige konfigurasjonsfiler og gjorde verktøyene upålitelige.
  * Opprettet en fysisk destinasjon for lokale verktøy ved hjelp av kommandoen `mkdir -p \~/.local/bin` for å sikre at systemet har et fast punkt å lete etter verktøy i.
  * Etablerte en fast struktur som gjør at maskinen automatisk finner og kobler seg til riktig virtuelt miljø uten manuelt arbeid.
  * Kontrollerte koblingen med `which python` for å bekrefte at systemet bruker riktig versjon og at installasjon av nødvendige avhengigheter skjer i korrekt miljø.
  * La til  en selvgående rutine for oppkobling som sikrer en stabil, reproduserbar og sikker programvarekjøring.
  * Reduserte tidsbruk og fjernet behovet for manuell intervensjon ved hver oppstart av prosjektet.

  #### Motivasjon & Energi   10  /  10

  Dagen er så fin den kan bli
sources: ''
---

Under oppstarten av arbeidsmiljøet for et prosjekt oppstod det en situasjon der `Linux`-operativ systemet ikke klarte å finne riktig <abbr title="forkortet :venv  - Et miljø som er isolert mot andre miljøer">Virtuelt miljø</abbr>. Dette hindret systemet å lese de nødvendige konfigurasjonsfilene, noe som førte til at utviklingsverktøyet ikke var pålitelig, som det skulle være. Jeg hadde et behov for at maskinen skulle vite nøyaktig hvor den skulle lete for å finne prosjektets virtuelle miljø, uten at jeg manuelt måtte gripe inn.

Målet mitt var å bygge et virtuelt miljø og automatisere rutinen ved å koble opp mot den spesifikke miljøet.

* Ved å bruk av kommandoen `mkdir -p ~/.local/bin`, laget jeg  en fysisk destinasjon for lokale verktøy og snarveier. Dette gjorde det mulig for systemet å se og koble seg opp mot korrekt virtuelt miljø. Jeg vertifiserte deretter koblingen med kommando `which <abbr title="Teknologi for å skrive kode">python</abbr>` som forteller brukeren hvilken kode miljø som er aktivt i øyblikket, med dette sikret jeg at alt pekte på den riktige  versjonen slik at jeg kunne installere riktige oppskrifter for hjelpe filer.
* Ved å automatisere rutinen å koble seg opp mot det virtuelle miljøet, vertifiserte jeg at systemet kunne finne prosjektets python programvare.

Dette tiltaket sørger for at det virtuelle miljøet er stabil og et selvgående system som nå prioriterer riktig virtuelt miljø helt automatisk. Dette skaper en reproduserbar og sikker programvarekjøring. Ved å automatisere denne rutinen å koble seg opp mot verktøyet automatisk, reduseres det tidsbruken på å koble seg opp mot den virtuelle miljøet, uten å kunne å koble seg opp mot det virtuelle miljøet.
