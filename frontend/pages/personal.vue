<template>
    <section class="flex-column">
        <article class="article-wrapper">
            <h2> Mine Personlige Logger </h2>
            <section class="blog-section flex-wrap-row-align-items-center-justify-space-between">
                <NavigationButton v-if="currentPage > 1" :data="PageButtons[0]"/>
                <section v-for="post in mappedPosts" :key="post.id" class="blog-content">
                    <ArticleHead :article="post" />
                </section>
                <NavigationButton v-if="currentPage < totalPages" :data="PageButtons[1]"/>
            </section>
        </article>
        <section class="flex-wrap-row-justify-space-evenly">
            <section class="flex-column-justify-center-align-center">
                <article v-for="(data, i) in biography" :key="i" class="bio">
                    <h3 v-if="i === 2">{{ data.title }}</h3>
                    <ContentRenderer v-if="data" :value="data" class="bio-content"/>
                    <MDC v-if="data.meta.strength" :value="data.meta.strength" class="bio-content"></MDC>
                    <MDC v-if="data.meta.agile" :value="data.meta.agile" class="bio-content"></MDC>
                </article>
            </section>
        </section>
    </section>
</template>
<script setup lang="ts">

    //  --- Meta information
    useSeoMeta({ title: 'LMC - Om Kristoffer Gjøsund', description: "Kristoffer Gjøsund (Krigjo25): Drevet av å forstå kontekst og mønstre. Utforsker krysningen mellom analytisk tenkning, EQ og dype menneskelige relasjoner.",  author: 'Kristoffer Gjøsund', ogTitle: 'Om Kristoffer Gjøsund', ogDescription: "Kristoffer Gjøsund (Krigjo25): Drevet av å forstå kontekst og mønstre. Utforsker krysningen mellom analytisk tenkning, EQ og dype menneskelige relasjoner.", ogImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg',ogUrl: 'https://krigjo25.no', ogType: 'website', ogLocale: 'nb_NO', twitterCard: 'summary_large_image', twitterTitle: 'LMCS - Om Kristoffer Gjøsund', twitterDescription: "Kristoffer Gjøsund (Krigjo25): Drevet av å forstå kontekst og mønstre. Utforsker krysningen mellom analytisk tenkning, EQ og dype menneskelige relasjoner.", twitterImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg', themeColor: '#ffffff' });
    
    //  --- Importing dependencies & types
    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';

    import type { DevPostsCollectionItem } from '@nuxt/content';

    //  --- Content fetching logic
    const profilePath = 'personalProfile';
    const profileCache = 'personalProfileCache';
    const biography = await fetchCollection(profilePath, profileCache);

    const personalPostPath = 'personalPosts';
    const personalPostCache = 'personalCache';
    const rawPersonal = await fetchCollection<DevPostsCollectionItem>(personalPostPath, personalPostCache);
    
    
    //  --- Pagination Logic
    const n = 3;
    const mappedPosts = computed(() => {currentPage.value; return blogPagination(rawPersonal.value, currentPage.value, n)});
    const PageButtons = computed(() =>
    [
        { id: 0, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => currentPage.value -- },
        { id: 1, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => currentPage.value ++ }
    ]);

    const currentPage = ref<number>(1);
    const totalPages = computed(() => { if (rawPersonal.value) return Math.ceil(rawPersonal.value.length / n); return 0; });

    //  --- Debugging tools
    //console.log(rawPersonal.value);
    //console.log(mappedPosts.value);
    
</script>