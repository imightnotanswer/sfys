import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from './env'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token: process.env.SANITY_API_TOKEN, // You'll need to set this in your environment
    useCdn: false,
})

async function migrateDocuments() {
    try {
        // Migrate shows to upcomingShows
        const shows = await client.fetch('*[_type == "show"]')
        for (const show of shows) {
            await client.create({
                ...show,
                _type: 'upcomingShows',
            })
        }
        console.log(`Migrated ${shows.length} shows to upcomingShows`)

        // Migrate flyers to homePageHeader
        const flyers = await client.fetch('*[_type == "flyer"]')
        for (const flyer of flyers) {
            await client.create({
                ...flyer,
                _type: 'homePageHeader',
            })
        }
        console.log(`Migrated ${flyers.length} flyers to homePageHeader`)

        // Delete old documents
        await client.delete({ query: '*[_type == "show"]' })
        await client.delete({ query: '*[_type == "flyer"]' })
        await client.delete({ query: '*[_type == "artist"]' })

        console.log('Migration completed successfully!')
    } catch (error) {
        console.error('Migration failed:', error)
    }
}

migrateDocuments() 