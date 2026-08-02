
import { setDateFormat } from '#imports';

import type { Profile } from '~/types/maps';
import type { DateItem } from '~/types/date';
import type { ProfileInfoCollectionItem } from '@nuxt/content';


export const mapProfile = (data: ProfileInfoCollectionItem[]): Profile[] => {
    if (!data) return [];

    return data.map((item: any) => {

        const date = setDateFormat({date: item.date});
        return {
            date: date,
            id: item.id,
            body: item.body,
            coop: item.coop,
            stem: item.stem,
            path: item.path,
            summary: item.summary,
            title: item.title ?? "",
        }
    });
};