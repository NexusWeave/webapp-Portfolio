---
date: 2026-04-11T16:02:03.086Z
title: Standardisering og teknisk optimalisering av brukerreisen
ingress: |
  Gjennom teknisk opprydding og standardisering har jeg styrket nettsidens identitet og brukeropplevelse. Ved å forenkle navigasjonslogikken og etablere standardiserte bildebeskrivelser, har jeg fjernet teknisk etterslep og visuell støy. Resultatet er en stabil og responsiv plattform som øker brukernes opplevelse, forbedrer tilgjengelighet og optimaliserer applikasjonen for effektiv videre vekst og forenkler vedlikehold i fremtiden.
status: |
  #### Dagens Aktiviteter

  * Samlet og forbedret visning av datoer og mediekomponenter på tvers av nettstedets hovedelementer for å skape et helhetlig visuelt uttrykk.
  * Reduserte kompleksitet i header-seksjonen ved å rydde i navigasjons- og logologikken, noe som har resultert i en forutsigbar og flytende brukeropplevelse.
  * Forbedret logikken for bildekomponenter slik at bildets alternative tekst automatisk brukes som bildetekst når spesifikk beskrivelse mangler.
  * Oppgradert backend-modellen for å sikre at bildebeskrivelser leveres i riktig format, samt innført typesikkerhet for å øke applikasjonens langsiktige vekstevne.
sources: ''
---
Datoer og ikoner ble vist på ulike måter på tvers av nettstedet, uten en felles standard for hvordan informasjon skulle presenteres. Dette hadde en risiko for at besøkede kunne få en uventet brukeropplevelse.

Målet var å samle all visuell presentasjon av dato- og medieinformasjon under en felles standard, for å sikre at det digitale uttrykket var  gjenkjennelig og profesjonell opplevelse for brukeren.

* Jeg samlet og standardiserte hvordan datoer vises i legoklossene på tvers av sidenes hovedelementer
* Jeg sørget for at Media komponentene følger den samme strukturen og logikken over hele nettstedet.

Dette resulterte til et visuelt helhetlig grensesnitt hvor all informasjon følger det samme uttrykket, som styrker identiteten til nettsiden, dette påvirker direkte engasjementet fra besøkede. Jeg erfarte at små visuelle avvik mellom sider kan virke som små bagateller, men samlet skaper et uventet inntrykk. Å etablere felles standarder gjennom å bruke typesikkerhet tidlig er en lav investering med langsiktig verdi, for vekstevnen til applikasjonen.


Oppbyggingen av header-seksjonen var unødvendig kompleks, noe som gjorde tidkrevende å vedlikeholde og skapte en uforutsigbar opplevelse for besøkende.
Målet var å forenkle navigasjonen for å gi brukeren en lettere reise gjennom nettstedet og redusere fremtidig tidkrevende vedlikehold.

* Jeg forenklet oppbyggingen av Header seksjonen ved å fjerne unødvendig kompleksitet fra navigasjons- og logologikken.
* Jeg ryddet også opp i visningslogikken for logg headeren slik at grensesnittet oppfører seg mer forutsigbart.

Dette resulterte til en forutsigbar meny som reduserer uventet feil brukeropplevelsen. Dette øker tiden brukeren er på siden og gir en brukeren en flytende opplevelse. Gjennom denne situasjonen har jeg forstått at det tekniske etterslepet i navigasjon har en tendens til å vokse stille og usynlig over tid. Regelmessig forenkling gjør løsningen enklere å forstå, enklere å teste og raskere å utvikle videre på.

***

Et av media filene manglet en presis måte å håndtere bildetekster på, dette første til at en standardtekst ble vist automatisk på tvers av nettstedet. Dette ga et rotete visuelt inntrykk og svekket både tilgjengeligheten og synligheten elementene på nettsiden.
Målet var å innføre en kontrollert løsning som automatisk benytter bildets alternative beskrivelse som bildetekst dersom en egen beskrivelse mangler. Dette sikrer at ingen bilder blir stående uten forklaring, samtidig unngår prosjektet rotete eller irrelevante tekstvisninger.

* Jeg forbedret logikken i bilde komponentet slik at  den alternative teksten kun vises om som bildeteksten når bilde ikke har en beskrivelse.
* Jeg oppgraderte også github modellen slik at bildebeskrivelser automatisk leveres i riktig format til grensesnittet.

Fjerning av automatisk standardtekst til fordel for kontrollerte bildetekster gir et renere visuelt uttrykk og forbedrer tilgjengeligheten for alle brukere. Dette bidrar til å heve det profesjonelle inntrykket av nettstedet. En tilsynelatende liten endring i media komponentet har hatt en målbar effekt på brukeropplevelsen, noe som understreker verdien av å tenke helhetlig på tilgjengelighet som en kilde til forretningsverdi.
