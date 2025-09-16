<template>

    <span>
        <i :class="cls"></i>
        <template v-if="isAnchor">
            <Anchor :data="data.anchor" :cls="cls" /> 
        </template>
    <template v-if="cls.includes('icon')">
        
        <i :class="cls"></i> 
        {{ data.label }}
        
    </template>
    <template v-else>
        {{ data.label }}
    </template>
    </span>
</template>

<script setup>
    import { defineProps } from 'vue';

    import Anchor from '$src/components/navigation/Anchor.vue';

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