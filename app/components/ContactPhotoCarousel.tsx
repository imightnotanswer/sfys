'use client'

import { useState, useEffect, useRef } from 'react'
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

    console.log('ContactPhotoCarousel props:', {
        photos,
        defaultImageUrl,
        currentPhotoIndex,
        currentImageIndex,
        currentPhotoUrls: photos?.[currentPhotoIndex]?.imageUrls,
        totalPhotos: photos?.length,
        totalImagesInCurrentPhoto: photos?.[currentPhotoIndex]?.imageUrls?.length
    }); // Debug log

    // Auto-rotate images every 4 seconds
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
        }, 4000)

        return () => clearInterval(timer)
    }, [currentPhotoIndex, currentImageIndex, photos])

    const nextImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            if (currentImageIndex === photos[currentPhotoIndex].imageUrls.length - 1) {
                setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
                setCurrentImageIndex(0)
            } else {
                setCurrentImageIndex((prev) => prev + 1)
            }
            setIsTransitioning(false);
        }, 300);
    }

    const prevImage = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            if (currentImageIndex === 0) {
                setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
                setCurrentImageIndex(photos[(currentPhotoIndex - 1 + photos.length) % photos.length].imageUrls.length - 1)
            } else {
                setCurrentImageIndex((prev) => prev - 1)
            }
            setIsTransitioning(false);
        }, 300);
    }

    // If no photos are available or photos array is empty, render the default image
    if (!photos || photos.length === 0 || !photos[0]?.imageUrls?.length) {
        console.log('Using default image because:', {
            noPhotos: !photos,
            emptyArray: photos?.length === 0,
            noImageUrls: photos?.[0]?.imageUrls?.length === 0
        }); // Debug log
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
    console.log('Current photo:', currentPhoto); // Debug log

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
            {photos.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:-translate-x-1"
                        aria-label="Previous image"
                    >
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextImage}
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
    )
} 