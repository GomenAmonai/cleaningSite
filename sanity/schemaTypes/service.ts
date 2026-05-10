import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const service = defineType({
    name: 'service',
    title: 'Услуга',
    type: 'document',
    icon: SparklesIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Название услуги',
            type: 'string',
            description: 'Например: Ежедневная уборка офиса',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Краткое описание',
            type: 'text',
            rows: 3,
            description: 'Одно-два предложения для карточки на главной',
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'image',
            title: 'Изображение',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'order',
            title: 'Порядок отображения',
            type: 'number',
            description: 'Чем меньше число, тем выше услуга в списке',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
    orderings: [
        {
            title: 'По порядку',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})