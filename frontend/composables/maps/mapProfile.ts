
import { setDateFormat } from '#imports';

export const mapProfile = (data: any) => {
    if (!data) return [];
    return data.map((item: any) => {

        const date = setDateFormat({date: item.date});
        return {
            date: date,
            body: item.body,
            coop: item.coop,
            title: item.title ?? '',
            summary: item.summary,
        }
    });
};