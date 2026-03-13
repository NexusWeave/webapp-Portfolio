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
            label: "Published",
            required: true,
            type: "datetime",
            ui: { dateFormat: 'DD-MM-YY'}
        },
        {
            name: "current",
            label: "Updated",
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
            label: "Profile information (Backend, Frontend or Journey )"
        },
    ],
};