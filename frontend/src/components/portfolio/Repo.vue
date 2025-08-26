<template>
    <section class="flex-wrap-row" v-for="data in pfolio.displayData()" :key="data.id">
        <BCard :data="data" />
    </section>
</template>
<script setup>

    //  Importing dependencies
    import { portfolioStore } from '@/stores/portfolioStore.js';

    //  Importing components
    import BCard from './BusinessCard.vue';



    //  Initializing reactive objects
    const pfolio = portfolioStore();

    //  Fetching data from the server
    //  Fetching the data from the server
    console.warn("Card API Response :", pfolio.repositories);
</script>
