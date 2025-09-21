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
        name: 'academic',
        ui: {global: true},
        path: 'content/academic',
        label: 'Academic component',
        fields:
        [
          {
            list: true,
            type: 'object',
            name: 'academic',
            label: 'Akademiske Hendelser',
            fields:
            [
              {
                name: "id",
                type: "number",
                label: "ID ",
                required: true,
                //ui: { component: null},
              },
              {
                name: "start",
                label: "Start Year",
                required: true,
                type: "datetime",
                ui: { dateFormat: 'YYYYY'}
              },
              {
                name: "end",
                type: "datetime",
                label: "End Year",
                ui: { dateFormat: 'YYYYY'}
              },
              {
                label: "Name",
                type: "string",
                name: "institution",
                description: "Name of the institution"
              },
              {
                name: "institution_link",
                label: "Link",
                type: "string",
                description: "Link to institution"
              },
              {
                isTitle: true,
                name: "title",
                required: true,
                label: "Title",
                type: "string",
                description: "Title of the Subject"
              },
              {
                name: "body",
                isBody: true,
                required: true,
                label: "Summary",
                type: "rich-text"
              },
              {
                type: "string",
                name: "location",
                label: "Location",
                description: "Location of institution"
              },
              {
                name: "loc_link",
                label: "Link",
                type: "string",
                description: "Link to institution location"
              },
                            {
                type: "string",
                name: "references",
                label: "References",
                description: "Title of the reference "
              },
              {
                name: "ref_link",
                label: "Link",
                type: "string",
                description: "Link to reference"
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
        format: 'json',
        name: 'achievements',
        path: 'content/achievement',
        label: 'Achevements Component',
        ui: {global: true},
        fields:
        [
          {
            label: 'Presentasjons Hendelser',
            name: 'achievement_timeline',
            type: 'object',
            list: true,
            fields:
            [
              {
                name: "date",
                label: "Year",
                required: true,
                type: "datetime",
                ui: { dateFormat: 'YYYYY'}
              },
              {
                label: "Name",
                type: "string",
                name: "institution",
                description: "Name of the institution"
              },
              {
                isTitle: true,
                name: "title",
                required: true,
                label: "Title",
                type: "string",
                description: "Title of the Subject"
              },
              {
                name: "body",
                isBody: true,
                required: true,
                label: "Summary",
                type: "rich-text"
              },
              {
                list: true,
                name: "tech",
                type: "string",
                options: techStack,
                label: "Technologies",
              }
            ]
          }
          
        ],
      },
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
                description: "Name of the institution"
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
            label: "Profile information",
            required: true,
            type: "rich-text",
            name: "profile_info",
            description: "A short but, describeful insight"
          },
          {
            required: true,
            label: "Deeper Dig ",
            type: "rich-text",
            name: "deeper_info",
            description: "krigjo25 History"
          },
          {
            required: true,
            label: "History",
            type: "rich-text",
            name: "history",
            description: "krigjo25 History"
          },
        ],
      },
      {
        name: "dev",
        label: "Dev-profile",
        path: "content/dev",
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
            name: "backend_profile",
            label: "Backend profile"
          },
          {
            isBody: true,
            required: true,
            type: "rich-text",
            name: "frontend_profile",
            label: "Frontend profile"
          },
          {
            isBody: true,
            required: true,
            type: "rich-text",
            name: "learning_journey",
            label: "My learning journey"
          },
        ],
      },
      {
        name: "posts",
        label: "Blog Posts",
        path: "content/blog_posts",
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
            name: "date",
            label: "Date",
            required: true,
            type: "datetime"
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
            isBody: true,
            required: true,
            type: "rich-text",
            name: "intro",
            label: "Introduction"
          },
          {
            isBody: true,
            required: true,
            type: "rich-text",
            name: "challanges_model",
            label: "STAR-model"
          },
        ],
      }
    ],
  },
});
