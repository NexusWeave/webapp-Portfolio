<template>
    <section :class="cls[0]">
        <section :class="cls[1]">
            <Figure  v-for="lang in data.lang" :key="lang.id" 
                :data="lang"
                :cls="['tech-figure', 'tech-img']"
            />

            <h3  v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
            <h3  v-else>{{ data.name }}</h3>
            <span :class="[cls[2]]">
                <time v-bind:datetime="data.date">
                    <b>{{ data.date }}</b>
                </time>
            </span>
        </section>

        <section class="flex-column-items-center">
            <Navigation :cls="cls[3]"
            :data="data.anchor" toggle="anchor" />
            <p>{{ data.description }}</p>

            
            <p class="flex-wrap-row-justify-space-evenly">
                <Tags v-for="lang in data.lang" :key="lang.id" :data="lang" />
            </p>
        </section>
    </section>
</template>
<script setup>
    import { defineProps } from 'vue';

    
    import Figure from '../media/Figure.vue';
    import Tags from '@/components/utils/Tags.vue';
    import Navigation from '@/components/navigation/NavMenu.vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: Array,
            default: () => [
                ['business-card', 'flex-column','flex-wrap-column'],
                ['flex-wrap-row-justify-space-between', 'card-content'],
                'date-container',
                [
                    'portefolio-bar', 
                    ['nav-list', 'flex-wrap-row-justify-space-evenly'],
                    'nav-item', ['anchor-item']
                ]
        ]
        }
    });

    const cls = props.cls;
    const data = props.data;

</script>