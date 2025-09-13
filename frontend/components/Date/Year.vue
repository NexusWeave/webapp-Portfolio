<template>
    <template v-if="isVisible">
        <time :datetime="year">{{ year }}</time>
    </template>
    
</template>
<script setup>
    import { computed, defineProps } from 'vue';

    const props = defineProps({
        year: {
            type: Number,
            required: true
        },
        isVisible: {
            type: Boolean,
            required: false
        }
    });

    const year = props.year

    const isVisible = computed(() => {
        return props.isVisible !== undefined ? props.isVisible : true;
    });
    console.log(year, isVisible.value)

</script>