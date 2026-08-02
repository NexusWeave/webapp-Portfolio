<template>
    <label :for="forName">{{ displayLabel }}</label>
</template>
<script setup lang="ts">
    import { computed } from 'vue';

    interface LabelData {
        name?: string;
        label?: string;
    }

    const props = defineProps<{
        data?: LabelData;
    }>();

    const forName = computed(() => props.data?.name || '');
    const displayLabel = computed(() => props.data?.label || '');
</script>