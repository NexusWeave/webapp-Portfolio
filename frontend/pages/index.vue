<template>
    <article class="article-wrapper flex-col">
        <h2> Siste tekniske logger </h2>
        <section class="blog-section flex-wrap-row-items-center-justify-evenly">
            <section v-for="post in mappedPosts" :key="post.id" class="blog-content">
                <ArticleHead :article="post" />
            </section>
        </section>
        <NuxtLink to="/logs/records" class="btn btn-primary mt-4">Se alle logger</NuxtLink>
    </article>

    <section class="flex-wrap-row-items-center-justify-evenly">
        <Timeline v-if="academicData.length > 0"
            title="Karriere & Utdanning"
            :data="academicData"
            :cls = "['component-blue', 'timeline-container',
            'flex-wrap-row-justify-evenly', 'component-w-g-b']"
        />

    </section>
    <RepositoryPortfolio /> 
</template>
<script setup lang="ts">

    //  --- Meta information
    definePageMeta( { order: 0, label: 'Portefølje', description: "Hovedsiden som gir en oversikt over Kristoffers prosjekter, akademiske reise og de nyeste tekniske loggene. Fungerer som en inngangsport til hele nettstedet." });

    //  --- Import dependencies & Types
    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    
    import { blogPagination } from '@/composables/pagination';
    import { mapTimeline } from '@/composables/maps/mapTimeline';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    //@ts-ignore - TypeScript error: Cannot find module '@nuxt/content' or its corresponding type declarations.
    import type { DevPostsCollectionItem, AcademicCollectionItem, TimelineCollectionItem } from '@nuxt/content';



    //  --- Component logic
    const academicData = await fetchCollection<AcademicCollectionItem, ReturnType<typeof mapTimeline>>('academic', 'academic-info', mapTimeline);

        //  --- Conent logic
    const devPostPath = 'devPosts';
    const devPostCache = 'devPostCache';
    const rawPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPostPath, devPostCache, mapBlogData);
    
    const n = 2;
    const mappedPosts =  computed(() => {return blogPagination(rawPosts.value, 1, n)});

    //  --- Debugging Logic
    //console.log("Processed timeline:", academicTimeline.value);
    //console.log("Achievements data on load:", achievementsTimeline.value);
    //console.log("Mapped posts - ", mappedPosts.value)
</script>