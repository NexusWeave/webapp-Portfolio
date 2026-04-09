<template>
        <picture>
            <figure :class="cls[0]">
                <source v-if="!!isImageModern" :srcset="data.srcset" :type="'image/' + data.type">
                <img v-if="!!isImageStandard" :src="data.src" :alt="data.alt" :class="cls[1]" :type="'image/' + data.type" :title=data.alt>
                <figcaption v-if="!!isFigure">{{ caption ? caption : '' }}</figcaption>
            </figure>
        </picture>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';
    import type { FigureProps, FigureItem } from '@/types/props';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<FigureProps>(), 
    {
        data: () => ({} as FigureItem),
        cls: () => (['figure', 'figure-img']),
    });

    const cls = computed(() => props.cls);
    const data = computed(() => props.data as FigureItem);
    const isFigure = computed(() => { return !!data.value && !!data.value.caption; });
    const caption = computed(() => { return isFigure.value ? data.value.caption : null; });

    const imageFormats = { img: ['jpg', 'jpeg', 'png', 'svg'], modern: ['webp', 'avif'] };

    const isImageStandard = computed(() => {return !!data.value.src && !!imageFormats.img.find(item => data.value.src.endsWith(item)); });
    const isImageModern = computed(() => {return !!data.value.srcset && !!imageFormats.modern.find(item => data.value.srcset?.endsWith(item)); });

    //  --- Debug logic
    //console.log('Figure data:', data.value, isImageModern.value, isImageStandard.value);
</script>