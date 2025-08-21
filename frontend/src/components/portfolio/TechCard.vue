<template>
    <div :class="cls[0]">
        <div v-for="lang in data.lang" :key="lang.id" 
            :class="cls[1]">
            <!--Anchor :cls="[cls[2]]"/-->
            <img 
                :class="[cls[2]]"
                :src="'/media/tech-lang-icons/' + lang.lang + '.svg'" 
                :alt="lang.lang + '.svg'" />
                <span :class="[cls[3]]">
                    <time v-bind:datetime="data.date">{{ data.date }}</time>
                </span>
        </div>
        <h3 :class="[cls[4]]" v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
        <h3 :class="[cls[4]]" v-else>{{ data.name }}</h3>
        <p :class="[cls[5]]">{{ data.description }}</p>
            <!--Navigation :data="url" v-for="url in data.links" :cls="[cls[6]]" /-->
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        },
        cls: {
            type: Array,
            default: () => [['tech-container','flex-wrap-column'], 
            ['figure-container', 'flex-wrap-row-justify-space-between', 'relative'],
            'figure-img', 'date-container', 'title-h3', 'tech-description',
            ['nav-container', 'flex-wrap-row-justify-space-evenly']]
        }
    });

    const cls = props.cls;
    const data = props.data;
    
</script>