import { techStackMap } from './techStack';
import type { TechStack } from '~/types/timeline';

export function fetchTechType(array: string[] | undefined): TechStack[]
{
    const JAMstack:Array<TechStack> = []

    array?.forEach( (item) => 
    {
        if (!item || item.trim() === '') return; 
        let key: string | string[] = item.toUpperCase();

        const techMap = techStackMap.reduce((map, obj) => { obj.codes.forEach(code => { map[code.toUpperCase()] = obj.name.toUpperCase(); }); return map; }, {} as Record<string, string>);
        const category = techMap[key];

        try { if (!category) throw new Error(`TechUtils - No category found for key: ${key}`); } catch (error) { console.error(error); }

        if(category) { const obj: TechStack = { label: key ?? 'N/A', category: category }; JAMstack.push(obj); }
        //console.log("--- TechUtils ---")
        //console.log(category, key, item);
    });

    return JAMstack;
}