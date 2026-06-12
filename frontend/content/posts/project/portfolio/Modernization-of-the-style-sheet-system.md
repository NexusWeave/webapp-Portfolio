---
date: 2026-06-12T14:45:00.000Z
title: Modernisering av stilark-systemet
ingress: |
  Stilarkene og testene som hører til ble oppdatert for å gjøre koden lettere å jobbe med. Ved å bytte til en nyere versjon og rydde i hvordan ting testes, ble koden både ryddigere og tryggere. Prosessen sørget også for at alle endringer ble signert digitalt for å bevise at koden er ekte.
status: |
  #### Program informasjon
  **Teknologi** - <abbr title="Språk for å lage stilark">Sass</abbr>
  **Verktøy** - <abbr title="Verktøy for å styre pakker">npm</abbr>, <abbr title="Verktøy for å kjøre tester">Vitest</abbr>, <abbr title="Verktøy for digital signering">GPG</abbr>
  **Prinsipper** - Sikkerhet, Enkelt vedlikehold

  #### Dagens Aktiviteter
  * Oppdatere <abbr title="Bibliotek for stilark">lumina-sass</abbr> og rydde i gamle tester.
  * Legge til flere sjekker for de viktigste delene av nettsiden.
  * Skrive under på alle endringer med en digital signatur.

  #### Motivasjon & Energi - 10 / 10
  Koden er nå mye lettere å forstå og endre på. Dagen er så fin den kunne bli.
---

Situasjonen i prosjektet var at stilarkene hadde blitt vanskelige å vedlikeholde fordi testene var altfor lange og gjentok seg selv mange ganger. Dette gjorde at det tok unødvendig lang tid å sjekke om nye endringer fungerte som de skulle. Utfordringen var en konsekvens av at verktøyene ikke hadde blitt fulgt opp med de nyeste og enkleste metodene for koding.

Hensikten med arbeidet var å gjøre <abbr title="Språk for å lage stilark">Sass</abbr>-koden ryddigere og sørge for at testene ble enklere å forstå ved å bruke gjenbrukbar kode.

* Oppdaterte <abbr title="Bibliotek for stilark">lumina-sass</abbr> til versjon 3.1.1 for å få tilgang til de nyeste funksjonene.
* Ryddet i testene i <abbr title="Verktøy for å kjøre tester">Vitest</abbr> ved å bruke <abbr title="Gjenbrukbare biter med kode">mixins</abbr>, noe som fjernet mye unødvendig tekst.
* La til flere automatiske sjekker for å passe på at de viktigste delene av koden fungerer.
* Brukte <abbr title="Verktøy for digital signering">GPG</abbr> til å signere endringene for å vise at koden er trygg og ikke har blitt endret av andre.

Dette arbeidet har gjort at hele systemet har blitt mer stabilt og mye lettere å bygge videre på i fremtiden. Erfarte at det å bruke <abbr title="Gjenbrukbare biter med kode">mixins</abbr> i testene gjør det mye raskere å se om alt er i orden uten at koden blir rotete. Dette gir prosjektet stor verdi fordi det blir mindre teknisk rot og en tryggere hverdag for alle som skal jobbe med koden senere.
