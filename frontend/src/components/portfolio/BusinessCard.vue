<template>
    <section :class="cls[0]">
        <section :class="cls[1]">
            <Figure  v-for="lang in data.lang" :key="lang.id" 
                :data="lang"
                :cls="['tech-figure', 'tech-img']"
            />

            <h3 :class="[cls[2]]" v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
            <h3 :class="[cls[2]]" v-else>{{ data.name }}</h3>
            <span :class="[cls[3]]">
                <time v-bind:datetime="data.date">{{ data.date }}</time>
            </span>
        </section>

        <Navigation :cls="cls[5]"
            :data="btn" toggle="pagination" />

        <section class="flex-column-items-center">
            <p :class="[cls[4]]">{{ data.description }}</p>

            <Navigation :cls="cls[5]"
            :data="data.anchor" toggle="anchor" />
        </section>
    </section>
</template>
<script setup>
    import { defineProps } from 'vue';

    import Figure from '../media/Figure.vue';
    import Navigation from '@/components/navigation/NavMenu.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: Array,
            default: () => [
                ['card-container', 'flex-column','flex-wrap-column'],
                ['flex-wrap-row-justify-space-between', 'card-content'],
                'title-h3', 'date-container',  'ts',
                [
                    ['portefolio-bar', 'flex-wrap-row-justify-space-evenly'], ['nav-list', 'flex-row-align-items-center'],
                    ['nav-item'], ['anchor-item']
                ]
        ]
        }
    });

    const cls = props.cls;
    const data = props.data;

</script>