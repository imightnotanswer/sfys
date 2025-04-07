const fs = require('fs');
const { createClient } = require('next-sanity');

// Create a client with your project configuration
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'artist',
    apiVersion: '2024-03-26',
    useCdn: false
});

async function exportContent() {
    try {
        // Fetch all content types
        const shows = await client.fetch('*[_type == "upcomingShows"]');
        const pastArtists = await client.fetch('*[_type == "pastArtist"]');
        const flyers = await client.fetch('*[_type == "flyer"]');
        const contactPhotos = await client.fetch('*[_type == "contactPhoto"]');
        const aboutParagraphs = await client.fetch('*[_type == "aboutParagraph"]');
        const aboutCarouselImages = await client.fetch('*[_type == "aboutCarousel"]');
        const topBannerText = await client.fetch('*[_type == "topBannerText"]');

        // Combine all content
        const content = {
            shows,
            pastArtists,
            flyers,
            contactPhotos,
            aboutParagraphs,
            aboutCarouselImages,
            topBannerText
        };

        // Create backup directory if it doesn't exist
        if (!fs.existsSync('./backup')) {
            fs.mkdirSync('./backup');
        }

        // Save to a JSON file with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `./backup/content-backup-${timestamp}.json`;

        fs.writeFileSync(
            filename,
            JSON.stringify(content, null, 2)
        );

        console.log(`Content successfully exported to ${filename}`);
    } catch (error) {
        console.error('Error exporting content:', error);
    }
}

exportContent(); 