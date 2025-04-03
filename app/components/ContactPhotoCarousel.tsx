'use client'

import { useState, useEffect, useMemo } from 'react'
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
    // Create a randomized array of all images
    const allImages = useMemo(() => {
        const images: { url: string; title: string }[] = []
        photos.forEach(photo => {
            photo.imageUrls.forEach(url => {
                images.push({ url, title: photo.title })
            })
        })
        // Fisher-Yates shuffle algorithm
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]]
        }
        return images
    }, [photos])

    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-rotate images every 5 seconds
    useEffect(() => {
        if (!allImages || allImages.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % allImages.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [allImages])

    // If no photos are available or photos array is empty, render the default image
    if (!photos || photos.length === 0 || !allImages.length) {
        return (
            <div className="relative w-full">
                <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                    <Image
                        src={defaultImageUrl}
                        alt="Contact page photo"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            </div>
        )
    }

    const nextIndex = (currentIndex + 1) % allImages.length

    return (
        <div className="relative w-full">
            <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                {/* Current Image */}
                <Image
                    key={`current-${currentIndex}`}
                    src={allImages[currentIndex].url}
                    alt={allImages[currentIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg transition-all duration-1000 ease-in-out"
                    priority
                />
                {/* Next Image (preloaded) */}
                <Image
                    key={`next-${nextIndex}`}
                    src={allImages[nextIndex].url}
                    alt={allImages[nextIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg transition-all duration-1000 ease-in-out opacity-0"
                    priority
                />
            </div>
        </div>
    )
} 