<template>
    <div>
        <SchemaLabel v-if="!!data.label" :data="data.label" :cls="data.label.cls" />
        <input  :id="data.id" :class="cls[0]" :name="data.name" :max="rangeMax()"  :min="rangeMin()" :step="inputStep()" 
        v-model="data.modelValue"
        :readonly="readonly()" :required="required()" :disabled="disabled()"  :multiple="multiple()" :autofocus="autofocus()"  :type="data.type ?? 'text'"
        :size="data.size ?? '30'" 
        :width="data.width ?? ''" :height="data.height ?? ''"
        :minlength="dataMinLength()" :placeholder="data.placeholder ?? ''"
        :autocomplete="data.autocomplete ?? 'off'"  @input="handleInput"/>
    </div>

</template>
<script lang="ts" setup>

    //  --- Importing dependencies & Types
    import { computed} from 'vue';
    import type { InputProps } from '~/types/schema';


    // --- props Definition Logic
    const props = defineProps<InputProps>();

    const cls = computed(() => props.cls);
    const data = computed(() => props.data);

    //  --- emit definition logic
    const emit = defineEmits(['inputs']);

    //  --- Helper functions
    const handleInput = (event: Event) => {
        const input = data.value;
        const target = event.target as HTMLInputElement;

        input.prompt = target.value;
        emit('inputs', input);
    };

    const readonly: () => boolean = () => !!props.data.readonly;
    const required: () => boolean = () => !!props.data.required;
    const disabled: () => boolean = () => !!props.data.disabled;
    const autofocus: () => boolean = () => !!props.data.autofocus;
    const inputStep: () => number = () => props.data.type === 'range' ? 1 : 0;
    const multiple: () => boolean = () => !!props.data.multiple && props.data.type == 'file';
    const dataMinLength: () => number = () => props.data.minlength ? Number(props.data.minlength) : 0;
    const rangeMin: () => number | string = () => props.data.type === 'range' ? (props.data?.rangeMin ?? 0) : '';
    const rangeMax: () => number | string = () => props.data.type === 'range' ? (props.data?.rangeMax ?? 100) : '';

    //  --- Debug Logic
    //console.warn("Inputs.vue : ", data.value);
</script>