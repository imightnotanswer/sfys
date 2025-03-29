import { Rule } from '@sanity/types'

export default {
    name: 'show',
    title: 'Show',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Show Title',
            type: 'string',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'date',
            title: 'Show Date & Time',
            type: 'datetime',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'mainArtist',
            title: 'Main Artist',
            type: 'reference',
            to: [{ type: 'artist' }],
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'supportingArtists',
            title: 'Supporting Artists',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'artist' }] }]
        },
        {
            name: 'images',
            title: 'Show Images',
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
            name: 'description',
            title: 'Show Description (Shown in Dropdown)',
            type: 'text',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'processed',
            title: 'Processed for Past Artists',
            type: 'boolean',
            initialValue: false,
            hidden: true // Hide this field in the Studio UI
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
            media: 'images.0'
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                subtitle: new Date(subtitle).toLocaleDateString(),
                media: media
            }
        }
    }
} 