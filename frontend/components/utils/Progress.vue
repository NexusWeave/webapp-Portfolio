<template>
    <section>
        <h3>{{ label }}</h3>
        <progress :value="data" :class="cls" max="1024"></progress>
    </section>
</template>
<script setup lang="ts">

    //  Importing dependencies & types
    import type { ProgressProps } from '@/types/props';

    //  Props Logic
    const props = defineProps<ProgressProps>();
    const data = computed(() => props.value);
    const label = computed(() => props.label);
    const cls = computed(() => props.cls) || '';

    //  Debugging Logic
    //console.log('Tech:', label.value);
    //console.log('Progress data:', data.value);
    //console.log('Current rank:', currentRank);
</script>
