---
date: 2025-12-16T00:00:00.000Z
title: Håndtering av Electron-tilbakerulling i Garuda-Linux
ingress: |
  En oppdatering av utvikler verktøyet **VS Code** skapte en feil i menyene som stoppet alt arbeid. I stedet for tidkrevende feilsøking, valgte jeg strategisk å rulle tilbake  til forrige stabile versjon med linux verktøyet `downgrade`. Dette gjenopprettet arbeidsflyten raskt og fjernet nedetid uten risiko for datatap. Beslutningen var å prioritere rask fremdrift fremfor unødvendig detaljfokus.
parade: ''
star: |
  ### Korrupt Brukergrensesnitt i VS Code

  Etter en nylig oppdatering i `visual-studio-code-bin `(v1.107), i  **Garuda Dr460nized Gaming**-**distribusjon**, oppsto det en uforutsett feil som deaktiverte hovedmenyen i VS Code. Dette gjorde prosjektnavigasjonen og bruken av menyvalgene umulig. Diagnosen indikerte en inkompatibilitet mellom **VS Code** og **KDE Plasma**, spesifikt knyttet til hvordan **Electron-biblioteket** håndterer rendring av globale menyer i skrivebordsmiljøet.

  Da denne feilen ble tatt opp idag, ønsket jeg å bringe systemet tilbake til en fungerende versjon, siden dette er et arbeidsverktøy for både profesjonell koding og hobby koding.
  Jeg skal bekrefte hvor feilen ligger, om det er VS Code-konfigurasjon eller operativsystemet og rulle tilbake til en tidligere versjon for å eliminere feilkilden uten at jeg mister data.
  Uten om å vertifisere feilen direkte i  terminalen, skjønte jeg raskt at dette var en feil som hadde oppstått iVSCode siden det var den eneste applikasjonen denne feilen kom med.

  * **Isolering og Diagnose** - Det ble identifisert at feilen lå på pakkenivå og ikke den generelle systemkonfigurasjonen. Feilen hadde kommet en KDE-oppdatering, selv om dette var isolert til applikasjonen. Behovet for å endre pakke versjonen til en tidligere utgave ble prioritert for å gjenopprette arbeidsflyten.
  * **Utførelse & Teknikk** - Før jeg rullet tilbake til en tidligere versjon forsøkte jeg å tvinge VS Code håndtere hovedmenyen, i programmeet. Jeg konkluderte raskt med at det var nødvendig å rulle tilbake, for å være effektiv da instaliseringen av `window.titleBar`, ikke gikk som forventet.
  * **Rollback** - Jeg benyttet verktøyet `downgrade` for manuelt å rulle pakken tilbake til tidligere versjon. Siden dette er et Arch-basert system, ble følgende system kommando brukt `sudo downgrade visual-studio-code-bin` til dentidligere stabile versjonen (`v.1.106`) som ikke hadde den spesifikke Electron-utfordringen knyttet til de globale menyer i KDE Plasma.

  VS Code fungerer nå feilfritt. Ved å velge en målrettet nedgradering framfor en full systemgjenopprettning, ble feilen eliminert isolert fra systemet.
  I et aktivt utviklingsmiljø er en rask rollback ofte bedre enn en dyp feilsøking hvis målet er å minimere nedetid.
  Denne erfaringen bekrefter at  `downgrade` er et verktøy som kan brukes til å rulle tilbake til tidligere versjoner i linux-baserte systemer.
sources: ''
---

**Dagens Agenda**

* Identifiserte en feil i hovedverktøyet for programmet (CodeVS) som hindret alt videre arbeid. For å raskt avklare om utfordringen lå i mitt system eller i programvaren, for å ta en besluttning på hvilket tiltak jeg kan gjøre, og benytte tiden riktig.
* Vurderte tidsbruk mellom reparasjon og tilbakestilling. Valgte å rulle tilbake til en tidligere fungerende versjon. Da valgte jeg den raskeste veien tilbake til normal produksjon og unngå unødvendig nedetid.
* Tilbakestilte programvaren til en stabil utgave uten tap av data. For å sikre at arbeidet kunne fortsette umiddelbart.
* Verifiserte at alt utstyr nå fungerer som normalt før arbeidet ble gjenopptatt. For å garantere at dagens leveranser ikke blir forsinket av avbrudd.

**Energi & Motivasjon - 10**/**10**
Dagen har vært så fin den kunne bli.
