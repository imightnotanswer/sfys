import { ImageIcon } from '@sanity/icons'
import { Rule } from '@sanity/types'

export default {
    name: 'aboutCarousel',
    title: 'About Page Carousel',
    type: 'document',
    icon: ImageIcon,
    preview: {
        select: {
            images: 'images',
        },
        prepare() {
            return {
                title: 'About Page Carousel Images'
            }
        }
    },
    fields: [
        {
            name: 'images',
            title: 'Carousel Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
            validation: (Rule: Rule) => Rule.required().min(1),
        },
    ],
} 