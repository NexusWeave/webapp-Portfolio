<template>
    <section class="flex-column-justify-center-align-center timeline-container" :class="cls">
        <section class ="flex-row-reversed-justify-space-evenly-align-content-center">
                    <h2 :class ="cls">{{ data.year }}</h2>
                </section>
        <section class="flex-row-reversed-justify-space-evenly-align-content-center">
            <button :class="['btn', btn.cls]" @click="btn.action(data.id)"></button>
        </section>

        <section v-show="data.content.isVisable"
            class="flex-wrap-column timeline-content">
            <h3>{{ data.title }}</h3>

            <section v-if="!!data.content.school" class="flex-column-justify-center-align-center">
                Skole :<Anchor :data="data.content.school.anchor" />
                <p>Campus : {{ data.content.school.location }}</p>
                <p>År : {{ data.content.school.start }} - {{ data.content.school.end }}</p>
                <h3 v-if="!!data.content.anchor"> 
                    <Anchor :data="data.content.anchor" />
                </h3>
            </section>
            <p v-if="!!data.description">{{ data.description }}</p>
        </section>
    </section>
</template>

<script setup>

    import { computed, defineProps, defineEmits } from 'vue';
    import Anchor from '../navigation/Anchor.vue';

    const props = defineProps({
        data: {
            type: Object,
        },
        cls: {
            type: Array,
        }
    });

    const emits = defineEmits(['toggleVisibility']);
    const cls = props.cls;
    const data = computed(() => props.data);

    const btn = {
        cls: 'timeline-btn',
        action: () => emits('toggleVisibility', data.id)
    };

    console.log("Timeline data:", data.value);
</script>