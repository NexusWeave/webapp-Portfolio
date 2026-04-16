<template>
    <article class="article-wrapper flex-column">
        <h2> Logger fra {{ slug.charAt(0).toUpperCase() + String(route.params.slug).slice(1).replace(/-/g, ' ') }} Etiketten</h2>
        <section class="blog-section flex-wrap-row-align-items-center-justify-space-evenly">
                <section v-for="post in article" :key="post.id" class="blog-content">
                <ArticleHead :article="post" />
            </section>
        </section>
    </article>
</template>

<script lang="ts" setup>

    //  --- Import dependencies & types
    import { useRoute } from 'vue-router';
    import { fetchCollection } from '#imports';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { PostItem } from '~/types/documents';
    import type { DevPostsCollectionItem } from '@nuxt/content';


     //  --- Route & slug logic
    const route = useRoute();
    const slug = route.params.slug as string;

    const devPath = 'devPosts';
    const devCache = 'devCache';
    const devPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPath, devCache, mapBlogData);

    const personalPath = 'personalPosts';
    const personalCache = 'personalCache';
    const personalPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(personalPath, personalCache, mapBlogData);
    
    const article = computed(() => 
    { const currentSlug = String(slug);

        const findBlog = (collection: PostItem[] | undefined) => {
            if (!collection) return null;
            return collection?.filter(item => item.isPublished && item.tags.some(tag => tag?.name === currentSlug));
        };
        return findBlog(devPosts.value) ?? findBlog(personalPosts.value);

    });

    //  --- Debug Logic
    //console.log("Articles in page: ", article.value);
    //console.log("Article Page loaded with article: ", article.value?.ingress);
    //console.error("Slug from route: ", slug);
</script>