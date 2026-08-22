<template>
    <section :class="['flex-column-align-items-center', {'article-section': !!isPost}]">
        <Suspense>
            <template #default>
                <section :class="[{'blog-header': !isPost}, {'ingress-header': isPost}]">
                    <h2>{{ article.title }}</h2>
                    <p class="flex-wrap-row-align-items-center-justify-center article-metadata">
                        <span v-if="!!article.date" :class="'meta-date'"> Publisert: <b><time :datetime="article.date.date">{{ article.date.date }}</time></b></span>
                        <NavigationAnchor v-for="(tag) in article.tags" :data="tag" :class="[...tag.cls, 'button', 'tag-btn']" />
                    </p>
                    <MDC :value="convertedIngress" class="ingress-content" />
                    <NavigationNavMenu v-if="!isPost && !!article.anchor" :data="article.anchor" :class="['nav-bar', 'read-more']"/>
                </section>
            </template>
            <template #fallback> <section class="alert-info"><p>Laster innlegg til logger...</p></section> </template>
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

    // Maksimal lengde for ingress i kortvisning (oversikt/forside)
    const MAX_INGRESS_LENGTH = 350;

    const convertedIngress = computed(() => {
        const text = article.value?.ingress ?? '';
        if (!isPost.value && text.length > MAX_INGRESS_LENGTH) return text.slice(0, MAX_INGRESS_LENGTH).trim() + '...';
        return text;
    });

</script>