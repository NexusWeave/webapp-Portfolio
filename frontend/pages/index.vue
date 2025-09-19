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
        <Academic :data="academic"/>
        <Achievements :data="achievements"/>

    </section>
    <section>
        <h2> Portefølje </h2>
        <section class="flex-wrap-row-justify-space-evenly">
            <CardsPortfolioCard v-for="content in portfolio.portfolio" :key="content.id" 
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

    //console.log(portfolio.isLoaded);
</script>