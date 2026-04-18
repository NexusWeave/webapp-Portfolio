<template>
    <section>
        <template v-if="tags && tags.length > 0">
            <NavigationAnchor v-for="(tag, i) in tags" :key="i" :data="tag" :cls="['button', tag.name]"/>
        </template>
    </section>
    
    <h2> Siste Tekniske Logger </h2>
    <section class="flex-wrap-row-justify-space-evenly">
        <article v-for="post in current">
            <ArticleHead  v-if="!post.isArchived" :key="post.id" :article="post" />
        </article>
    </section>

    <h2> Eldre Tekniske Logger </h2>
    <section v-if="totalPages > 1" class="flex-wrap-row-align-items-center-justify-space-evenly pagination-container">
            <NavigationButton v-if="currentPage > 1" :data="prevPage" :cls="['button', 'pagination-btn']"/>
                <span> {{ currentPage }} / {{ totalPages }}</span>
            <NavigationButton v-if="currentPage < totalPages" :data="nextPage" :cls="['button', 'pagination-btn']"/>
        </section>
    <section class="flex-wrap-row-justify-space-evenly">
        <article v-for="post in archived">
            <ArticleHead v-if="post.isArchived" :key="post.id" :article="post" />
        </article>
    </section>


    
</template>
<script lang="ts" setup>

    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { ButtonItem } from '~/types/navigation';
    import type { DevPostsCollectionItem } from '@nuxt/content';

    //  --- Meta information
    definePageMeta( { order: 1, label: 'Tekniske Logger', seo: { title: 'LMCS - Logger', description: "Utforsk Kristoffer Gjøsund (krigjo25) - Min personlige nettside med mine prosjekter, en oversikt over min akademiske reise og tekniske logger fra min hverdag som utvikler.", author: 'Kristoffer Gjøsund', ogTitle: 'Logger - Kristoffer Gjøsund',  ogDescription: "Utforsk Kristoffer Gjøsund (krigjo25) - Min personlige nettside med mine prosjekter, en oversikt over min akademiske reise og tekniske logger fra min hverdag som utvikler.", ogImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg',  ogUrl: 'https://krigjo25.no/logger', ogType: 'website', ogLocale: 'nb_NO', twitterCard: 'summary_large_image', twitterTitle: 'LMCS - Logger', twitterDescription: "Utforsk Kristoffer Gjøsund (krigjo25) - Min personlige nettside med mine prosjekter, en oversikt over min akademiske reise og tekniske logger fra min hverdag som utvikler.", twitterImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg', themeColor: '#ffffff' } });

    //  --- Conent logic
    const devPostPath = 'devPosts';
    const devPostCache = 'devPostCache';
    const rawPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPostPath, devPostCache, mapBlogData);
    
    const n = 3; // Number of posts per page
    const currentPage: Ref<number> = ref(1);
    const current =  computed(() => {return blogPagination(rawPosts.value, 1, n)});
    const archived =  computed(() => {currentPage.value; return blogPagination(rawPosts.value.filter(post => post.isArchived), currentPage.value, n)});
    const tags = [] /*computed(() => rawPosts.value.flatMap(post => post.tags)
    .reduce((map, tag) => map.set(tag.name, tag), new Map()));*/
    

    const totalPages = computed(() => { if (rawPosts.value) {return Math.ceil((rawPosts.value.length) / n) - 1; } return 0; });
    const prevPage = computed<ButtonItem>(() => { return { label: 'Forrige',  action: (): number => currentPage.value -- }; });
    const nextPage = computed<ButtonItem>(() =>  { return {label: 'Neste', action: ():number => { if (typeof currentPage.value === 'number') return currentPage.value++; else return 0;}};});

    //  --- Debugging Logic
    console.log("All Tags: ", tags.value);
    console.log("Mapped Posts: ", current.value);
    
</script>