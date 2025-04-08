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
    website?: string;
    secondWebsite?: string;
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

interface SanityImage {
    asset: {
        _ref: string;
        _type: string;
    };
}

interface SanityFlyer {
    _id: string;
    title: string;
    image: SanityImage;
    imageUrls?: SanityImage;
}

interface SanityContactPhoto {
    _id: string;
    title: string;
    image: SanityImage;
}

interface SanityPastArtist {
    _id: string;
    name: string;
    website?: string;
    image: SanityImage;
}

interface SanityShow {
    _id: string;
    title: string;
    date: string;
    description: string;
    secondDescription?: string;
    spotifyLink?: string;
    secondSpotifyLink?: string;
    website?: string;
    secondWebsite?: string;
    images: SanityImage[];
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

export function urlFor(source: SanityImage | null) {
    if (!source?.asset) return null;
    return builder.image(source)
        .auto('format')
        .fit('max')
        .width(1200)
        .format('webp')
        .quality(80);
}

export function urlForImage(source: SanityImage | null) {
    if (!source?.asset) return null;
    return builder.image(source)
        .auto('format')
        .fit('max')
        .width(1200)
        .format('webp')
        .quality(80);
}

// Helper function to ensure URLs are properly formatted for next/image
export function getImageUrl(url: string | null): string {
    if (!url) return '/placeholder-image.jpg'; // Fallback image

    // Check if the URL already has width/height/quality params for Sanity images
    if (url.includes('cdn.sanity.io') && !url.includes('?')) {
        // Add default image parameters if they're missing
        return `${url}?w=1200&h=900&fit=max&auto=format&q=80`;
    }

    return url;
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
                website,
                secondWebsite,
                images[] {
                    asset->
                }
            }
        `;
        const shows = await client.fetch<SanityShow[]>(query);

        // Process the images using urlFor
        const validShows = shows.map((show: SanityShow) => {
            const imageUrls = show.images
                ?.map(image => urlFor(image)?.url() ?? null)
                .filter((url): url is string => url !== null);

            return {
                ...show,
                imageUrls: imageUrls || []
            };
        });

        // Filter out past shows
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Set to start of today

        const futureShows = validShows.filter((show: Show) => {
            const showDate = new Date(show.date);
            showDate.setHours(0, 0, 0, 0); // Set to start of show day
            return showDate >= now;
        });

        return futureShows;
    } catch (error) {
        console.error('Error fetching shows:', error);
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
                "website": link,
                image {
                    asset->
                }
            }
        `;
        const artists = await client.fetch<SanityPastArtist[]>(query);

        // Process the images using urlFor
        const processedArtists = artists.map((artist: SanityPastArtist) => {
            const imageUrl = artist.image?.asset ? urlFor(artist.image)?.url() ?? null : null;
            return {
                ...artist,
                imageUrl
            };
        });

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
                "imageUrls": image {
                    asset->
                }
            }
        `;
        const flyers = await client.fetch<SanityFlyer[]>(query);

        // Process the images using the image URL builder
        const processedFlyers = flyers.map((flyer: SanityFlyer) => {
            const imageUrl = flyer.imageUrls?.asset ? urlFor(flyer.imageUrls)?.url() ?? null : null;
            return {
                _id: flyer._id,
                title: flyer.title,
                imageUrls: imageUrl ? [imageUrl] : []
            };
        });

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
        const query = `*[_type == "contactPhoto"] {
            _id,
            title,
            image {
                asset->
            }
        } | order(_createdAt desc)`;

        const photos = await client.fetch<SanityContactPhoto[]>(query);

        // Process the images using urlForImage
        const processedPhotos = photos.map((photo: SanityContactPhoto) => {
            const imageUrl = photo.image?.asset ? urlForImage(photo.image)?.url() ?? null : null;
            return {
                _id: photo._id,
                title: photo.title,
                imageUrls: imageUrl ? [imageUrl] : []
            };
        });

        return processedPhotos.filter(photo => photo.imageUrls.length > 0);
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

export async function getContactContent() {
    const query = `*[_type == "contactContent" && isActive == true][0]{
        title,
        content,
        email
    }`

    return await client.fetch(query)
} 