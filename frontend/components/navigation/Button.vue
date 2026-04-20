<template>
    <button :class="cls" :type="btn.type ?? 'button'" @click="isActionable()" :disabled="isDisabled">

        <NavigationAnchor v-if="btn.anchor" :data="btn.anchor"/>
        <span v-else-if="isIcon()" class="icon">
            {{ data.label }}
            <MediaIcon :cls="data.type"/>
        </span>

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
    const isIcon = () => { const dataProps = btn.value; if (!dataProps.type) return false; const iconTypes = ['docs', 'pdf', 'mail', 'telephone', 'school', 'globe', 'map-pin', 'diploma', 'github', 'ytube', 'linkedin', 'facebook', 'instagram','dir']; return iconTypes.some(type => dataProps.type && dataProps.type.includes(type)); };


    //  --- Watcher
    watch(() => props.data, (newValue) => { Object.assign(btn.value, newValue); }, { immediate: true });

    //  --- Debug logic
    //console.log("Button component loaded with data: ", btn);

</script>