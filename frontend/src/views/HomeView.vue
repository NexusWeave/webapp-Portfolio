<template>

    <section>
        <h2>Akademisk Reise</h2>

        <section class ="flex-wrap-row-justify-space-evenly timeline-container">
            <Timeline v-for="data  in timeline.timelines" 
            :key="data.id" :data="data"
            @toggle-visibility="toggleVisibility(data.id)"/>
        </section>
    </section>
</template>
<script setup>
    import Timeline from '@/components/academic/Timeline.vue'
import { reactive } from 'vue';

    import { timelineStore } from '@/stores/timelineStore.js';

    const timeline = timelineStore();


    const toggleVisibility = (id) => {
        const data = timeline.timelines;

        console.warn("Toggling visibility for ID:", id, data);

        console.log("Timeline after toggling:", data);
    };
</script>