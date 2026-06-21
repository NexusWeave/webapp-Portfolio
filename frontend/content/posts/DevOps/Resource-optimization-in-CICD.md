---
date: 2025-12-23T00:00:00.000Z
title: Manuell rutine arbeid til selvgående CI/CD-prosess
ingress: |
  Ved å automatisere prosessen fra ferdig kode til publisering er det opprettet en løsning som reduserer tids- og ressursbruken. Det ble valgt en kostnadseffektiv plattform for å maksimere tilgjengelige byggeminutter i GitHub Actions. Resultatet er et stabilt, selvgående system som sparer kostnader og utviklingstid ved å redusere manuelle rutineoppgaver.
status: |
  #### Programinformasjon
  
  **OS** - Garuda Drag0nized Linux
  **Verktøy** - GitHub Actions, TypeScript
  *Skrevet i samarbeid med AI - Gemini*

  #### Dagens Aktiviteter
  * Gjennomgang av GitHub Actions offisielle dokumentasjon for å analysere multiplikatorer for ulike operativsystemer
  * Gjennomgang av kvoten på 2000 byggeminutter i GitHub Actions for å unngå overskridelser.
  * Konfigurering av byggeprosesser til kun å trigges ved sammenslåing til hovedgrenen.
  * Oppretting av automatisert <abbr title="Continuous Integration / Continuous Delivery (Kontinuerlig integrasjon og kontinuerlig leveranse)">CI/CD</abbr>-prosess for versjonering, testing og distribusjon.
  * Optimalisering av ressursbruk og tidsforbruk i utviklingsløpet.

  #### Motivasjon & Energi - 10 / 10
  Dagen har vært så fin som det er mulig.

sources: '[GitHub Docs: Product usage included with each plan](https://docs.github.com/en/billing/reference/product-usage-included) [GitHub Docs: About billing for GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions)'
---
Gjennom utviklingen oppstod det et behov for å innføre automatiserte rutiner for versjonering, utviklingsnotater, testing og bygging av nettsiden når den er produksjonsklar. I GitHub Actions tildeles en fast månedlig kvote på 2000 gratis byggeminutter for private <abbr title="Et arkiv for hvor prosjekter lagres">repositorier</abbr>. Kvoten forbrukes med ulik hastighet, hvor Linux forbruker 1x, mens Windows forbruker 2x og macOS forbruker 10x av kvoten per minutt.

Hensikten var å maksimere utnyttelsen av byggeminuttene i GitHub Actions gjennom en kostnadseffektiv konfigurasjon og samtidig fjerne manuelle rutine oppgaver.

* Undersøkte den offisielle dokumentasjonen for fakturering av GitHub Actions for å kartlegge ressursforbruket på tvers av plattformer.
* Valgte å kjøre alle byggeprosesser på Linux for å opprettholde en multiplikator på **1x** fremfor multiplikatoren til macOS på 10x.
* Begrenset kjøringen av byggejobbene til å utløses når kode slås sammen med hovedgrenen og når alle testene har bestått, i stedet for ved hver enkelt oppdatering.
* Opprettet en automatisert <abbr title="Continuous Integration / Continuous Delivery (Kontinuerlig integrasjon og kontinuerlig leveranse)">CI/CD</abbr>-prosess for å håndtere versjonering, tester og nettsidebygging uten at utvikleren griper inn i prosessen.

Den automatiserte byggeprosessen er nå stabil og kostnadseffektiv. Dette sikrer at kvoten på 2000 byggeminutter varer lengst mulig. Som en konsekvens av disse tiltakene ble prosjektets **ressursbruk** og forbedret kontrollen over utgiftene knyttet til skytjenesten. Erfaringen viser at bevisste valg av kjøremiljø og triggere er avgjørende for å forhindre unødvendig ressursbruk i skybaserte verktøy.
