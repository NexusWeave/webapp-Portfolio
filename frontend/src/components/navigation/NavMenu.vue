<template>
    <nav :class="cls[0]">
        <ul :class="cls[1]">
        <template v-if="!!isRouterLink">
            <li v-for="item in data" :key="item.id"
                :class="cls[2]">
                <RouterLink :to="item.href" :class="item.cls">
                    {{ item.label }}
                </RouterLink>
            </li>
        </template>

        <template v-else-if="!!isAnchor">
                <li v-for="item in data" :key="item.id"
                    :class="cls[2]">
                    <Anchor :data="item.anchor" :Cls="item.cls"/>
                </li>
        </template>
        </ul>
    </nav>
</template>

<script setup>
    import Anchor from './Anchor.vue';

    import { RouterLink } from 'vue-router';
    import { defineProps, computed } from 'vue';

    const props = defineProps({
        data: {
        type: Array,
        required: true
        },
        cls: {
            type: Array,
            required: false,
            default: () => [['nav-bar', 'flex-wrap-row-justify-space-between'], ['nav-list', 'flex-row-align-items-center'], ['nav-item'], ['anchor-item']]
        }
    });
    const data = props.data;

    const isAnchor = computed(() => {

        const anchorData = data.filter(item => item.type === 'anchor');
        return !!anchorData.length ;
    });
    const isRouterLink = computed(() => {
        const routerData = data.filter(item => item.type === 'router');
        return !!routerData.length;
    });

    console.log("NavigationMenu loaded with data: ", data, isAnchor.value, isRouterLink.value);
</script>