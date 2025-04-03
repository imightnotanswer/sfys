import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactPhoto',
    title: 'Contact Photo',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'image',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: rule => rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image'
        }
    }
}) 