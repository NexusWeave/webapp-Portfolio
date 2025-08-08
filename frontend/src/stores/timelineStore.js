import { defineStore } from "pinia";

import { fetchData } from "@/services/timeline-api.js";
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
                const timeline = this.data.timeline
                
                item.content.isVisible = false;
                timeline.push(item);
                //console.warn("Adding data to store:", item, this.data);
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
            timelines: (state) => state.data.timeline,
            isLoaded: (state) => state.data.isLoaded,

        },  
});