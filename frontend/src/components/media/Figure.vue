<template>
    <template v-if="!!isFigure">
        <figure :class="cls[0]">
            <img :src="img.src" :alt="img.alt" :class="cls[1]">
            <figcaption>{{ data.caption }}</figcaption>
        </figure>
    </template>

    <template v-else>
        <picture>
            <source v-if="!!isImageModern" :srcset="img.srcset" :type="img.type">
            <img :src="img.src" :alt="img.alt" :class="cls[1]">
        </picture>
    </template>
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

    const images = 
    {
        data: ['jpg', 'jpeg', 'png', 'svg'],
        modern: ['webp']
    }
    const isImageModern = computed(() => {
        return !!images.modern.find(item => item === img.type);
    });

    const isImage = computed(() => {
        return !!images.data.find(item => item === img.type);
    });

    const cls = props.cls;
    //console.log('Figure data:', data);
</script>