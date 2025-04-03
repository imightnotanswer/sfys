import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

interface Show {
    _id: string;
    title: string;
    date: string;
    description: string;
    secondDescription?: string;
    spotifyLink?: string;
    secondSpotifyLink?: string;
    imageUrls: string[];
}

interface PastArtist {
    _id: string;
    name: string;
    website?: string;
    imageUrl: string | null;
}

interface Flyer {
    _id: string;
    title: string;
    imageUrls: string[];
}

interface ContactPhoto {
    _id: string
    title: string
    imageUrls: string[]
}

interface AboutParagraph {
    _id: string;
    firstParagraph: string;
    secondParagraph: string;
    thirdParagraph: string;
    isActive: boolean;
}

// Create a client with CDN caching enabled
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'artist',
    apiVersion: '2024-03-26',
    useCdn: true, // Enable CDN caching
    perspective: 'published',
    stega: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

export function urlForImage(source: any) {
    return builder.image(source);
}

// Cache for shows data
let showsCache: Show[] | null = null;
let showsCacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getShows() {
    try {
        const query = `
            *[_type == "upcomingShows"] | order(date asc) {
                _id,
                title,
                date,
                description,
                secondDescription,
                spotifyLink,
                secondSpotifyLink,
                "imageUrls": images[].asset->url
            }
        `
        const shows = await client.fetch(query)

        // Ensure each show has at least one image URL and handle arrays properly
        const validShows = shows.map((show: Show) => ({
            ...show,
            imageUrls: Array.isArray(show.imageUrls) ? show.imageUrls.filter(Boolean) :
                show.imageUrls ? [show.imageUrls] : []
        }))

        // Filter out past shows
        const now = new Date()
        now.setHours(0, 0, 0, 0) // Set to start of today

        const futureShows = validShows.filter((show: Show) => {
            const showDate = new Date(show.date)
            showDate.setHours(0, 0, 0, 0) // Set to start of show day
            return showDate >= now
        })

        return futureShows;
    } catch (error) {
        console.error('Error fetching shows:', error)
        return [];
    }
}

// Cache for past artists data
let pastArtistsCache: PastArtist[] | null = null;
let pastArtistsCacheTime: number = 0;

export async function getPastArtists() {
    try {
        // Check if we have valid cached data
        const now = Date.now();
        if (pastArtistsCache && (now - pastArtistsCacheTime) < CACHE_DURATION) {
            return pastArtistsCache;
        }

        const query = `
            *[_type == "pastArtist"] | order(lower(name) asc) {
                _id,
                name,
                website,
                image
            }
        `;
        const artists = await client.fetch(query);

        // Process the images using urlFor
        const processedArtists = artists.map((artist: any) => ({
            ...artist,
            imageUrl: artist.image ? urlFor(artist.image).url() : null
        }));

        // Update cache
        pastArtistsCache = processedArtists;
        pastArtistsCacheTime = now;

        return processedArtists;
    } catch (error) {
        console.error('Error fetching past artists:', error);
        return pastArtistsCache || [];
    }
}

// Cache for flyers data
let flyersCache: Flyer[] | null = null;
let flyersCacheTime: number = 0;

export async function getFlyers() {
    try {
        const query = `
            *[_type == "homePageHeader"] {
                _id,
                title,
                "imageUrls": [image.asset->url]
            }
        `;
        const flyers = await client.fetch(query);

        // Process the images to ensure they're valid URLs
        const processedFlyers = flyers.map((flyer: Flyer) => ({
            ...flyer,
            imageUrls: Array.isArray(flyer.imageUrls) ? flyer.imageUrls.filter(Boolean) : []
        }));

        return processedFlyers;
    } catch (error) {
        console.error('Error fetching flyers:', error);
        return [];
    }
}

// Cache for contact photos data
let contactPhotosCache: ContactPhoto[] | null = null;
let contactPhotosCacheTime: number = 0;

export async function getContactPhotos() {
    try {
        // Remove cache check to always fetch fresh data
        const query = `*[_type == "contactPhoto"] {
            _id,
            title,
            "imageUrls": [image.asset->url]
        } | order(_createdAt desc)`;

        const photos = await client.fetch(query);
        console.log('DEBUG - ALL contact photos:', JSON.stringify(photos, null, 2));

        // Process the images to ensure they're valid URLs
        const processedPhotos = photos.map((photo: ContactPhoto) => ({
            ...photo,
            imageUrls: Array.isArray(photo.imageUrls) ? photo.imageUrls.filter(Boolean) : []
        }));

        return processedPhotos;
    } catch (error) {
        console.error('Error fetching contact photos:', error);
        return [];
    }
}

export async function getAboutParagraphs() {
    try {
        const query = `*[_type == "aboutParagraph" && isActive == true][0] {
            _id,
            firstParagraph,
            secondParagraph,
            thirdParagraph
        }`;

        const paragraphs = await client.fetch(query);
        return paragraphs;
    } catch (error) {
        console.error('Error fetching about paragraphs:', error);
        return null;
    }
}

export async function getAboutCarouselImages() {
    try {
        const query = `*[_type == "aboutCarousel"][0] {
            "images": images[] {
                asset {
                    _ref,
                    _type
                }
            }
        }`;

        const result = await client.fetch(query);
        console.log('About Carousel Images:', result); // Debug log
        return result;
    } catch (error) {
        console.error('Error fetching about carousel images:', error);
        return { images: [] };
    }
}

export async function getTopBannerText() {
    try {
        const query = `
            *[_type == "topBannerText"][0] {
                text
            }
        `
        const result = await client.fetch(query)
        return result?.text || "Be in the know about upcoming shows."
    } catch (error) {
        console.error('Error fetching top banner text:', error)
        return "Be in the know about upcoming shows."
    }
} 