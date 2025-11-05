// tina/config.ts
import { defineConfig } from "tinacms";

// utils/tagStack.ts
var tagsOptions = [
  "news",
  "dev-journey"
];

// tina/collections/blog.ts
var blogCollection = {
  name: "posts",
  label: "Blog Posts",
  path: "content/posts",
  fields: [
    {
      name: "created",
      label: "Published",
      required: true,
      type: "datetime",
      ui: { dateFormat: "DD-MM-YY" }
    },
    {
      name: "current",
      label: "Updated",
      type: "datetime",
      ui: { dateFormat: "DD-MM-YY" }
    },
    {
      list: true,
      name: "tags",
      label: "Tags",
      type: "string",
      options: tagsOptions
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
      name: "main",
      required: true,
      type: "rich-text",
      label: "Main text"
    },
    {
      isBody: true,
      required: true,
      type: "rich-text",
      name: "star",
      label: "STAR - Modell"
    }
  ]
};

// tina/collections/profiles.ts
var profileCollection = {
  name: "profiles",
  label: "Profiles",
  path: "content/profiles",
  fields: [
    {
      name: "created",
      label: "Published",
      required: true,
      type: "datetime",
      ui: { dateFormat: "DD-MM-YY" }
    },
    {
      name: "current",
      label: "Updated",
      type: "datetime",
      ui: { dateFormat: "DD-MM-YY" }
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
    }
  ]
};

// utils/techStack.ts
var python = [
  "FLASK.PY",
  "DJANGO.PY",
  "PY-CORD.PY",
  "PANDAS.PY",
  "NUMPY.PY",
  "MATPLOTLIB.PY"
];
var cs = [
  "CS",
  "C",
  "C++",
  "NET",
  "ASPNET",
  "ENTITY FRAMEWORK"
];
var TypeScript = [
  "VUE.TS",
  "NUXT.TS",
  "REACT.TS",
  "TYPESCRIPT"
];
var javascript = [
  "VUE.JS",
  "JAVASCRIPT"
];
var workFlow = [
  "CMS",
  "GITHUB",
  "SASS",
  "AGILE",
  "GIT"
];
var rationalDB = [
  "MSSQL",
  "MYSQL",
  "SQLITE",
  "POSTGRESQL",
  "MARIADB"
];
var styling = [
  "CSS",
  "BOOTSTRAP"
];
var markup = [
  "MARKDOWN",
  "LATEX",
  "HTML"
];
var techStack = [
  ...cs,
  ...python,
  ...markup,
  ...styling,
  ...workFlow,
  ...javascript,
  ...rationalDB,
  ...TypeScript
];

// tina/collections/academic.ts
var academicCollection = {
  name: "achievements",
  label: "Presentasjon",
  path: "content/achievements",
  fields: [
    {
      name: "created",
      required: true,
      label: "Date",
      type: "datetime",
      ui: { dateFormat: "MM-YY" }
    },
    {
      name: "end",
      type: "datetime",
      label: "Project or school status last update",
      ui: { dateFormat: "MM-YY" }
    },
    {
      required: true,
      type: "string",
      name: "organization",
      label: "Name of the Organization",
      description: "e.g. University, Company"
    },
    {
      type: "string",
      name: "org_link",
      label: "A link to the organization",
      description: "E.g. https://example.com"
    },
    {
      isTitle: true,
      name: "title",
      required: true,
      label: "Title of the Subject",
      type: "string",
      description: "E.g. Bachelor of Science in Computer Science / organization name"
    },
    {
      type: "string",
      name: "location",
      label: "Location of school",
      description: "(city, county, country) of the School"
    },
    {
      name: "loc_link",
      label: "Location link",
      type: "string",
      description: "a google maps link to the location (if possible)"
    },
    {
      type: "string",
      name: "references",
      label: "References",
      description: 'A title of a reference (if any) (e.g. "Doe, J. (2020). Title of the paper.")'
    },
    {
      name: "ref_link",
      label: "Reference link",
      type: "string",
      description: "A link to the reference (if any) (e.g. https://example.com)"
    },
    {
      list: true,
      name: "techStack",
      type: "string",
      options: techStack,
      label: "Technologies which were used in project / school"
    },
    {
      name: "body",
      isBody: true,
      required: true,
      label: "Summary",
      type: "rich-text"
    }
  ]
};

// tina/collections/reference.ts
var referenceCollection = {
  name: "quotes",
  label: "Reference Quotes",
  path: "content/quotes/references",
  fields: [
    {
      name: "title",
      isTitle: true,
      type: "string",
      required: true,
      label: "Company Name",
      description: "Company Name (e.g. Reference OlaNorman AS )"
    },
    {
      name: "link",
      type: "string",
      required: true,
      label: "Link to reference",
      description: "A link to the reference (if any) (e.g. https://example.com) )"
    },
    {
      name: "quote",
      type: "string",
      label: "Quote",
      required: true,
      description: "The author of the quote"
    }
  ]
};

// tina/config.ts
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "../public"
  },
  media: {
    tina: {
      mediaRoot: "/media",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "about",
        label: "About Krigjo25",
        path: "content/about",
        fields: [
          {
            name: "created",
            label: "Published",
            required: true,
            type: "datetime",
            ui: { dateFormat: "DD-MM-YY" }
          },
          {
            name: "current",
            label: "Updated",
            type: "datetime",
            ui: { dateFormat: "DD-MM-YY" }
          },
          {
            isTitle: true,
            name: "title",
            required: true,
            type: "string",
            label: "Title",
            description: "Page Title"
          },
          {
            isBody: true,
            label: "Profile information (Profile info, Deeper insight, Journey, etc.)",
            required: true,
            type: "rich-text",
            name: "profile_info",
            description: "A short but, describeful insight"
          }
        ]
      },
      blogCollection,
      profileCollection,
      academicCollection,
      referenceCollection
    ]
  }
});
export {
  config_default as default
};
