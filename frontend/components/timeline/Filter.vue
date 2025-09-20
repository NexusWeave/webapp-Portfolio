<template>
    <section :class="cls[0]">
        <h2 :class="cls[1]">{{ data.field.title }}</h2>
        <FormInputs v-if="data.field.rangeMax > 0" :data="data.field"
            :cls="[cls[2]]" v-model="modelValue" />
    </section>
</template>

<script setup lang="ts">

    import {computed } from 'vue';

    interface Props
    {
        cls?: Array<any>;
        data:Record<string, any>;
    }

    const props = withDefaults(defineProps<Props>(),
    {
        cls: () => []
    });

    const cls = computed(() => props.cls);
    const data = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    const modelValue = computed(
        {
            get: () => data.value.field.value,
            set: (value) => 
            {
                emits('toggleVisibility', value);
            }
            
        });
        //console.warn("Range value changed:", rangeValue);
    //console.warn("Timeline data:", data.value);
</script>