import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'show',
    title: 'Show',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Show Title',
            type: 'string',
            description: 'The title of the show',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'date',
            title: 'Show Date',
            type: 'datetime',
            description: 'The date and time of the show',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'location',
            title: 'Show Location',
            type: 'string',
            description: 'The location of the show',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Show Description',
            type: 'text',
            description: 'A description of the show',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'ticketLink',
            title: 'Ticket Link',
            type: 'url',
            description: 'Link to purchase tickets'
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured Show',
            type: 'boolean',
            description: 'Whether this show should be featured on the homepage',
            initialValue: false
        }),
        defineField({
            name: 'artists',
            title: 'Artists',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'artist' }] }],
            description: 'The artists performing at this show'
        }),
        defineField({
            name: 'flyer',
            title: 'Show Flyer',
            type: 'image',
            description: 'The flyer image for the show'
        })
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date'
        },
        prepare(selection) {
            const { title, date } = selection
            return {
                title: title,
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date set'
            }
        }
    }
}) 