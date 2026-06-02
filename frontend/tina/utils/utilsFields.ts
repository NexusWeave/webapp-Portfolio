
import { techStack } from "../../utils/techStack";
import { createField, createListOfFields } from "./fields";

import type { TinaField} from "tinacms";

const commonFields: TinaField[] = 
[
    createField("title", "title", "Title of the document", { isTitle: true, isRequired: true }),
    createField("body", "Main Content", "document content", { isBody: true, isRequired: true, isType: "rich-text" })
]

export const academicFields: TinaField[] = 

[
    ...commonFields,
    createField("created", "Date", "Start Dato", {isType:'datetime', isRequired: true, ui: { dateFormat: 'MM-YY'}}),
    createField("end", "Date", "End Date", {isType:'datetime',  ui: { dateFormat: 'MM-YY'}}),
    createField("organization", "Name of the Organization", "Name of the Company / School ", { isRequired: true }),
    createField("org_link", "A link to the organization", "e.g. https://example.com"),
    createField("location", "Location of school", "(city, county, country) of the School"),
    createField("loc_link", "Location link", "a google maps link to the location (if possible)"),
    createField("references", "References", "A title of a reference (if any) (e.g. \"Doe, J. (2020). Title of the paper.\")"),
    createField("ref_link", "Reference link", "A link to the reference (if any) (e.g. https://example.com)"),
    createListOfFields("techStack", "Technologies", "Used technologies", techStack, {isOptions: true }),
    ];

export const blogFields: TinaField[] =  
[
    ...commonFields,
    createField("date", "Date", "Published", {isType:'datetime', isRequired: true, ui: { dateFormat: 'DD-MM-YY'}}),
    createField("ingress", "Ingress", "Ingress", { isRequired: true, type: "rich-text" }),
    createField("status", "Status", "Dagens Aktiviteter og Status", { type: "rich-text" }),
    createField("sources", "Sources", "Kilde Henvisning", { type: "rich-text" }),
    ];

export const referenceFields: TinaField[] = 
[
    ...commonFields,
    createField("link", "Link for the document", "e.g /media/document.pdf or https://example.com",  { isRequired: true }),
];

export const profileFields: TinaField[] = 
[
    ...commonFields,
    createField("date", "Date", "Published", {isType:'datetime', isRequired: true, ui: { dateFormat: 'DD-MM-YY'}}),
    createField("summary", "Introduksjons tekst", "", { isRequired: true, isType: "rich-text" }),
    createField("coop", "Smidige erfaringer", "", { isRequired: true, isType: "rich-text" }),
];
