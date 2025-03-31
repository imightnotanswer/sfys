import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'flyer',
    title: 'Flyer',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Flyer Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: rule => rule.required()
        }),
        defineField({
            name: 'show',
            title: 'Associated Show',
            type: 'reference',
            to: [{ type: 'show' }]
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