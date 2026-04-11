---
date: 2025-12-19T00:00:00.000Z
title: Automatisert Infrastruktur for Isolerte miljøer (CI/CD) Prosesser
ingress: |
  Hvordan sikrer man at datamaskinen alltid finner frem til de riktige verktøyene uten mennesklig hjelp? Ved å etablere en fast struktur for digitale matbokser, har jeg laget et selvgående system som automatisk kobler seg til riktig miljø. Løsningen sikrer en pålitelig og reproduserbar arbeidsflyt, der systemet selv finner de nødvendige oppskriftene for en sikker og rask programvarekjøring.
status: |
  #### Motivasjon & Energi   10  /  10 
sources: ''
---

Under oppstarten av arbeidsmiljøet for et prosjekt oppstod det en situasjon der Linux-operativ systemet ikke klarte å finne riktig matboks (venv). Dette hindret systemet å lese de nødvendige konfigurasjonsfilene, noe som førte til at utviklingsverktøyet ikke var pålitelig, som det skulle være.  Jeg hadde et behov for at maskinen skulle vite nøyaktig hvor den skulle lete for å finne prosjektets matbokser, uten at jeg manuelt måtte gripe inn.

Målet mitt var å bygge en digital matboks og automatisere rutinen ved å koble opp mot den spesifikke digitale matboksen.

* Ved å bruk av kommandoen `mkdir -p ~/.local/bin`, laget jeg  en fysisk destinasjon for lokale verktøy og snarveier. Dette gjorde det mulig for systemet å se og koble seg opp mot korrekt matboks. Jeg vertifiserte deretter koblingen med kommando `which python` som forteller brukeren hvilken kode miljø som er aktivt i øyblikket, med dette sikret jeg at alt pekte på den riktige  versjonen slik at jeg kunne installere riktige oppskrifter for hjelpe filer.
* Ved å automatisere rutinen å koble seg opp mot matboksen, vertifiserte jeg at systemet kunne finne prosjektets python programvare.

Dette tiltaket sørger for at matboksen er stabil og et selvgående system som nå prioriterer riktig matboks helt automatisk. Dette skaper en reproduserbar og sikker programvarekjøring. Ved å automatisere denne rutinen å koble seg opp mot verktøyet automatisk, reduseres de tidsbruken på å koble seg opp mot den digitale matboksen, uten å kunne å koble seg opp mot matboksen.
