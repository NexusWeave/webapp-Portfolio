<template>
    <article class="article-wrapper flex-column">
        <h2> Siste tekniske logger </h2>
        <section class="blog-section flex-wrap-row-align-items-center-justify-space-evenly">
            <section v-for="post in mappedPosts" :key="post.id" class="blog-content">
                <ArticleHead :article="post" />
            </section>
        </section>
    </article>

    <section :class="['flex-wrap-row-align-items-center-justify-space-evenly']">

        <Timeline v-if="academicData.length > 0"
            title="Akademisk Tidslinje"
            :data="academicData"
            :cls = "['component-blue', 'timeline-container',
            'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']"
        />

        <Timeline v-if="achievementData.length > 0"
            title="Prestasjonstidslinje"
            :data="achievementData"
            :cls = "['component-seagreen', 'timeline-container',
            'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']"
        />
    </section>
    <RepositoryPortfolio /> 
</template>
<script setup lang="ts">

    //  --- Meta information
    definePageMeta( { order: 0, label: 'Portefølje', seo: { title: 'LMCS - Portefølje', description: "Utforsk Kristoffer Gjøsund (krigjo25) - Min personlige nettside med mine prosjekter, en oversikt over min akademiske reise og tekniske logger fra min hverdag som utvikler.", author: 'Kristoffer Gjøsund', ogTitle: 'Portefølje - Kristoffer Gjøsund',  ogDescription: "Utforsk Kristoffer Gjøsund (krigjo25) - Min personlige nettside med mine prosjekter, en oversikt over min akademiske reise og tekniske logger fra min hverdag som utvikler.", ogImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg',  ogUrl: 'https://krigjo25.no', ogType: 'website', ogLocale: 'nb_NO', twitterCard: 'summary_large_image', twitterTitle: 'LMCS - Portefølje', twitterDescription: "Utforsk Kristoffer Gjøsund (krigjo25) - Min personlige nettside med mine prosjekter, en oversikt over min akademiske reise og tekniske logger fra min hverdag som utvikler.", twitterImage: 'https://krigjo25.no/media/images/carousel/20240903_165612.jpg', themeColor: '#ffffff' } });

    //  --- Import dependencies & Types
    import { ref, computed } from 'vue';
    import { fetchCollection } from '#imports';
    
    import { blogPagination } from '@/composables/pagination';
    import { mapTimeline } from '@/composables/maps/mapTimeline';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { ButtonItem } from '~/types/navigation';
    import type { DevPostsCollectionItem, AcademicCollectionItem, AchievementsCollectionItem } from '@nuxt/content';



    //  --- Component logic
    const academicData = await fetchCollection<AcademicCollectionItem, ReturnType<typeof mapTimeline>>('academic', 'academic-info', mapTimeline);
    const achievementData = await fetchCollection<AchievementsCollectionItem, ReturnType<typeof mapTimeline>>('achievements', 'achievements-info', mapTimeline);


        //  --- Conent logic
    const devPostPath = 'devPosts';
    const devPostCache = 'devPostCache';
    const rawPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPostPath, devPostCache, mapBlogData);
    
    const n = 2; // Number of posts per page
    const currentPage: Ref<number> = ref(1);
    const mappedPosts =  computed(() => {return blogPagination(rawPosts.value, 1, n)});

    //  --- Debugging Logic
    //console.log("Processed timeline:", academicTimeline.value);
    //console.log("Achievements data on load:", achievementsTimeline.value);
    //console.log("Mapped posts - ", mappedPosts.value)
</script>