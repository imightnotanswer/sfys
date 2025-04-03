import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { Rule } from '@sanity/types'

// Upcoming Shows Schema
export const upcomingShowsSchema = defineType({
    name: 'upcomingShows',
    title: 'Upcoming Shows',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The title of the show',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'datetime',
            description: 'The date and time of the show',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A description of the show'
        }),
        defineField({
            name: 'secondDescription',
            title: 'Second Description',
            type: 'text',
            description: 'An optional secondary description for the show'
        }),
        defineField({
            name: 'spotifyLink',
            title: 'Spotify Link',
            type: 'url',
            description: 'Link to Spotify for the artist or show'
        }),
        defineField({
            name: 'secondSpotifyLink',
            title: 'Second Spotify Link',
            type: 'url',
            description: 'Optional second link to Spotify for another artist or related show'
        }),
        defineField({
            name: 'images',
            title: 'Show Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    }
                }
            ],
            description: 'Images for the show (first image will be the main image)',
            validation: (Rule: any) => Rule.required().min(1)
        })
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            media: 'images.0'
        },
        prepare(value: Record<string, any>) {
            const title = value.title || 'Untitled'
            const date = value.date ? new Date(value.date).toLocaleDateString() : 'No date set'
            const media = value.media
            return {
                title,
                subtitle: date,
                media
            }
        }
    }
})

// Past Artist Schema
export const pastArtistSchema = defineType({
    name: 'pastArtist',
    title: 'Past Artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Artist Name',
            type: 'string',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'date',
            title: 'Performance Date',
            type: 'date',
            validation: rule => rule.required()
        }),
        defineField({
            name: 'link',
            title: 'Artist Website',
            type: 'url'
        }),
        defineField({
            name: 'image',
            title: 'Artist Image',
            type: 'image',
            options: {
                hotspot: true
            }
        })
    ],
    preview: {
        select: {
            title: 'name',
            date: 'date',
            media: 'image'
        }
    }
})

// Home Page Header (Flyer) Schema
export const homePageHeaderSchema = defineType({
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
        }),
        defineField({
            name: 'show',
            title: 'Associated Show',
            type: 'reference',
            to: [{ type: 'upcomingShows' }]
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image'
        }
    }
})

// Contact Photo Schema
export const contactPhotoSchema = defineType({
    name: 'contactPhoto',
    title: 'Contact Photo',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'image',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: rule => rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text'
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image'
        }
    }
})

// About Paragraph Schema
export const aboutParagraphSchema = {
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

// About Carousel Schema
export const aboutCarouselSchema = {
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

// Top Banner Text Schema
export const topBannerTextSchema = defineType({
    name: 'topBannerText',
    title: 'Top Banner Text',
    type: 'document',
    fields: [
        defineField({
            name: 'text',
            title: 'Banner Text',
            type: 'string',
            description: 'The text to display in the top banner',
            validation: rule => rule.required()
        })
    ],
    preview: {
        select: {
            title: 'text'
        }
    }
})

// Export all schemas
export const schemas = {
    upcomingShows: upcomingShowsSchema,
    pastArtist: pastArtistSchema,
    homePageHeader: homePageHeaderSchema,
    contactPhoto: contactPhotoSchema,
    aboutParagraph: aboutParagraphSchema,
    aboutCarousel: aboutCarouselSchema,
    topBannerText: topBannerTextSchema
}

export default schemas 