<template>
    <section>
        <FormLabel v-if="data.label" :data="typeof data.label === 'object' ? data.label : { name: data.name, label: String(data.label) }" />
        <output 
            :id="data.id"
            :for="data.for"
        >
            {{ value }}
        </output>
    </section>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import type { FormOutput } from '@/types/form';

    const props = defineProps<{
        data: FormOutput;
        formData?: Record<string, any>;
        value?: any;
    }>();

    const data = computed(() => props.data);
    const value = computed(() => {
        if (props.value !== undefined) {
            return props.value;
        }
        if (props.formData && props.data.name) {
            return props.formData[props.data.name] || '';
        }
        return '';
    });
</script>