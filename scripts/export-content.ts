import fs from 'fs';
import {
    getShows,
    getPastArtists,
    getFlyers,
    getContactPhotos,
    getAboutParagraphs,
    getAboutCarouselImages,
    getTopBannerText
} from '../lib/sanity';

async function exportContent() {
    try {
        // Fetch all content
        const shows = await getShows();
        const pastArtists = await getPastArtists();
        const flyers = await getFlyers();
        const contactPhotos = await getContactPhotos();
        const aboutParagraphs = await getAboutParagraphs();
        const aboutCarouselImages = await getAboutCarouselImages();
        const topBannerText = await getTopBannerText();

        // Combine all content into one object
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