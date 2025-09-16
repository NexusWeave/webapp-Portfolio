<template>
    <article :class="cls[cls.length - 1]">
       <header>
           <Header
                :article="article"
                :isNewsPage="isNewsPage"
                :isArticlePage="isArticlePage"
                :Cls="[ cls[0], cls[1], cls[2], cls[3]]"/>
       </header>
        <main  v-if="article.section && isArticlePage">
            <Main
                :date="article.date"
                :data="article.section"
                :Cls="[ cls[4], cls[5], cls[6], cls[7], cls[8], cls[9],
                cls[10], cls[11], cls[12], cls[13], cls[14]]" />

        </main>
        <footer v-if="article.conclusion && isArticlePage">
        </footer>        
    </article>
</template>

<script setup>

    import { defineProps, computed } from 'vue';
    import { useRoute } from 'vue-router';

    import Main from '$src/components/article/Article-Main.vue';
    import Header from '$src/components/article/Article-Header.vue';

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