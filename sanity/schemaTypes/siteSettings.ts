import { defineType, defineField } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Настройки сайта",
    type: "document",
    icon: CogIcon,
    fields: [
        defineField({
            name: "companyName",
            title: "Название компании",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "phone",
            title: "Телефон",
            type: "string",
            description: "Формат: +7 (495) 123-45-67",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
        }),
        defineField({
            name: "address",
            title: "Адрес офиса",
            type: "string",
        }),
        defineField({
            name: "workingHours",
            title: "Часы работы",
            type: "string",
            description: 'Например: Пн–Вс: 9:00–21:00',
        }),
        defineField({
            name: "telegram",
            title: "Telegram (username или @username)",
            type: "string",
            description: 'Например: mycompany или @mycompany',
        }),
        defineField({
            name: "whatsapp",
            title: "WhatsApp (номер телефона)",
            type: "string",
            description: 'Например: +79991234567',
        }),
        defineField({
            name: "heroTitle",
            title: "Hero — Заголовок",
            type: "string",
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero — Подзаголовок",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "heroCtaLabel",
            title: "Hero — Текст кнопки",
            type: "string",
            initialValue: "Оставить заявку",
        }),
        defineField({
            name: "heroImage",
            title: "Hero — Фоновое изображение",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "aboutTitle",
            title: "О компании — Заголовок секции",
            type: "string",
            initialValue: "О компании",
        }),
        defineField({
            name: "whyUsTitle",
            title: "Почему мы — Заголовок секции",
            type: "string",
            initialValue: "Почему мы",
        }),
        defineField({
            name: "servicesTitle",
            title: "Услуги — Заголовок секции",
            type: "string",
            initialValue: "Услуги",
        }),
        defineField({
            name: "faqTitle",
            title: "FAQ — Заголовок секции",
            type: "string",
            initialValue: "Частые вопросы",
        }),
        defineField({
            name: "clientsTitle",
            title: "Клиенты — Заголовок секции",
            type: "string",
            initialValue: "Наши клиенты",
        }),
        defineField({
            name: "reviewsTitle",
            title: "Отзывы — Заголовок секции",
            type: "string",
            initialValue: "Отзывы",
        }),
        defineField({
            name: "contactTitle",
            title: "Контакты — Заголовок секции",
            type: "string",
            initialValue: "Свяжитесь с нами",
        }),
    ],
    preview: {
        prepare: () => ({ title: "Настройки сайта" }),
    },
});
