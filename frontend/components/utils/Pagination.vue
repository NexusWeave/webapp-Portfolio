<template>
    <nav :class="cls[0]">
        <NavigationButton :data="btn[0]"/>
        <span :class="cls[1]"> {{ activePage > 0 ?  activePage + ' / ' + totalPages : '' }}</span>
        <NavigationButton :data="btn[1]"/>
    </nav>
</template>

<script setup>

    import { ref, watch, computed } from 'vue';


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
        cls:
        {
            type: Array,
            required: false
        },
    });

    const cls = props.cls ? props.cls : [];

    //  Watch for changes in the 'data' prop
    const activePage = ref(props.activePage);

    const totalPages = computed(() => props.totalPage);

    const btn = computed(() =>
        [
            {
                id: 0,
                label: 'Forrige',
                cls: ['button', 'pagnition-btn'],
                disabled: activePage.value <= 1 ? 'disabled' : false,
                action: () => changePage(activePage.value - 1),

            },
            {
                id: 1,
                label: 'Neste',
                cls: ['button', 'archive-btn'],
                action: () => changePage(activePage.value + 1),
                disabled: activePage.value >= totalPages.value? 'disabled' : false
                
            },
        ]);

    function changePage(page)
    {
        const total = totalPages.value;

        if (page >= 1 && page <= total) {
            activePage.value = page;
        }
    }

    watch(() => props.activePage, (newValue) => 
    {
        activePage.value = newValue;
    });

    watch(() => activePage.value, (newValue) => 
    {
        emit('update', newValue);
        console.log("Emitting page change:", newValue);
    }, );

    // console.log('Pagnition component initialized with data:', data);  
</script>