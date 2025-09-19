<template>
    <span :class="cls[0]">
        <span :class="cls[1]" :aria-label="label"></span> 
        </span>
</template>
<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        label: {
            type: [String],
            required: false
        },
        cls: {
            type: [Array],
            required: false,
        }

    });
</script>