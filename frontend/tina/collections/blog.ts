import type { Collection } from "tinacms";

export const blogCollection: Collection =
    {
    name: "posts",
    label: "Blog Posts",
    path: "content/posts",
    fields:
    [
        { name: "date", label: "Published", required: true, type: "datetime", ui: { dateFormat: 'DD-MM-YY' } },
        { name: "title", isTitle: true, type: "string", label: "Title", required: true },
        { required: true, name: "ingress", label: "Ingress", type: "rich-text" },
        { required: false, name: "status", type: "rich-text", label: "Dagens Aktiviteter og Status" },
        { isBody: true, name: "body", required: true, type: "rich-text", label: "Innholdet i Artikkelen", description: "Hovedinnhold i artikkelen, i star-parade formatet" },
        { required: false, name: "sources", type: "rich-text", label: "Kilde Henvisning" },
    ],
};