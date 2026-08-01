<template>
    <section>
        <FormLabel v-if="data.label" :data="typeof data.label === 'object' ? data.label : { name: data.name, label: String(data.label) }" />
        <input 
            :id="data.id"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :list="data.list"
            :placeholder="data.placeholder"
            :required="data.required ? data.required : false" 
        />
        <datalist :id="data.list">
            <option v-for="option in data.options" :key="option.id" :value="option.value">
                {{ option.value }}
            </option>
        </datalist>
    </section>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import type { FormDataList } from '@/types/form';

    const props = defineProps<{
        data: FormDataList;
        modelValue?: string | number | boolean;
    }>();

    const data = computed(() => props.data);
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | number | boolean): void
    }>();
</script>