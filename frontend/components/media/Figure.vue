<template>
    <figure :class="cls[0]" v-if="data.src || data.srcset">
        <NuxtImg v-if="isImage && data"
            format="webp"
            loading="lazy"    
            :src="data.src" 
            :alt="data.alt" 
            :class="cls[0]"
            :sizes="size"
            :height="height"
            :modifiers="({ar : aspectRatio} as any) "
        />
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

    //  --- Attributes
    const size = computed(() => {return props.data.width ? `${props.data.width}px` : undefined });
    const height = computed(() => { return props.data.height ?`${props.data.height}px` : undefined})
    const aspectRatio = computed(() => { 
        if (!size || !height ) return 16 / 9
        return undefined
     } )

    //  --- Flag logic
    const isImage = computed(() => data.value.type.includes('image/'));
    
    //  --- Debug logic
    //console.log('Figure data:', data.value, isImageModern.value, isImageStandard.value);
</script>