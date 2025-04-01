import { type SchemaTypeDefinition } from 'sanity'
import aboutCarousel from './schemas/aboutCarousel'
import contactPhoto from './schemas/contactPhoto'
import flyer from './schemas/flyer'
import pastArtist from './schemas/pastArtist'
import show from './schemas/show'
import aboutParagraph from './schemas/aboutParagraph'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        aboutCarousel,
        contactPhoto,
        flyer,
        pastArtist,
        show,
        aboutParagraph,
    ],
} 