<template>
    <template v-if="isVisible">
        <time :datetime="year.start">{{ year.start.getFullYear() }}</time>
    </template>
    
</template>
<script setup>
    import { computed, defineProps } from 'vue';

    const props = defineProps({
        data: {
            type: Date,
            required: true
        },
        isVisible: {
            type: Boolean,
            required: false
        }
    });

    const year = props.data;

    const isVisible = computed(() => {
        return props.isVisible !== undefined ? props.isVisible : true;
    });
    console.log(year, isVisible.value)

</script>