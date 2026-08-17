# Portfolio Web Application Analysis

This document provides a comprehensive overview of the `webapp-Portfolio` repository located at `/mnt/data/Repository/webapps/webapp-Portfolio/`. It serves as a guide detailing the technological stack, system architecture, directory structures, and setup instructions required to understand or recreate this web application.

## 1. High-Level Architecture

The application is a full-stack, decoupled architecture utilizing a modern JavaScript framework for the frontend and an asynchronous Python framework for the backend.
It is completely containerized via Docker and orchestrated using Docker Compose.

- **Frontend:** Nuxt 4 (Vue 3, TypeScript) utilizing Server-Side Rendering (SSR) and Static Site Generation (SSG).
- **Backend:** FastAPI offering asynchronous REST APIs.
- **Database:** PostgreSQL (with `asyncpg` and SQLAlchemy for ORM).

---

## 2. Frontend Details

The frontend is housed entirely within the `frontend/` directory.

### Tech Stack
- **Core Framework:** Nuxt 4, Vue 3, TypeScript
- **State Management:** Pinia (`@pinia/nuxt`)
- **Styling:** Custom Sass (`lumina-sass`, compiled with `sass` package).
- **Content Management:** TinaCMS combined with Nuxt Content (`@nuxt/content`) for a Git-backed content editing workflow.
- **Other Notable Nuxt Modules:** `@nuxt/image`, `@nuxt/fonts`, `@nuxtjs/sitemap`, `@nuxt/eslint`, `nuxt-gtag`
- **Testing:** Vitest (`vitest`, `@vue/test-utils`) and Sass validation (custom tests using `sass-true`).

### Structure Overview
- `nuxt.config.ts`: Configuration file establishing static site generation for specified routes (like `/logs/records/**`), setting Vite aliases, and enabling SSR.
- `package.json`: Outlines all dependencies and custom NPM scripts (`dev`, `build`, `serve`, `test`).
- `components/`: Contains modular Vue components organized by feature (e.g., `article`, `navigation`, `layout`, `Dates`, `form`, `media`, `repository`, `timeline`).
- `pages/`: The core route views, including `index.vue`, `dev.vue`, `personal.vue`, `security-policy.vue`, and a dynamic `logs/` directory.
- `sass/`: Modular style architecture containing `index.sass` and utility mixins.
- `stores/`: Contains Pinia state management configurations.
- `content/` & `tina/`: Content modeling and Git-based Markdown files used alongside TinaCMS.

---

## 3. Backend Details

The backend is housed entirely within the `backend/` directory.

### Tech Stack
- **Core Framework:** FastAPI (`fastAPI[standard]`), run on `uvicorn`.
- **Database & ORM:** `SQLAlchemy`, `asyncpg`, `aiosqlite`
- **Data Validation & Settings:** `Pydantic` and `pydantic-settings`
- **Web Scraping / API Interfacing:** `httpx`, `beautifulsoup4`, `lxml`
- **Testing:** `pytest`, `pytest-cov`, `pytest-asyncio`

### Structure Overview
- `app.py`: The entry point establishing the FastAPI app, loading environment settings, configuring loggers, and registering routers (e.g., `GithubService`, `HealthService`, and an AI scraping specialist endpoint).
- `requirements.in` / `requirements.txt`: Manages dependencies using `pip-tools`.
- `pyproject.toml`: Manages testing variables (`pytest`, coverage) and commit styles (`commitizen`).
- `lib/`: The core logic directory containing:
  - `database/`: DB initialization and connection pooling.
  - `models/`: SQLAlchemy ORM definitions and Pydantic schemas.
  - `services/`: Business logic, such as `scanner`, `health`, and `github`.
  - `settings/`: Environment variable and internal configuration management.
  - `utils/`: Reusable utilities, specifically logging configurations (`AppWatcher`).
- `tests/`: Integration and unit test configurations.

---

## 4. Orchestration & Deployment

The repository operates its services efficiently using Docker containers.

