<template>
    <nav :class="cls[0]">
        <NavigationButton v-if="activePage > num" :data="btn[0]"/>
        <NavigationButton v-if="activePage < totalPages" :data="btn[1]"/>
    </nav>
</template>

<script setup lang="ts">

    // --- Importing dependencies & type definitions ---
    import { ref, watch, computed } from 'vue';

    //import type { PaginationProps } from '~/types/props';
    interface PaginationProps
{
    activePage?: number;
    totalPage?: number;
    cls?: string[];
}
    //  Props Logic
    const props = withDefaults(defineProps<PaginationProps>(), { activePage: () => 1, totalPage: () => 1 });
    const cls = computed(() => props.cls ?? []);

    //  Emit logic
    const emit = defineEmits(['update']);

    const activePage = ref(props.activePage);
    const totalPages = computed(() => props.totalPage);
    const num: number = 1;
    const btn = computed(() =>
        [
            { id: 0, label: 'Forrige', cls: ['button', 'pagination-btn'], action: () => changePage(activePage.value - num) },
            { id: 1, label: 'Neste', cls: ['button', 'pagination-btn'], action: () => changePage(activePage.value + num) }
        ]);

    function changePage(page: number)
    {
        const total = totalPages.value;
        if (page >= 1 && page <= total) {
            activePage.value = page;
        }
    }

    watch(() => activePage.value, (newValue) => { emit('update', newValue); });
    watch(() => props.activePage, (newValue) => { activePage.value = newValue; });

    // Debug logic
    // console.log('Pagination component initialized with data:', data);  
</script>