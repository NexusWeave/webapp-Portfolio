import type { DateItem } from "./date";

export interface Profile
{
    id: string;
    path: string;
    coop: string;
    stem: string;
    title: string;
    summary: string;
    body: Record<any, any>;
    date: DateItem | undefined;
}