<template>
    <form @submit.prevent="handleSubmission"
        :class="cls[0]"
        :name="data.name"
        :action="data.action"
        :method="data.method ?? 'GET'"
        :rel="data.rel ?? 'noopener'"
        :target="data.target ?? '_self'"
        :novalidate="data.novalidate ?? false"
        v-on:encrypted="data.encrypted ?? false"
        :autocomplete="data.autocomplete ?? 'off'"
        :acceptcharset="data.acceptcharset ?? 'UTF-8'">
        
        <legend> <h3 :class="cls[1]"> {{ data.title }}</h3> </legend>

        <section v-if="!!data.inputControl" :class="cls[2]">
            <SchemaInputs v-for="(input, i) in data.inputControl" :key="i"
                :data="input" 
                v-model:[input.prompt]="input.value"
                :cls="!!input.cls ? input.cls : []"/>

            <section v-if="!!error" class="warning-alert"> <p>{{ error }}</p> </section>
        </section>

        <section v-if="!!data.btn" class="flex-row-justify-space-evenly">
            <NavigationButton v-for="(btn, i) in data.btn" :key="i" :data="btn" :cls="['btn', 'orange-btn']"/>
        </section>
    </form>
</template>

<script lang="ts" setup>

    // Import Dependencies & Types
    import { computed, ref, reactive } from 'vue';

    import type { SchemaProps } from '~/types/schema';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<SchemaProps>(), { cls: () => [['form-container', 'flex-column'], 'title-h3', ['input-group', 'flex-wrap-row']] });
    const cls = computed(() => props.cls);
    const data = computed(() => props.data);

    //  --- Emit Definition Logic
    const emits = defineEmits(['formModel', 'formData']);
    emits('formModel', data.value);


    //  --- Helper functions
    // Error Handling
    const error = ref('');
    const handleSubmission = (event: Event) =>
    {
        event.preventDefault();
        // Collect actual form values
        const formData = new FormData(event.target as HTMLFormElement);

        emits('formData', formData);
    };

    //  --- Debug Logic
    //console.warn("Schema Form Data: ", props.data);
</script>