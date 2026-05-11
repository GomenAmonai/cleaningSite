import { defineType, defineField } from 'sanity'
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
    name : 'siteSettings',
    title : 'Настройки сайта',
    type : 'document',
    icon : CogIcon,
    fields: [
        defineField({
            name : 'companyName',
            title : 'Название компании',
            type : 'string',
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : 'phone',
            title : 'Телефон',
            type : 'string',
            description : 'Формат : +7 (495) 123 45-67',
            validation : (Rule) => Rule.required(),
        }),
        defineField({
            name : 'address',
            title : 'Адресс офиса',
            type : 'string',
        }),
        defineField({
            name : 'workingHours',
            title: 'Часы работы',
            type : 'string',
            description : 'Например : Ежеденевно, 8:00 - 22:00',
        }),
        defineField({
            name: 'whatsapp',
            title : 'WhatsApp',
            type : 'url',
        }),
        defineField({
            name : 'telegram',
            title : 'Telegram',
            type : 'url',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero — Заголовок',
            type: 'string',
            description: 'Большой заголовок на первом экране. Пример: «Профессиональный клининг для организаций»',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero — Подзаголовок',
            type: 'text',
            rows: 2,
            description: 'Одно предложение под заголовком',
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero — Фоновое изображение',
            type: 'image',
            options: { hotspot: true },
            description: 'Большое фото на первом экране',
        }),
        defineField({
            name: 'heroCtaText',
            title: 'Hero — Текст кнопки',
            type: 'string',
            description: 'Что написано на кнопке. Пример: «Получить расчёт»',
            initialValue: 'Связаться',
        }),
        defineField({
            name: 'whyUsTitle',
            title: 'Почему мы — Заголовок секции',
            type: 'string',
            initialValue: 'Почему выбирают нас',
        }),
        defineField({
            name: 'whyUsItems',
            title: 'Почему мы — Пункты',
            type: 'array',
            description: 'Рекомендуется 4 пункта',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Заголовок пункта',
                            type: 'string',
                            validation: (Rule) => Rule.required().max(60),
                        }),
                        defineField({
                            name: 'description',
                            title: 'Описание',
                            type: 'text',
                            rows: 3,
                            validation: (Rule) => Rule.required().max(200),
                        }),
                    ],
                    preview: {
                        select: { title: 'title' },
                    },
                },
            ],
            validation: (Rule) => Rule.max(6),
        }),
        defineField({
            name: 'faqTitle',
            title: 'FAQ — Заголовок секции',
            type: 'string',
            initialValue: 'Частые вопросы',
        }),
        defineField({
            name: 'faqItems',
            title: 'FAQ — Вопросы',
            type: 'array',
            description: 'Рекомендуется 5-7 вопросов',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'question',
                            title: 'Вопрос',
                            type: 'string',
                            validation: (Rule) => Rule.required().max(150),
                        }),
                        defineField({
                            name: 'answer',
                            title: 'Ответ',
                            type: 'text',
                            rows: 4,
                            validation: (Rule) => Rule.required().max(500),
                        }),
                    ],
                    preview: {
                        select: { title: 'question' },
                    },
                },
            ],
            validation: (Rule) => Rule.max(10),
        }),
    ],

    preview : {
        prepare : () => ({
            title : 'Настройки сайта',
        }),
    },
})