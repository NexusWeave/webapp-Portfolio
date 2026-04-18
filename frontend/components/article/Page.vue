<template>
    <NavigationButton  v-if="isPage || isTagPage"  :data="button" :class="['orange-btn']"/>
    <article class = 'article-wrapper flex-column'>
       <header>
        <ArticleHead :article="article" :isPost="isPage"/>
       </header>
       <main v-if="isPage && !isTagPage">
        <ArticleBody :data="article" />
       </main>        
    </article>
</template>

<script lang="ts" setup>

    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import type { PostProps } from '~/types/documents';
    import type { ButtonItem } from '@/types/navigation';

    const props = defineProps<PostProps>();
    const article = computed(() => props.data);

    const route = useRoute();
    const isPage = computed(() => {return route.name?.toString().startsWith('logs-records')});
    const isTagPage = computed(() => {return route.name?.toString().startsWith('logs-tags')});

    const button = computed<ButtonItem>(() => {  if (isPage.value || isTagPage.value) return  { label: 'Gå tilbake', action: () => { window.history.back(); }}; return {} });

    //  --- Debugging logic
    //console.log("Articles Component - Article Data :", route.name);
    //console.log("Articles Component - isPage :", isPage.value);
    //console.log("Articles Component :", isPage.value, article, isNewsPage, isArticlePage), article.conclusion;
</script>