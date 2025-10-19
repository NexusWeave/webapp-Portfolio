<template>
        <figure v-if="!!isFigure" :class="cls[0]">
            <source v-if="!!isImageModern" :srcset="data.srcset" :type="data.type">
            <img v-if="!!isImageStandard" :src="data.src" :alt="data.alt" :class="cls[1]">
            <figcaption>{{ caption ? caption : '' }}</figcaption>
        </figure>
        <picture v-else :class="cls[0]">
            <source v-if="!!isImageModern" :srcset="data.srcset" :type="data.type">
            <img v-if="!!isImageStandard" :src="data.src" :alt="data.alt" :class="cls[1]" :type="data.type">
        </picture>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';
    import type { FigureProps, FigureItem } from '@/types/props';


    const props = withDefaults(defineProps<FigureProps>(), 
    {
        data: () => ({} as FigureItem),
        cls: () => (['figure', 'figure-img']),
    });

    const cls = computed(() => props.cls);
    const data = computed(() => props.data as FigureItem);
    const isFigure = computed(() => { return !!data.value && !!data.value.caption; });
    const caption = computed(() => { return isFigure.value ? data.value.caption : null; });

    const imageFormats = 
    {
        data: ['jpg', 'jpeg', 'png', 'svg'],
        modern: ['webp', 'avif'],
    }


    const isImageModern = computed(() => {return !!data.value && !!imageFormats.modern.find(item => item === data.value.type); });
    const isImageStandard = computed(() => {return !!data.value && !!imageFormats.data.find(item => item === data.value.type); });

    console.log('Figure data:', data.value, isImageModern.value, isImageStandard.value);
</script>