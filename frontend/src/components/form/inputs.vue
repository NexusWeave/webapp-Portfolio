<template>
    <label :for="data.name" :class="cls[0]">{{ data.label }}</label>
    <input :id="data.id"
        :class="cls[1]"
        :min="data.type =='range' ? 0 : ''"
        :max="data.type =='range' ? 100 : ''"
        :step="data.type =='range' ? 1 : ''"
        :placeholder="data.placeholder"
        :type="data.type ? data.type : 'text'"
        :size="!!data.size ? data.size : '30'"
        :width="!!data.width ? data.width : ''"
        :height="!!data.height ? data.height : ''"
        :pattern="!!data.pattern ? data.pattern : ''"
        :readonly="!!data.readonly ? data.readonly : false"
        :required="!!data.required ? data.required : false"
        :disabled="!!data.disabled ? data.disabled : false"
        :maxlength="!!data.maxlength ? data.maxlength : ''"
        :minlength="!!data.minlength ? data.minlength : ''"
        :autofocus="!!data.autofocus ? data.autofocus : false"
        :multiple="!!data.multiple && data.type == 'file' ? data.multiple : false"
    />
</template>
<script setup>

    import { defineProps, ref } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: Array,
            required: false
        },
    });
    const cls = props.cls;
    const data = props.data;

    console.warn(data);
</script>