<template>
    <nav :class="cls[0]">
        <ul :class="cls[1]">
            <li v-for="item in data" :key="item.id"
                    :class="cls[2]">

            <template v-if="isRouterLink">
                <NuxtLink :to="item.href" :class="[item.cls, 'nav-link']">
                    {{ item.label }}
                </NuxtLink>
            </template>

            <template v-else-if="isAnchor">
                    <NavigationAnchor :data="item" :cls="[item.cls]"/>
            </template>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>

    //  --- Importing dependencies & type definitions ---
    import { computed } from 'vue';
    import type { NavProp } from '@/types/props';

    //  --- Props Definition ---
    const props = withDefaults(defineProps<NavProp>(),
    {
        totalPage: 0,
        activePage: 0,
        cls: () => [['nav-bar', 'flex-wrap-row'], [['nav-list', 'flex-wrap-row-justify-center'], 'flex-row-align-items-center'], 'nav-item', 'anchor-item'],
    });

    const data = computed(() => props.data);

    const isAnchor = computed(() => props.toggle === 'anchor');
    const isRouterLink = computed(() => props.toggle === 'router');


    //  --- Debug logic
    //console.log("NavigationMenu loaded with data: ", data.value);
    //console.log("NavigationMenu toggle mode: ", props.toggle);
</script>