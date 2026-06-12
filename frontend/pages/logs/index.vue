<template>
    <section class="flex-wrap-row-justify-center tag-wrapper">
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
                <div class="child-tags-row" v-if="activeGroupChildren.length > 0">
                    <NavigationButton 
                        v-for="child in activeGroupChildren" :key="child.name" 
                        :data="{ ...child, action: () => handleChildClick(child.name) }" 
                        :cls="['button', child.name, 'tag-btn', 'child-tag', label === child.name.toLowerCase() ? 'active' : '']"
                    />
                </div>
            </div>
        </section>
    </section>

    <Suspense>
        <template #default>
            <div>
                <template v-if="postsByTag && postsByTag.length > 0">
                    <h2> Tekniske Logger filtrert etter {{ label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, ' ') }} </h2>
                    <section class="flex-wrap-row flex-center" v-if="archived && archived.length > 0">
                        <article v-for="post in postsByTag">
                            <ArticleHead :key="post.id" :article="post" />
                        </article>
                    </section>
                </template>

                <template v-if="current && current.length > 0 && postsByTag && postsByTag.length === 0">
                    <h2> Siste Tekniske Logger </h2>
                    <section class="flex-wrap-row flex-center">
                        <article v-for="post in current">
                            <ArticleHead  v-if="!post.isArchived" :key="post.id" :article="post" />
                        </article>
                    </section>
                </template>

                <template v-if="totalPages && totalPages > 0 && postsByTag && postsByTag.length === 0">
                    <h2> Eldre Tekniske Logger </h2>
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
            </div>
        </template>
        <template #fallback>
            <article class="alert-info">
                <p>Laster inn logger...</p>
            </article>
        </template>
    </Suspense>
    
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

    const current =  computed(() => {return blogPagination(rawPosts.value.filter(post => !post.isArchived), 1, rawPosts.value.length);});
    const archived =  computed(() => {currentPage.value; return blogPagination(rawPosts.value.filter(post => post.isArchived), currentPage.value, n);});

    const postsByTag = computed(() => {
        if (!rawPosts.value || rawPosts.value.length === 0) return [];
        if (!label.value || label.value === 'blog-post') return [];

        return blogPagination(rawPosts.value.filter(post => post.tags.some(t => t.labels?.includes(label.value))), 1, rawPosts.value.length, label.value);
    });
    const totalPages = ref(Math.ceil((rawPosts.value.length) / n) - 1 || 0);
    const prevPage = computed<ButtonItem>(() => { return { label: 'Forrige',  action: (): number => currentPage.value -- }; });
    const nextPage = computed<ButtonItem>(() =>  { return {label: 'Neste', action: ():number => { if (typeof currentPage.value === 'number') return currentPage.value++; else return 0;}};});

    //  --- Tag filtering logic
    const openGroup = ref<string | null>(null);

    const handleRootClick = (groupName: string) => {
        if (openGroup.value === groupName) {
            openGroup.value = null;
            label.value = 'blog-post';
        } else {
            openGroup.value = groupName;
            label.value = groupName.toLowerCase();
        }
    };

    const handleChildClick = (childName: string) => {
        label.value = childName.toLowerCase();
        openGroup.value = null;
    };

    const tagGroups = computed(() => {
        const groups: Record<string, { root: any, children: any[] }> = {};
        rawPosts.value.forEach(post => {
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

    const resetButton: ButtonItem = { label: 'Tilbakestill', action: () => { label.value = 'blog-post'; openGroup.value = null; } };

    // --- Watchers
    watch(label, (newValue) => { label.value = newValue; });

    //  --- Debugging Logic
    //console.log("All Tags: ", tags.value);
    //console.log("ALl Posts: ", rawPosts.value);
    //console.log("Mapped Posts: ", current.value);
    //console.log("Archived Posts: ", archived.value);
    
    
</script>