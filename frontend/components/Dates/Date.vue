<template>
    <span :class="[cls[0]]">
        <span v-if="!!dateObject.text">{{ dateObject.text }}</span>
        <span v-if="dateObject.delimiter" :class="dateObject.delimiter"> <i :class="cls[cls.length - 1]" :aria-label="dateObject.type"></i> </span>
        <time :datetime="dateObject.current || dateObject.current"> {{ dateObject.current || dateObject.current }} </time>
        <MediaIcon :cls="['calendar']"/>
    </span>
</template>
<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';

    import type { DateItem, DateProps } from '@/types/date';

    //  --- Props Definition Logic
    const props = withDefaults(defineProps<DateProps>(),
    {
        cls: () => [],
        isArticle: () => false
    });

    const cls = props.cls;
    const data = computed(() => props.data);

    const dateObject: DateItem = setDateFormat(data.value) || {};
    //console.log("Date Component loaded with data: ", dateObject);
</script>