<template>
    <Btn  v-if="isArticlePage" :data="anchor"/>
    <section :class="cls[0]">
        <section :class="cls[1]">
            <Figure  v-if="!isArticlePage && !isNewsPage ||  article.archived"
                :data="article.img" :cls="article.img.cls" />
            
                
            <h2 :class="cls[2]"> {{ article.title }}</h2>
            <p>
                <Date :data="article.date" :Cls="['article-date', 'calendar']" />
                
                <span v-if="!!article.tags" :class="cls[3]" >
                    <Tags v-for="tag in article.tags"
                        :key="tag.id" :data="tag" :cls="[tag.cls]"/>
                </span>
            </p>
            <p>{{ article.ingress.content }}</p>
            <Menu v-if="!isArticlePage && article.section"
                :data="[anchor]"/>

            <Figure  v-if="isArticlePage" :data="article.img" :cls="article.img.cls"/>
        </section>
        <section :class="cls[1]" v-if="isNewsPage && !isArticlePage && !article.archived">
            <Figure :data="article.img" :cls="article.img.cls"/>
        </section>
    </section>
</template>

<script setup>

    import { computed, defineProps } from 'vue';

    
    import Tags from '@/components/utils/Tags.vue';
    import Date from '@/components/Date/Date.vue';
    
    import Figure from '@/components/media/Figure.vue';
    import Btn from '@/components/navigation/Button.vue';
    import Menu from '@/components/navigation/NavMenu.vue';
    import Anchor from '@/components/navigation/Anchor.vue';

    const props = defineProps({
        article: {
            type: Object,
            required: true
        },
        isArticlePage: {
            type: Boolean,
            required: false
        },
        isNewsPage: {
            type: Boolean,
            required: false
        },
        Cls: {
            type: Array,
            default: () => []
        }
    });
    
    const cls = props.Cls;
    const article = props.article;
    const isNewsPage = props.isNewsPage;
    const isArticlePage = props.isArticlePage;

    const anchor = computed(() => {
        return isArticlePage ? {
            cls: ['button', 'read-more'],
            label: 'Gå tilbake',
            action: () => { window.history.back() }
        } : { type: 'anchor', anchor: article.anchor };
    });

    //console.log("Article Header Component :", article, isNewsPage, isArticlePage);
</script>