### Docker Compose Configuration
The `docker-compose.yml` situated in the root sets up two central services:
1. **Frontend (`frontend-container`)**:
   - Built from `./frontend`
   - Bound to port `3002` (mapped from `3000` internal).
   - Ingests the root `.env` file.
2. **Backend (`backend-container`)**:
   - Built from `./backend`
   - Bound to port `8080`.
   - Volumes mapped for live-reload (`.:/app`).
   - Env variables configured for Python (`PYTHONUNBUFFERED`, `PYTHONDONTWRITEBYTECODE`).

---

## 5. Core Configuration Files

To guarantee exact replication, here are the configurations for Nuxt, Nuxt Content, and TinaCMS.

### Nuxt Config (`frontend/nuxt.config.ts`)
```typescript
// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const srcDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  ssr:true,
  dir: { public:'public' },
  compatibilityDate: '2025-07-15',
  experimental: { payloadExtraction: false},
  vite: { resolve: { alias: {'$src': `${srcDir}`,} } },
  routeRules: { '/logs/records/**': { prerender: true } },
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  css: [ `~/sass/index.sass`, 'bootstrap-icons/font/bootstrap-icons.css' ],
  site: { url: 'https://krigjo25.no', name: 'Portfolio - Kristoffer Gjøsund' },
  runtimeConfig:{ public:{ GCLOUD: process.env.GOOGLE_CLOUD || "http://0.0.0.0:8000/" } },
  sitemap: { autoLastmod: true, includeAppSources:true, exclude: [ '/admin/**' ], sources: ['/api/log-urls'], defaults: { priority: 0.9, changefreq: 'daily'} },
  nitro: { preset: 'static', prerender: { crawlLinks: true, routes: ['/sitemap.xml', '/', '/security-policy', '/dev', '/personal', '/logs', '/media/docs/CV-Kristoffer-Gjøsund.pdf'], ignore: [ '/logs/records/.gitkeep', '**/.gitkeep', '**/.DS_Store'] } },

  modules: [
    'nuxt-gtag',
    '@nuxt/fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
   hooks: {
    async 'nitro:config'(nitroConfig) {
      async function getRoutes(dir: string): Promise<string[]> {
        const entries = await readdir(dir, { withFileTypes: true })
        const routes: string[] = []
        for (const entry of entries) {
          if (entry.isDirectory()) {
            routes.push(...await getRoutes(join(dir, entry.name)))
          } else if (entry.name.endsWith('.md')) {
            const slug = entry.name.replace(/\.md$/, '').toLowerCase()
            routes.push(`/logs/records/${slug}`)
          }
        }
        return routes
      }

      try {
        const routes = await getRoutes(join(srcDir, 'content', 'posts'))
        nitroConfig.prerender ??= {}
        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes ?? []),
          ...routes
        ]
      } catch (e) {
        console.warn('[prerender] An error occured with the content directory:', e)
      }
    }
  },
  app: {head : {title: 'Portefølje - Kristoffer Gjøsund(krigjo25)', viewport: 'width=device-width, initial-scale=1', htmlAttrs: { lang: 'no' }, meta: [{name:'description', content:'Portefølje side for Kristoffer Gjøsund'}, {charset:'utf-8'}], link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]}}
})
```

