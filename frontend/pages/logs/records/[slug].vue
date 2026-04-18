<template> 
    <ArticlePage :data="posts"/>
</template>

<script lang="ts" setup>

    //  --- Import dependencies & types
    import { useRoute } from 'vue-router';
    import { fetchCollection } from '#imports';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { DevPostsCollectionItem } from '@nuxt/content';
    import type { PostItem } from '~/types/documents';
    

     //  --- Route & slug logic
    const route = useRoute();
    const slug = route.params.slug;

        //  --- Dev Data Logic
    const devPath = 'devPosts';
    const devCache = 'devCache';
    const devPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPath, devCache, mapBlogData);

    const personalPath = 'personalPosts';
    const personalCache = 'personalCache';
    const personalPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(personalPath, personalCache, mapBlogData);
    
    const posts = computed<PostItem >(() => 
    {
        const currentSlug = String(slug);

        const findBlog = (collection: PostItem[]) => {
            return collection.find(blog => String(blog.path) === currentSlug) || {} as PostItem;
        };

        return findBlog(devPosts.value) ?? findBlog(personalPosts.value);

    });

    //  --- Debug Logic
    //console.log("Articles in page: ", article.value);
    //console.log("Article Page loaded with article: ", article.value?.ingress);
    //console.error("Slug from route: ", slug);
</script>