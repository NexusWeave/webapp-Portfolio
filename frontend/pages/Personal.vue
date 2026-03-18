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
            <section class="flex-column-justify-center-align-center"> <MediaFigure :data="CarouselData[0]" /></section>
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

    //  Importing dependencies & types
    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';
    
    import type {FigureItem } from '@/types/props';
    import type { DevPostsCollectionItem } from '@nuxt/content';

    //  --- Content fetching logic
    const profilePath = 'personalProfile';
    const profileCache = 'personalProfileCache';
    const biography = await fetchCollection(profilePath, profileCache);

    const personalPostPath = 'personalPosts';
    const personalPostCache = 'personalCache';
    const rawPersonal = await fetchCollection<DevPostsCollectionItem>(personalPostPath, personalPostCache);
    const mappedPosts = computed(() => {currentPage.value; return blogPagination(rawPersonal.value, currentPage.value)});
    
    //  --- Pagination Logic
    const n = 3;
    const PageButtons = computed(() =>
    [
        { id: 0, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => currentPage.value -- },
        { id: 1, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => currentPage.value ++ }
    ]);

    const currentPage = ref<number>(1);
    const totalPages = computed(() => { if (rawPersonal.value) return Math.ceil(rawPersonal.value.length / n); return 0; });

    //  --- Carousel Data
    const CarouselData: FigureItem[] = [ { type : 'jpg', alt : 'Portrait of Kristoffer Gjøsund', src : 'media/images/carousel/20240903_165612.jpg', caption : '- Motivert av å gi, og heve resultater gjennom samarbeid. Hver utfordring, er en felles reise. - Kristoffer Gjøsund' } ];

    //  --- Debugging tools
    //console.log(rawPersonal.value);
    //console.log(mappedPosts.value);
    
</script>