---
tags:
  - dev-journey
date: 2025-11-20T00:00:00.000Z
title: Sikring av sensitive URL-stier og forbedring av systemets tilgangskontroll
ingress: |
  For å beskytte bedriftens interne informasjon har jeg utviklet en sikkerhetsløsning som sikrer at brukere kun ser data de har rettmessig tilgang til. Ved å flytte filtreringen til serveren i tråd med prinsippet om <abbr title="Prinsippet sier at brukere skal ha bare tilgang til det de trenger for å gjøre jobben sin">*minste privilegium*</abbr>, har vi tettet lekkasjer av systemets struktur. Tiltaket fjerner unødvendig støy, styrker motstandskraften mot angrep og sikrer at våre systemer nå opererer profesjonelt og etter beste praksis.
status: |
  #### Dagens Aktiviteter

  * Avdekket en sårbarhet på nettsiden der sensitiv informasjon om bedriftens interne systemoppbygging var synlig for uvedkommende.
  * Kartla hvorfor informasjonen ble lekket, og identifiserte at sikkerhetssjekken ble utført hos brukeren i stedet for i systemets lukkede kjerne.
  * Vurdert dagens løsning opp mot Prinsippet om «*minste privilegium*». Dette sikrer at vi nå jobber etter internasjonale standarder som sier at ingen skal se mer informasjon enn det som er strengt nødvendig for å gjøre jobben sin.
  * Utarbeidet en plan for å flytte filtreringen av data til systemets bakside (backend). Dette sikrer at sensitive interne lenker blir fjernet før de når brukerens skjerm, noe som effektivt tetter sikkerhetshullet.
  * Dokumentert hvordan tiltaket beskytter bedriftens digitale verdier, reduserer risikoen for målrettede angrep, og skaper en ryddigere og mer profesjonell opplevelse for våre brukere.

  #### Motivasjon & Energi   10  /  10

  Dagen er så fin den kan bli i øyblikket.
sources: |
  1. [Minst Privilegium](https://learn.microsoft.com/en-us/entra/identity-platform/secure-least-privileged-access)
---

Det ble oppdaget en sårbarhet knyttet til tilgangsstyring på nettsiden. Navigasjonslenker som skulle skjermes var eksponert for brukere. Dette var en konsekvens av at det ikke har vært lagt inn et filter for å filtrere vekk dataen i backend. Dette utgjorde en lekasje av intern informasjon om systemets struktur.

Min oppgave var å finne ut hvorfor denne informasjonen ble lekket og vurdere risikoen opp mot anerkjente sikkerhetsstandarder og lage en løsning som sikrer at bedriftens interne data forblir skjulte for brukere uten tilgang.

Jeg undersøkte hvordan dataene ble hentet ut og oppdaget at sikkerhetskontrollen ble gjort for sent i prosessen (hos brukeren istedenfor på serveren).

* Jeg fant ut av at det manglet en filtrering i øyblikket da dataen ble hentet ut av systemtes underliggende filer.
* Jeg sammenlignet dagens praksis med prinsippet om <abbr title = "ingen skal se mer enn det som er strengt nødvendig for å utføre jobben sin">«*minste privilegium*»</abbr>.
* Jeg utarbeidet en logikk for sikre at de stiene ble fjernet før den nådde brukerensskjerm

Arbeidet resulterte i en styrking av systemets sikkerhet og integritet. Ved å legge til en funksjonalitet hvor jeg kan filtrere ut stie fra brukerens øyner, dette er noe som reduserer risikoen for målrettede angrep mot interne systemer. Vi har ikke bare laget en løsning som fjerner unødvendig støy for de besøkende på nettsiden, men vi følger nå beste praksis for personvern og datasikkerhet. Dette beskytter bedriftens interne arkitektur og sikrer at systemet oppleves som trygt og profesjonelt for sluttbrukeren.
