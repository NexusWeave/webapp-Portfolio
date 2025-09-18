//  Portfolio Store

import { defineStore } from "pinia";
import { fetchData } from "./utils/response.js";

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
    content : Content[];
    [key:string]: any;
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

const path:string = "services/portfolio-api.json";


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
                item.content.forEach((content) =>
                    {
                        content.anchor.label = content.name;
                        content.anchor.type = ["globe", "external"];
                    })
    
                const portfolio = this.data.portfolio;
                portfolio.push(item);
                //console.warn("Adding data to portfolio:", item);
            },

            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData().then(async () =>
                    {
                        const json = await fetch(path);
                        const jsonData: {data:Item[] } = await json.json();

                        jsonData.data.forEach(element => {
                            this.addToStore(element);
                        });
                        this.data.isLoaded = true;

                    }).catch((error) =>
                        {
                                console.error("Error fetching timeline data:", error);
                                this.data.isLoaded = false;
                        });
            },
        },
        
        getters: {
            isLoaded: (state) => state.data.isLoaded,
            portfolio: (state) => state.data.portfolio
        }  
});