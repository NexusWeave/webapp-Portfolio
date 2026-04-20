<template>
    <MediaIcon v-if="data.isIcon ?? false" :cls="cls" :isInput="!!data.isIcon" />
    <label :for="data.label">{{ data.label }}</label>
</template>

<script lang="ts" setup>

    //  --- Import Types
    import type { LabelProps } from '~/types/schema';

    //  --- Props Definition Logic
    const props = defineProps<LabelProps>();
    const data = computed(() => props.data);
    const cls = computed(() => props.cls ?? []);

    //  --- Deug Logic
    //console.log("Label.vue : ", props.label);
</script>