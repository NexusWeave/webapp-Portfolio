<template>
    <article class = 'article-wrapper flex-column'>
       <header>
           <ArticleHead :article="article" :isNewsPage="isPage" :isArticlePage="isPage"/>
       </header>
       <main v-if="isPage">
        <ArticleBody :data="article" />
       </main>
        <footer v-if="article.conclusion && isPage">
        </footer>        
    </article>
</template>

<script lang="ts" setup>

    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    interface ArticlePageProps { data: any; }

    const props = defineProps<ArticlePageProps>();
    const article = computed(() => props.data);

    const route = useRoute();
    const isPage = computed(() => {return route.name?.toString().startsWith('logs-records')});

    //  --- Debugging logic
    console.log("Articles Component - Article Data :", route.name);
    console.log("Articles Component - isPage :", isPage.value);
    //console.log("Articles Component :", isPage.value, article, isNewsPage, isArticlePage), article.conclusion;
</script>