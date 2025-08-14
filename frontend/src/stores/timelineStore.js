import { defineStore } from "pinia";

import { fetchData } from "@/services/timeline-api.js";
import { reactive } from "vue";
//import { fetchData } from "@/services/utils/response.js";

export const timelineStore = defineStore("Data",
    {
        state:() => ({
            data:
            {
                timeline: [],
                isLoaded: false,
                
            }
        }),
        actions:
        {
            addToStore(item)
            {
                item.content.isVisible = true;
                item.field = {
                    name: item.year,
                    type: 'range'
                }
                const timeline = this.data.timeline;
                timeline.push(item);
                console.warn("Adding data to store:", item, this.data);
            },

            async fetchData()
            {
                const data = this.data
                //if (data.isLoaded) return;
                
                await fetchData().then((response) =>
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
            timelines: (state) => state.data.timeline,
            timelineRange : (state) => {
                
                const data = reactive({});
                const years = reactive([]);
                const timeline = state.data.timeline;
                timeline.sort((a, b) => a.year - b.year);
                timeline.forEach((item) => {
                    years.push(item.year);
                });
                data.field = 
                {
                    type: 'range',

                    name: item.year,
                    label: item.year,
                    n: timeline.length,
                }
                data.timeline = timeline;

                return data;

            },
            odd: (state) => state.data.timeline.filter(item => item.id % 2 !== 0),
            even: (state) => state.data.timeline.filter(item => item.id % 2 === 0),
            
            

        },  
});