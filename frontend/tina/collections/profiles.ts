import type { Collection } from "tinacms";

export const profileCollection: Collection = 
{
    name: "profiles",
    label: "Profiles",
    path: "content/profiles",
    fields: 
    [
        { name: "date", label: "Date", required: true, type: "datetime", ui: { dateFormat: 'DD-MM-YY'} },
        { name: "title", isTitle: true, type: "string", label: "Title", required: true },
        {
            required: true,
            name: "summary",
            type: "rich-text",
            label: "Introduksjons tekst"
        },
        { isBody: true, name: "body", required: true, type: "rich-text", label: "Profile information" },
        {
            name: "coop",
            required: true,
            type: "rich-text",
            label: "Smidige erfaringer"
        },
    ],
};