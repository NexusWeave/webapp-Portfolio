<template>
    <section class="flex-wrap-row-justify-space-around">
        <section class="dev-bar">
            <section class="dev-skill flex-column-justify-center-align-center">
                <h2> Min Kode Aktivitet</h2>
                <span> </span>
                <section class="flex-wrap-row-justify-space-evenly">

                    <UtilsProgress v-for="(data, i) in formattedLanguages" :key="i" 
                        :value="data.bytes"
                        :label="data.label"
                        :cls="[data.label.toLowerCase()]"
                    />
                </section>
                <span> Aktivteten er basert på min GitHub-aktivitet og oppdateres i sanntid for å reflektere min nåværende engasjement og bidrag til ulike prosjekter. </span>
                <span> Aktiviteten er målt antall KB</span>

            </section>
        </section>
        <section class="flex-column-justify-space-evenly">
            <article v-for="(data, i) in dev" :key="i" class="bio">
                <h3 v-if="i === 1">{{ data.title }}</h3>
                <span>Sist oppdatert : <time :datetime="new Date(data.meta.date).toISOString()">{{ new Date(data.meta.date).toDateString() }}</time></span>
                <ContentRenderer :value="data" class="bio-content"/>
                <MDC :value="data.meta.strength" class="bio-content"></MDC>
                <MDC :value="data.meta.agile" class="bio-content"></MDC>
            </article>
        </section>
    </section>
</template>

<script setup lang="ts">

    //  --- Meta information
    useSeoMeta({ title: 'LMCS - Portefølje', description: 'Kristoffer Gjøsund (Krigjo25) - Utvikler som forenkler det komplekse. Se min sanntids GitHub-aktivitet, akademiske reise og tekniske logger fra .NET til filosofi.', author: 'Kristoffer Gjøsund', ogTitle: 'Portefølje - Kristoffer Gjøsund', ogDescription: 'Kristoffer Gjøsund (Krigjo25) - Utvikler som forenkler det komplekse. Se min sanntids GitHub-aktivitet, akademiske reise og tekniske logger fra .NET til filosofi.', ogImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg',ogUrl: 'https://krigjo25.no', ogType: 'website', ogLocale: 'nb_NO', twitterCard: 'summary_large_image', twitterTitle: 'LMCS - Portefølje', twitterDescription: 'Kristoffer Gjøsund (Krigjo25) - Utvikler som forenkler det komplekse. Se min sanntids GitHub-aktivitet, akademiske reise og tekniske logger fra .NET til filosofi.', twitterImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg', themeColor: '#ffffff' });

    //  --- Import & types logic
    import { fetchCollection } from '#imports';
    import { useLanguageStore } from '@/stores/languageBytesStore';

    import type { DevCollectionItem } from '@nuxt/content';


    //  --- Conent logic
    const devPath = 'devProfile';
    const devCache = 'devProfileCache';
    const dev = await fetchCollection<DevCollectionItem>(devPath, devCache);

    //  --- Progress Bar Logic
    const { formattedLanguages } = storeToRefs(useLanguageStore());


    //  --- Debugging Logic ---
    //console.warn('Reference Data:', sortedReference.value);
    //console.log(dev.value);
</script>