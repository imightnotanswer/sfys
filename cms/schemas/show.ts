export default {
    name: 'show',
    title: 'Show',
    type: 'document',
    fields: [
        {
            name: 'artistName',
            title: 'Artist Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'link',
            title: 'Link',
            type: 'url',
        },
    ],
    preview: {
        select: {
            title: 'artistName',
            subtitle: 'date',
            media: 'image',
        },
    },
} 