<template>
    <section :class="['flex-wrap-row-justify-space-evenly']">
        <Timeline v-if="academicTimeline.length > 0"
            title="Akademisk Tidslinje"
            :data="academicTimeline"
            :cls = "['component-blue', 'timeline-container',
            'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']"
        />

        <Timeline v-if="achievementsTimeline.length > 0"
            title="Prestasjonstidslinje"
            :data="achievementsTimeline"
            :cls = "['component-seagreen', 'timeline-container',
            'timeline-line', 'flex-wrap-row-justify-space-evenly', 'component-w-g-b']"
        />
    </section>
</template>
<script setup lang="ts">

    //  --- Import & types logic
    import { fetchCollection, mapTimeline } from '#imports';
    import type { AcademicCollectionItem, AchievementsCollectionItem } from '@nuxt/content';

    //  --- Component logic
    const academicData = await fetchCollection<AcademicCollectionItem>('academic', 'academic-info');
    const achievementData = await fetchCollection<AchievementsCollectionItem>('achievements', 'achievements-info');

    const academicTimeline = computed(() => mapTimeline(academicData));
    const achievementsTimeline = computed(() => mapTimeline(achievementData));

    //  --- Debugging Logic
    //console.log("Processed timeline:", academicTimeline.value);
    //console.log("Achievements data on load:", achievementsTimeline.value);
</script>