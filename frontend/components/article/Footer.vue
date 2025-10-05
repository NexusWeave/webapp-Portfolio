<template>
    <h4>{{ article.title }}</h4>
    <Figure v-if="article.conclusion.img" :data="article.conclusion.img" />
    <ul v-if="article.conclusion.list">
        <li v-for="item in article.conclusion.list" :key="item.id">
            {{ item.bullet }}
        </li>
    </ul>

    <p v-if="section.cite" :class="cls[5]">
        {{ section.cite.text }}
    </p>
        
    <p v-if="article.content" 
        v-for="(p, i) in article.content" :key="i">
        {{p}}
    </p>

    <p>
        <MetaData :data="article.date" v-if="article.date" :text="'published'"/>
        <MetaData v-if="article.anchor" :data="article.anchor" />
    </p>
</template>

<script setup>
    import { defineProps, reactive } from 'vue';

    import Figure from '$src/components/utils/Figure.vue';
    import MetaData from '$src/components/utils/Span.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        isArticlePage: {
            type: Boolean,
            required: true
        },
        id: {
            type: String,
            required: false
        }
    });
    
    const data = reactive(props.data);

    const date = data.date;
    const article = data.article[props.id].conclusion;
    //console.log("Article Footer Component loaded with data: ", article);
</script>