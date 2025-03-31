import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
    throw new Error('Missing Sanity project ID or dataset. Check your environment variables.')
}

export default defineConfig({
    name: 'default',
    title: 'Sing For Your Slumber',
    projectId,
    dataset,
    basePath: '/studio',
    plugins: [deskTool()],
    schema: {
        types: schema.types,
    },
}) 