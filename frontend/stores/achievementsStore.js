//  Achievements Timeline Store

import { reactive } from "vue";
import { defineStore } from "pinia";
import { fetchData } from "./utils/response.js";

const path = 'services/achievements-api.json';

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
                achievement.push(item);

                //console.warn("Adding data to AchivementStore:", item);
            },
            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData().then(async () =>
                    {
                        const json = await fetch(path);
                        const jsonData = await json.json();

                        jsonData.data.forEach(element => { this.addToStore(element);});
                        this.data.isLoaded = true;

                    }).catch((error) =>
                        {
                                console.error("Error fetching timeline data:", error);
                                this.data.isLoaded = false;
                        });
            },
            toggleVisibility(id)
            {
                const data = this.data.achievements;

                data.forEach(item =>
                {
                    if (item.id == id) item.isVisible = !item.isVisible; else item.isVisible = false;
                }
                )
            }
        },
        
        getters: {
            isLoaded: (state) => state.data.isLoaded,
            timelines: (state) => {
                return state.data.achievements.map(item =>
                ({
                     isVisible: item.id == 0,
                    ...item
                })
            )},
            range : (state) =>
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