import { defineType, defineField } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const whyUsCard = defineType({
    name: "whyUsCard",
    title: "Карточка «Почему мы»",
    type: "document",
    icon: CheckmarkCircleIcon,
    fields: [
        defineField({
            name: "number",
            title: "Номер",
            type: "string",
            description: 'Например: "01", "02"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "title",
            title: "Заголовок",
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
    preview: { select: { title: "title", subtitle: "number" } },
});
