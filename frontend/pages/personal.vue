<template>
    <section class="flex-column">
        <article class="article-wrapper">
            <h2> Mine Personlige Logger </h2>
            <section v-if="totalPages > 1" class="flex-wrap-row-align-items-center-justify-space-evenly pagination-container">
                <NavigationButton v-if="currentPage > 1" :data="prevPage" :cls="['button', 'pagination-btn']"/>
                    <span> {{ currentPage }} / {{ totalPages }}</span>
                <NavigationButton v-if="currentPage < totalPages" :data="nextPage" :cls="['button', 'pagination-btn']"/>
            </section>

            <section class="blog-section flex-wrap-row-align-items-center-justify-space-evenly">
                <section v-for="post in paginitionData" :key="post.id" class="blog-content"> <ArticleHead :article="post" /> </section>
            </section>
        </article>
        <section class="flex-wrap-row-justify-space-evenly">
            <section class="flex-column-justify-center-align-center">
                <article v-for="(item, index) in biography" :key="index" class="bio">
                    <h3 v-if="item.title && index === 1">{{ item.title }}</h3>
                    <span v-if="item.date && index === 1">{{ item.date.text }} <time :datetime="item.date.date"><b>{{ item.date.date }}</b></time></span>
                    <MDC v-if="item.summary && index === 1" :value="item.summary" class="bio-content"></MDC>
                    <ContentRenderer v-if="item.body && index === 1" :value="item.body" class="bio-content"/>
                    <MDC v-if="item.coop && index === 1" :value="item.coop" class="bio-content"></MDC>
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
    import { mapProfile } from '~/composables/maps/mapProfile';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { ButtonItem } from '~/types/navigation';
    // @ts-ignore - TypeScript error: Cannot find module '@nuxt/content' or its corresponding type declarations.
    import type { DevPostsCollectionItem, ProfileInformationCollectionItem } from '@nuxt/content';


    //  --- Content fetching logic
    const profilePath = 'profileInfo';
    const profileCache = 'profileCache';
    const biography = await fetchCollection<ProfileInformationCollectionItem, ReturnType<typeof mapProfile>>(profilePath, profileCache, mapProfile);

    const personalPostPath = 'personalPosts';
    const personalPostCache = 'personalCache';
    const personalPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(personalPostPath, personalPostCache, mapBlogData);
    
    
    //  --- Pagination Logic
    const num:number = 3;
    const paginitionData = computed(() => {currentPage.value; return blogPagination(personalPosts.value, currentPage.value, num)});
    const nextPage = computed<ButtonItem>(() => { return{ label: 'Neste', cls: ['button', 'pagination-btn'], action: () => currentPage.value ++ }});
    const prevPage = computed<ButtonItem>(() => { return{ label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => currentPage.value -- }});
    
    const currentPage = ref<number>(1);
    const totalPages = computed<number>(() => { if (personalPosts.value) return Math.ceil(personalPosts.value.length / num); return 0; });

    //  --- Debugging tools
    //console.log("Biography Data:", biography.value);
    //console.log("Personal Posts:", personalPosts.value);
    //console.log("Pagination Data:", paginitionData.value);
    
</script>