import type { Collection } from "tinacms";

export const blogCollection: Collection =
    {
    name: "posts",
    label: "Blog Posts",
    path: "content/posts",
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
            name: "title",
            isTitle: true,
            type: "string",
            label: "Title",
            required: true
        },
        {
            required: true,
            name: "ingress",
            label: "Ingress",
            type: "rich-text"
        },
        {
            isBody: true,
            name: "body",
            required: false,
            type: "rich-text",
            label: "Main text"
        },
        {
            name: "parade",
            required: false,
            type: "rich-text",
            label: "PARADE-Model"
        },
        {
            required: false,
            type: "rich-text",
            name: "star",
            label: "STAR - Modell"
        },
        {
            required: false,
            type: "rich-text",
            name: "sources",
            label: "Kilde Henvisning"
        },
    ],
};