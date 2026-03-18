import type { Collection } from "tinacms";

export const profileCollection: Collection = 
{
    name: "profiles",
    label: "Profiles",
    path: "content/profiles",
    fields: 
    [
        {
            name: "date",
            label: "Date",
            required: true,
            type: "datetime",
            ui: { dateFormat: 'DD-MM-YY'}
        },
        {
            name: "title",
            isTitle: true,
            type: "string",
            label: "Title",
            required: true
        },
        {
            isBody: true,
            required: true,
            type: "rich-text",
            name: "profile",
            label: "Profile information"
        },
        {
            required: true,
            type: "rich-text",
            name: "strength",
            label: "Mine styrker"
        },
        {
            required: true,
            type: "rich-text",
            name: "agile",
            label: "Smidige erfaringer"
        },
    ],
};