<template>
    <article class="article-wrapper flex-column">
        <h2> Mine Faglige Logger </h2>
        <section class="blog-section flex-wrap-row-justify-space-between">
            <NavigationButton v-if="currentDevPage > 1" :data="devPageButtons[0]"/>
            <section v-for="post in mappedDev" :key="post.id" class="blog-content">
                <ArticleHead :article="post" />
            </section>
            <NavigationButton v-if="currentDevPage < totalDevPages" :data="devPageButtons[1]"/>
        </section>

        <h2> Mine Personlige Logger </h2>
        <section class="blog-section flex-wrap-row-justify-space-between">
            <NavigationButton v-if="currentDevPage > 1" :data="devPageButtons[0]"/>
            <section v-for="post in mappedPersonal" :key="post.id" class="blog-content">
                <ArticleHead :article="post" />
            </section>
            <NavigationButton v-if="currentDevPage < totalDevPages" :data="devPageButtons[1]"/>
        </section>
    </article>
</template>

<script setup lang="ts">

    import { ref, computed } from 'vue';                        // @ts-ignore
    import { fetchCollection } from '#imports';                 // @ts-ignore
    import { blogPagination } from '@/composables/pagination';  // @ts-ignore

    import type { DevPostsCollectionItem } from '@nuxt/content';

    //  --- Dev Data Logic
    const devPath = 'devPosts';
    const devCache = 'devCache';
    const rawDev = await fetchCollection<DevPostsCollectionItem>(devPath, devCache)

    const personalPath = 'personalPosts';
    const personalCache = 'personalCache';
    const rawPersonal = await fetchCollection<DevPostsCollectionItem>(personalPath, personalCache);

     //  --- Pagination Logic
    const n = 3;
    const currentDevPage = ref<number>(1);
    const totalDevPages = computed(() => { if (rawDev.value) return Math.ceil(rawDev.value.length / n); return 0; });
    const devPageButtons = computed(() =>
    [
        { id: 0, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => currentDevPage.value -- },
        { id: 1, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => currentDevPage.value ++ }
    ]);
        

    
    const currentPersonalPage = ref<number>(1);
    const totalPersonalPages = computed(() => { if (rawPersonal.value) return Math.ceil(rawPersonal.value.length / n); return 0; });


    const mappedDev =  computed(() => {currentDevPage.value; return blogPagination(rawDev.value, currentDevPage.value)});
    const mappedPersonal = computed(() => {currentPersonalPage.value; return blogPagination(rawPersonal.value, currentPersonalPage.value)});

    // Debugging logs
    //console.log(rawDev.value);
    //console.log(rawPersonal.value);
    //console.log(currentDevPage.value);
    //console.log(mappedDev.value);
    //console.log(mappedPersonal.value);
    
</script>