import { defineConfig} from "tinacms";
import { techStack} from "../utils/techstack"
//import { geberateHex } from 'utils/';
// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const tagsOptions = [
  "news",
  "dev-journey",
]
const counter = 0;

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/media",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        format: 'json',
        name: 'portfolio',
        path: 'content/portfolio',
        label: 'Portefolio Component',
        ui: {global: true},
        fields:
        [
          {
            label: 'Project',
            name: 'portfolio',
            type: 'object',
            list: true,
            fields:
            [
              {
                name: "created",
                label: "Project Initialized",
                required: true,
                type: "datetime",
                ui: { dateFormat: 'DD-MM-YY'}
              },
              {
                name: "current",
                label: "Project current",
                type: "datetime",
                ui: { dateFormat: 'DD-MM-YY'}
              },
              {
                label: "Name",
                type: "string",
                name: "name",
                description: "Name of the organization"
              },
              {
                isTitle: true,
                name: "href",
                required: true,
                label: "Link",
                type: "string",
                description: "Link to the webpage \"https://example.com\""
              },

              {
                name: "body",
                isBody: true,
                required: true,
                label: "Description",
                type: "rich-text"
              },
              {
                list:true,
                name: "list",
                type: "string",
                label: "Summary",
              },
              {
                list: true,
                name: "tech",
                type: "string",
                options: techStack,
                label: "Technologies",
              }, 
            ]
          }
          
        ],
      },
      {
        name: "about",
        label: "About Krigjo25",
        path: "content/about",
        fields:
        [
          {
            name: "created",
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
          },
        ],
      },
      {
        name: "achievements",
        label: "Presentasjon",
        path: "content/achievements",
        fields:
        [
          {
            name: "tag",
            type: "string",
            options: ['Academic', 'Achievement'],
            label: "Technologies which were used in project / school",
            ui: { component: 'select' },
          },
          {
            name: "created",
            required: true,
            label: "Date",
            
            type: "datetime",
            ui: { dateFormat: 'MM-YY'}
          },
          {
            name: "updated",
            type: "datetime",
            label: "Project or school status last update",
            ui: { dateFormat: 'MM-YY'}
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
            description: "A title of a reference (if any) (e.g. \"Doe, J. (2020). Title of the paper.\")"
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
            label: "Technologies which were used in project / school",
          },
          {
            name: "body",
            isBody: true,
            required: true,
            label: "Summary",
            type: "rich-text"
          },
        ],
      },
      {
        name: "profiles",
        label: "Profiles",
        path: "content/profiles",
        fields: [
          {
            name: "created",
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
      },
      {
        name: "posts",
        label: "Blog Posts",
        path: "content/posts",
        fields:
        [
          {
            name: "created",
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
          },
        ],
      }
    ],
  },
});
