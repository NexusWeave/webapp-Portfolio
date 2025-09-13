<template>
    <h2 class="msg" v-if="announce.data">{{ announce.data}}</h2>
    <h2 class="msg" v-else>{{ announce.default}}</h2>
</template>

<script setup>

//  Importing the required modules
import { onMounted, reactive, computed } from 'vue';
import { FetchApiResponse} from '../../assets/js/utils/apiHandler.js';

//  Initializing reactive objects
const announce = reactive(
{
    data    : null,
    default : "Certified Specializations / Diplomas"
});

//  Fetching data from the server
onMounted(
    async () => {
        try {

            const response = await FetchApiResponse(import.meta.env.VITE_Announcements_local);
            
            announce.data = response.data || null;

        }
        catch (error){console.error("Error fetching announcements :", error);}
    });
</script>