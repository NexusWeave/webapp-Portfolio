<template>
    <NavigationButton  v-if="isArticlePage" 
        :data="anchor"
        :cls="['orange-btn']"
    />

    <section :class="[cls[0], {'article-section': !!isNewsPage}]">
        <section :class="['ingress-metadata']">
            <h1> {{ article.title }}</h1>
            <p class="flex-wrap-row-align-items-center-justify-center article-metadata">
                <span v-if="!!article.date" :class="cls[3]">
                    Publisert: <time datetime="{{article.date.date}}">{{ article.date.date }}</time></span>
                <span v-if="!!article.tags" :class="cls[3]" >
                    <UtilsTags v-for="tag in article.tags" :key="tag.id"
                        :data="tag"
                        :cls="[tag.cls]"
                    />
                </span>
            </p>
            <MDC :value="article.ingress" class="ingress-content" />
            <NavigationNavMenu v-if="!isArticlePage && !!article.anchor" toggle="router"
            :data="article.anchor"
            :cls="[
                ['nav-list', 'flex-wrap-row-align-items-center'],
                ['nav-item'], ['read-more']]"
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
    const props = withDefaults(defineProps<HeaderProps>(), {
        cls: () => ['flex-column-align-items-center'],
        isArticlePage: () => false
    });
    
    const cls = props.cls;
    const article = props.article;
    const isNewsPage = computed(() => !props.isArticlePage);
    const isArticlePage = computed(() => props.isArticlePage);
    

    const anchor = computed<ButtonItem>(() => 
        {
            if (isArticlePage.value)
            {
                return { label: 'Gå tilbake', type: 'button', action: () => { window.history.back() }}
            };
            return {}
        });

    //  --- Debugging logic
    //console.log("Article Header Component - Anchor :", anchor.value);
    //console.log("Article Header Component - isNewsPage :", isNewsPage.value);
    //console.log("Article Header Component - isArticlePage :", isArticlePage.value);
    console.log("Article Header Component - Article :", article);
    //console.log("Article Header Component - Article Anchor :", article.anchor);
</script>