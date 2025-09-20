//  Academic Timeline Store

import { reactive } from "vue";
import { defineStore } from "pinia";
import { fetchData } from "./utils/response.js";

export const academicStore = defineStore("Academic",
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
                const timeline = this.data.timeline;
                timeline.push(item);
                //console.warn("Adding data to store:", item);
            },
            toggleVisibility(id)
            {
                const data = this.data.timeline;
                data.forEach(item => 
                {
                    if (item.id == id) {
                        item.isVisible = true
                        console.log(item.id, item.isVisible)
                    } else {item.isVisible = false
                        console.log(item.id, item.isVisible)
                    }
                    
                }
                )
            },
            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData().then(async () =>
                    {
                    const json = await fetch('services/academic-api.json');   
                    const jsonData = await json.json();

                    jsonData.data.forEach(element => {
                        this.addToStore(element);
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
            timelines: (state) => {
                return state.data.timeline.map(item =>
                ({
                    isVisible: item.id == 0,
                    ...item
                })
            )},
            range : (state) =>
            {
                
                const n = 1;
                const data = reactive({});
                const timeline = state.data.timeline;

                data.field = 
                {
                    value: '0',
                    type: 'range',
                    name: "akademic-timeline",
                    title: 'Akademisk Tidslinje',
                    rangeMax: timeline.length - n,
                }
                data.timeline = timeline;
                return data;

            },
        },  
});