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

interface TechItems
{
    label: string;
    type: string[];
}


const path:string = "services/portfolio-api.json";

const generateCls = (type: string[]): string[] =>
{
    if (!Array.isArray(type)) return [];
    return type.map(type => `${type.toLowerCase()}`)
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
            
            // Vi endrer navnet til portfolioWithClasses (Anbefalt) for å unngå kollisjon
            portfolio: (state) => { 

                // 1. Mappe over portfolio (Bruker runde parenteser for implisitt retur av objekt)
                return state.data.portfolio.map(item => ({ 
                    
                    ...item, // KOPIERER ALLE FELT fra item
                    
                    // 2. Mappe over content (legger til ny content-array)
                    content: item.content.map(content => ({
                        
                        ...content, // KOPIERER ALLE FELT fra content
                        
                        // 3. Mappe over tech
                        tech: content.tech ? content.tech.map((tech: TechItems)=> ({
                            
                            ...tech, // KOPIERER ALLE FELT fra tech (id, type, label, etc.)
                            
                            // 4. Legger til det beregnede feltet i det dypeste objektet
                            cls: generateCls(tech.type) 
                            
                        })) : content.tech // Vedlikehold null/undefined hvis tech mangler
                    }))
                }));
            }
        }  
});