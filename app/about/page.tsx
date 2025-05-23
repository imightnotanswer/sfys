import React from 'react'
import Image from 'next/image'
import { PastArtists } from '../components/PastArtists'
import { AboutContent } from '../components/AboutContent'
import { ScrollToTop } from '../components/ScrollToTop'
import { getPastArtists as getSanityPastArtists, getAboutParagraphs, getAboutCarouselImages } from '@/lib/sanity'
import AboutCarousel from '../components/AboutCarousel'

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
    const carouselData = await getAboutCarouselImages()
    const carouselImages = carouselData?.images || []
    const pastArtists = await getSanityPastArtists()
    const paragraphs = await getAboutParagraphs()

    // Filter out any artists with null imageUrls to prevent rendering errors
    const validArtists = pastArtists.filter((artist: PastArtist) => artist.imageUrl !== null)

    // Serialize the carousel data
    const serializedImages = JSON.parse(JSON.stringify(carouselImages))

    return (
        <div className="min-h-screen bg-[#ece8d9] text-[#231f20]">
            <section className="py-16 pb-16">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-3xl mx-auto">
                            <AboutCarousel images={serializedImages} />
                            <AboutContent paragraphs={paragraphs} />
                        </div>
                    </div>
                </div>
            </section>

            {validArtists && validArtists.length > 0 && (
                <section className="bg-[#ece8d9] text-[#231f20]">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col items-center">
                            <div className="w-full max-w-5xl mx-auto">
                                <PastArtists artists={validArtists} />
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <ScrollToTop />
        </div>
    )
} 