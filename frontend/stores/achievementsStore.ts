//  Achievements Timeline Store
import { defineStore } from "pinia";
import { achievement } from "../content/achievement/achievements.json";

interface Data
{
    isLoaded:boolean;
    timeline:Array<Record<string,any>>;
}
interface State
{
    data:Data
}

interface Item
{
    id: number;
    body: string;
    start: string;
    title: string;
    tech?:string[];
    summary: string[];
    isVisible: boolean;
}

export const achievementStore = defineStore("achievements",
    {
        state: (): State => ({
            data:
            {
                timeline: [],
                isLoaded: false,
                
            }
        }),
        actions:
        {
            addToStore(item: Item)
            { 
                item.isVisible = item.id == 0;
                this.data.timeline.push(item);

                //console.warn("Adding data to AchivementStore:", item);
            },
            async fetchData()
            {
                const data = this.data
                if (data.isLoaded) return;

                await fetchData().then(async () =>
                    {
                        achievement.forEach(element => { this.addToStore({...element, isVisible: false});});
                        this.data.isLoaded = true;

                    }).catch((error) =>
                        {
                                console.error("Error fetching timeline data:", error);
                                this.data.isLoaded = false;
                        });
            },
            toggleVisibility(id: Number)
            {
                const data = this.data.timeline;

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

                return state.data.timeline.map(item =>
                ({
                    ...item,
                    id: item.id,
                    name: item.name,
                    title: item.title,
                    isVisible: item.isVisible,
                    date: {start: item.start},
                    body: { body: item.body, list: item.list},
                    tech: item.tech?.flatMap(element =>
                    {
                        const ext = fetchExtensionType(element);
                        if (!!ext) {return [{label: element, type:ext}]} else {return []}
                    }
                    )

                })
            )},
            range : (state) =>
            {
                const n = 1;

                return {
                    value: '0',
                    type: 'range',
                    name: "achievement-timeline",
                    title: 'Presentasjonstidslinje',
                    rangeMax: state.data.timeline.length - n,
                }
            },
        },  
});