import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const INQUIRY_STATUSES = ["new", "contacted", "converted", "archived"] as const;

export const inquiry = defineType({
    name: "inquiry",
    title: "Заявка",
    type: "document",
    icon: EnvelopeIcon,
    fields: [
        defineField({
            name: "name",
            title: "Имя",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "phone",
            title: "Телефон",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "message",
            title: "Сообщение",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "createdAt",
            title: "Создано",
            type: "datetime",
            validation: (Rule) => Rule.required(),
            readOnly: true,
        }),
        defineField({
            name: "status",
            title: "Статус",
            type: "string",
            options: {
                list: INQUIRY_STATUSES.map((v) => ({ title: v, value: v })),
                layout: "radio",
            },
            initialValue: "new",
        }),
    ],
    orderings: [
        {
            title: "По дате (новые сверху)",
            name: "createdAtDesc",
            by: [{ field: "createdAt", direction: "desc" }],
        },
    ],
    preview: {
        select: { title: "name", subtitle: "phone", description: "status" },
        prepare: ({ title, subtitle, description }) => ({
            title: title ?? "(без имени)",
            subtitle: [subtitle, description].filter(Boolean).join(" · "),
        }),
    },
});
