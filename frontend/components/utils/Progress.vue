<template>
    <section>
        <h3>{{ label }}</h3>
        <p>{{ currentRank }}</p>
        <progress :value="value" :class="tech" max="100"></progress>
    </section>
</template>
<script setup lang="ts">

    //  Importing dependencies & types
    //import type { ProgressProps } from '@/types/props';

    interface ProgressProps {
        value: number;
        cls?: string[];
        label: string;
        tech?: string;
    }
    //  Props Logic
    const props = defineProps<ProgressProps>();

    const data = computed(() => props.value);
    const tech = computed(() => props.tech) || '';

    //  Rank Logic
    const rankList = 
    [
        {name:'Grunnleggende', min:0, max:5},    
        {name:'Nybegynner', min:6, max:15},
        {name:'Intern', min:16, max:25},
        {name:'Junior Utvikler', min:26, max:50},
        {name:'Senior Utvikler', min:76, max:90},
        {name:'Mellomnivå Utvikler', min:51, max:75},
        {name:'Ekspert / Principal', min:91, max:100},

    ]
    

    const n = 100;
    const rank = Math.round((data.value / n) * n);
    const currentRank = rankList.find(rankItem => rankItem.min <= rank && rankItem.max >= rank)?.name || 'Ukjent';

    //  Debugging Logic
    //console.log('Progress data:', data, rank, currentRank);


</script>
