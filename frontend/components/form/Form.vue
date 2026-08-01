<template>
    <form 
        :method="data.method"     
        :name="data.name"
        :action="data.action"
        :rel="data.rel ? data.rel : 'noopener'"
        :target="data.target ? data.target : '_self'"
        :novalidate="data.novalidate ? data.novalidate : false"
        v-on:encrypted="data.encrypted ? data.encrypted : false"
        :autocomplete="data.autocomplete ? data.autocomplete : 'off'"
        :acceptcharset="data.acceptcharset ? data.acceptcharset : 'UTF-8'">
        <legend v-if="data.title" class="section-title">
            <h1>{{ data.title }}</h1>
        </legend>
        <FormInputs v-if="data.inputs" v-for="field in data.inputs" :key="field.id || field.name" :data="field" v-model="formData[field.name]" />
        <FormSelection v-if="data.selections" v-for="selection in data.selections" :key="selection.id" :data="selection" :options="data.selectionOptions || (data as any).selectOptions" v-model="formData[selection.id || 'selectedOption']" />
        <FormTextarea v-if="data.textarea" :data="data.textarea" v-model="formData[data.textarea.name]" />
        <FormDatalist v-if="data.dataList" :data="data.dataList" v-model="formData[data.dataList.name]" />
        <FormOutput v-if="data.outputs" :data="data.outputs" :form-data="formData" />
    </form>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import type { FormProps } from '@/types/form';

    const props = defineProps<FormProps>();
    const data = computed(() => props.data);
    const formData = ref<Record<string, any>>({});
</script>