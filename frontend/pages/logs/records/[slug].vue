<template> 
    <ArticlePage :data="posts"/>
</template>

<script lang="ts" setup>

    
    //  --- Import dependencies & types
    import { useRoute } from 'vue-router';
    import { fetchCollection } from '#imports';
    import { mapBlogData } from '~/composables/maps/mapBlogPost';

    import type { PostItem } from '~/types/documents';
    import type { DevPostsCollectionItem } from '@nuxt/content';

    //  --- Meta Information
    definePageMeta( { order: 3, description: `Viser en enkelt loggoppføring i sin helhet. Hver artikkel har sin egen unike nettadresse basert på tittelen.` });
     //  --- Route & slug logic
    const route = useRoute();
    const slug = route.params.slug;

    //  --- Dev Data Logic
    const devPath = 'devPosts';
    const devCache = 'devCache';
    const devPosts = await fetchCollection<DevPostsCollectionItem, ReturnType<typeof mapBlogData>>(devPath, devCache, mapBlogData);

    const posts = computed<PostItem >(() => 
    {
        
        const currentSlug = String(slug);

        const findBlog = (collection: PostItem[]) => {
            if (!collection) return {} as PostItem;
            return collection.find(blog => String(blog.path) === currentSlug) || {} as PostItem;
        };

        return findBlog(devPosts.value);

    });

    //  --- Dynamic SEO Meta & Schema
    const pageTitle = computed(() => {
        if (!posts.value) return undefined;
        return posts.value.meta?.title || (posts.value.title ? `${posts.value.title} - Tekniske Logger` : undefined);
    });
    const pageDescription = computed(() => {
        if (!posts.value) return undefined;
        return posts.value.meta?.description || posts.value.ingress || posts.value.info || (posts.value.title ? `Teknisk logg av Kristoffer Gjøsund om ${posts.value.title}` : undefined);
    });
    const pageImage = computed(() => posts.value?.meta?.image || posts.value?.image);
    const fullUrl = computed(() => `https://krigjo25.no/logs/records/${slug}`);

    useCustomSeo({
        title: pageTitle,
        description: pageDescription,
        image: pageImage,
        urlPath: computed(() => `/logs/records/${slug}`),
        type: 'article'
    });

    watchEffect(() => {
        if (posts.value && posts.value.title) {
            useHead({
                script: [
                    {
                        type: 'application/ld+json',
                        children: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            '@id': `${fullUrl.value}/#article`,
                            'mainEntityOfPage': fullUrl.value,
                            'headline': posts.value.title,
                            'description': pageDescription.value,
                            'author': {
                                '@type': 'Person',
                                '@id': 'https://krigjo25.no/#person',
                                'name': 'Kristoffer Gjøsund',
                                'url': 'https://krigjo25.no'
                            },
                            'publisher': {
                                '@type': 'Person',
                                '@id': 'https://krigjo25.no/#person'
                            },
                            'datePublished': posts.value.date?.date || undefined
                        })
                    }
                ]
            });
        }
    });

    //  --- Debug Logic
    //console.log("Articles in page: ", article.value);
    //console.log("Article Page loaded with article: ", article.value?.ingress);
    //console.error("Slug from route: ", slug);
</script>