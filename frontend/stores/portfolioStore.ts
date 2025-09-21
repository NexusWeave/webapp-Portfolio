//  Portfolio Store

import { defineStore } from "pinia";
import { fetchData } from "../utils/response";
import { fetchExtensionType} from "../utils/utils";
import { portfolio } from "~/content/portfolio/portfolio.json";

interface Anchor
{
    label: string;
    type: string[]
}

interface Content {
    name:string;
    anchor: Anchor;
    [key:string]: any;
}

interface Item
{
    name:string;
    href: string;
    tech: string[]
    list: string[]
    body: string;
    created: string;
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

interface Data
{
    portfolio:Item[]
    isLoaded: boolean;
}

interface State
{
    data: Data

}

interface TechItems
{
    label: string;
    type: string[];
}

export const portfolioStore = defineStore("portfolio",
    {
        state:(): State => ({
            data:
            {
                portfolio: [],
                isLoaded: false,
                
            }
        }),
        actions:
        {
            addToStore(item:Item)
            {
    
                const portfolio = this.data.portfolio;
                portfolio.push(item);
            //console.log("Adding data to portfolio:", item);
            },

            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData().then(async () =>
                    {
                        //const json:Record<any,any> = await $fetch(path);
                        //const jsonData: {data:Item[] } = await json.json();

                        portfolio.forEach(element => {
                            this.addToStore(element);
                            
                        });
                        this.data.isLoaded = true;

                    }).catch((error) =>
                        {
                            console.error("Error fetching portfolio data:", error);
                            this.data.isLoaded = false;
                        });
            },
        },
        
        getters: {
            isLoaded: (state) => state.data.isLoaded,

            portfolio: (state) => { 

                return state.data.portfolio.map(item =>
                    ({

                        name : item.name,
                        date: {created: item.created, current: undefined },
                        anchor: {label: item.name, href: item.href, type: ["globe", "external"]},
                        summary:{body: item.body, list: item.list},

                        tech : item.tech.flatMap(element =>
                        {
                            const ext:string[] = fetchExtensionType(element);
                            if (!!ext) {return [{label: element, type: ext }]} else {return []}
                        })
                    
                    }));
            }
        }  
});