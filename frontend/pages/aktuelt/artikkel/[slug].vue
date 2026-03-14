<template>
<ArticlePage :data="article" />
</template>

<script lang="ts" setup>

    //  --- Import dependencies & types
    import { useRoute } from 'vue-router';
    import { fetchCollection } from '#imports';
    import { mapBlogData } from '@/composables/maps/blogPost';

    import type { DevPostsCollectionItem } from '@nuxt/content';
    

     //  --- Article Logic
    
    const route = useRoute();
    const slug = route.params.slug;
    console.error("Slug from route: ", slug);

        //  --- Dev Data Logic
    const devPath = 'devPosts';
    const devCache = 'devCache';
    const rawDev = await fetchCollection<DevPostsCollectionItem>(devPath, devCache)

    const personalPath = 'personalPosts';
    const personalCache = 'personalCache';
    const rawPersonal = await fetchCollection<DevPostsCollectionItem>(personalPath, personalCache);
    
    const article = computed(() => 
    {
        const dev = mapBlogData(rawDev.value)?.filter(article => String(article.id) === String(slug));
        const personal = mapBlogData(rawPersonal.value)?.filter(article => String(article.id) === String(slug));
        
        if (dev && dev.length > 0) return dev[0];
        if (personal && personal.length > 0) return personal[0];
    });

    //  --- Debug Logic
    //console.log("Articles in page: ", article.value);
    //console.log("Article Page loaded with article: ", article.value?.ingress);
    console.error("Slug from route: ", slug);
</script>