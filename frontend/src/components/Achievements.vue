<template>
<template v-if="achievement.isLoaded">
        <section class="timeline-container component-seagreen">
            <section class="flex-wrap-row-justify-space-evenly timeline-line ">

                <Timeline
                :data="achievement.timelineRange"
                :cls="[['flex-column-align-items-center', 'timeline-item'],
                    '', ['timeline-input-label', 'timeline-input']]"
                @toggle-visibility="toggleVisibility"/>
            </section>

            <section class="flex-wrap-row-justify-space-evenly">
                    <h3>
                        <Year v-for="data in achievement.achievements" :key="data.id"
                            :year="data.year" :isVisible="data.isVisible"/>
                    </h3>
            </section>
            <section class="flex-column-items-center">
                    <Card v-for="data in achievement.achievements" :key="data.id"
                        :data="data" :cls="[['flex-wrap-column', 'component-w-g-t', 'achievement-content'], 
                        'flex-column-justify-center-align-center',
                        'flex-wrap-row-align-content-start-justify-space-evenly',
                        ['tech-container', 'flex-wrap-row-justify-space-evenly'], 'tech-item', 'timeline-description',
                        'timeline-list', 'timeline-item']"/>
            </section>

        </section>
    </template>
    <template v-else>
        Attempting to retrieve achievements, please wait...
    </template>
</template>

<script setup>
    import { achievementStore } from '@/stores/achievementsStore.js';

    import Year from '@/components/Date/Year.vue';
    import Card from '@/components/timeline/Card.vue';
    import Timeline from '@/components/timeline/Timeline.vue';

    const achievement = achievementStore();

    const toggleVisibility = (id) => {
        const data = achievement.achievements;
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

    console.warn("Timeline data on load:", achievement.achievements, achievement.isLoaded);
</script>