import { type SchemaTypeDefinition } from 'sanity'
import artist from './artist'
import show from './show'
import pastArtist from './pastArtist'
import flyer from './flyer'
import contactPhoto from './contactPhoto'
import aboutParagraph from './aboutParagraph'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [artist, show, pastArtist, flyer, contactPhoto, aboutParagraph],
} 