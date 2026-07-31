<template>
  <article class="article-wrapper flex-col">
    <header class="flex-col flex-center">
      <h2>Sikkerhet & Ansvarlig Rapportering</h2>
      <p class="slogan">
        Hei! Som en uavhengig utvikler setter jeg utrolig stor pris på at fellesskapet hjelper til med å holde løsningene mine trygge. Ingen kode er perfekt, og om du skulle komme over et sikkerhetsproblem eller en sårbarhet i mine systemer, er jeg veldig takknemlig for at du sier ifra.
      </p>
    </header>

    <section class="flex-col flex-center margin-top-md">
      <article class="alert-info flex-col">
        <h3>📩 Hvordan kontakte meg</h3>
        <p>
          Send gjerne en vennlig e-post direkte til meg på:
          <a href="mailto:krigjo25@outlook.com"><b>krigjo25@outlook.com</b></a>
        </p>
      </article>

      <article class="bio margin-top-md">
        <h3>Hva som hjelper meg i prosessen</h3>
        <p>For at jeg skal kunne forstå og rette opp i problemet på best mulig måte, setter jeg veldig stor pris på om du inkluderer:</p>
        <ul>
          <li>En kort og vennlig beskrivelse av hva du har oppdaget.</li>
          <li>Stegene som trengs for at jeg skal kunne gjenskape funnet (skjermbilder, PoC eller enkle steg).</li>
        </ul>
      </article>

      <article class="bio margin-top-md">
        <h3>Slik samarbeider vi på en god måte</h3>
        <p>Jeg ber deg ydmykt om å vise hensyn mens jeg undersøker saken:</p>
        <ul>
          <li><strong>Ta vare på personvernet:</strong> Unngå å hente ut, modifisere eller slette mer data enn det som trengs for å demonstrere funnet.</li>
          <li><strong>Unngå driftsforstyrrelser:</strong> La være å utføre handlinger som kan skade opplevelsen for andre (f.eks. DoS/DDoS eller automatisert spamming).</li>
          <li><strong>Gi meg litt tid:</strong> Gi meg gjerne en rimelig sjanse til å undersøke og utbedre problemet før informasjon deles offentlig.</li>
        </ul>
      </article>

      <article class="bio margin-top-md">
        <h3>Mit løfte til deg</h3>
        <p>
          Dersom du henvender deg i god tro og med et ønske om å hjelpe, lover jeg å behandle deg med den respekten du fortjener. Jeg vil aldri gå til rettslige skritt eller involvere myndigheter mot noen som i god tro hjelper meg med å gjøre prosjektet tryggere.
        </p>
        <p>Jeg svarer så raskt jeg overhodet har anledning til, og vil holde deg orientert underveis.</p>
        <p><em>Tusen takk for at du bruker din tid og kompetanse til å hjelpe meg!</em></p>
      </article>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useCustomSeo } from '~/composables/useCustomSeo';
import type { SeoOptions } from '~/types/utils';

const seoData: SeoOptions = {
  title: 'Sikkerhet & Ansvarlig Rapportering',
  description: 'Informasjon om ansvarlig rapportering av sikkerhetshull og sårbarheter.',
  urlPath: '/security-policy'
};

// Ved å IKKE angi 'label' i definePageMeta, ekskluderes siden automatisk fra hovedmenyen (useNavigation)
definePageMeta({
  order: 99
});

useCustomSeo(seoData);
</script>
