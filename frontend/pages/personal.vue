<template>
    <section class="flex-col">
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
                <template #fallback> <section class="loading">Laster biografi...</section> </template>
            </Suspense>
        </section>
    </section>
</template>
<script setup lang="ts">

    //  --- Meta information
    definePageMeta( { order: 3, label: 'Om Kristoffer Gjøsund', description: "En personlig side som går i dybden på Kristoffers filosofi, verdier og personlige logger. Inneholder også en biografi med et mer personlig perspektiv." });

    //  --- Importing dependencies & types
    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';
    import { mapProfile } from '~/composables/maps/mapProfile';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { ButtonItem } from '~/types/navigation';
    // @ts-ignore - TypeScript error: Cannot find module '@nuxt/content' or its corresponding type declarations.
    import type { DevPostsCollectionItem, ProfileInformationCollectionItem } from '@nuxt/content';


    //  --- Content fetching logic
    const profilePath = 'profileInfo';
    const profileCache = 'personalProfileCache';
    const rawBiography = await fetchCollection<ProfileInformationCollectionItem, ReturnType<typeof mapProfile>>(profilePath, profileCache, mapProfile);
    const biography = computed(() => {
        if (!rawBiography.value) return [];
        return rawBiography.value.filter((item: any) => 
            item.stem === 'personal-profile' || 
            item.path?.includes('personal-profile') || 
            item.id?.includes('personal-profile')
        );
    });

    //  --- Debugging tools
    //console.log("Biography Data:", biography.value);
    
</script>