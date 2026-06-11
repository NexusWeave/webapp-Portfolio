<template>
    <section class="flex-wrap-row flex-center tag-wrapper">
        <section v-if="tagGroups && tagGroups.length > 0" class="tag-hierarchy">
            <h2> Filtrer etter Merkelapp </h2>
            <div class="tag-groups-container">
                <div class="root-tags-row">
                    <NavigationButton 
                        v-for="group in tagGroups" :key="group.root.name"
                        :data="{ ...group.root, action: () => handleRootClick(group.root.name) }" 
                        :cls="['button', group.root.name, 'tag-btn', 'root-tag', openGroup === group.root.name ? 'active' : '']"
                    />
                    <NavigationButton :data="resetButton" :cls="['button', 'reset-btn', 'tag-btn']"/>
                </div>
                <div class="child-tags-row" v-show="openGroup !== null">
                    <NavigationButton 
                        v-for="child in activeGroupChildren" :key="child.name" 
                        :data="{ ...child, action: () => handleChildClick(child.name) }" 
                        :cls="['button', child.name, 'tag-btn', 'child-tag', label === child.name.toLowerCase() ? 'active' : '']"
                    />
                </div>
            </div>
        </section>
    </section>

    <template v-if="current && current.length > 0">
        <h2> Siste Tekniske Logger for {{ displaySlug }} </h2>
        <section class="flex-wrap-row flex-center">
            <article v-for="post in current">
                <ArticleHead  v-if="!post.isArchived" :key="post.id" :article="post" />
            </article>
        </section>
    </template>

    <template v-if="totalPages && totalPages > 0">
        <h2> Eldre Tekniske Logger for {{ displaySlug }} </h2>
        <section v-if="totalPages > 1" class="flex-wrap-row flex-center pagination-container">
            <NavigationButton v-if="currentPage > 1" :data="prevPage" :cls="['button', 'pagination-btn']"/>
                <span> {{ currentPage }} / {{ totalPages }}</span>
            <NavigationButton v-if="currentPage < totalPages" :data="nextPage" :cls="['button', 'pagination-btn']"/>
        </section>
        <section class="flex-wrap-row flex-center" v-if="archived && archived.length > 0">
            <article v-for="post in archived">
                <ArticleHead v-if="post.isArchived" :key="post.id" :article="post" />
            </article>
        </section>
    </template>
    
</template>
<script lang="ts" setup>

    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    import { useRoute, useRouter } from 'vue-router';
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
const label = ref(String(slug.value));
const currentPage: Ref<number> = ref(1);

const current =  computed(() => {return blogPagination(rawPosts.value.filter(post => !post.isArchived), num, n);});
const archived =  computed(() => {currentPage.value; return blogPagination(rawPosts.value.filter(post => post.isArchived), currentPage.value, n);});

const totalPages = computed(() => Math.ceil((rawPosts.value.length) / n) - 1 || 0);
const prevPage = computed<ButtonItem>(() => { return { label: 'Forrige',  action: (): number => currentPage.value -- }; });
const nextPage = computed<ButtonItem>(() =>  { return {label: 'Neste', action: ():number => { if (typeof currentPage.value === 'number') return currentPage.value++; else return 0;}};});

//  --- Tag filtering logic
const openGroup = ref<string | null>(null);

const handleRootClick = (groupName: string) => {
    openGroup.value = openGroup.value === groupName ? null : groupName;
    label.value = groupName.toLowerCase();
};

const handleChildClick = (childName: string) => {
    label.value = childName.toLowerCase();
};

const tagGroups = computed(() => {
    const groups: Record<string, { root: any, children: any[] }> = {};
    rawDevPosts.value.forEach(post => {
        if (post.tags && post.tags.length > 0) {
            const rootTag = post.tags[0];
            const rootName = rootTag.name;
            if (!groups[rootName]) {
                groups[rootName] = { 
                    root: { ...rootTag }, 
                    children: [] 
                };
            }
            
            for (let i = 1; i < post.tags.length; i++) {
                const childTag = post.tags[i];
                if (!groups[rootName].children.find(c => c.name === childTag.name)) {
                    groups[rootName].children.push({ ...childTag });
                }
            }
        }
    });
    return Object.values(groups);
});

const activeGroupChildren = computed(() => {
    if (!openGroup.value) return [];
    const group = tagGroups.value.find(g => g.root.name === openGroup.value);
    return group ? group.children : [];
});

    const resetButton: ButtonItem = { label: 'Tilbakestill', action: () => { router.push('/logger') }};

</script>