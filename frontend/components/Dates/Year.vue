<template>
        <h3 v-if="props.isVisible && year">
            <time :datetime="year?.ISODate">
                {{ year?.date }}
            </time>
        </h3>
</template>
<script setup lang="ts">

    //  --- Import & Interfaces logic
    import { computed, defineProps } from 'vue';
    import type { DateYearProps } from '@/types/props';

    //  --- Props logic
    const props = withDefaults(defineProps<DateYearProps>(),
    {
        isVisible: false
    });

    //  --- Data Definition Logic
    const year = computed(() => 
    {
        const data = props.data

        return {
            date: new Date(data).getFullYear(),
            ISODate:  new Date(data).toISOString(),
        };
    });

    //  --- Debugging Logic
    //console.log("DateYear Component : ", year.value);

</script>