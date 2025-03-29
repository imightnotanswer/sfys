export default {
    name: 'contactPhoto',
    title: 'Contact Page Photos',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'A descriptive title for this photo set'
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            description: 'Upload one or more images. If multiple images are uploaded, they will be displayed in a carousel.'
        }
    ],
    preview: {
        select: {
            title: 'title',
            media: 'images.0'
        }
    }
} 