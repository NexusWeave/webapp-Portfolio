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
                    <Anchor :data="item.anchor" :cls="item.cls"/>
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
            default: () => [['nav-bar',], [['nav-list', 'flex-wrap-row-justify-space-between'], 'flex-row-align-items-center'], ['nav-item'], ['anchor-item']]
        }
    });

    const data = props.data;
    const isAnchor = computed(() => { return !!data.find(item => item.type === 'anchor');});
    const isRouterLink = computed(() => { return !!data.find(item => item.type === 'router');});

    console.log("NavigationMenu loaded with data: ", data, isAnchor.value, isRouterLink.value);
</script>