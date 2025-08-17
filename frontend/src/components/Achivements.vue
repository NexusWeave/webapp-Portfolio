<template>

<template v-if="achivement.isLoaded">
        <section class="timeline-container component-blue timeline-container">
            
            <section class="flex-wrap-row-justify-space-evenly timeline-line">
                
                <Timeline
                :data="achivement.timelineRange"
                :cls="[['flex-column-align-items-center', 'timeline-item'],
                    'title-h2', ['timeline-input-label', 'timeline-input']]"
                @toggle-visibility="toggleVisibility"/>
            </section>
            
            <section class="flex-wrap-row-justify-space-evenly component-blue">
                    <h3 class="timeline-h3">
                        <Year v-for="data in achivement.achivements" :key="data.id"
                            :year="data.year" :isVisible="data.isVisible"/>
                    </h3>
            </section>
            <section class="flex-wrap-row-justify-space-evenly component-blue">
                    <Card v-for="data in achivement.achivements" :key="data.id"
                        :data="data"/>
            </section>

        </section>
    </template>
    <template v-else>
        Attempting to retrieve achivements, please wait...
    </template>
</template>
<script setup>
    import { achivementStore } from '@/stores/achivementsStore.js';

    import Year from '@/components/Date/Year.vue';
    import Card from '@/components/academic/Card.vue';
    import Timeline from '@/components/academic/Timeline.vue';

    const achivement = achivementStore();

    const toggleVisibility = (id) => {
        const data = achivement.achivements;
        id = parseInt(id);
        console.log(data);

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

    console.warn("Timeline data on load:", achivement.achivements, achivement.isLoaded);
</script>