import { defineConfig} from "tinacms";

//  Imports of collections
import { academicCollection, blogCollection, referenceCollection } from "./collections/collections";
import { profileCollection } from "./collections/profiles";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.TINA_BRANCH || "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,

  build: { outputFolder: "admin", publicFolder: "/public" },
  media: { tina: { mediaRoot: "/media", publicFolder: "public" } },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      blogCollection,
      profileCollection,
      academicCollection,
      referenceCollection
    ],
  },
});
