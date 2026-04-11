<template>
    <Suspense>
        <template # default>
            <section class="flex-column">
                <section :class="!!data.cta && !!data.img? ['grid-container', 'article-section']: 
                    !!data.cta ? ['grid-container-cta']:
                    !!data.img ? ['grid-container-image', 'article-section']:
                    ['grid-container-content','article-section']"> 

                    <section :class="['article-content']">
                        <MDC v-if="data.status" :value ="data.status" />
                    </section>
                    <section class="article-content flex-column" v-if ="data.body">
                        <h4> Utfordring & Løsning</h4>
                        <ContentRenderer :value ="data.body"/>
                        <MDC v-if="data.sources" :value ="data.sources" />
                    </section>
                </section>
            </section>
        </template>
        <template #fallback> <div class="loading">Laster innhold...</div> </template>
    </Suspense>
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