### Nuxt Content Config (`frontend/content.config.ts`)
```typescript
//  --- Imports & Zod Schema Definitions
import { z } from 'zod';
import { defineCollection, defineContentConfig } from '@nuxt/content';

const referencesCollection = z.object({ link: z.string(), title: z.string(), body: z.strictObject({}), });

const achievementsCollection = z.object({
    title: z.string(),
    created: z.any().optional(),
    isVisible: z.boolean().optional(),
    org_link: z.string().optional(),
    body: z.strictObject({}).optional(),
    end: z.any().optional(),
    location: z.string().optional(),
    loc_link: z.string().optional(),
    references: z.string().optional(),
    ref_link: z.string().optional(),
    subjects: z.array(z.object({
        title: z.string(),
        body: z.string().optional(),
        created: z.any().optional(),
        end: z.any().optional(),
        techStack: z.array(z.string()).optional(),
        ref_link: z.string().optional(),
    })).optional(),
    techStack: z.array(z.string()).optional(),
});

const blogCollection = z.object({
    date: z.string(),
    title: z.string(),
    body: z.strictObject({}),
    ingress: z.string(),
    image: z.string().optional(),
    status: z.string().optional(),
    sources: z.string().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        keywords: z.array(z.string()).optional()
    }).optional()
})

const profileInformationCollection = z.object({ id: z.string(), date: z.string(), title: z.string(), coop: z.string(), summary: z.string(), path: z.string(), stem: z.string(), body: z.strictObject({}) })

// defineContentConfig & collections definition
export default defineContentConfig({
  collections: 
  {
    'reference': defineCollection( { type: 'data', schema: referencesCollection, source: 'references/*.md' }),
    'devPosts': defineCollection( { type: 'page', schema: blogCollection, source: 'posts/**/*.md', }),
    'academic': defineCollection( { type: 'data', schema: achievementsCollection, source: 'timeline/*.md' }),
    'timeline': defineCollection( { type: 'data', schema: achievementsCollection, source: 'timeline/*.md' }),
    'profileInfo': defineCollection( { type: 'page', schema: profileInformationCollection, source: 'profiles/*.md' }),
  
    // 'content' Standard Collection definition
    content: defineCollection({ type: 'page', source: '**/*.md', }),
  },
});
```

### TinaCMS Main Configuration (`frontend/tina/config.ts`)
```typescript
import { defineConfig} from "tinacms";
import { timelineCollection, blogCollection, referenceCollection, profileCollection } from "./collections/collections";

const branch = process.env.TINA_BRANCH || "main";

export default defineConfig({
  branch,
  token: process.env.TINA_TOKEN, clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  build: { outputFolder: "admin", publicFolder: "/public" },
  media: { tina: { mediaRoot: "/media", publicFolder: "public" } },
  schema: {
    collections: [
      blogCollection,
      profileCollection,
      timelineCollection,
      referenceCollection
    ],
  },
});
```

### TinaCMS Collections Definitions (`frontend/tina/collections/collections.ts`)
```typescript
import { createCollection } from "../utils/fields";
import { timelineFields, blogFields, profileFields, referenceFields } from "../utils/utilsFields";

import type { Collection } from "tinacms";
export const profileCollection: Collection = createCollection("profiles", "content/profiles", "Profile", profileFields );
export const timelineCollection: Collection = createCollection("timeline", "content/timeline", "Presentasjon", timelineFields);
export const referenceCollection: Collection = createCollection("references", "content/references", "Reference Quotes", referenceFields);
export const blogCollection: Collection = createCollection("posts", "content/posts", "Blog Posts", blogFields, {ui: { beforeSubmit: async({values}) => { return { ...values, date: values.date ?? new Date().toISOString(), }} }});
```

### TinaCMS Schema Fields Helper Definitions (`frontend/tina/utils/utilsFields.ts`)
```typescript
import { techStack } from "../../utils/techStack";
import { createField, createListOfFields } from "./fields";

import type { TinaField} from "tinacms";

const commonFields: TinaField[] = 
[
    createField("title", "Title", "Title of the document e.g company name", { isTitle: true, isRequired: true }),
    createField("body", "Main Content", "document content", { isBody: true, isRequired: true, isType: "rich-text" })
]

const subjectFields: TinaField[] =
[
    ...commonFields,
    createField("created", "Date", "Start Dato", {isType:'datetime', isRequired: true, ui: { dateFormat: 'MM-YY'}}),
    createField("end", "Date", "End Date", {isType:'datetime',  ui: { dateFormat: 'MM-YY'}}),
    createField("ref_link", "Reference link", "A link to the reference (if any) (e.g. https://example.com)"),
    createListOfFields("techStack", "Technologies", "Used technologies", techStack, {isOptions: true })
]
export const timelineFields: TinaField[] = 
[
    ...commonFields,
    createField("org_link", "A link to the organization", "e.g. https://example.com"),
    createListOfFields("subjects", "Subjects / Title", "", subjectFields ),
    createField("location", "Location of school", "(city, county, country) of the School"),
    createField("loc_link", "Location link", "a google maps link to the location (if possible)"),
    
    createListOfFields("techStack", "Technologies", "Used technologies", techStack, {isOptions: true }),
    
    ];

export const blogFields: TinaField[] =  
[
    ...commonFields,
    createField("date", "Date", "Published", {isType:'datetime', isRequired: true, ui: { dateFormat: 'DD-MM-YY'}}),
    createField("ingress", "Ingress", "Ingress", { isRequired: true, isType: "rich-text" }),
    createField("status", "Status", "Dagens Aktiviteter og Status", { isType: "rich-text" }),
    createField("sources", "Sources", "Kilde Henvisning", { isType: "rich-text" }),
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
```

