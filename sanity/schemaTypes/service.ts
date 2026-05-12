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
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Изображение (опционально)",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroImage",
            title: "Hero-изображение страницы",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "longDescription",
            title: "Подробное описание",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "features",
            title: "Что входит в услугу",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "pricing",
            title: "Цена / диапазон цен",
            type: "string",
        }),
        defineField({
            name: "metaTitle",
            title: "Meta title",
            type: "string",
        }),
        defineField({
            name: "metaDescription",
            title: "Meta description",
            type: "text",
            rows: 2,
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
        select: { title: "title", subtitle: "slug.current" },
    },
});
