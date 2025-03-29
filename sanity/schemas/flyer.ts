import { Rule } from '@sanity/types'

export default {
    name: 'flyer',
    title: 'Flyer',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Flyer Title',
            type: 'string',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'images',
            title: 'Flyer Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true
                    }
                }
            ],
            validation: (Rule: Rule) => Rule.required().min(1)
        },
        {
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            initialValue: true,
            description: 'Only active flyers will be displayed on the website'
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'images.0'
        }
    }
} 