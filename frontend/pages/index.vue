<template>
    <article class="article-wrapper flex-column">
        <h2> Logger fra mine prosjekter </h2>
        <section v-if="totalPages > 1" class="flex-wrap-row-align-items-center-justify-space-evenly">
            <NavigationButton v-if="currentPage > 1" :data="PageButtons[0]"/>
                <span> {{ currentPage }} / {{ totalPages }}</span>
            <NavigationButton v-if="currentPage < totalPages" :data="PageButtons[1]"/>
        </section>

        <section class="blog-section flex-wrap-row-align-items-center-justify-space-evenly">
                <section v-for="post in mappedPosts" :key="post.id" class="blog-content">
                <ArticleHead :article="post" />
            </section>
            
        </section>
    </article>

    <section :class="['flex-wrap-row-justify-space-evenly']">

        <Timeline v-if="academicTimeline.length > 0"
            title="Akademisk Tidslinje"
            :data="academicTimeline"
            :cls = "['component-blue', 'timeline-container',
            'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']"
        />

        <Timeline v-if="achievementsTimeline.length > 0"
            title="Prestasjonstidslinje"
            :data="achievementsTimeline"
            :cls = "['component-seagreen', 'timeline-container',
            'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']"
        />
    </section>
    <section>
        <RepositoryPortfolio />
    </section>
</template>
<script setup lang="ts">

    import { ref, computed } from 'vue';
    import { blogPagination } from '@/composables/pagination';  // @ts-ignore

    //  --- Import & types logic
    import { fetchCollection, mapTimeline } from '#imports';
    import type { DevPostsCollectionItem, AcademicCollectionItem, AchievementsCollectionItem } from '@nuxt/content';


    //  --- Component logic
    const academicData = await fetchCollection<AcademicCollectionItem>('academic', 'academic-info');
    const achievementData = await fetchCollection<AchievementsCollectionItem>('achievements', 'achievements-info');

    const academicTimeline = computed(() => mapTimeline(academicData));
    const achievementsTimeline = computed(() => mapTimeline(achievementData));

        //  --- Conent logic
    const devPostPath = 'devPosts';
    const devPostCache = 'devPostCache';
    const rawPosts = await fetchCollection<DevPostsCollectionItem>(devPostPath, devPostCache)
    
    const mappedPosts =  computed(() => {currentPage.value; return blogPagination(rawPosts.value, currentPage.value)});
    
    //  --- Pagination Logic
    const currentPage = ref<number>(1);
    const totalPages = computed(() => { if (rawPosts.value) { const n = 3; return Math.ceil(rawPosts.value.length / n); } return 0; });
    const PageButtons = computed(() =>
    [
        { id: 0, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => currentPage.value -- },
        { id: 1, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => currentPage.value ++ }
    ]);

    
    //  --- Debugging Logic
    //console.log("Processed timeline:", academicTimeline.value);
    //console.log("Achievements data on load:", achievementsTimeline.value);
</script>