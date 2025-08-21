<template >
    <template v-if="!!isFigure.value">
        <figure :class="cls[0]">
            <img :src="data.src" :alt="data.alt" :class="cls[1]">
            <figcaption v-if="!!data.caption">{{ data.caption }}</figcaption>
        </figure>

    </template>
    <template v-else>
        <figure :class="cls[0]">
            <img :src="data.src" :alt="data.alt" :class="cls[1]">
        </figure>
    </template>

</template>

<script setup>
    import { defineProps, computed } from 'vue';
    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: Array,
            required: false,
            //default: () => ['figure-container55', 'figure-img234']
        }
    });

    
    const data = props.data;
    const isFigure = computed(() => {
        return !!data.caption;
    });
    const cls = props.cls;
    //console.log('Figure data:', data);
</script>