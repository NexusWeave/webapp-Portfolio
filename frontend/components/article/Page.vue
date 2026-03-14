<template>
    <article class = 'article-wrapper flex-column'>
       <header>
           <ArticleHead
                :article="article"
                :isNewsPage="isNewsPage"
                :isArticlePage="isArticlePage"/>
       </header>
       <main>
        <ArticleBody :data="article" />
       </main>
        <footer v-if="article.conclusion && isArticlePage">
        </footer>        
    </article>
</template>

<script setup>

    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    const props = defineProps(
        {
        data: {
            type: Object || Array,
            required: true
        },
        Cls: {
            type: Array,
            required: false
        },
    });

    const article = props.data;
    const cls = props.Cls ?? null;

    const route = useRoute();
    const isPage = computed(() => {return route.name});

    const isNewsPage =  isPage.value === 'news' ? true : false;
    const isArticlePage = isPage.value === 'article' ? true : false;

    //console.log("Articles Component :", isPage.value, article, isNewsPage, isArticlePage), article.conclusion;
</script>