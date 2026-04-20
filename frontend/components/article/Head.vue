<template>
    <section :class="['flex-column-align-items-center', {'article-section': !!isPost}]">
        <Suspense>
            <template #default>
                <section :class="[{'blog-header': !isPost}, {'ingress-header': isPost}]">
                    <h2>{{ article.title }}</h2>
                    <p class="flex-wrap-row-align-items-center-justify-center article-metadata">
                        <span v-if="!!article.date" :class="'meta-date'"> Publisert: <b><time :datetime="article.date.date">{{ article.date.date }}</time></b></span>
                        <NavigationAnchor v-for="(tag) in article.tags" :data="tag" :class="tag.cls" />
                    </p>
                    <MDC :value="article.ingress" class="ingress-content" />
                    <NavigationNavMenu v-if="!isPost && !!article.anchor" :data="article.anchor" :class="['nav-bar', 'read-more']"/>
                </section>
            </template>
            <template #fallback> <section class="loading">Laster innlegg til logger...</section> </template>
        </Suspense>
    </section>
</template>

<script lang="ts" setup>

    //  --- Import dependency & types
    import { computed } from 'vue';
    import type { HeaderProps } from '@/types/article';

    //  --- Props logic
    const props = withDefaults(defineProps<HeaderProps>(), { isPost: () => false });

    const article = computed(() => props.article);
    const isPost = computed(() => props.isPost);

    //  --- Debugging logic
    //console.log("Article Header Component - Article :", article.value);
    //console.log("Article Header Component - Button :", button.value);
    //console.log("Article Header Component - isPostPage :", isPost.value);
    //console.log("Article Header Component - Article Anchor :", article.anchor);
    //console.log("Article Header Component - Article Ingress :", article.value.tags);
</script>