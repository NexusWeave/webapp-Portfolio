<template>
    <section class="flex-wrap-row-justify-center tag-wrapper">
        <section v-if="tags && tags.length > 0">
            <h2> Filtrer etter Merkelapp </h2>
            <NavigationButton v-for="(tag, i) in tags" :key="i" :data="tag" :cls="['button', tag.name, 'tag-btn']"/>
            <NavigationButton :data="resetButton" :cls="['button', 'reset-btn', 'tag-btn']"/>
        </section>
    </section>

    <template v-if="postsByTag && postsByTag.length > 0">
        <h2> Tekniske Logger filtrert etter {{ label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ') }} </h2>
        <section class="flex-wrap-row-justify-space-evenly" v-if="archived && archived.length > 0">
            <article v-for="post in postsByTag">
                <ArticleHead :key="post.id" :article="post" />
            </article>
        </section>
    </template>

    <template v-if="current && current.length > 0 && postsByTag && postsByTag.length === 0">
        <h2> Siste Tekniske Logger </h2>
        <section class="flex-wrap-row-justify-space-evenly">
            <article v-for="post in current">
                <ArticleHead  v-if="!post.isArchived" :key="post.id" :article="post" />
            </article>
        </section>
    </template>

    <template v-if="totalPages && totalPages > 0 && postsByTag && postsByTag.length === 0">
        <h2> Eldre Tekniske Logger </h2>
        <section v-if="totalPages > 1" class="flex-wrap-row-align-items-center-justify-space-evenly pagination-container">
            <NavigationButton v-if="currentPage > 1" :data="prevPage" :cls="['button', 'pagination-btn']"/>
                <span> {{ currentPage }} / {{ totalPages }}</span>
            <NavigationButton v-if="currentPage < totalPages" :data="nextPage" :cls="['button', 'pagination-btn']"/>
        </section>
        <section class="flex-wrap-row-justify-space-evenly" v-if="archived && archived.length > 0">
            <article v-for="post in archived">
                <ArticleHead v-if="post.isArchived" :key="post.id" :article="post" />
            </article>
        </section>
    </template>
    
</template>
<script lang="ts" setup>

    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { ButtonItem } from '~/types/navigation';
    import type { DevPostsCollectionItem } from '@nuxt/content';

    //  --- Meta information
    definePageMeta( { order: 1, label: 'Tekniske Logger', description : "En samling av tekniske artikler og erfaringer fra hverdagen som utvikler. Her kan man filtrere logger etter emneknagger for å finne spesifikke temaer."});

    //  --- Content logic
    const devPostPath = 'devPosts';
    const devPostCache = 'devPostCache';
    const rawPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPostPath, devPostCache, mapBlogData);

    //  --- Pagination logic
    const n = 3;
    const num:number = 1;
    const label = ref('blog-post');
    const currentPage: Ref<number> = ref(1);

    const current =  computed(() => {return blogPagination(rawPosts.value.filter(post => !post.isArchived), num, n);});
    const archived =  computed(() => {currentPage.value; return blogPagination(rawPosts.value.filter(post => post.isArchived), currentPage.value, n);});

    const postsByTag = computed(() => {
        if (!rawPosts.value || rawPosts.value.length === 0) return [];
        if (!label.value || label.value === 'blog-post') return [];

        return blogPagination(rawPosts.value.filter(post => post.tags.some(t => t.labels?.includes(label.value))), currentPage.value, rawPosts.value.length - num, label.value);
    });
    const totalPages = ref(Math.ceil((rawPosts.value.length) / n) - 1 || 0);
    const prevPage = computed<ButtonItem>(() => { return { label: 'Forrige',  action: (): number => currentPage.value -- }; });
    const nextPage = computed<ButtonItem>(() =>  { return {label: 'Neste', action: ():number => { if (typeof currentPage.value === 'number') return currentPage.value++; else return 0;}};});

    //  --- Tag filtering logic
    const tags = computed(() => {
        const data = rawPosts.value.flatMap(post => post.tags).filter((tag, index, self) => index === self.findIndex(t => t.name === tag.name))
        return data.map(tag => { return { ...tag, action: () => label.value = tag.name.toLowerCase() } });
    });

    const resetButton: ButtonItem = { label: 'Tilbakestill', action: () => label.value = 'blog-post'};

    // --- Watchers
    watch(label, (newValue) => { label.value = newValue; });

    //  --- Debugging Logic
    //console.log("All Tags: ", tags.value);
    //console.log("ALl Posts: ", rawPosts.value);
    //console.log("Mapped Posts: ", current.value);
    //console.log("Archived Posts: ", archived.value);
    
    
</script>