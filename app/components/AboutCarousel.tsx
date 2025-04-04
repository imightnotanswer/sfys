'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlForImage, getImageUrl } from '@/lib/sanity'

interface SanityImage {
    asset: {
        _ref: string;
        _type: string;
    };
}

interface AboutCarouselProps {
    images: SanityImage[]
}

export default function AboutCarousel({ images }: AboutCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const timerRef = useRef<NodeJS.Timeout>()

    // Reset timer whenever index changes
    useEffect(() => {
        if (!images || images.length <= 1) return

        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        // Set new timer
        timerRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length)
        }, 5000)

        // Cleanup on unmount or when index changes
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [currentIndex, images])

    const handlePrevious = () => {
        if (!images || images.length === 0) return
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleNext = () => {
        if (!images || images.length === 0) return
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    if (!images || images.length === 0) {
        return null
    }

    const currentImage = images[currentIndex]
    if (!currentImage?.asset) {
        return null
    }

    const imageUrlBuilder = urlForImage(currentImage)
    if (!imageUrlBuilder) {
        return null
    }

    const currentImageUrl = imageUrlBuilder.url()
    if (!currentImageUrl) {
        return null
    }

    // Process the URL to ensure it has proper parameters
    const processedImageUrl = getImageUrl(currentImageUrl)

    return (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg" style={{ position: "relative" }}>
            <div className="absolute inset-0 transition-all duration-700" style={{ position: "absolute" }}>
                <Image
                    src={processedImageUrl}
                    alt="About page carousel image"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                    quality={85}
                    style={{ position: "absolute" }}
                />
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:-translate-x-1"
                aria-label="Previous image"
            >
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:translate-x-1"
                aria-label="Next image"
            >
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    )
} 