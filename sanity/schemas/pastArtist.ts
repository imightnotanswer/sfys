import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'pastArtist',
    title: 'Past Artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'date',
            title: 'Performance Date',
            type: 'date',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'link',
            title: 'Artist Website',
            type: 'url'
        }),
        defineField({
            name: 'image',
            title: 'Artist Image',
            type: 'image',
            options: {
                hotspot: true
            }
        })
    ],
    preview: {
        select: {
            title: 'name',
            date: 'date',
            media: 'image'
        }
    }
}) 