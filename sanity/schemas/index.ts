import { type SchemaTypeDefinition } from 'sanity'
import upcomingShows from './show'
import pastArtist from './pastArtist'
import homePageHeader from './flyer'
import contactPhoto from './contactPhoto'
import aboutParagraph from './aboutParagraph'
import aboutCarousel from './aboutCarousel'
import topBannerText from './topBannerText'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        upcomingShows,
        pastArtist,
        homePageHeader,
        contactPhoto,
        aboutParagraph,
        aboutCarousel,
        topBannerText
    ]
} 