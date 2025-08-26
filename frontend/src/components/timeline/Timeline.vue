<template>
    <section :class="cls[0]">
        <h2 :class="cls[1]">{{ data.field.title }}</h2>
        <Inputs :data="data.field" :cls="cls[2]" v-model="modelValue" />
    </section>
</template>

<script setup>

    import { watch, computed, defineProps, defineEmits, reactive } from 'vue';

    import Inputs from '../form/inputs.vue';
    import Year from '../Date/Year.vue';

    const props = defineProps({
        data:
        {
            type: Object,
            required: true
        },
        cls:
        {
            type: Array,
            required: false,
        },
    });

    const data = reactive(props.data);
    const cls = !!props.cls ? props.cls : null;
    const emits = defineEmits(['toggleVisibility']);

    const modelValue = computed(
        {
            get: () => data.field.value,
            set: (value) => 
            {
                emits('toggleVisibility', value);
            }
            
        });
        //console.warn("Range value changed:", rangeValue);
    //console.warn("Timeline data:", data.value);
</script>