import React from "react";

import type { Options } from "../../types/tinacms";
import type { Collection, TinaField, Template } from "tinacms";


export const createTemplate = (name:string, label:string, fields: TinaField[]): Template => ({ name, label, fields });
export const createPage = (name:string, path:string, label:string, template: Template[]): Collection => ({
  name,
  path,
  label,
  templates: template,
  ui: {
    allowedActions: { create: false, delete: false },
    beforeSubmit: async ({ values }) => {
      return defaultImageCaptions(values);
    }
  }
});

export const createCollection = (name:string, path:string, label:string, fields:TinaField[], options: Options = {}): Collection => (
{
    name, path,  label, fields, ui: options.ui ? options.ui : undefined,
});

export const createObject = (name: string, label: string, description: string, fields: TinaField[]): TinaField => ({ name, label, type: "object", description: `f.eks ${description}`, fields });

export const createReferences = (name: string, label: string, collections: string, options: Options = {isRequired: false}): TinaField => ({
  name, label,
  type: "reference",
  collections: [collections],
  required: options.isRequired,
  description: `Legg til ${label} felt`
  
});
/**
 * Creates a standard field for TinaCMS.
 */
export const createField = ( name: string, label: string, description: string, options: Options = {}
): TinaField => ({
    name,
    label,
    type: options.isType ?? "string",
    isBody: options.isBody ?? false,
    isTitle: options.isTitle ?? false,
    description: description != "" ? `f.eks ${description}` : undefined,
    required: options.isRequired ?? false,
    ui: options.ui ?? undefined
});

/**
 * Creates a list of fields (array of objects or strings) for TinaCMS.
 */
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
                name,
                label,
                type: "string",
                description: description !== "" ? `f.eks ${description}` : undefined,
                options: fields as string[]
            };
            break;

        default:
            fieldDef = { 
                name, 
                label, 
                description: description !== "" ? `f.eks ${description}` : undefined, 
                type: type 
            };
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
                        //: item?.field ? item.field.split('/').pop().replace('.md', '').replace(/-/g, ' ')
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

            if (dependencyValue && !value) {
                return `${label} er påkrevd når bilde er valgt.`;
            }
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

    if (Array.isArray(obj)) {
        return obj.map(defaultImageCaptions);
    }

    const getFilename = (path: string) => {
        if (!path) return "";
        const base = path.split('/').pop() || "";
        const lastDot = base.lastIndexOf('.');
        const name = lastDot !== -1 ? base.substring(0, lastDot) : base;
        return name.replace(/-/g, ' ').replace(/_/g, ' ').trim();
    };

    const res: any = {};
    for (const key of Object.keys(obj)) {
        res[key] = defaultImageCaptions(obj[key]);
    }

    if (typeof res.upload === "string" && res.upload.trim() !== "") {
        if (!res.caption || typeof res.caption !== "string" || res.caption.trim() === "") {
            res.caption = getFilename(res.upload);
        }
    }

    if (typeof res.filePath === "string" && res.filePath.trim() !== "") {
        if (!res.caption || typeof res.caption !== "string" || res.caption.trim() === "") {
            res.caption = getFilename(res.filePath);
        }
    }

    return res;
};