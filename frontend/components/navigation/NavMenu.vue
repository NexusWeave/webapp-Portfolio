<template>
    <nav :class="cls[0]">
        <ul :class="cls[1]">
            <li v-for="item in data" :key="item.id"
                    :class="cls[2]">
            <template v-if="!!isRouterLink">
                <RouterLink :to="item.href" :class="[item.cls, 'nav-link']">
                    {{ item.label }}
                </RouterLink>
            </template>

            <template v-else-if="!!isAnchor">
                    <Anchor :data="item" :cls="[item.cls]"/>
            </template>

            <template v-else-if="!!isPagination">
                <Btn :data="btn[0]"/>
                <span :class="cls[3]"> {{ activePage > 0 ?  activePage + ' / ' + totalPages : '' }}</span>
                <Btn :data="btn[1]"/>
            </template>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    import Anchor from './Anchor.vue';
    import Btn from './Button.vue';

    import { RouterLink } from 'vue-router';
    import { ref, watch, defineProps, computed } from 'vue';

    const props = defineProps({
        data: 
        {
            required: true,
            type: [Array, Object],
        },
        cls:
        {
            type: Array,
            required: false,
            default: () => [['nav-bar', 'flex-wrap-row'], [['nav-list', 'flex-wrap-row-justify-center'], 'flex-row-align-items-center'], ['nav-item'], ['anchor-item']]
        },
        toggle:
        {
            type: String,
            required: true,
            default: ''
        },
    });

    const data = props.data;
    //console.log("NavigationMenu loaded with data: ", data, );

    const emit = defineEmits(['update']);

    
    const activePage = ref(props.activePage);

    const isAnchor = props.toggle === 'anchor';
    const isRouterLink = props.toggle === 'router';
    const isPagination = props.toggle === 'pagination';

    const totalPages = computed(() => props.totalPage);

    const btn = computed(() =>
        [
            {
                id: 0,
                label: 'Forrige',
                cls: ['button', 'pagnition-btn'],
                disabled: activePage.value <= 1 ? 'disabled' : false,
                action: () => { if (activePage.value > 1)  activePage.value--; },

            },
            {
                id: 1,
                label: 'Neste',
                cls: ['button', 'archive-btn'],
                disabled: activePage.value >= totalPages.value? 'disabled' : false,
                action: () => { if (activePage.value < totalPages.value)  activePage.value++; },
            },
        ]);

    //  Watch for changes in the 'data' prop
    watch(() => props.activePage, (newValue) => 
    {
        activePage.value = newValue;
    });

    watch(() => activePage, (newValue) => 
    {
        emit('update', newValue);
    }, { immediate: true });

    console.log("NavigationMenu loaded with data: ", data, isAnchor, isRouterLink);
</script>