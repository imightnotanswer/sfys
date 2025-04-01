'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Image from 'next/image'

interface SupportingArtist {
    name: string
    website?: string
}

interface Show {
    _id: string
    title: string
    date: string
    description: string
    imageUrls: string[]
    mainArtist: {
        name: string
        website?: string
    }
    supportingArtists?: SupportingArtist[]
}

export function ShowCard({ show }: { show: Show }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const detailsRef = useRef<HTMLDivElement>(null)

    // Auto-rotate images every 5 seconds if there are multiple images
    useEffect(() => {
        if (show.imageUrls.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % show.imageUrls.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [show.imageUrls.length]);

    // Create an array of artists that matches the order of images
    const artistsForImages = useMemo(() => {
        const artists = [show.mainArtist, ...(show.supportingArtists || [])]
        return show.imageUrls.map((_, index) => artists[index] || show.mainArtist)
    }, [show])

    // Get the current artist based on the current image index
    const currentArtist = useMemo(() => {
        return artistsForImages[currentImageIndex]
    }, [artistsForImages, currentImageIndex])

    const formattedDate = useMemo(() => {
        return new Date(show.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric'
        })
    }, [show.date])

    const formattedTime = useMemo(() => {
        return new Date(show.date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }).toUpperCase()
    }, [show.date])

    const artistLineup = useMemo(() => {
        if (!show?.title) {
            console.error('Show is missing title:', show)
            return ['Artist TBA']
        }

        if (!show.supportingArtists?.length) {
            return [show.title.toUpperCase()]
        }

        const supportingArtistNames = show.supportingArtists
            .filter(artist => artist && artist.name)
            .map(artist => artist.name.toUpperCase())

        if (supportingArtistNames.length === 0) {
            return [show.title.toUpperCase()]
        }

        const fullTitle = `${show.title.toUpperCase()} W/ ${supportingArtistNames.join(', ')}`
        return fullTitle.split(' W/ ')
    }, [show])

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % show.imageUrls.length)
    }

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + show.imageUrls.length) % show.imageUrls.length)
    }

    console.log('Show data:', show)

    return (
        <div className="w-full">
            {show.imageUrls && show.imageUrls.length > 0 && (
                <div className="relative aspect-[16/9] w-full max-w-2xl mx-auto mb-4">
                    <div className="absolute inset-0">
                        {currentArtist?.website ? (
                            <a
                                href={currentArtist.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <Image
                                    src={show.imageUrls[currentImageIndex]}
                                    alt={`${currentArtist.name} show image`}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    quality={85}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84OC8xOi8tQVBCNzhLPS0yRWFFS1NWW1xbMkFlbWRYbFBZW1f/2wBDARUXFx4aHR4eHVdRLSUtV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                            </a>
                        ) : (
                            <Image
                                src={show.imageUrls[currentImageIndex]}
                                alt={`${currentArtist?.name || show.title} show image`}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                quality={85}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84OC8xOi8tQVBCNzhLPS0yRWFFS1NWW1xbMkFlbWRYbFBZW1f/2wBDARUXFx4aHR4eHVdRLSUtV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            />
                        )}
                    </div>
                    {show.imageUrls.length > 1 && (
                        <>
                            <button
                                onClick={previousImage}
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
            )}
            <div className="p-6 pt-0 pb-4">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center relative w-full">
                        <div className="flex flex-col items-center">
                            <h3 className="font-[var(--font-dumpling)] text-[clamp(1.5rem,5vw,2.5rem)] text-center">
                                {artistLineup[0]}
                                {artistLineup.length > 1 && (
                                    <>
                                        <br />
                                        <span className="block">W/ {artistLineup[1]}</span>
                                    </>
                                )}
                            </h3>
                        </div>
                        <button
                            onClick={handleExpand}
                            className="absolute right-0 top-1/2 -translate-y-1/2 hover:text-[#e43720] transition-colors duration-200"
                            aria-label={isExpanded ? 'Show less details' : 'Show more details'}
                        >
                            <svg
                                className={`w-[min(3vw,1.5rem)] h-[min(3vw,1.5rem)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="font-[var(--font-dumpling)] text-[clamp(1rem,3vw,1.5rem)] mb-0">
                        {formattedDate} - {formattedTime}
                    </p>
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out`}
                style={{ height: isExpanded ? detailsRef.current?.scrollHeight + 'px' : '0px' }}
            >
                <div
                    ref={detailsRef}
                    className={`space-y-6 px-6 pb-6 transform transition-all duration-500 ease-in-out ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="font-[var(--font-dumpling)] text-[15px] leading-[24px] whitespace-pre-wrap">{show.description}</p>
                        {currentArtist?.website && (
                            <a
                                href={currentArtist.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-[var(--font-dumpling)] inline-block mt-4 text-[10px] hover:text-[#e43720] transition-colors"
                            >
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}