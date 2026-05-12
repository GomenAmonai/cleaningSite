"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure, SINGLETON_TYPES, SINGLETON_IDS } from "./sanity/structure";

export default defineConfig({
    basePath: "/studio",
    projectId,
    dataset,
    schema,
    plugins: [
        structureTool({ structure }),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
    document: {
        actions: (input, context) => {
            if (SINGLETON_TYPES.has(context.schemaType)) {
                return input.filter(
                    ({ action }) =>
                        action && !["unpublish", "delete", "duplicate"].includes(action)
                );
            }
            return input;
        },
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === "global") {
                return prev.filter(
                    (template) => !SINGLETON_IDS.has(template.templateId)
                );
            }
            return prev;
        },
    },
});
