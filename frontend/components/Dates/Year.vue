<template>
        <span v-if="props.isVisible && year"> <time :datetime="year?.ISODate"> {{ year?.date }} </time> </span>
</template>
<script lang="ts" setup >

    //  --- Import & Interfaces logic
    import { computed } from 'vue';
    import type { DateYearProps } from '@/types/date';

    //  --- Props logic
    const props = withDefaults(defineProps<DateYearProps>(), { isVisible: false });

    //  --- Data Definition Logic
    const year = computed(() => { 
        const data = props.data; 
        const dateStr = typeof data === 'string' ? data : (data as any)?.current;
        if (!dateStr) return null;
        return { date: new Date(dateStr).getFullYear(), ISODate:  new Date(dateStr).toISOString(), }; 
    });

    //  --- Debugging Logic
    //console.log("DateYear Component : ", year.value);

</script>