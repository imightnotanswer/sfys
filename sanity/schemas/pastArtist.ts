import { Rule } from '@sanity/types'

export default {
    name: 'pastArtist',
    title: 'Past Artist',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'image',
            title: 'Artist Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'website',
            title: 'Artist Website',
            type: 'url'
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image'
        }
    }
} 