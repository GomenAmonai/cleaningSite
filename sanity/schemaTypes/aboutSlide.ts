import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const aboutSlide = defineType({
    name: "aboutSlide",
    title: "Слайд «О компании»",
    type: "document",
    icon: ImagesIcon,
    fields: [
        defineField({
            name: "title",
            title: "Заголовок",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "body",
            title: "Текст",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Изображение",
            type: "image",
            options: { hotspot: true },
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
    preview: { select: { title: "title", media: "image" } },
});
