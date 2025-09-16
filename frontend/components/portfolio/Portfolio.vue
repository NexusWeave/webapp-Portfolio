<template>
    <template v-if="!!pfolio.isLoaded">
        <section class="flex-wrap-column repo-container">
        <h2>Technical Repositories</h2>
        <section class="flex-wrap-column-align-items-center">
        </section>

        <section v-if="!!pfolio.totalPages > 0" 
            class="flex-wrap-column-align-items-center">
            <Pagination class='flex-wrap-row-justify-space-evenly tech-bar':data="pfolio.data.Total" $srcupdate="pfolio.current = $event" v-if="pfolio.data.Total"/>
        </section>

        <section class="repo-container flex-wrap-row-justify-center">
            <Repo v-if="pfolio.isLoaded" :data="pfolio.displayData()"/>
        </section>

    </section>

    </template>

    <template v-else>
        <section class="loading repo-container">
            <p>Loading Technical Repositories...</p>
        </section>
    </template>
</template>

<script setup>

    //  Importing dependencies
    import { reactive, onMounted, computed } from 'vue';
    import { portfolioStore } from '$src/stores/portfolioStore.js';

    //  Importing components
    import Pagination from '$src/components/navigation/Pagination.vue';
    import Repo from './Repo.vue';


    //  Initializing reactive objects
    const pfolio = portfolioStore();

    //  Fetching data from the server
    //  Fetching the data from the server
    console.warn("Portfolio API Response :", pfolio.repositories);
</script>