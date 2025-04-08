import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactContent',
    title: 'Contact Page Content',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The main title (e.g., "Let\'s Talk")',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            description: 'The main content text before the email',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
            description: 'The email address that will be displayed and linked',
            validation: rule => rule.required().email()
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Only one contact content should be active at a time',
            initialValue: false
        })
    ],
    preview: {
        select: {
            title: 'title',
            email: 'email',
            active: 'isActive'
        },
        prepare({ title, email, active }) {
            return {
                title: title || 'Contact Content',
                subtitle: `${active ? '✓ Active' : 'Inactive'} - ${email}`
            }
        }
    }
}) 