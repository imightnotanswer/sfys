import Image from 'next/image'
import { PastArtists } from '../components/PastArtists'
import { AboutContent } from '../components/AboutContent'
import { ScrollToTop } from '../components/ScrollToTop'
import { getPastArtists as getSanityPastArtists, getAboutParagraphs } from '@/lib/sanity'

// Force dynamic rendering and no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PastArtist {
    _id: string
    name: string
    website?: string
    imageUrl: string | null
}

export default async function About() {
    const pastArtists = await getSanityPastArtists()
    const paragraphs = await getAboutParagraphs()

    // Filter out any artists with null imageUrls to prevent rendering errors
    const validArtists = pastArtists.filter((artist: PastArtist) => artist.imageUrl !== null)

    return (
        <div className="min-h-screen">
            <AboutContent paragraphs={paragraphs} />

            {validArtists && validArtists.length > 0 && (
                <section className="bg-[#ece8d9] text-[#231f20]">
                    <div className="editorial-layout">
                        <div className="col-span-12">
                            <PastArtists artists={validArtists} />
                        </div>
                    </div>
                </section>
            )}
            <ScrollToTop />
        </div>
    )
} 