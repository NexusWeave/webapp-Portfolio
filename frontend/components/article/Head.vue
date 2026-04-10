<template>
    <NavigationButton  v-if="isArticlePage"  :data="button" :cls="['orange-btn']"/>

    <section :class="[cls[0], {'article-section': !!isArticlePage}]">
        <section :class="[{'blog-header': !isArticlePage}, {'ingress-header': isArticlePage}]">
            <h1> {{ article.title }}</h1>
            <p class="flex-wrap-row-align-items-center-justify-center article-metadata">
                <span v-if="!!article.date" :class="cls[3]"> Publisert: <b><time :datetime="article.date.date">{{ article.date.date }}</time></b></span>
                <NavigationAnchor v-for="(tag) in article.tags" :data="tag" :class="tag.cls"/>
            </p>
            <MDC :value="article.ingress" class="ingress-content" />
            <NavigationNavMenu v-if="!isArticlePage && !!article.anchor" :data="article.anchor" :cls="['nav-bar', 'read-more']"
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
    const props = withDefaults(defineProps<HeaderProps>(), { cls: () => ['flex-column-align-items-center'], isArticlePage: () => false });
    
    const cls = props.cls;
    const article = computed(() => props.article);
    const isArticlePage = computed(() => props.isArticlePage);

    const button = computed<ButtonItem>(() => {  if (isArticlePage.value) return  { label: 'Gå tilbake', action: () => { window.history.back(); }}; return {} });

    //  --- Debugging logic
    //console.log("Article Header Component - Article :", article.value);
    //console.log("Article Header Component - Button :", button.value);
    //console.log("Article Header Component - isNewsPage :", isNewsPage.value);
    //console.log("Article Header Component - isArticlePage :", isArticlePage.value);
    //console.log("Article Header Component - Article Anchor :", article.anchor);
</script>