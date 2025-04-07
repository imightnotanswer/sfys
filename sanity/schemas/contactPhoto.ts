import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactPhoto',
    title: 'Contact Photo',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: rule => rule.required()
        })
    ],
    preview: {
        select: {
            media: 'image'
        }
    }
}) 