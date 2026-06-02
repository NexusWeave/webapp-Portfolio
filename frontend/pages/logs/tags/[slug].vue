<template>
    <section class="flex-wrap-row-justify-center tag-wrapper">
        <section v-if="tags && tags.length > 0">
            <h2> Filtrer etter Merkelapp </h2>
            <NavigationButton v-for="(tag, i) in tags" :key="i" :data="tag" :cls="['button', tag.name, 'tag-btn']"/>
            <NavigationButton :data="resetButton" :cls="['button', 'reset-btn', 'tag-btn']"/>
        </section>
    </section>

    <template v-if="current && current.length > 0">
        <h2> Siste Tekniske Logger for {{ displaySlug }} </h2>
        <section class="flex-wrap-row-justify-space-evenly">
            <article v-for="post in current">
                <ArticleHead  v-if="!post.isArchived" :key="post.id" :article="post" />
            </article>
        </section>
    </template>

    <template v-if="totalPages && totalPages > 0">
        <h2> Eldre Tekniske Logger for {{ displaySlug }} </h2>
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

    import { ref, computed, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { fetchCollection } from '#imports';
    import { blogPagination } from '@/composables/pagination';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { ButtonItem } from '~/types/navigation';
    import type { DevPostsCollectionItem } from '@nuxt/content';

    const route = useRoute();
    const router = useRouter();
    const slug = computed(() => route.params.slug as string);
    const displaySlug = computed(() => slug.value.charAt(0).toUpperCase() + slug.value.slice(1).replace(/-/g, ' '));
//  --- Dev Data Logic
const devPostPath = 'devPosts';
const devPostCache = 'devPostCache';
const rawDevPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPostPath, devPostCache, mapBlogData);

const rawPosts = computed(() => {
    return rawDevPosts.value;
});

//  --- Pagination logic
const n = 3;
const num:number = 1;
const label = ref(String(slug));
const currentPage: Ref<number> = ref(1);

const current =  computed(() => {return blogPagination(rawPosts.value.filter(post => !post.isArchived), num, n);});
const archived =  computed(() => {currentPage.value; return blogPagination(rawPosts.value.filter(post => post.isArchived), currentPage.value, n);});

const totalPages = computed(() => Math.ceil((rawPosts.value.length) / n) - 1 || 0);
const prevPage = computed<ButtonItem>(() => { return { label: 'Forrige',  action: (): number => currentPage.value -- }; });
const nextPage = computed<ButtonItem>(() =>  { return {label: 'Neste', action: ():number => { if (typeof currentPage.value === 'number') return currentPage.value++; else return 0;}};});

//  --- Tag filtering logic
const tags = computed(() => {
    // We fetch tags from all posts to allow switching between tags
    const allPosts = rawDevPosts.value;
    const data = allPosts.flatMap(post => post.tags).filter((tag, index, self) => index === self.findIndex(t => t.name === tag.name))
    return data.map(tag => { return { ...tag, action: () => label.value = tag.name.toLowerCase() } });
});

    const resetButton: ButtonItem = { label: 'Tilbakestill', action: () => router.push('/logger')};

</script>