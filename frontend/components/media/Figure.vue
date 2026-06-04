<template>
    <figure :class="cls" v-if="data.src || data.srcset || data.type === 'text' || hasError">
        <div v-if="data.type === 'text' || hasError" class="tech-text-fallback">
            {{ data.label || data.alt.replace('A visual representation of ', '') }}
        </div>
        <template v-else>
            <img v-if="isSvg && data"
                loading="lazy"    
                :src="data.src" 
                :alt="data.alt" 
                :class="cls"
                :width="data.width"
                :height="data.height"
                @error="hasError = true"
            />
            <NuxtImg v-else-if="isImage && data"
                :format="'webp'"
                loading="lazy"    
                :src="data.src" 
                :alt="data.alt" 
                :class="cls"
                :sizes="size"
                :height="height"
                :modifiers="({ar : aspectRatio} as any) "
                @error="hasError = true"
            />
        </template>
        <figcaption v-if="!hasError && data.type !== 'text'">{{ data.caption ?? data.alt }}</figcaption>
    </figure>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed, ref } from 'vue';

    import type { FigureProps, FigureItem } from '@/types/media';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<FigureProps>(), { data: () => ({} as FigureItem), cls: () => (['figure', 'figure-img']) });

    const cls = computed(() => props.cls);
    const hasError = ref(false);

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