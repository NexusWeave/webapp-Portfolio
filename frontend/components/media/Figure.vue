<template>
    <figure :class="cls[0]" v-if="data.src || data.srcset">
        <img v-if="isSvg && data"
            loading="lazy"    
            :src="data.src" 
            :alt="data.alt" 
            :class="cls[0]"
            :width="data.width"
            :height="data.height"
        />
        <NuxtImg v-else-if="isImage && data"
            :format="'webp'"
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
        if (cls.value.includes('tech-img') || cls.value.includes('tech-figure')) return undefined;
        if (!size.value || !height.value ) return 16 / 9
        return undefined
     } )

    //  --- Flag logic
    const isSvg = computed(() => {
        if (!data.value || !data.value.type) return false;
        return data.value.type.includes('svg');
    });
    
    const isImage = computed(() => {
        if (!data.value || !data.value.type) return false;
        const types = ['image/', 'jpg', 'jpeg', 'png', 'svg', 'webp'];
        return types.some(t => data.value.type.includes(t));
    });
    
    //  --- Debug logic
    //console.log('Figure data:', data.value, isImageModern.value, isImageStandard.value);
</script>