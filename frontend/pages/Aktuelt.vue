<template>
    <article class="article-wrapper flex-column">
        <h2> Mine Faglige Logger </h2>
        <section class="blog-section flex-wrap-row">
            <UtilsPagination v-if="totalDevPages > 1"
                    :activePage="currentDevPage" 
                    :totalPage="totalDevPages" 
                    @update="currentDevPage = $event"
                />
            <section v-for="(post, index) in mappedDev" :key="index" class="blog-content">
                <ArticleHead :article="post" />
            </section>
        </section>

        <h2> Mine Personlige Logger </h2>
        <section class="blog-section flex-wrap-row">
            <UtilsPagination v-if="totalPersonalPages > 1"
                    :activePage="currentPersonalPage" 
                    :totalPage="totalPersonalPages" 
                    @update="currentPersonalPage = $event"
                />
            <section v-for="(post, index) in mappedPersonal" :key="index" class="blog-content">
                <ArticleHead :article="post" />
            </section>
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
    const n = 8;
    const currentDevPage = ref<number>(1);
    const currentPersonalPage = ref<number>(1);

    const totalDevPages = computed(() => { if (rawDev.value) return Math.ceil(rawDev.value.length / n); return 0; });
    const totalPersonalPages = computed(() => { if (rawPersonal.value) return Math.ceil(rawPersonal.value.length / n); return 0; });

    const mappedDev =  computed(() => blogPagination(rawDev.value, currentDevPage.value));
    const mappedPersonal = computed(() => blogPagination(rawPersonal.value, currentPersonalPage.value));

    // Debugging logs
    //console.log(rawDev.value);
    //console.log(rawPersonal.value);
    //console.log(currentDevPage.value);
    //console.log(mappedDev.value);
    //console.log(mappedPersonal.value);
    
</script>