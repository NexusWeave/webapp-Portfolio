<template>
    <section>
        <FormLabel v-if="data.label" :data="typeof data.label === 'object' ? data.label : { name: data.name, label: String(data.label) }" />
        <textarea 
            :id="data.id"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            :placeholder="data.placeholder"
            :rows="data.rows ? data.rows : 4"
            :cols="data.cols ? data.cols : 50"
            :maxlength="data.maxlength ? data.maxlength : ''"
            :required="data.required ? data.required : false">
        </textarea>
    </section>
</template>
<script setup lang="ts">
    import { computed } from 'vue';
    import type { FormTextarea } from '@/types/form';

    const props = defineProps<{
        data: FormTextarea;
        modelValue?: string | number | boolean;
    }>();

    const data = computed(() => props.data);
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string | number | boolean): void
    }>();
</script>