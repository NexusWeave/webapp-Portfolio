<template>
    <section class="flex-wrap-row-justify-space-evenly">
        <section class="dev-bar" v-if="formattedLanguages.length > 0">
            <Suspense>
            <template #default>
                <section class="dev-skill flex-column-justify-center-align-center" >
                    <h2> Min Kode Aktivitet</h2>
                    <span> Aktivteten er basert på min GitHub-aktivitet og oppdateres i sanntid for å reflektere min nåværende engasjement og bidrag til ulike prosjekter. </span>
                    <span> Aktiviteten er målt antall KB</span>
                    <span> </span>
                    <section class="flex-wrap-row-justify-space-evenly">
                        <UtilsProgress v-for="(data, i) in formattedLanguages" :key="i"  :data="data" :cls="[data.label.toLowerCase()]" />
                    </section>
                </section>
            </template>
            <template #fallback> <section class="loading">Kalkulerer Kode aktivitet...</section> </template>
        </Suspense>
        </section>
        
        <section class="flex-column-justify-center-align-center">
            <Suspense>
                <template #default>
                    <article v-for="(item, index) in biography" :key="index" class="bio">
                        <h3 v-if="item.title && index === 0">{{ item.title }}</h3>
                        <span v-if="item.date && index === 0">{{ item.date.text }} <time :datetime="item.date.date"><b>{{ item.date.date }}</b></time></span>
                        <MDC v-if="item.summary && index === 0" :value="item.summary" class="bio-content"></MDC>
                        <ContentRenderer v-if="item.body && index === 0" :value="item.body" class="bio-content"/>
                        <MDC v-if="item.coop && index === 0" :value="item.coop" class="bio-content"></MDC>
                    </article>
                </template>
                <template #fallback> <section class="loading">Laster biografi...</section> </template>
            </Suspense>
        </section>
    </section>
</template>

<script setup lang="ts">

    //  --- Meta information
    definePageMeta( { order: 2, label: 'Teknisk Profil', description: "En detaljert side om Kristoffers tekniske kompetanse. Viser sanntids GitHub-aktivitet og biografi med fokus på teknisk utvikling og teknologier." });

    //  --- Import & types logic
    import { fetchCollection } from '#imports';
    import { mapProfile } from '~/composables/maps/mapProfile';
    import { useLanguageStore } from '@/stores/languageBytesStore';

    // @ts-ignore - TypeScript error: Cannot find module '@nuxt/content' or its corresponding type declarations.
    import type { ProfileInformationCollectionItem } from '@nuxt/content';


    //  --- Conent logic
    const devPath = 'profileInfo';
    const devCache = 'profileCache';
    const biography = await fetchCollection<ProfileInformationCollectionItem, ReturnType<typeof mapProfile>>(devPath, devCache, mapProfile);

    //  --- Progress Bar Logic
    const { formattedLanguages } = storeToRefs(useLanguageStore());

    //  --- Debugging Logic ---
    //console.log(dev.value);
    //console.log("Formatted Languages:", formattedLanguages.value);
    //console.warn('Reference Data:', sortedReference.value);
    
</script>