import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqItem = defineType({
    name: "faqItem",
    title: "Вопрос FAQ",
    type: "document",
    icon: HelpCircleIcon,
    fields: [
        defineField({
            name: "question",
            title: "Вопрос",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "answer",
            title: "Ответ",
            type: "text",
            rows: 5,
            validation: (Rule) => Rule.required(),
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
    preview: { select: { title: "question" } },
});
