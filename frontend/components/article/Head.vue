<template>
    <NavigationButton  v-if="isArticlePage"  :data="button" :class="['orange-btn']"/>

    <section :class="['flex-column-align-items-center', {'article-section': !!isArticlePage}]">
        <section :class="[{'blog-header': !isArticlePage}, {'ingress-header': isArticlePage}]">
            <h2> {{ article.title }}</h2>
            <p class="flex-wrap-row-align-items-center-justify-center article-metadata">
                <span v-if="!!article.date" :class="'meta-date'"> Publisert: <b><time :datetime="article.date.date">{{ article.date.date }}</time></b></span>
                <NavigationAnchor v-for="(tag) in article.tags" :data="tag" :class="tag.cls" />
            </p>
            <MDC :value="article.ingress" class="ingress-content" />
            <NavigationNavMenu v-if="!isArticlePage && !!article.anchor" :data="article.anchor" :class="['nav-bar', 'read-more']"
        />
        </section>
    </section>
</template>

<script lang="ts" setup>

    //  --- Import dependency & types
    import { computed } from 'vue';
    import type { HeaderProps } from '@/types/article';
    import type { ButtonItem } from '@/types/navigation';

    //  --- Props logic
    const props = withDefaults(defineProps<HeaderProps>(), { isArticlePage: () => false });

    const article = computed(() => props.article);
    const isArticlePage = computed(() => props.isArticlePage);

    const button = computed<ButtonItem>(() => {  if (isArticlePage.value) return  { label: 'Gå tilbake', action: () => { window.history.back(); }}; return {} });

    //  --- Debugging logic
    //console.log("Article Header Component - Article :", article.value);
    //console.log("Article Header Component - Button :", button.value);
    //console.log("Article Header Component - isNewsPage :", isNewsPage.value);
    //console.log("Article Header Component - isArticlePage :", isArticlePage.value);
    //console.log("Article Header Component - Article Anchor :", article.anchor);
    //console.log("Article Header Component - Article Ingress :", article.value.tags);
</script>