import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'aboutParagraph',
    title: 'About Paragraph',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            validation: rule => rule.required().min(0)
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'order',
            media: 'image'
        },
        prepare(selection) {
            const { title, subtitle } = selection
            return {
                title: title,
                subtitle: `Order: ${subtitle}`
            }
        }
    }
}) 