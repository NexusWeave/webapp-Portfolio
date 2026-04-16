<template>
    <figure :class="cls[0]" v-if="data.src || data.srcset">
        <picture>
            <source :srcset="data.srcset" :type="'image/' + data.type" >
            <img :src="data.src " :alt="data.alt ?? ' Unknown picture'" :class="cls[1]"  :title="'image/' + data.type"  />
        </picture>
        <figcaption>{{ data.caption ?? data.alt }}</figcaption>
    </figure>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';

    import type { FigureProps, FigureItem } from '@/types/media';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<FigureProps>(), { data: () => ({} as FigureItem), cls: () => (['figure', 'figure-img']) });

    const cls = computed(() => props.cls);

    const data = computed<FigureItem>(() => {
        const rawData = props.data as FigureItem;
        const imageFormats = { modern: ['webp', 'avif'] };
        const isImageModern =!!rawData.srcset && !!imageFormats.modern.find(item => rawData.srcset?.endsWith(item));
        return { ...rawData, srcset: isImageModern ? rawData.srcset : rawData.src, caption: rawData.caption ?? rawData.alt ?? '' };
    });

    //  --- Debug logic
    //console.log('Figure data:', data.value, isImageModern.value, isImageStandard.value);
</script>