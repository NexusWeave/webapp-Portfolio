---
date: 2026-04-14T06:59:45.401Z
title: Gjenoppretting av nettverksmaskinvare etter systemkrasj
ingress: |
  Uventet systemkrasj i Garuda Linux førte til fullstendig svikt i nettverk og Bluetooth på et dual-boot-system. Etter feilsøking i både programvare og BIOS ble feilen sporet til manglende fysisk kontakt med hovedkortet. Ved å remontere PCIe-nettverkskortet ble forbindelsen gjenopprettet i operativsystemene, noe som bekrefter verdien av fysisk inspeksjon.
status: |
  #### Programinformasjon
  **OS** - Garuda Arch Linux / Windows 10 (Dual Boot)
  **Verktøy** - MSI Z270 Gaming Pro hovedkort med ASUS PCIe WiFi-kort, 
  *Skrevet i samarbeid med AI - Gemini*

  #### Dagens Aktiviteter
  * Registrering av fullstendig bortfall av trådløst nettverk og Bluetooth etter systemkrasj.
  * Tilbakerulling av operativsystemet til et tidligere snapshot for å utelukke driverfeil.
  * Utførelse av strømtømming på hovedkortet for å nullstille eventuell låst maskinvare.
  * Analyse av BIOS for kontroll av om nettverkskortet ble registrert på maskinvarenivå.
  * Fysisk demontering og remontering av PCIe-kortet for å sikre stabil kontakt.

  #### Motivasjon & Energi - 10 / 10
  Dagen er så fin den kan bli.
sources: ''
---

Etter en uventet systemkrasj i Garuda Linux oppstod det svikt i nettverksfunksjonaliteten på tvers av både Linux- og Windows-partisjonene. Hverken trådløst nettverk (<abbr title="Wireless Fidelity ">WiFi</abbr>) eller Bluetooth var tilgjengelige på systemene. Ettersom det nylig var utført en systemoppdatering, ble det tatt en antagelse på at feilen skyldtes programvarekonflikter eller korrupte drivere.

Hensikten var å stabilisere nettverkskortet og gjenopprette forbindelsen til internett og Bluetooth-enheter.

* Operativsystemet ble rullet tilbake til et tidligere fungerende snapshot for å fjerne eventuelle driverkonflikter etter systemoppgraderingen.
* En fullstendig strømtømming av hovedkortet ble utført for å tvinge nettverksenheten ut av en eventuell låst tilstand.
* Konfigurasjonen i <abbr title="Basic Input/Output System">BIOS</abbr> ble kontrollert, hvor det ble avdekket at nettverkskortet ikke var registrert blant de registrerte maskinvarekomponentene.
* Maskinkabinettet ble åpnet for inspeksjon, og komponenten <abbr title="Peripheral Component Interconnect Express">PCIe</abbr>-nettverkskortet ble koblet fra og remontert i sporet for å sikre elektrisk kontakt.

Etter at nettverkskortet ble koblet fra og remontert i sporet, ble kortet gjenkjent i BIOS. Nettverkskortet fungerer nå i begge operativsystemene. Som en konsekvens av dette arbeidet fikk maskinen normal tilgang til nettverket. Det ble erfart at systemkrasj eller mekaniske vibrasjoner kan føre til at komponentene mister kontakt, og at maskinvaren bør kontrolleres fysisk når den ikke lenger registreres på systemnivå.
