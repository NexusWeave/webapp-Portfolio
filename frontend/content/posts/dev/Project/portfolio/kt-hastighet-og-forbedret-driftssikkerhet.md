---
date: 2026-03-23T00:00:00.000Z
title: Økt hastighet og forbedret driftssikkerhet
ingress: |
  Gjennom en oppretting av systemets logikk har jeg transformert en ustabil prosess til en sikker og selvgående løsning. Ved å eliminere unødvendig sirkelgang og optimalisere arbeidstempoet, leverer programmet nå data på en brøkdel av tiden. For virksomheten betyr dette økt driftssikkerhet, reduserte kostnader og et system som er rigget for fremtidig vekst uten behov for manuelt tilsyn eller dyre avbrudd.
status: |
  #### Dagens Aktiviteter

  * Undersøkte hvorfor programmet stoppet opp og ga feilmeldinger om tidsavbrudd (timeout) hver gang det nådde side 2 i arbeidslisten.
  * Gjennomførte tester ved å øke ventetiden manuelt og sette ned arbeidshastigheten for å se om det løste forbindelsesproblemene (uten hell).
  * Foretok en grundig teknisk revisjon av loggene som avdekket en logisk brist (uendelig sirkel) der programmet gjentok samme side i stedet for å gå videre.
  * Fjernet overflødige parametere i koden for å tvinge programmet til å oppdatere minnet for hver nye side.

  Endret logikken slik at programmet faktisk "legger fra seg" gammel informasjon og henter ny.

  # Motivasjon & Energi 10 - 10

  Dagen er så fin den kan bli.
  
sources: ''
---

Programmet som henter informasjon fra prosjekter, stoppet gjentatte ganger før det ble ferdig. Systemet rapporterte om tidsavbrudd (timeout) og nektet å opprettholde forbindelsen med eksterne tjenester hver gang det nådde side 2 i arbeidslisten. Forsøk på å løse dette ved å gi programmet mer tid eller ved å sette ned arbeidshastigheten manuelt, ga ingen resultater.

Oppgaven var å finne ut hvorfor programmet gjentok første side kontinuerelig til tross for at jeg ga det bedre arbeidsbetingelser. Jeg måtte identifisere om feilen ikke var kode relatert, eller om det lå en logisk brist i måten programmet utførte sine instrukser på.

* Ved en grundig gjennomgang av hendelsesloggen ble det avdekket at programmet hadde havnet i en uendelig sirkel.
* Programmet fant veien til neste side, men det klarte ikke å legge fra seg den gamle informasjonen. Dette førte til at det ble stående og lese side 2 opp til flere ganger i stedet for å gå videre til side.
* Som en konsekvens av at programmet spurte om nøyaktig det samme flere ganger på kort tid, ble det til slutt blokkert av sikkerhetssystemene.
*  Ved å fjerne parameterne ble instruksjonene endret slik at programmet nå tvinges til å oppdatere informasjonen i minnet hver gang det blar om en side. Jeg satte dørvakten `Semaphore`) ned til 5 koblinger samtidig for å unngå sikkerhetssystemene, og endret ventetiden (Timeout) fra 500 sekunder til 120 sekunder for mer effektiv feilhåndtering.

Ved å rette opp i den interne logikken og justere hastigheten har jeg erstattet et ustabilt program som tidligere løp i ring, med en robust og effektiv prosess som nå beveger seg sikkert mot målet uten manuelt tilsyn. Dette gir virksomheten betydelig verdi gjennom økt driftssikkerhet og eliminering av risiko for uforutsett stans, samtidig som programmet nå fullfører hele oppgaven på en brøkdel av tiden fordi hver side kun hentes en gang. Ved å senke ventetiden har jeg også sørget for at eventuelle feil oppdages umiddelbart fremfor at systemet blir stående i unødvendige venteposisjoner, noe som sammen med den nye dørvakt-funksjonen gjør systemet rigget for fremtidig vekst og større datamengder. Den dokumenterte løsningen fungerer nå som en standard for å unngå lignende feil i fremtiden, noe som sikrer data av høy kvalitet til en lavere kostnad enn før.
