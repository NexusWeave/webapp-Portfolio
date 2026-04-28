<template>
    <figure :class="cls[0]" v-if="data.src">
        <NuxtImg 
            :src="currentSrc" 
            :alt="currentAlt" 
            :class="cls[1]"  
            :title="data.caption || data.alt"
            format="webp"
            loading="lazy"
            @error="handleError"
        />
        <figcaption v-if="data.caption || data.alt">{{ data.caption ?? data.alt }}</figcaption>
    </figure>
</template>

<script setup lang="ts">

    //  Importing dependencies & types
    import { computed, ref, watch } from 'vue';
    import { getFallbackText } from '@/utils/utils';

    import type { FigureProps } from '@/types/media';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<FigureProps>(), { cls: () => (['figure', 'figure-img']) });

    const cls = computed(() => props.cls);
    const hasError = ref(false);
    const data = computed(() => props.data);

    const currentSrc = computed(() => hasError.value ? '/media/images/placeholder.png' : data.value.src);
    const currentAlt = computed(() => hasError.value ? 'Bilde kunne ikke lastes' : getFallbackText(data.value.alt, 'Bildebeskrivelse mangler'));

    const handleError = () => {
        hasError.value = true;
    };

    watch(() => props.data, () => {
        hasError.value = false;
    }, { deep: true });

</script>