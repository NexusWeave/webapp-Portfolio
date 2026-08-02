<template>
    <span :class="['icon', ...cls, 'inline-items-justify-center']" :aria-label="`${cls}-icon`" type="icon" :title="`${cls}-icon`"></span> 
</template>
<script lang="ts" setup>

    // --- Importing dependencies ---
    import type { iconProps } from '@/types/media';

    const props = withDefaults(defineProps<iconProps>(),{ cls: () => ['default'] });

</script>