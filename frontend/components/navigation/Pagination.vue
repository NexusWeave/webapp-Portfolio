<template>
    <nav :class="cls[0]">
        <Btn :data="btn[0]"/>
        <span :class="cls[1]"> {{ activePage > 0 ?  activePage + ' / ' + totalPages : '' }}</span>
        <Btn :data="btn[1]"/>
    </nav>
</template>

<script setup>

    import { ref, watch, defineProps, defineEmits, computed } from 'vue';

    import Btn from '@/components/navigation/Button.vue';

    const emit = defineEmits(['update']);
    const props = defineProps(
    {
        activePage: 
        {
            default: 1,
            type: Number,
            required: false,
        },
        totalPage: 
        {
            default: 1,
            type: Number,
            required: false,
        },
        Cls:
        {
            type: Array,
            required: false
        },
    });

    const data = props.data;
    const cls = props.Cls ? props.Cls : [];

    //  Watch for changes in the 'data' prop
    const activePage = ref(props.activePage);

    watch(() => props.activePage, (newValue) => 
    {
        activePage.value = newValue;
    });

    watch(() => activePage, (newValue) => 
    {
        emit('update', newValue);
    }, { immediate: true });

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

    // console.log('Pagnition component initialized with data:', data);  
</script>