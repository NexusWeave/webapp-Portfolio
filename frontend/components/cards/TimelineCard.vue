<template>
    <section v-if="!!data.isVisible"
    v-for="content in data.content" :key="data.year"
    :class="[cls[0], {'timeline-active': !!data.isVisible }]">
        <h3 v-if="!!content.name">{{ content.name }}</h3>
        <h3 v-else>{{ content.title }}</h3>
        <h4 v-if="!!content.title && !!content.name"> {{ content.title }} </h4>

        <section v-if="!!content.start || !!content.end"
        :class="cls[1]">
            <section class="flex-wrap-row-justify-center">
                <Icon :cls="['icon', 'calendar']" :label="'school year'"/>
                <span>{{ content.start}}</span>
                {{!!content.end ? ' - ' : ''}}
                <span v-if="!!content.end">{{content.end }}</span>
            </section>
        </section>

        <section v-if="!!content.tech">
            <h4>Teknologi : </h4>
            <span :class="cls[3]">
                <span v-for="tech in content.tech" :key="tech"
                    :class="cls[4]">
                    {{ tech }}
                </span>
            </span>
        </section>

        <section v-if="!!content.description"
            :class="cls[5]">
            <p>{{ content.description.summary }}</p>
            <ul v-if="!!content.description.list" :class="cls[6]">
                <li v-for="item in content.description.list" :key="item"
                    :class="cls[7]">
                    {{ item }}
                </li>
            </ul>
        </section>

        <section :class="cls[2]">
            <span v-if="!!content.anchor">
                <Anchor :data="content.anchor" />
            </span>
            <span v-if="!!content.location">
                <Anchor :data="content.location" />
            </span>
            <span v-if="!!content.diploma">
                <Anchor :data="content.diploma" />
            </span>
            <span v-if="!!content.reference">
                <Anchor :data="content.reference" />
            </span>
        </section>
    </section>
</template>

<script setup>


    import Icon from '../utils/Icon.vue';
    import Anchor from '../navigation/Anchor.vue';
    

    const props = defineProps({
        data:
        {
            type: Object,
        },
        cls:
        {
            type: Array,
            required: false,
            default: () => [['flex-wrap-column', 'academic-content', 'component-w-g-b'],

                        'flex-column-justify-center-align-center',
                        'flex-wrap-row-align-content-start-justify-space-evenly',
                        ['tech-container', 'flex-wrap-row-justify-space-evenly'],
                        'tech-item', 'timeline-description',
                        'timeline-list', 'timeline-item']
        },
        btn :
        {
            type: Object,
        },
    });

    const cls = !!props.cls ? props.cls : null;
    const emits = defineEmits(['toggleVisibility']);

    //console.log("Card data:", content.value);
</script>