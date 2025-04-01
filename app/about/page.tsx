import React from 'react'
import Image from 'next/image'
import { PastArtists } from '../components/PastArtists'
import { AboutContent } from '../components/AboutContent'
import { ScrollToTop } from '../components/ScrollToTop'
import { getPastArtists as getSanityPastArtists, getAboutParagraphs, getAboutCarouselImages } from '@/lib/sanity'
import { AboutCarousel } from '../components/AboutCarousel'

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
    console.log('Carousel Data:', carouselData); // Debug log
    const carouselImages = carouselData?.images || []
    console.log('Carousel Images:', carouselImages); // Debug log
    const pastArtists = await getSanityPastArtists()
    const paragraphs = await getAboutParagraphs()

    // Filter out any artists with null imageUrls to prevent rendering errors
    const validArtists = pastArtists.filter((artist: PastArtist) => artist.imageUrl !== null)

    return (
        <div className="min-h-screen bg-[#ece8d9] text-[#231f20]">
            <section className="py-16 pb-16">
                <div className="editorial-layout">
                    <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
                        <div className="space-y-0">
                            <AboutCarousel images={carouselImages} />
                            <AboutContent paragraphs={paragraphs} />
                        </div>
                    </div>
                </div>
            </section>

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