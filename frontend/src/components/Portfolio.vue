<template>
    <section id="fullstack" v-if="repo.data" class="flex-wrap-column">
        <h2>Technical Repositories</h2>
        <section class="flex-wrap-column-align-items-center">
            <Navigation class='flex-wrap-row-justify-space-evenly tech-bar':data="repo.data.Total" @update="repo.current = $event" v-if="repo.data.Total"/>
            <form class="flex-wrap-row-justify-space-evenly">
                <select v-if = "repo.data.lang" placeholder="Choose a type" v-model="filter.lang">
                    <option value="">Project Type</option>
                    <option v-for="type in repo.data.type" :key="type.id" value="{{ type }}">{{ type.type}}</option>
                </select>
                <input type='text' name="search" v-model="filter.name" placeholder="Search" />
                <select v-if = "repo.data.lang">
                    <option value="">Project Language</option>
                    <option v-for="lang in repo.data.lang" :key="lang.id" value="{{ lang.lang}}">{{ lang.lang}}</option>
                </select>
            </form>
        </section>
        <section id="tech-repo" class="tech-repo flex-wrap-row-justify-center">
            <div class="pp flex-wrap-row" v-for="data in repo.displayData" :key="data.id">
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
    <section id="fullstack" class="loading" v-else>
        <p>Loading Technical Repositories...</p>
    </section>
</template>

<script setup>

//  Importing dependencies
import { reactive, onMounted, computed } from 'vue';
import { FetchApiResponse } from '../assets/js/utils/apiHandler.js';

//  Importing components
import Link from './misc_components/link.vue';
import Navigation from './misc_components/pagination.vue';


//  Initializing reactive objects
const repo = reactive(
{
    n           : 9,
    current     : 1,
    data        : null,
    
    btn   :[
        {
            id: 1,
            name: 'Next',
            cls: 'tech-btn'
        },
        {
            id: 2,
            name: 'Prev',
            cls: 'tech-btn'
        }
    ],
    
    displayData :computed(() =>
    {
        if (filter.name)
        {
            return repo.data.filter((data) => {filterData (data.name, filter.name.toLowerCase())});
        }
        else
        {
            const end = (repo.current * repo.n);
            const start = (repo.current-1) * repo.n;

            let data =  repo.data.slice(start, end);

            for (let i = 0; i< data.length; i++)
            {
                if (data[i].name.includes('-'))
                {
                    data[i].name = data[i].name.split('-');
                }
            }
            return data;
        }
    })
});


const filter = reactive(
{
    name: '',
    lang: '',
    category: ''
});

function filterData (name, filter)
{
    for (let i = 0; i< name.length; i++)
    {
        if (name[i].includes(filter).toLowerCase())
        {
            return name[i];
        }
    }
}

//  Fetching data from the server
onMounted(
    async () => {
        try {
        const response = await FetchApiResponse(import.meta.env.VITE_Github_local);

        repo.data = response.data;
        repo.data.Total = response.Total;

        console.log("Pfolio API Response :", repo.data);
    }

        catch (error){console.error("Error fetching announcements :", error);}
    });

//  Fetching the data from the server
</script>