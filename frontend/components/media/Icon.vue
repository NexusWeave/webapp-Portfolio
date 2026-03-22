<template>
    <span :class="cls" :aria-label="`${cls}-icon`" type="icon"></span> 
</template>
<script lang="ts" setup>

    // --- Importing dependencies ---
    import type { iconProps } from '@/types/props';

    const props = withDefaults(defineProps<iconProps>(),{ cls: () => ['default'] });

</script>