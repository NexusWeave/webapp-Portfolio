<template>
    <section class="flex-column-align-items-center">
        <h3>{{ data.label }}</h3>
        <span>(<b>{{ data.bytes }} / {{ num }} {{ data.type }}</b>)</span>
        <progress :value="data.bytes" :class="cls" :max="num"></progress>
    </section>

</template>
<script setup lang="ts">

    //  Importing dependencies & types
    import type { ProgressProps } from '@/types/props';

    //  Props Logic
    const props = defineProps<ProgressProps>();
    const data = computed(() => props.data);
    const cls = computed(() => props.cls || []);

    const num = 1024 * 10;

    //  Debugging Logic
    //console.log('Tech:', cls.value);
    //console.log('Progress data:', data.value);
</script>
