export default {
    name: 'aboutParagraph',
    title: 'About Page Paragraphs',
    type: 'document',
    fields: [
        {
            name: 'firstParagraph',
            title: 'First Paragraph',
            type: 'text',
            description: 'The first paragraph with left fade-in animation',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'secondParagraph',
            title: 'Second Paragraph',
            type: 'text',
            description: 'The second paragraph with right fade-in animation',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'thirdParagraph',
            title: 'Third Paragraph',
            type: 'text',
            description: 'The third paragraph with bottom fade-in animation',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Only one set of paragraphs should be active at a time',
            initialValue: false
        }
    ],
    preview: {
        select: {
            title: 'firstParagraph',
            subtitle: 'isActive'
        },
        prepare({ title, subtitle }: { title: string; subtitle: boolean }) {
            return {
                title: title.substring(0, 50) + '...',
                subtitle: subtitle ? 'Active' : 'Inactive'
            }
        }
    }
} 