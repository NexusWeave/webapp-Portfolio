
<template>
    <section :class="cls[0]">
        <div v-for="partner in data.partners" :key="partner.id"
            :class="cls[1]">
            <Anchor v-if="partner.anchor" :data="partner.anchor"/>
        </div>
    </section>

</template>

<script setup>

    import { computed, defineProps } from 'vue';

    import Anchor from '@/components/navigation/Anchor.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: false
        },
        cls: {
            type: Array,
            required: false
        },
    });

    const data = props.data;
    const cls = props.cls ?? null;


    //console.warn('Section - Partner Data:', partners);
</script>