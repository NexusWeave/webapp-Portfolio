<template>
    <template v-if="!!isFigure">
        <figure :class="cls[0]">
            <source v-if="!!isImageModern" :srcset="img.srcset" :type="img.type">
            <img :src="img.src" :alt="img.alt" :class="cls[1]">
            <figcaption>{{ caption }}</figcaption>
        </figure>
    </template>
    <template v-else>
        <picture>
            <source v-if="!!isImageModern" :srcset="img.srcset" :type="img.type">
            <img :src="img.src" :alt="img.alt" :class="cls[1]">
        </picture>
    </template>
</template>

<script setup lang="ts">

    import type { FigureProps, FigureItem } from '@/types/props';
    import { defineProps, computed } from 'vue';

    const props = withDefaults(defineProps<FigureProps>(), 
    {
        data: () => ({} as FigureItem),
        cls: () => (['figure', 'figure-img']),
    });

    const data = props.data
    const img = computed(() => data.img ?? {});
    const caption = computed(() => data.caption);

    const isFigure = computed(() => {
        return !!caption.value;
    });

    const images = 
    {
        data: ['jpg', 'jpeg', 'png', 'svg'],
        modern: ['webp', 'avif'],
    }

    const isImageModern = computed(() => {
        return !!images.modern.find(item => item === img.value.type);
    });

    const cls = props.cls;
    //console.log('Figure data:', data);
</script>