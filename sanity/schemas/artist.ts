import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'link',
            title: 'Artist Website',
            type: 'url'
        }),
        {
            name: 'image',
            title: 'Artist Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'bio',
            title: 'Artist Bio',
            type: 'text'
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image'
        }
    }
}) 