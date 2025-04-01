export default {
    name: 'aboutParagraph',
    title: 'About Page Content',
    type: 'document',
    fields: [
        {
            name: 'firstParagraph',
            title: 'First Paragraph',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'secondParagraph',
            title: 'Second Paragraph',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'thirdParagraph',
            title: 'Third Paragraph',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Whether this set of paragraphs should be shown on the website',
            initialValue: false
        },
    ],
    preview: {
        select: {
            active: 'isActive',
        },
        prepare(selection: { active: boolean }) {
            return {
                title: 'About Page Content',
                subtitle: selection.active ? 'Active' : 'Inactive'
            }
        }
    }
} 