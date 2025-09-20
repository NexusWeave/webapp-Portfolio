<template>
    <section>
        <section>
            <h2> Aktuelle innlegg </h2>        
        </section>
        <section>
            <h2> Trenings innlegg </h2>
        </section>
    </section>
    <section :class="['flex-wrap-row-justify-space-evenly']">
        <Timeline :data="academic.timelines" :range="academic.range"  @toggleVisibility ="toggleAcademic"/>
        <Timeline :data="achievements.timelines" :range="achievements.range"
              :cls="['component-seagreen', 'component-w-g-t']" @toggleVisibility ="toggleAchievement"/>

    </section>
    <section>
        <h2> Portefølje </h2>
        <section class="flex-wrap-row-justify-space-evenly">
            <PortfolioCard v-for="content in portfolio.portfolio" 
                :data="content"
                :cls = "['card-container', 'tech']"
            />
        </section>
    </section>
</template>
<script setup lang="ts">

    import { academicStore } from '~/stores/academicStore';
    import { portfolioStore } from '~/stores/portfolioStore';
    import { achievementStore } from '~/stores/achievementsStore';

    const academic = academicStore();
    const portfolio = portfolioStore();
    const achievements = achievementStore();

    //const isLoaded = () => {};
    const toggleAcademic = (id:number) => 
        {
            academic.toggleVisibility(id);
            //console.warn(`Toggling visibility for Academic ID:${id}`)
        };
    
    const toggleAchievement = (id:number) => 
        {
            achievements.toggleVisibility(id);
            //console.warn(`Toggling visibility for Achievement ID:${id}`)
        };

    //console.log(portfolio.isLoaded);
</script>