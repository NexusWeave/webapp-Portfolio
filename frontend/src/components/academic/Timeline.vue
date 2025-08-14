<template>
    <section class ="flex-column-align-items-center timeline-item">
        <h2 v-for="h2 in data.timeline" :key="h2.id"
        class ="timelineStore-h2">{{ h2.year }}</h2>
        <Inputs :data="data.field" :cls="['timeline-input-label', 'timeline-input']"/>
    </section>
    <section>
    </section>
</template>

<script setup>

    import { computed, defineProps, defineEmits } from 'vue';
    import Anchor from '../navigation/Anchor.vue';
import Inputs from '../form/inputs.vue';

    const props = defineProps({
        data:
        {
            type: Object,
        },
        cls:
        {
            type: Array,
        },
        btn :
        {
            type: Object,
        },
    });

    
    const cls = !!props.cls ? props.cls : null;
    const btn = computed(() => props.btn);
    const data = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    console.log("Timeline data:", data.value);
</script>