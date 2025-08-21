<template>
    <template v-if="!!portofolio.repositories">
        <section id="fullstack"  class="flex-wrap-column">
        <h2>Technical Repositories</h2>
        
        <section class="flex-wrap-column-align-items-center">
            <Pagination class='flex-wrap-row-justify-space-evenly tech-bar':data="portofolio.data.Total" @update="portofolio.current = $event" v-if="portofolio.data.Total"/>
        </section>

        <section id="technologies" class="tech-repo flex-wrap-row-justify-center">
            <div class="flex-wrap-row" v-for="data in portofolio.displayData" :key="data.id">
                <div class="tech-container flex-wrap-column  ">
                    <div v-for="lang in data.lang" :key="lang.id" class="img-wrapper flex-wrap-row-justify-space-between relative">
                        <img class="img-svg" :src="'./src/assets/img/techlogo/' + lang.lang + '.svg'" :alt="lang.lang + '.svg'" />
                        <span class="time">
                            <time v-bind:datetime="data.date">{{ data.date }}</time>
                        </span>
                    </div>
                    <h3 v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
                    <h3 v-else>{{ data.name }}</h3>
                    <p>{{ data.description }}</p>
                    <nav class="pro-nav flex-wrap-row-justify-space-evenly">
                        <Link :link="url" v-for="url in data.links"/>

                    </nav>
                </div>
            </div>
        </section>

    </section>
    </template>

    <template v-else>
        <section id="fullstack" class="loading">
            <p>Loading Technical Repositories...</p>
        </section>
    </template>
</template>

<script setup>

    //  Importing dependencies
    import { reactive, onMounted, computed } from 'vue';
    import { portfolioStore } from '@/stores/portfolioStore.js';

    //  Importing components
    import Form from '@/components/form/Form.vue';
    import Link from '@/components/navigation/Anchor.vue';
    
    import Pagination from '@/components/navigation/Pagination.vue';


    //  Initializing reactive objects
    const portofolio = portfolioStore();

    //  Fetching data from the server
    //  Fetching the data from the server
    console.warn("Portfolio API Response :", portofolio.repositories);
</script>