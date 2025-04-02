export default {
    name: 'show',
    title: 'Show',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The title of the show',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            description: 'The date and time of the show',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A description of the show'
        },
        {
            name: 'secondDescription',
            title: 'Second Description',
            type: 'text',
            description: 'An optional secondary description for the show'
        },
        {
            name: 'spotifyLink',
            title: 'Spotify Link',
            type: 'url',
            description: 'Link to Spotify for the artist or show'
        },
        {
            name: 'secondSpotifyLink',
            title: 'Second Spotify Link',
            type: 'url',
            description: 'Optional second link to Spotify for another artist or related show'
        },
        {
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
        }
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            media: 'images.0'
        },
        prepare(selection: { title: string, date: string, media: any }) {
            const { title, date, media } = selection
            return {
                title: title,
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
                media: media
            }
        }
    }
} 