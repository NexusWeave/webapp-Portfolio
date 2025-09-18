<template>
    <section>
        <section>
            <h2> Aktuelle innlegg </h2>        
        </section>
        <section>
            <h2> Aktuelle innlegg </h2>
        </section>
    </section>
    <section :class="['flex-wrap-row-justify-space-evenly']">
        
    </section>
    <Portfolio 
        :data="portfolio.portfolio"
        toogle="commercal"
    />
</template>
<script setup lang="ts">
    import { portfolioStore } from '~/stores/portfolioStore'
        const portfolio = portfolioStore();

    //console.log(portfolio.isLoaded);
</script>