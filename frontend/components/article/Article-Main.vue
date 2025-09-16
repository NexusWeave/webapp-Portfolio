<template>
    <section :class="cls[0]">
        <h3 v-if="section.title" :class="cls[1]">{{ section.title }}</h3>
        <section class="flex-column">
            <section v-for="content in section.contents"
                :class="!!content.cta && !!content.media? ['grid-container', 'article-section']: 
                !!content.cta ? ['grid-container-cta', 'article-section']:
                !!content.img ? ['grid-container-image', 'article-section'] :
                ['grid-container-content','article-section']"
                :key="content.id"> 
                <Figure v-if="!!content.img" :data="content.img" :cls="[['img-grid','figure-container'], 'image']"/>
                <section :class="['main-grid', 'article-section']">
                    <h4 v-if="content.title"
                    :class="cls[3]">
                        {{ content.title }}
                    </h4>
                    <p v-for="(paragraph, i) in content.content" 
                        :key="i">{{ paragraph }}</p>
                    <ul v-if ="content.list && content.list.length > 0">
                        <li v-for="(item, i) in content.list" :key="i">
                        {{ item.bullet }}
                        </li>
                    </ul>
                </section>

                <aside v-if="content.cta" 
                    :class="cls[4]">

                    <section :class="cls[5]">
                        <section v-for="(cta, i) in content.cta" 
                            :key="i"
                            :class=cls[6]>

                            <h4  v-if="cta.title"
                                :class="cls[3]">
                                {{ cta.title }}
                            </h4>
                            <p v-if="cta.content"
                                :key="i">
                                {{ cta.content }}
                            </p>
                            <section v-if="cta.media"
                                v-for="media in cta.media" :key="media.id"
                                :class="['media-container']">
                                <Media v-if="!! media.media"
                                    :data="media"
                                    :cls="['media-container',
                                    'flex-wrap-row-justify-space-evenly',
                            ['media-content', 'flex-column', 'component-theme']]"/>

                            </section>
                        </section>
                    </section>
                </aside>
            </section>
        </section>
    </section>

</template>

<script setup>
    import { defineProps } from 'vue';

    import Media from '$src/components/media/Media.vue';
    import Figure from '$src/components/media/Figure.vue';

    const props = defineProps({
        date: {
            type: Object,
            required: true
        },
        Cls: {
            type: Array,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    });

    const cls = props.Cls;
    
    const section = props.data ? props.data : props.Section;
    


    console.log("Article Main Component loaded with data: ", section);
</script>