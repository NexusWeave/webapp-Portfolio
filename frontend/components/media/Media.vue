<template>
    <section :class="[cls[0], cls[1]]" :data-filetype="media.type">
        <section v-for="media in media" :key="media.id"
            :class="cls[2]">
            <h4 class="title-h4">
                <Anchor :data="media.anchor"
                    :cls="[media.type]" />
            </h4>
            <p>
                <Date :data="media.date" :Cls="['meta-date', 'calendar']" />
                <span>
                    {{ media.description }}
                </span>
            </p>
        </section>
    </section>
</template>
<script setup>

    import { computed, defineProps } from 'vue';
    import Date from '$src/components/Date/Date.vue';
    import Anchor from '$src/components/navigation/Anchor.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
            cls: {
                type: Array,
                required: false
            },
            filter: {
                type: String,
                required: false,
            },
        });

    const data = props.data;
    const mediaFilter = props.filter;
    const cls = props.cls ?? null;
    

    const media = computed(() => 
    {
        if (!!mediaFilter) return data.mediaFilter(mediaFilter);
        else return data.media;
    });

    //console.warn('Media - Media Data:', data);
</script>