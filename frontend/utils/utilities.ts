import { techStackMap } from '../utils/techstack';
import type { TechStack } from '~/types/timeline';

export function fetchTechType(array: string[] | undefined): TechStack[]
    {
        const JAMstack:Array<TechStack> = []

        array?.forEach( (item) => 
        {
            if (!item || item.trim() === '') return;

            let key: string | string[] = item.toUpperCase();//.split('.');

            const techMap = techStackMap.reduce((map, obj) => {
                obj.codes.forEach(code => {
                    map[code] = obj.name;
                });
                return map;
            }, {} as Record<string, string>);

            const category = techMap[key];
            key = key.split('.');
            //console.error("Key:", key, category);

            if (key[0] === '') key = key[1] || key;
            else key = key[0] || key;
            
            if(category)
            {

                const obj: TechStack = {
                    label: key || 'N/A',
                    type: category,
                }
                JAMstack.push(obj);
            }
            else
            {
                console.error(`Unknown technology code: ${item}`);
            }
        });
        
        return JAMstack;
    }