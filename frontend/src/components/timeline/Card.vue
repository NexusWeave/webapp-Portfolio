<template>
    <section v-if="!!data.isVisible"
    v-for="content in data.content" :key="data.year"
    :class="[cls[0], {'timeline-active': !!data.isVisible }]">
        <h3 :class="cls[1]">{{ content.name }}</h3>
        <h4 :class="cls[2]"> {{ content.title }} </h4>

        <section v-if="!!content.start || !!content.end"
        :class="cls[3]">
            <section class="flex-wrap-row-justify-center">
                <Icon :cls="['icon', 'calendar']" :label="'school year'"/>
                <span>{{ content.start}}</span>
                {{!!content.end ? ' - ' : ''}}
                <span v-if="!!content.end">{{content.end }}</span>
            </section>
        </section>

        <section v-if="!!content.tech">
            <h4 :class="cls[2]">Teknologi : </h4>
            <span :class="cls[5]">
                <span v-for="tech in content.tech" :key="tech"
                    :class="cls[6]">
                    {{ tech }}
                </span>
            </span>
        </section>

        <section v-if="!!content.description"
            :class="cls[7]">
            <p>{{ content.description.summary }}</p>
            <ul v-if="!!content.description.list" :class="cls[8]">
                <li v-for="item in content.description.list" :key="item"
                    :class="cls[9]">
                    {{ item }}
                </li>
            </ul>
        </section>

        <section :class="cls[4]">
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

    import { computed, defineProps, defineEmits } from 'vue';

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
            default: () => [['flex-wrap-column', 'timeline-content'], 
                        'timeline-h3', 'timeline-h4',
                        'flex-column-justify-center-align-center',
                        'flex-wrap-row-align-content-start-justify-space-evenly',
                        ['tech-container', 'flex-wrap-row-justify-space-evenly'], 'tech-item', 'timeline-description',
                        'timeline-list', 'timeline-item']
        },
        btn :
        {
            type: Object,
        },
    });

    const btn = computed(() => props.btn);
    const cls = !!props.cls ? props.cls : null;
    const classList = computed(() => 
    {
        const cls = props.cls || [];
        if (!!data.isVisible) cls.push('timeline-active');
        return cls;
    });
    const content = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    //console.log("Card data:", content.value);
</script>