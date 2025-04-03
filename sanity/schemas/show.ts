import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'upcomingShows',
    title: 'Upcoming Shows',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The title of the show',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            description: 'The date and time of the show',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A description of the show'
        }),
        defineField({
            name: 'secondDescription',
            title: 'Second Description',
            type: 'text',
            description: 'An optional secondary description for the show'
        }),
        defineField({
            name: 'spotifyLink',
            title: 'Spotify Link',
            type: 'url',
            description: 'Link to Spotify for the artist or show'
        }),
        defineField({
            name: 'secondSpotifyLink',
            title: 'Second Spotify Link',
            type: 'url',
            description: 'Optional second link to Spotify for another artist or related show'
        }),
        defineField({
            name: 'website',
            title: 'Artist Website',
            type: 'url',
            description: 'Optional website link for the first artist (will make their image clickable)'
        }),
        defineField({
            name: 'secondWebsite',
            title: 'Second Artist Website',
            type: 'url',
            description: 'Optional website link for the second artist (will make their image clickable)'
        }),
        defineField({
            name: 'images',
            title: 'Show Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    }
                }
            ],
            description: 'Images for the show (first image will be the main image)',
            validation: (Rule: any) => Rule.required().min(1)
        })
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            media: 'images.0'
        },
        prepare(value: Record<string, any>) {
            const title = value.title || 'Untitled'
            const date = value.date ? new Date(value.date).toLocaleDateString() : 'No date set'
            const media = value.media
            return {
                title,
                subtitle: date,
                media
            }
        }
    }
}) 