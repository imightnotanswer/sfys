'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { getImageUrl } from '@/lib/sanity'

interface Show {
    _id: string
    title: string
    date: string
    description: string
    secondDescription?: string
    imageUrls: string[]
    spotifyLink?: string
    secondSpotifyLink?: string
    website?: string
    secondWebsite?: string
}

export function ShowCard({ show }: { show: Show }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const detailsRef = useRef<HTMLDivElement>(null)
    const timerRef = useRef<NodeJS.Timeout>()

    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % show.imageUrls.length)
        }, 5000)
    }

    // Auto-rotate images every 5 seconds if there are multiple images
    useEffect(() => {
        if (show.imageUrls.length <= 1) return;
        resetTimer()
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [show.imageUrls.length]);

    const formattedDate = new Date(show.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'numeric',
        day: 'numeric'
    }).replace(',', '').replace('.', '')

    const formattedTime = new Date(show.date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).toUpperCase()

    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % show.imageUrls.length)
        resetTimer()
    }

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + show.imageUrls.length) % show.imageUrls.length)
        resetTimer()
    }

    // Split title if it contains "W/" for formatting
    const titleParts = show.title.split(/\s+W\/\s+/i);
    const hasSupporting = titleParts.length > 1;

    return (
        <div className="w-full">
            {show.imageUrls && show.imageUrls.length > 0 && (
                <div className="relative aspect-[16/9] w-full max-w-2xl mx-auto mb-4" style={{ position: "relative" }}>
                    <div className="absolute inset-0" style={{ position: "absolute" }}>
                        {((currentImageIndex === 0 && show.website) || (currentImageIndex === 1 && show.secondWebsite)) ? (
                            <a
                                href={currentImageIndex === 0 ? show.website : show.secondWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full"
                            >
                                <Image
                                    src={getImageUrl(show.imageUrls[currentImageIndex])}
                                    alt={`${show.title} show image`}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    quality={85}
                                    loading="lazy"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84OC8xOi8tQVBCNzhLPS0yRWFFS1NWW1xbMkFlbWRYbFBZW1f/2wBDARUXFx4aHR4eHVdRLSUtV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    style={{ position: "absolute" }}
                                />
                            </a>
                        ) : (
                            <Image
                                src={getImageUrl(show.imageUrls[currentImageIndex])}
                                alt={`${show.title} show image`}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                quality={85}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84OC8xOi8tQVBCNzhLPS0yRWFFS1NWW1xbMkFlbWRYbFBZW1f/2wBDARUXFx4aHR4eHVdRLSUtV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                style={{ position: "absolute" }}
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
                            <h3 className="font-[var(--font-dumpling)] text-[clamp(1.75rem,4vw,2.25rem)] text-center">
                                {hasSupporting ? (
                                    <>
                                        {titleParts[0].toUpperCase()}
                                        <br />
                                        <span className="block">W/ {titleParts[1].toUpperCase()}</span>
                                    </>
                                ) : (
                                    show.title.toUpperCase()
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
                    <h3 className="font-[var(--font-dumpling)] text-[clamp(1.25rem,3vw,1.5rem)] text-center mb-0">
                        {formattedDate} - {formattedTime}
                    </h3>
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
                    <div className="max-w-2xl mx-auto text-left">
                        {/* Main Description */}
                        <p className="font-[Courier New] text-base leading-[24px] whitespace-pre-wrap font-bold">{show.description}</p>

                        {/* Second Description if available */}
                        {show.secondDescription && (
                            <p className="font-[var(--font-dumpling)] text-[15px] leading-[24px] whitespace-pre-wrap mt-6 font-bold text-left">{show.secondDescription}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}