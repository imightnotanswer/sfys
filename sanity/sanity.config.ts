import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './schemas'

export default defineConfig({
    name: 'default',
    title: 'Sing For Your Slumber',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/studio',

    plugins: [deskTool()],

    schema: {
        types: schema.types,
    },
}) 