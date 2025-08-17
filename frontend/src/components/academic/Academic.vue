<template>
    <section v-if="academic.isLoaded" 
        class="timeline-container component-blue timeline-container">

        <section class="flex-wrap-row-justify-space-evenly component-blue timeline-line">
            <Timeline
            :data="academic.timelineRange"
            :cls="[['flex-column-align-items-center', 'timeline-item'],
                'title-h2', ['timeline-input-label', 'timeline-input']]"
            @toggle-visibility="toggleVisibility"/>
        </section>
        <h3 class="timeline-h3">
            <Year v-for="data in academic.timelines" :key="data.id"
                    :year="data.year" :isVisible="data.isVisible"/>
        </h3>
        <section class="flex-wrap-row-justify-space-evenly component-blue">
                <Card v-for="data in academic.timelines" :key="data.id"
                    :data="data"/>
        </section>
    </section>  
</template>
<script setup>
    import { academicStore } from '@/stores/academicStore.js';

    import Year from '@/components/Date/Year.vue';
    import Card from '@/components/academic/Card.vue';
    import Timeline from '@/components/academic/Timeline.vue';

    const academic = academicStore();


    const toggleVisibility = (id) => {
        const data = academic.timelines;
        id = parseInt(id);

        data.forEach(item => {
            if (item.id === id) 
            
            {
                item.isVisible = true;
                console.log(item.id, id, item);
            }
            else item.isVisible = false;
        });
        console.warn(`Toggling visibility for ID:${id}`, data[id].isVisible);
    };
    //console.warn("Timeline data on load:", timeline.timelines);
</script>