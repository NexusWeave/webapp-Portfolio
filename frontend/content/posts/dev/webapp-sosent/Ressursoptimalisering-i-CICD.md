---
created: 2025-12-23T00:00:00.000Z
tags:
  - dev-journey
title: Ressursoptimalisering i CI/CD
ingress: >
  Effektivisering av CI/CD-pipelines krever mer enn bare teknisk innsikt; det
  krever strategisk ressursstyring. Ved implementering av Semantic Release og
  automatiserte deploy-rutiner i en GitHub-organisasjon, ble det gjennomført en
  kartlegging av tilgjengelige build-minutter for private repositorier. Ved å
  analysere multiplikatoreffekten mellom ulike operativsystemer og optimalisere
  trigger-logikken, ble det etablert en bærekraftig automatiseringsmodell som
  balanserer profesjonell release-håndtering med økonomiske rammer.
star: >
  ### Github Actions-Kvoter


  #### Kartlegging av Automatiserings Kvote i Github


  I forbindelse med implementering av Semantic Release og automatiserte
  deploy-rutiner, oppstod det et behov for å forstå de tekniske og ønkomiske
  rammene i GitHub-organisasjonen. For private repositorier er ressursbruken
  begrenset av en måndelig kvote. For å sikre uavbrutt drift og profesjonell
  automatisering ble det undersøkt hvor mange “
  [build-minutter](https://docs.github.com/en/get-started/learning-about-github/githubs-plans#github-free-for-user-accounts)”
  organisasjoner har til dispensasjon


  #### Begrensninger for Private Repositorier og Ubegrenset for offentlige
  Repositorier


  Mes offentlige (Open Source) prosjekter ofte har ubegrenset bruk av GitHub
  Actions, operer private prosjekter under en delt kvote. Utfordringen ble å
  vurdere om de planlagte automasjoner ville overskride disse rammene.


  * Hver “merge” trigges det en prosess som analyserer git-commits, oppdaterer
  versjonnummer og generer release notes.

  * For hver godkjent endring starter en bygg- og push- prosess mot
  publiseringsverktøyet netlify.


  #### Operativsystemets betydning


  Det ble oppdaget at Github har en multiplikasjonsfaktor, der at bruk av
  forksjellige operativsystemer som (macOS/ Windows og Linux) i arbeidsflyten
  påvirker hvordan minuttene forbrukes. Formelen som brukes er Byggetid x
  Multiplikator = Forbrukteminutter


  | Operativsystem | Multiplikator | Forbruk per minutt |

  | -------------- | ------------- | ------------------ |

  | Linux          | 1x            | 1 minutt           |

  | Windows        | 2x            | 2 minutt           |

  | macOS          | 10x\*         | 10 minutt          |


  I standard Github-oppsett er multiplikatoren for macOS ofte så høyt som 10x
  for enkelte planer. Dette gjør valget av “runner til en økonomisk beslutning”


  #### Strategiske valg for Ressursbruk


  ##### Valg av Runtime


  Det ble valgt å kjøre samtlige workflows på Linux-basert miljø som
  ubuntu-latest. Siden multiplikatoren er 1x, får organisasjonen maksimalt
  utbytte av kvoten sammenlignet med Windows eller macOS. Dette samsvarer også
  med det daglige utvikler miljøet som er Garuda Linux, som sikrer en konsistens
  mellom lokal testing og sky-bygging.


  ##### Trigger-logikk


  For å unngå unødvendig bruk av build-minutter, ble arbeidsflyten for Semantic
  Release konfiguert til å trigges ved “merges” til main - branchen. Dette
  sikrer at organisasjonen kun forbruker ressurser når det foreligger en
  vertifisert endring som skal ut i produksjon.


  ##### Kostnadseffektiv Automatiseringsmodell


  Dokumentasjonen avklarte at GitHub-organisasjoner har en kvote på [2000
  build-minutes](https://docs.github.com/en/get-started/learning-about-github/githubs-plans#github-free-for-user-accounts)
  per måned for private repositorier.


  Det har blitt oppnådd både en kostnadseffektiv og en optimalisert
  Release-flyt, med de valgte optimaliseringene.


  ##### Evaulering


  Dette har vist at CI/CD ikke bare handler om teknisk oppsett, men også om
  Resource Management. Som utvikler er det mitt ansvar å designe løsninger som
  ikke bare følger de tekniske standardene, men også løsninger som er
  kostnadseffektive for organisasjonen. 

  Å forstå multiplikatoreffekten i sky-tjenester er en god ferdighet, når man
  flytter prosjekter fra utviklings miljø til produksjons miljø
KildeHenvisning: ''
---

