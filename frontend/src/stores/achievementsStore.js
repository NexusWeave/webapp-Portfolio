//  Achievements Timeline Store

import { reactive } from "vue";
import { defineStore } from "pinia";

import { achievements } from "@/services/achievements-api.js";
import { fetchData } from "@/services/utils/response.js";

export const achievementStore = defineStore("achievements",
    {
        state:() => ({
            data:
            {
                achievements: [],
                isLoaded: false,
                
            }
        }),
        actions:
        {
            addToStore(item)
            {
                const achievement = this.data.achievements;

                if (item.id == 0) item.isVisible = true;
                else item.isVisible = false;
                achievement.push(item);
                console.warn("Adding data to store:", item);
            },

            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData(achievements).then((response) =>
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
            achievements: (state) => state.data.achievements,
            timelineRange : (state) =>
            {
                
                const n = 1;
                const data = reactive({});
                const achievements = state.data.achievements;

                data.field = 
                {
                    value: '0',
                    type: 'range',
                    name: "achievement-timeline",
                    title: 'Presentasjonstidslinje',
                    rangeMax: achievements.length - n,
                }
                data.timeline = achievements;
                return data;

            },
        },  
});