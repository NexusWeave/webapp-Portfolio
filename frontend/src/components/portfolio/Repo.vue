<template>
    <section class="flex-wrap-row" v-for="data in pfolio.displayData()" :key="data.id">
        <TechCard :data="data" />
    </section>
</template>
<script setup>

    //  Importing dependencies
    import { portfolioStore } from '@/stores/portfolioStore.js';

    //  Importing components
    import TechCard from './BusinessCard.vue';



    //  Initializing reactive objects
    const pfolio = portfolioStore();

    //  Fetching data from the server
    //  Fetching the data from the server
    console.warn("Card API Response :", pfolio.repositories);
</script>
