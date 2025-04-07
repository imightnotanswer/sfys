import { type SchemaTypeDefinition } from 'sanity'
import aboutCarousel from './aboutCarousel'
import aboutParagraph from './aboutParagraph'
import contactPhoto from './contactPhoto'
import homePageHeader from './flyer'
import pastArtist from './pastArtist'
import upcomingShows from './show'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        aboutCarousel,
        aboutParagraph,
        contactPhoto,
        homePageHeader,
        pastArtist,
        upcomingShows
    ]
} 