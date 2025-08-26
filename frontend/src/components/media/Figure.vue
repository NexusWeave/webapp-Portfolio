<template >
    <figure :class="cls[0]">
    <img :src="img.src" :alt="img.alt" :class="cls[1]">

    <template v-if="!!isFigure">
        <figcaption v-if="!!data.caption">{{ data.caption }}</figcaption>
    </template>

    <template v-if="!!anchor">
        <Anchor :data="anchor" :cls="cls[2]" />
    </template>
    </figure>

</template>

<script setup>
    import { defineProps, computed } from 'vue';
    import Anchor from '../navigation/Anchor.vue';
    
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

    const img = props.data.img ?? props.data;
    const anchor = props.data.anchor;
    const caption = props.data.caption;

    const isFigure = computed(() => {
        return !!caption;
    });
    const cls = props.cls;
    //console.log('Figure data:', data);
</script>