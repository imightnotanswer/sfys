'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlForImage } from '@/lib/sanity'

interface AboutCarouselProps {
    images: {
        asset: {
            _ref: string
            _type: string
        }
    }[]
}

export default function AboutCarousel({ images }: AboutCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Preload next image
    useEffect(() => {
        if (!images || images.length === 0) return
        const nextIndex = (currentIndex + 1) % images.length
        const nextImageUrl = urlForImage(images[nextIndex].asset).url()
        const img = document.createElement('img')
        img.src = nextImageUrl
    }, [currentIndex, images])

    const handlePrevious = () => {
        if (isTransitioning || !images || images.length === 0) return
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
        setTimeout(() => setIsTransitioning(false), 700)
    }

    const handleNext = () => {
        if (isTransitioning || !images || images.length === 0) return
        setIsTransitioning(true)
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setTimeout(() => setIsTransitioning(false), 700)
    }

    // Auto-rotation
    useEffect(() => {
        if (!images || images.length === 0) return
        const interval = setInterval(() => {
            if (!isTransitioning) {
                handleNext()
            }
        }, 4000)

        return () => clearInterval(interval)
    }, [isTransitioning, images])

    if (!images || images.length === 0) {
        return null
    }

    const currentImage = images[currentIndex]
    const nextIndex = (currentIndex + 1) % images.length
    const nextImage = images[nextIndex]

    if (!currentImage?.asset || !nextImage?.asset) {
        return null
    }

    const currentImageUrl = urlForImage(currentImage.asset).url()
    const nextImageUrl = urlForImage(nextImage.asset).url()

    return (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
            {/* Current Image */}
            <div
                className={`absolute inset-0 transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <Image
                    src={currentImageUrl}
                    alt="About page carousel image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Next Image (preloaded) */}
            <div
                className={`absolute inset-0 transition-opacity duration-700 ${isTransitioning ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <Image
                    src={nextImageUrl}
                    alt="About page carousel image"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Next image"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    )
} 