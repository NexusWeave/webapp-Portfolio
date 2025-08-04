<template>
    <template v-if="isAnchor">
        {{ data }}
        <span>
            <i :class="cls"></i>
            <Anchor :data="data.anchor" :cls="cls" /> 
        </span>
    </template>
    <template v-else>
        <span>
            <i :class="cls[0]"></i> 
            {{ data.label }}
        </span>
    </template>
</template>

<script setup>
    import { defineProps } from 'vue';

    import Anchor from '@/components/navigation/Anchor.vue';

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

    const data = props.data;
    //const isAnchor = computed(() => {return !!data && !!data.anchor;});

    const cls = props.cls ?? [];

    console.log("Tag Component loaded with data: ", data);
</script>