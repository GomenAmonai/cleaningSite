import { defineType, defineField } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const SERVICE_ICON_OPTIONS = [
    "Building2",
    "Sparkles",
    "HardHat",
    "Wind",
    "Sofa",
    "Trash2",
    "Snowflake",
    "ShieldCheck",
    "Droplets",
    "Wrench",
] as const;

export const service = defineType({
    name: "service",
    title: "Услуга",
    type: "document",
    icon: SparklesIcon,
    fields: [
        defineField({
            name: "title",
            title: "Название",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Описание",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "icon",
            title: "Иконка",
            type: "string",
            options: {
                list: SERVICE_ICON_OPTIONS.map((v) => ({ title: v, value: v })),
                layout: "dropdown",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Порядок",
            type: "number",
            initialValue: 0,
        }),
        defineField({
            name: "image",
            title: "Изображение (опционально)",
            type: "image",
            options: { hotspot: true },
        }),
    ],
    orderings: [
        {
            title: "По порядку",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: { title: "title", subtitle: "icon" },
    },
});
