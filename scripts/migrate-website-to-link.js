const { createClient } = require('@sanity/client')

// Create a client with your project configuration
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'artist',
    apiVersion: '2024-03-26',
    token: process.env.SANITY_WRITE_TOKEN, // You'll need this for writing
    useCdn: false
})

async function migrateWebsiteToLink() {
    try {
        // Fetch all pastArtist documents that have a website field
        const query = `*[_type == "pastArtist" && defined(website)]`
        const artists = await client.fetch(query)

        console.log(`Found ${artists.length} artists with website fields to migrate`)

        // Update each document
        for (const artist of artists) {
            await client
                .patch(artist._id)
                .set({ link: artist.website }) // Set the new link field
                .unset(['website']) // Remove the old website field
                .commit()

            console.log(`Migrated artist: ${artist.name}`)
        }

        console.log('Migration completed successfully!')
    } catch (error) {
        console.error('Migration failed:', error)
    }
}

migrateWebsiteToLink() 