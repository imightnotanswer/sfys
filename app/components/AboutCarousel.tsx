'use client'

import { useState, useEffect, useRef } from 'react'
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

    const currentImageUrl = urlForImage(currentImage.asset).url()

    return (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
            <div className="absolute inset-0 transition-all duration-700">
                <Image
                    src={currentImageUrl}
                    alt="About page carousel image"
                    fill
                    className="object-cover"
                    priority
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
        </div>
    )
} 