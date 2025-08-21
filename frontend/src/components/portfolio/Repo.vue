<template>
<section class="tech-repo flex-wrap-row-justify-center">
            
            <div class="flex-wrap-row" v-for="data in pfolio.displayData()" :key="data.id">
                <TechCard :data="data" />

            </div>
        </section>
</template>
<script setup>

    //  Importing dependencies
    import { reactive, onMounted, computed } from 'vue';
    import { portfolioStore } from '@/stores/portfolioStore.js';

    //  Importing components
    import TechCard from './TechCard.vue';



    //  Initializing reactive objects
    const pfolio = portfolioStore();

    //  Fetching data from the server
    //  Fetching the data from the server
    console.warn("Card API Response :", pfolio.repositories);
</script>
