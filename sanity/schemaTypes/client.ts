import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const client = defineType({
    name: "client",
    title: "Клиент",
    type: "document",
    icon: UsersIcon,
    fields: [
        defineField({
            name: "name",
            title: "Название",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Логотип",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "url",
            title: "Сайт",
            type: "url",
        }),
        defineField({
            name: "order",
            title: "Порядок",
            type: "number",
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: "По порядку",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: { select: { title: "name", media: "logo" } },
});
