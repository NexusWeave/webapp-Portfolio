<template>
    <section class="flex-wrap-row flex-center">
        <section class="dev-bar" v-if="formattedLanguages.length > 0">
            <Suspense>
            <template #default>
                <section class="dev-skill flex-col flex-center" >
                    <h2>Min Kode Aktivitet</h2>
                    <span>Aktivteten er basert på mine bidrag og oppdateres fortløpende for å reflektere min nåværende engasjement og bidrag til ulike teknologier. </span>
                    <span>Aktiviteten er målt i KB og MB</span>
                    <span> </span>
                    <section class="flex-wrap-row flex-center">
                        <div v-for="(data, i) in formattedLanguages" :key="i" class="col-3">
                            <UtilsProgress :data="data" :cls="[data.label.toLowerCase()]" :max="maxProgress" />
                        </div>
                    </section>
                </section>
            </template>
            <template #fallback> <section class="alert-info"><p>Kalkulerer Kode aktivitet...</p></section> </template>
        </Suspense>
        </section>
        
        <section class="flex-col flex-center">
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
                <template #fallback> <section class="alert-info"><p>Laster biografi...</p></section> </template>
            </Suspense>
        </section>
    </section>
</template>

<script setup lang="ts">

    //  --- Meta information
    definePageMeta( { order: 2, label: 'Kompetanse profil', description: "En detaljert side om Kristoffers tekniske kompetanse. Viser sanntids GitHub-aktivitet og biografi med fokus på teknisk utvikling og teknologier." });

    //  --- Import & types logic
    import { fetchCollection, fetchRepositories } from '#imports';
    import { mapProfile } from '~/composables/maps/mapProfile';
    import { useLanguageStore } from '@/stores/languageBytesStore';

    import type { RepositoryData } from '~/types/props';
    // @ts-ignore - TypeScript error: Cannot find module '@nuxt/content' or its corresponding type declarations.
    import type { ProfileInformationCollectionItem } from '@nuxt/content';


    //  --- Conent logic
    const devPath = 'profileInfo';
    const devCache = 'devProfileCache';
    const rawBiography = await fetchCollection<ProfileInformationCollectionItem, ReturnType<typeof mapProfile>>(devPath, devCache, mapProfile);
    const biography = computed(() => {
        if (!rawBiography.value) return [];
        return rawBiography.value.filter((item: any) => 
            item.stem === 'dev-profile' || 
            item.path?.includes('dev-profile') || 
            item.id?.includes('dev-profile')
        );
    });

    //  --- Progress Bar Logic
    const { updateFromRepositories } = useLanguageStore();
    const { repo } = await fetchRepositories<RepositoryData>('github');
    const { configuredLanguages: formattedLanguages } = storeToRefs(useLanguageStore());

    const maxProgress = computed(() => {
        if (formattedLanguages.value.length === 0) return 10240;
        return Math.max(...formattedLanguages.value.map(l => l.original || l.bytes));
    });

    onMounted(() => { if (repo.value) updateFromRepositories(repo.value); });
    watch(() => repo.value, (newVal) => { if (newVal) updateFromRepositories(newVal); });

    //  --- Debugging Logic ---
    //console.log(dev.value);
    //console.log("Formatted Languages:", formattedLanguages.value);
    //console.warn('Reference Data:', sortedReference.value);
    
</script>