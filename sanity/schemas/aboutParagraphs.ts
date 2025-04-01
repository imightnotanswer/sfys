export default {
    name: 'aboutParagraphs',
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
    ],
} 