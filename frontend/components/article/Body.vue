<template>
    <Suspense>
        <template # default>
            <section :class="!!data.cta && !!data.img? ['article-section','flex-column']:  !!data.cta ? ['grid-container-cta']: !!data.media ? ['grid-container-image', 'article-section']: ['grid-container-content','article-section']"> 
                <section v-if="data.status" :class="['article-content']"> <MDC :value ="data.status" /> </section>
                <section class="article-content flex-column" v-if ="data.body">
                    <h4> Utfordring & Løsning</h4>
                    <ContentRenderer :value ="data.body"/>
                    <MDC v-if="data.sources" :value ="data.sources" />
                </section>
            </section>
        </template>
        <template #fallback> <section class="loading">Laster innhold i loggen...</section> </template>
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