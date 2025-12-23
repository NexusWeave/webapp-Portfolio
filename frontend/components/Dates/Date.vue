<template>
    <span :class="[cls[0]]">
        <span v-if="!!dateObject.text">{{ dateObject.text }}</span>

        <template v-if="dateObject.delimiter">
            <span :class="dateObject.delimiter">
                <i :class="cls[cls.length - 1]" :aria-label="dateObject.type"></i>
            </span>
        </template>

        <time :datetime="dateObject.current || dateObject.created">
            {{ dateObject.current || dateObject.created }}
        </time>

        <MediaIcon :cls="['calendar']"/>
    </span>
</template>
<script setup lang="ts">

    //  Importing dependencies & types
    import { computed } from 'vue';

    //  --- Props Definition Logic
    interface Props
    {
        cls?: Array<string>;
        data:Record<string, any>;
        isArticle?: boolean;
    };

    const props = withDefaults(defineProps<Props>(),
    {
        cls: () => [],
        isArticle: () => false
    });

    const cls = props.cls;
    const data = computed(() => props.data);

    const norwegianTime = new Intl.DateTimeFormat('nb-NO',
    {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    const dateObject =
    {
        type: 'date',
        delimiter: !!data.delimiter ? data.delimiter : 'dot',
        created: data.created ? norwegianTime.format(new Date(data.created)) : undefined,
        text : props.isArticle  ? (!!data.current ? 'Oppdatert' : 'Publisert') : undefined,
        current: !!data.current ? norwegianTime.format(new Date(data.current)) : undefined,
        
    }
    console.log("Date Component loaded with data: ", dateObject);
</script>