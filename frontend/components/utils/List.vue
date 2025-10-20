<template>
    <h4 v-if="title">{{ title }}</h4>
    <ul :class="cls[0]">
        <li v-for="(item, index) in data" :key="index" :class="cls[1]">
            <NavigationAnchor v-if="item.anchor.href"
                :data="item.anchor"
            />
        </li>
    </ul>

</template>
<script lang="ts" setup >

    // --- Importing dependencies ---
    import { computed } from 'vue';

    import type { listProps } from '@/types/props';


    const props = withDefaults(defineProps<listProps>(),
    {
        cls: () => []
    });

    const data = computed(() => props.data);
    const title = computed(() => props.title);
    console.warn('List Component loaded with data: ', data.value);
</script>