<template>
    <div :class="cls[0]">
        <div v-for="lang in data.lang" :key="lang.id" 
            :class="cls[1]">
            <Figure
                :data="lang"
                :cls="['tech-figure', 'tech-img']"
            />
        </div>
        <h3 :class="[cls[3]]" v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
        <h3 :class="[cls[3]]" v-else>{{ data.name }}</h3>
        <span :class="[cls[4]]">
            <time v-bind:datetime="data.date">{{ data.date }}</time>
        </span>

        <section class="flex-column">
            <p :class="[cls[3]]">{{ data.description }}</p>

            <Navigation :data="data.anchor"
            :cls="[cls[6]]" />
        </section>
    </div>
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
            default: () => [['card-container', 'grid-container','flex-wrap-column'], 
            ['grid-item-1', 'flex-wrap-row-justify-space-between'],
            'figure-img55', 'grid-item-2', 'grid-item-3', 
            ['nav-container', 'flex-wrap-row-justify-space-evenly', 'grid-item-4']]
        }
    });

    const cls = props.cls;
    const data = props.data;
    
</script>