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
    ],
    preview : {
        prepare : () => ({
            title : 'Настройки сайта',
        }),
    },
})