<template>
    <span :class="[cls[0]]">
        {{ dateObject.text }}

        <template v-if="dateObject.delimiter">
            <span :class="dateObject.delimiter">
                <i :class="cls[cls.length - 1]" :aria-label="dateObject.type"></i>
            </span>
        </template>

        <time :datetime="dateObject.updated ??  dateObject.published">
            <b>{{ dateObject.updated ?? dateObject.published }}</b>
        </time>

        <template v-if="cls.includes('icon')">
            <Icon :cls="[cls[0], cls[1]]" :label="dateObject.type"/>
        </template>
    </span>

    <span :class="cls" v-if="data.anchor">
        <Anchor :data="data"/>
    </span>
</template>
<script setup>
    import { defineProps } from 'vue';

    import Anchor from '$src/components/navigation/Anchor.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: false
        },
        
        Cls: {
            type: Array,
            required: false
        },

    });
    const data = props.data;
    const classList =() =>
    {
        const cls = props.Cls ? props.Cls : [];
        const icons = ['calendar'];


        icons.forEach(icon => {
            if (cls.includes(icon)) {
                cls.push('icon');
            }
        });

        return cls;
    };

    const cls = classList()
    const norwegianTime = new Intl.DateTimeFormat('nb-NO',
    {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    const dateObject =
    {
        delimiter: !! data.delimiter ? data.delimiter : 'dot',
        type: !!data.type ? data.type : 'date',
        text : !!data.updated ? `Oppdatert` : `Publisert`,
        updated: !!data.updated ? norwegianTime.format(new Date(data.updated)) :null,
        published: data.published ? norwegianTime.format(new Date(data.published)) : null,

    }

    console.log("Date Component loaded with data: ", data);
</script>