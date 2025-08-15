<template>
    <section :class="[cls[0], {'timeline-active': !!data.content.isVisible }]">
        <template v-if="!!data.content.school">
            <h3 :class="cls[1]">{{ data.title }}</h3>
            <h4 :class="cls[2]">
                <span v-if="!!data.content.school.start">{{'( ' + data.content.school.start}}</span>
                {{!!data.content.school.end ? ' - ' : ')'}}
                <span v-if="!!data.content.school.end">{{data.content.school.end + ' )' }}</span>        
            </h4>

            <section v-if="!!data.content.school"
                :class="cls[3]">

                <section :class="cls[4]">
                    <h4 :class="cls[2]">Skole :</h4>
                    <Anchor :data="data.content.school.anchor" />
                </section>

                <section :class="cls[4]">
                    <h4 :class="cls[2]">Sted : </h4>
                    <span v-for="value in data.content.school.location" :key="value">
                        {{ value }}
                    </span>
                </section>

                <section v-if="!!data.content.school.tech">
                    <h4 :class="cls[2]">Teknologi : </h4>
                    <span :class="cls[5]">
                        <span v-for="tech in data.content.school.tech" :key="tech"
                            :class="cls[6]">
                            {{ tech }}
                        </span>
                    </span>
                </section>

                <section v-if="!!data.content.anchor"
                    :class="cls[4]">
                    <h4 :class="cls[2]">Sertifisering :</h4>
                    <Anchor :data="data.content.anchor" />
                </section>
            </section>

        </template>

        <template v-if="!!data.content.employer">
            <h3 :class="cls[1]">
                {{ data.title }}
            </h3>
            <h4 :class="cls[2]">
                <span v-if="!!data.content.employer.start">{{'( ' + data.content.employer.start}}</span>
                {{!!data.content.employer.end ? ' - ' : ')'}}
                <span v-if="!!data.content.employer.end">{{data.content.employer.end + ' )' }}</span>
            </h4>
            <section v-show="!!data.content.isVisible" v-if="!!data.content.employer"
                :class="cls[3]">

                <section v-if="!!data.content.employer.name">
                    <h4 :class="cls[2]">Arbeidsgiver :</h4>
                    <Anchor :data="data.content.employer.anchor" />
                </section>

                <section v-if="!!data.content.employer.location">
                    <h4 :class="cls[2]">Sted : </h4>
                    <span v-for="value in data.content.employer.location" :key="value">
                        {{ value }}
                    </span>
                </section>

                <section v-if="!!data.content.employer.tech">
                    <h4 :class="cls[2]">Teknologi : </h4>
                    <span :class="cls[5]">
                        <span v-for="tech in data.content.employer.tech" :key="tech"
                            :class="cls[6]">
                            {{ tech }}
                        </span>
                    </span>
                </section>

                <section v-if="!!data.content.attest">
                    <h4 :class="cls[2]">Attest : </h4>
                    <Anchor :data="data.content.attest" />
                </section>

            </section>
        </template>
        <section v-if="!!data.description"
            :class="cls[7]">
            <p>{{ data.description.summary }}</p>
            <ul v-if="!!data.description.list" :class="cls[8]">
                <li v-for="item in data.description.list" :key="item"
                    :class="cls[9]">
                    {{ item }}
                </li>
            </ul>
        </section>
    </section>
</template>

<script setup>

    import { computed, defineProps, defineEmits } from 'vue';
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
            default: () => [['flex-wrap-column', 'timeline-content'], 'timeline-h3', 'timeline-h4',
            'flex-column-justify-center-align-center', 'flex-wrap-row-align-content-start-justify-space-evenly',
            'tech-container', 'tech-item', 'timeline-description', 'timeline-list', 'timeline-item']
        },
        btn :
        {
            type: Object,
        },
    });

    
    
    const btn = computed(() => props.btn);
    const cls = !!props.cls ? props.cls : null;
    const data = computed(() => props.data);
    const emits = defineEmits(['toggleVisibility']);

    console.log("Timeline data:", data.value);
</script>