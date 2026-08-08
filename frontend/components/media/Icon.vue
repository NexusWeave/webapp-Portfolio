<template>
    <span v-if="label" class="icon">
        {{ label }} 
        <span :class="['icon', ...cls, 'inline-items-justify-center']" :aria-label="`${cls}-icon`" type="icon" :title="`${cls}-icon`"></span>
    </span>
    <span v-else :class="['icon', ...cls, 'inline-items-justify-center']" :aria-label="`${cls}-icon`" type="icon" :title="`${cls}-icon`"></span>

</template>
<script lang="ts" setup>

    // --- Importing dependencies ---
    import type { iconProps } from '@/types/media';

    const props = withDefaults(defineProps<iconProps>(),{ cls: () => ['default'], label: () => ''});
    const label = computed<string>(() => props.label);

    console.log(label.value);

</script>