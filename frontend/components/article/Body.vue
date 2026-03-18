<template>
        <section class="flex-column">
            <section :class="!!data.cta && !!data.img? ['grid-container', 'article-section']: 
                !!data.cta ? ['grid-container-cta']:
                !!data.img ? ['grid-container-image', 'article-section']:
                ['grid-container-content','article-section']"> 

                <section :class="['article-section']">
                    <ContentRenderer v-if="data.body"
                        :value ="data.body"
                        class="article-content"
                        />
                </section>
                <section :class="['article-section']">
                    <MDC v-if="data.parade"
                        :value ="data.parade"
                        class="article-content"
                    />
                </section>
                <section :class="['article-section']">
                    <MDC v-if="data.star"
                        :value ="data.star"
                        class="article-content"
                    />
                </section>
                <section :class="['article-section']">
                    <MDC v-if="data.sources"
                        :value ="data.sources"
                        class="article-content"
                    />
                </section>
            </section>
        </section>
</template>

<script lang="ts" setup>

    //  --- Import Dependencies & Types
    import { computed } from 'vue';
    import type { BodyProps } from '~/types/article';

    //  --- Props logic
    const props = defineProps<BodyProps>();
    const data = computed(() => props.data ?? {});

    //  --- Debugging logic
    //console.log("Article Main Component loaded with data: ", data.value);

</script>