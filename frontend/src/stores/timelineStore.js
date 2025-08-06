import { defineStore } from "pinia";

import { timeline } from "@/services/timeline.js";
import { fetchData } from "@/services/response.js";
export const useTimelineStore = defineStore("timeline", {
    state: () => ({
        data: {
            timeline: [],
            isLoaded: false,
        }
    }),
    actions: {
        addToStore(data)
        {
            const timeline = this.data.timeline
            data.forEach((item) => 
            {

            })
            timeline.push(data);

        },
        sortStore()
        {
            this.data.timeline.sort((a, b) => a.year - b.year);
        },
        fetchData()
        {
            const data = this.data;
            if (data.isLoaded) return;
            fetchData(timeline).then((response) => {
                this.addToStore(response);
                data.isLoaded = true;

                this.sortStore();
            }).catch((error) => {
                data.isLoaded = false;
                console.error("Error fetching timeline data:", error);
            });
        }
    },
    getters: {
        data: (state) => state.data.timeline,
    },
    
});