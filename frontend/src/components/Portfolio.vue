<template>
    <template v-if="!!pfolio.isLoaded">
        <section id="fullstack"  class="flex-wrap-column">
        <h2>Technical Repositories</h2>
        
        <section class="flex-wrap-column-align-items-center">
            <Pagination class='flex-wrap-row-justify-space-evenly tech-bar':data="pfolio.data.Total" @update="pfolio.current = $event" v-if="pfolio.data.Total"/>
        </section>

        <section class="tech-repo flex-wrap-row-justify-center">
            
            <div class="flex-wrap-row" v-for="data in pfolio.displayData()" :key="data.id">
                <div class="tech-container flex-wrap-column  ">
                    <div v-for="lang in data.lang" :key="lang.id" class="img-wrapper flex-wrap-row-justify-space-between relative">
                        <img class="img-svg" :src="'/media/tech-lang-icons/' + lang.lang + '.svg'" :alt="lang.lang + '.svg'" />
                        <span class="time">
                            <time v-bind:datetime="data.date">{{ data.date }}</time>
                        </span>
                    </div>
                    <h3 v-if="Array.isArray(data.name)">{{ data.name[1] }}</h3>
                    <h3 v-else>{{ data.name }}</h3>
                    <p>{{ data.description }}</p>
                    <nav class="pro-nav flex-wrap-row-justify-space-evenly">
                       

                    </nav>
                </div>
            </div>
        </section>

    </section>

    {{ pfolio.displayData() }}

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
    import Anchor from '@/components/navigation/Anchor.vue';
    
    import Pagination from '@/components/navigation/Pagination.vue';


    //  Initializing reactive objects
    const pfolio = portfolioStore();

    //  Fetching data from the server
    //  Fetching the data from the server
    console.warn("Portfolio API Response :", pfolio.repositories);
</script>