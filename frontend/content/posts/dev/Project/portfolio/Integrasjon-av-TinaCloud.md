---
tags:
  - dev-journey
date: 2025-11-05T00:00:00.000Z
title: Integrasjon av TinaCloud
ingress: ''
parade: ''
star: |
  For å forenkle innholdsstyringen i porteføljen min, la jeg til et redaktør panel kalt <abbr title= "Headless content management System er uavhengig av visuell teknologi som brukes på nettsiden eller lagrings mulighetene">**TinaCMS**</abbr>. Utfordringen lå i prosjektets struktur, hvor den visuelle teknologien lever i en undermappe som f.eks (**/frontend)**. Dette skapte synkroniserings utfordringer med <abbr title="Tina Cloud er nettsiden hvor bindeleddet  for redaktørpanelet blir kontrollert">Tina Cloud</abbr>, som i utgangspunktet ikke klarte å indeksere innholdsgrenen (CMS-branch).

  Oppgave (Mål)

  Målet var å etablere en sømløs bro mellom sky-editoren og kildekoden. Dette krevde en dypere konfigurasjon av hvordan CMS-et tolker filstrukturen, samt sikring av at statiske ressurser (assets) ble lastet korrekt i et lagdelt miljø.

  Handling (Gjennomføring)

  Jeg utførte en systematisk feilsøking og rekonfigurering:

  Diagnostisering: Verifiserte Webhooks og tokens for å isolere feilen til sti-oppløsning (path resolution) fremfor autentisering.

  Sti-korreksjon: Implementerte rootPath: "frontend" i konfigurasjonen. Dette er "Best Practice" for prosjekter som ikke ligger i rotkatalogen, da det tvinger Tina Cloud til å lete på riktig sted i repoet.

  Asset-pipeline: Korrigerte publicFolder til en relativ sti (../public). Dette løste problemet med brutte bildelenker i redaktørpanelet ved å peke CMS-et direkte til frontendens statiske mappe.

  Feilhåndtering: Identifiserte og skilte ut urelaterte backend-tilkoblingsfeil (ECONNREFUSED), som sikret at feilsøkingen forble fokusert og effektiv.

  Resultat & Verdi

  Robust Arkitektur: Prosjektet følger nå en skalerbar monorepo-standard. Konfigurasjonen er robust nok til å tåle fremtidige endringer i mappestrukturen.

  Effektiv arbeidsflyt: Ved å skille innholdsproduksjon (i CMS-branch) fra kildekode (i main), har jeg oppnådd en tryggere "Decoupled Workflow". Man kan nå redigere nettsiden visuelt uten risiko for å ødelegge applikasjonslogikken.

  Teknisk kvalitet: Løsningen fjernet alle feilmeldinger i konsollen og sørget for at redaktørpanelet laster lynraskt med alle visuelle ressurser intakt.
sources: ''
---

