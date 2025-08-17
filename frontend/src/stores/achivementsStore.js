//  Achivements Timeline Store

import { reactive } from "vue";
import { defineStore } from "pinia";

import { achivements } from "@/services/achivements-api.js";
import { fetchData } from "@/services/utils/response.js";

export const achivementStore = defineStore("achivements",
    {
        state:() => ({
            data:
            {
                achivements: [],
                isLoaded: false,
                
            }
        }),
        actions:
        {
            addToStore(item)
            {
                const achivement = this.data.achivements;
                
                if (item.id == 0) item.isVisible = true;
                else item.isVisible = false;
                achivement.push(item);
                console.warn("Adding data to store:", item);
            },

            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData(achivements).then((response) =>
                {
                    response.forEach((item) =>
                    {
                        this.addToStore(item);
                    });
                    this.data.isLoaded = true;

                }).catch((error) => {
                    console.error("Error fetching timeline data:", error);
                    this.data.isLoaded = false;
                });
            },
        },
        getters: {
            isLoaded: (state) => state.data.isLoaded,
            achivements: (state) => state.data.achivements,
            timelineRange : (state) =>
            {
                
                const n = 1;
                const data = reactive({});
                const achivements = state.data.achivements;

                data.field = 
                {
                    value: '0',
                    type: 'range',
                    name: "achivement-timeline",
                    title: 'Achivement Timeline',
                    rangeMax: achivements.length - n,
                }
                data.timeline = achivements;
                return data;

            },
        },  
});