//  Academic Timeline Store

import { reactive } from "vue";
import { defineStore } from "pinia";
import { fetchExtensionType} from "../utils/utils";
//import { fetchData } from "../utils/response.js";
import { academic } from "../content/academic/academic.json"

interface Data
{
    timeline: Item[]
    isLoaded: boolean;
}

interface State
{
    data: Data
}

interface Item
{
    id: Number;
    body: string;
    title: string;
    location: string;
    loc_link?: string;
    ref_link?: string;
    end?: Date | string;
    references?: string;
    institution: string;
    isVisible?: boolean;
    tech?: Array<string> ;
    start: Date | string;
    institution_link: string;
    
    
}
interface ItemV2
{
    
    name:string;
    href: string;
    tech: string[]
    list: string[]
    summary: string
    created: string;
    data: Record<string,any>;
    [key:string]: any;
    // content : Content[]
    
}

export const academicStore = defineStore("Academic",
    {
        state:(): State => ({
            data:
            {
                timeline: [],
                isLoaded: false,
                
            }
        }),
        actions:
        {
            addToStore(item:Item)
            {
                item.isVisible = item.id == 0;
                this.data.timeline.push(item);
                //console.warn("Adding data to store:", item);
            },
            toggleVisibility(id:number)
            {
                const data = this.data.timeline;
                
                data.forEach(item => 
                {
                    if (item.id == id) item.isVisible = true; else item.isVisible = false
                }
                )
            },
            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData().then(async () =>
                    {
                    academic.forEach(element =>
                        { 
                            this.addToStore({...element, isVisible: false});
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
            timelines: (state) =>
                {

                return state.data.timeline.map(item =>
                ({

                    id: item.id,
                    title: item.title,
                    name: item.institution,
                    isVisible: item.isVisible,
                    body: {body:item.body, list:[]},
                    references: { href: item.ref_link, label:item.references },
                    date: { end: item.end ?? undefined, start: new Date(item.start)},
                    location: { type: ["globe","external"], href: item.loc_link, label: item.location},
                    institution: { type: ["globe","external"], label: item.institution, href: item.institution_link},
                    tech : item.tech?.flatMap(element =>
                        {
                            const ext = fetchExtensionType(element);
                            if (!!ext) {return [{label: element, type: ext }]} else {return []}
                        })
                    
                })
            )},
            range : (state) =>
            {
                const n = 1;

                const timeline = state.data.timeline;

                return {
                    value: '0',
                    type: 'range',
                    name: "akademic-timeline",
                    title: 'Akademisk Tidslinje',
                    rangeMax: timeline.length - n,
                }
            },
        },  
});