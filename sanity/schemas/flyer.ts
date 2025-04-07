import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'homePageHeader',
    title: 'Home Page Header',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Header Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: rule => rule.required()
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image'
        }
    }
}) 