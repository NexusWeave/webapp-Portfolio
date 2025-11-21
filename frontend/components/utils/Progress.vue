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
        {name:'Nybegynner', min:0, max:14.29},    
        {name:'Grunnleggende', min:14.30, max:28.59},
        {name:'Intern', min:28.60, max:42.90},
        {name:'Junior Utvikler', min:42.91, max:57.20},
        {name:'Mellomnivå Utvikler', min:57.21, max:71.50},
        {name:'Senior Utvikler', min:71.51, max:99.90},
        {name:'Ekspert / Principal', min:83.35, max:100},

    ]
    

    const n = 100;
    const rank = Math.round((data.value / n) * n);
    const currentRank = rankList.find(rankItem => rankItem.min <= rank && rankItem.max >= rank)?.name || 'Ukjent';

    //  Debugging Logic
    //console.log('Progress data:', data, rank, currentRank);


</script>
