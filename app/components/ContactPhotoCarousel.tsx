'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ContactPhoto {
    _id: string
    title: string
    imageUrls: string[]
}

interface ContactPhotoCarouselProps {
    photos: ContactPhoto[]
    defaultImageUrl: string // The default image to show if no photos are available
}

export function ContactPhotoCarousel({ photos, defaultImageUrl }: ContactPhotoCarouselProps) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Auto-rotate images every 6 seconds
    useEffect(() => {
        if (!photos || photos.length === 0) return;

        const timer = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                if (currentImageIndex === photos[currentPhotoIndex].imageUrls.length - 1) {
                    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
                    setCurrentImageIndex(0)
                } else {
                    setCurrentImageIndex((prev) => prev + 1)
                }
                setIsTransitioning(false);
            }, 300); // Match this with the CSS transition duration
        }, 6000) // Changed from 4000 to 6000 for slower cycling

        return () => clearInterval(timer)
    }, [currentPhotoIndex, currentImageIndex, photos])

    // If no photos are available or photos array is empty, render the default image
    if (!photos || photos.length === 0 || !photos[0]?.imageUrls?.length) {
        return (
            <div className="relative w-full">
                <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                    <Image
                        src={defaultImageUrl}
                        alt="Contact page photo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg transition-opacity duration-300"
                        priority
                    />
                </div>
            </div>
        )
    }

    const currentPhoto = photos[currentPhotoIndex]

    return (
        <div className="relative w-full">
            <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                <Image
                    src={currentPhoto.imageUrls[currentImageIndex]}
                    alt={currentPhoto.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover rounded-lg transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    priority
                />
            </div>
        </div>
    )
} 