### TinaCMS Low-level Fields Utilities (`frontend/tina/utils/fields.tsx`)
```typescript
import React from "react";

import type { Options } from "../../types/tinacms";
import type { Collection, TinaField, Template } from "tinacms";

export const createTemplate = (name:string, label:string, fields: TinaField[]): Template => ({ name, label, fields });
export const createPage = (name:string, path:string, label:string, template: Template[]): Collection => ({
  name, path, label,
  templates: template,
  ui: { allowedActions: { create: false, delete: false }, beforeSubmit: async ({ values }) => { return defaultImageCaptions(values); }
  }
});

export const createCollection = (name:string, path:string, label:string, fields:TinaField[], options: Options = {}): Collection => ( 
{ name, path,  label, fields, ui: options.ui ? options.ui : undefined });

export const createObject = (name: string, label: string, description: string, fields: TinaField[]): TinaField => ({ name, label, type: "object", description: `f.eks ${description}`, fields });

export const createReferences = (name: string, label: string, collections: string, options: Options = {isRequired: false}): TinaField => ({
  name, label,
  type: "reference",
  collections: [collections],
  required: options.isRequired,
  description: `Legg til ${label} felt`
  
});
export const createField = ( name: string, label: string, description: string, options: Options = {}): TinaField => ({
    name, label,
    ui: options.ui ?? undefined,
    type: options.isType ?? "string",
    isBody: options.isBody ?? false,
    isTitle: options.isTitle ?? false,
    description: description != "" ? `f.eks ${description}` : undefined,
    required: options.isRequired ?? false
});

export const createListOfFields = (name: string, label: string, description: string, fields: TinaField[] | string[], options: Options = {placeholder: "Tomt Felt",isRequired: false, isType: "object"}): TinaField => {
    let fieldDef: any;
    const type = options.isOptions ? "options" : (options.isType || "object");

    switch (type)
    {
        case "object":
            fieldDef = createObject(name, label, description, fields as TinaField[]);
            break;

        case "options":
            fieldDef = {
                name, label, type: "string",
                options: fields as string[],
                description: description !== "" ? `f.eks ${description}` : undefined
            };
            break;

        default:
            fieldDef = { name, label, type: type, description: description !== "" ? `f.eks ${description}` : undefined };
            break;
    }
    
    return {
        ...fieldDef,
        list: true,
        ui: {
            itemProps: (item: any) => {
                return {
                    label: item?.fname && item?.lname && item?.role ? `${item.fname} ${item.mname?.charAt(0)?.trim() || ''} ${item.lname} - ${item.role}`.trim()
                        : item?.cname && item?.name ? `${item.cname} - ${item.name}`.trim()
                        : handleAuthorName(item.name) ? handleAuthorName(item.name)
                        : item?.title ? `${item.title} `
                        : item?.filePath ? item.filePath.split('/').pop().replace('.md', '').replace(/-/g, ' ')
                        : item?.path ? item.path.split('/').pop().replace('.md', '').replace(/-/g, ' ')
                        : `Tomt ${options.placeholder || "Felt"} felt`
                };
            }
        }
    } as TinaField;
};

export const createConditionalField = (name: string, label: string, description: string, options: Options = {isRequired: false, dependsOn: "filePath"}): TinaField => ({
    type: "string",
    name,
    label,
    description,
    ui: {
        validate: (value: any, allValues: any, _meta: any, field: any) => {
            if (!options.isRequired || !options.dependsOn) return;

            const parts = field.name.split(".");
            const prefix = parts.slice(0, -1).join(".");
            const fullPath = prefix ? `${prefix}.${options.dependsOn}` : options.dependsOn;

            const dependencyValue = fullPath.split('.').reduce((obj: any, key: string) => obj?.[key], allValues);

            if (dependencyValue && !value) { return `${label} is required when ${options.dependsOn} is set`; }
        },
        component: (props: any) => {
            const { input, form, field } = props;

            if (!options.dependsOn) return null;

            const parts = input.name.split(".");
            const prefix = parts.slice(0, -1).join(".");
            const fullPath = prefix ? `${prefix}.${options.dependsOn}` : options.dependsOn;

            const dependencyState = form.getFieldState(fullPath);
            const dependencyValue = dependencyState?.value || form.getFieldState(options.dependsOn)?.value;

            if (!dependencyValue) return null;

            return React.createElement("div", { className: "mb-4" }, 
                React.createElement("label", { className: "block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1" }, 
                    field.label, 
                    options.isRequired && React.createElement("span", { className: "text-red-500" }, "*")
                ),
                React.createElement("input", {
                    ...input,
                    placeholder: field.label,
                    className: "block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                }),
                field.description && React.createElement("p", { className: "mt-1 text-xs text-gray-500 italic" }, field.description)
            );
        }
    }
});

const handleAuthorName = (path: string) => 
{
    if (!path) return;

    const filename =  path.split('/').pop()?.replace('.md', '');
    if (!filename) return path;

    const parts = filename.split(/[- ]/);
    const first = parts[0];
    
    if (parts.length <= 1) return filename

    const rest = parts.map(p => p.charAt(0).toUpperCase() + '.').slice(1).join(" ");

    return `${first} ${rest}`
}

const defaultImageCaptions = (obj: any): any => {
    if (!obj || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) { return obj.map(defaultImageCaptions); }

    const getFilename = (path: string) => {
        if (!path) return "";
        const base = path.split('/').pop() || "";
        const lastDot = base.lastIndexOf('.');
        const name = lastDot !== -1 ? base.substring(0, lastDot) : base;
        return name.replace(/-/g, ' ').replace(/_/g, ' ').trim();
    };

    const res: any = {};
    for (const key of Object.keys(obj)) { res[key] = defaultImageCaptions(obj[key]); }

    if (typeof res.upload === "string" && res.upload.trim() !== "") {
        if (!res.caption || typeof res.caption !== "string" || res.caption.trim() === "") { res.caption = getFilename(res.upload); }
    }

    if (typeof res.filePath === "string" && res.filePath.trim() !== "") {
        if (!res.caption || typeof res.caption !== "string" || res.caption.trim() === "") { res.caption = getFilename(res.filePath); }
    }

    return res;
};
```

---

## 6. Instructions for Recreating or Running the App

### Using Docker (Recommended Method)
This is the fastest method to ensure dependencies and databases align perfectly.
1. Make sure you have Docker and Docker Compose installed.
2. Clone or navigate to the repository root `/mnt/data/Repository/webapps/webapp-Portfolio/`.
3. Create a `.env` file referencing required environment keys.
4. Run:
   ```bash
   docker compose up --build
   ```

### Local Development (Manual Spawns)

**Backend:**
1. Navigate to `backend/`.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Uvicorn server:
   ```bash
   uvicorn app:app --reload --port 8080
   ```

**Frontend:**
1. Navigate to `frontend/`.
2. Ensure Node.js (version 24 LTS recommended) is running.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

*(By default, the Nuxt frontend will be available at `http://localhost:3000`, while the API will be exposed on `http://localhost:8080`)*
