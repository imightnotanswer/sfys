'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { urlForImage } from '../../lib/sanity'

interface AboutCarouselProps {
    images: {
        asset: {
            _ref: string
            _type: string
        }
    }[]
}

export function AboutCarousel({ images }: AboutCarouselProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const timerRef = useRef<NodeJS.Timeout>()

    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 4000)
    }

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        if (!images || images.length === 0) return;
        resetTimer()
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [images]);

    if (!images || images.length === 0) {
        return null;
    }

    // Get current image
    const currentImage = images[currentImageIndex];
    if (!currentImage?.asset) {
        return null;
    }

    // Get image URL using Sanity's URL builder
    const imageUrl = urlForImage(currentImage.asset).url();

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
                <Image
                    src={imageUrl}
                    alt="About page carousel image"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
            </div>
            {images.length > 1 && (
                <>
                    <button
                        onClick={() => {
                            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
                            resetTimer()
                        }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:-translate-x-1"
                        aria-label="Previous image"
                    >
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            setCurrentImageIndex((prev) => (prev + 1) % images.length)
                            resetTimer()
                        }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:translate-x-1"
                        aria-label="Next image"
                    >
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
} 