import { createCollection } from "../utils/fields";
import { academicFields, blogFields, profileFields, referenceFields } from "../utils/utilsFields";

import type { Collection } from "tinacms";
export const profileCollection: Collection = createCollection("profiles", "content/profiles", "Profile", profileFields );
export const academicCollection: Collection = createCollection("achievements", "content/achievements", "Presentasjon", academicFields);
export const referenceCollection: Collection = createCollection("references", "content/references", "Reference Quotes", referenceFields);
export const blogCollection: Collection = createCollection("posts", "content/posts", "Blog Posts", blogFields, {ui: { beforeSubmit: async({values}) => { return { ...values, date: values.date ?? new Date().toISOString(), }} }});
