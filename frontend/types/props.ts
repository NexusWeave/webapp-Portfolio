//  Props Definitions

import type { AcademicCollectionItem } from "@nuxt/content";

export interface DateYearProps
    {
        isVisible?: boolean;
        data: {
            created: Date | string;
            end?: Date | string;
            updated?: Date | string | null;
        };
    }

export interface TimelineProps
{
    title: string;
        range?: number;
        cls?: Array<any>;
        data: AcademicCollectionItem[];
}