<template>
    <section>
        <FormLabel v-if="data.label" :data="typeof data.label === 'object' ? data.label : { name: String(data.id), label: String(data.label) }" />
        <select 
            :id="String(data.id)"
            :multiple="data.multiple ? data.multiple : false"
            :value="modelValue"
            @change="onChange"
        >
            <option v-for="option in options" :key="option.id" :value="option.value">
                {{ option.label || option.value }}
            </option>
        </select>
    </section>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import type { FormSelection, SelectonOption } from '@/types/form';

    const props = defineProps<{
        data: FormSelection;
        options?: SelectonOption[];
        modelValue?: any;
    }>();

    const emit = defineEmits<{
        (e: 'update:modelValue', value: any): void
    }>();

    const data = computed(() => props.data);
    const options = computed(() => props.options || []);

    const onChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        if (props.data.multiple) {
            const values = Array.from(target.selectedOptions).map(opt => opt.value);
            emit('update:modelValue', values);
        } else {
            emit('update:modelValue', target.value);
        }
    };
</script>