<template>
    <button :class="cls" :type="btn.type ?? 'button'" @click="isActionable()" :disabled="isDisabled">

        <NavigationAnchor v-if="btn.anchor" :data="btn.anchor"/>

        <template v-else> {{ btn.label }} </template>

    </button>
</template>

<script setup lang="ts">

    //  --- Importing dependencies & types
    import { watch, computed } from 'vue';
    import type { ButtonProps } from '@/types/navigation';

    //  --- props definition logic
    const props = withDefaults(defineProps<ButtonProps>(), { cls: () => [], action: () => {}});
    const cls = computed(() => props.cls);
    const btn = computed(() => props.data);
    const isDisabled = computed(() => !!btn.value.disabled);
    const isActionable = computed(() => btn.value.action ? btn.value.action : () => {});
    

    //  --- Watcher
    watch(() => props.data, (newValue) => { Object.assign(btn.value, newValue); }, { immediate: true });

    //  --- Debug logic
    //console.log("Button component loaded with data: ", btn);

</script>