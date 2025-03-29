export default {
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'link',
            title: 'Artist Website',
            type: 'url'
        },
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
} 