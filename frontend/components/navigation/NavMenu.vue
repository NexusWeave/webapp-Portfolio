<template>
    <nav :class="[cls[0], 'flex-wrap-row']">
        <ul class="flex-align-items-flex-end-justify-center">
            <li v-for="item in data" :key="item.id">
                <NuxtLink v-if="hasRouterLink" :to="(item as RouterItem).path">
                    {{ item.label }}
                </NuxtLink>
                <NavigationAnchor v-if="isAnchor" :data="(item as AnchorItem)" :cls="[...(item.cls || [])]" />
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>

    //  --- Importing dependencies & type definitions ---
    import { computed } from 'vue';
    import type { NavigationProp, RouterItem, AnchorItem } from '@/types/navigation';

    //  --- Props Definition ---
    const props = withDefaults(defineProps<NavigationProp>(), { totalPage: 0, activePage: 0, cls: () => ['router-nav'] as string[] });

    const data = computed(() => props.data);

    const cls = computed(() => props.cls );
    const hasRouterLink = computed(() => { if (Array.isArray(data.value)) return data.value.some(item => 'path' in item && item.type && item.type.includes('router')); return (data.value as any).type && (data.value as any).type == 'router'; });
    const isAnchor = computed(() => !hasRouterLink.value);

    //  --- Debug logic
    //console.log("NavigationMenu loaded with data: ", data.value);
    //console.log("NavigationMenu toggle mode: ", props.toggle);
</script>