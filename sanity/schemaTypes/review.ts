import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const review = defineType({
    name: "review",
    title: "Отзыв",
    type: "document",
    icon: CommentIcon,
    fields: [
        defineField({
            name: "authorName",
            title: "Автор",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "authorCompany",
            title: "Компания",
            type: "string",
        }),
        defineField({
            name: "text",
            title: "Текст",
            type: "text",
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "rating",
            title: "Рейтинг (1–5)",
            type: "number",
            validation: (Rule) => Rule.min(1).max(5),
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
    preview: { select: { title: "authorName", subtitle: "authorCompany" } },
});
