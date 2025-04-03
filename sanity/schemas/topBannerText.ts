import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'topBannerText',
    title: 'Top Banner Text',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Banner Text',
            type: 'string',
            description: 'The text to display in the top banner',
            validation: rule => rule.required()
        })
    ],
    preview: {
        select: {
            title: 'text'
        }
    }
}) 