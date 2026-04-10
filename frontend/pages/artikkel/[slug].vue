<template>
<ArticlePage :data="article" :isPage="true" />
</template>

<script lang="ts" setup>

    //  --- Import dependencies & types
    import { useRoute } from 'vue-router';
    import { fetchCollection } from '#imports';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { DevPostsCollectionItem } from '@nuxt/content';
    

     //  --- Route & slug logic
    const route = useRoute();
    const slug = route.params.slug;

        //  --- Dev Data Logic
    const devPath = 'devPosts';
    const devCache = 'devCache';
    const rawDev = await fetchCollection<DevPostsCollectionItem>(devPath, devCache)

    const personalPath = 'personalPosts';
    const personalCache = 'personalCache';
    const rawPersonal = await fetchCollection<DevPostsCollectionItem>(personalPath, personalCache);
    
    const article = computed(() => 
    {
        const currentSlug = String(slug);

        const findBlog = (collection: DevPostsCollectionItem[] | undefined) => {
            if (!collection) return null;
            const mapped = mapBlogData(collection);
            return mapped?.find(blog => String(blog.path) === currentSlug) || null;
        };

        return findBlog(rawDev.value) ?? findBlog(rawPersonal.value);

    });

    //  --- Debug Logic
    //console.log("Articles in page: ", article.value);
    //console.log("Article Page loaded with article: ", article.value?.ingress);
    //console.error("Slug from route: ", slug);
</script>