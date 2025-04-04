'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa'
import { getImageUrl } from '@/lib/sanity'

interface Flyer {
    _id: string
    title: string
    imageUrls: string[]
}

interface FlyerCarouselProps {
    flyers: Flyer[]
}

export function FlyerCarousel({ flyers }: FlyerCarouselProps) {
    const [currentFlyerIndex, setCurrentFlyerIndex] = useState(0)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [buttonColor, setButtonColor] = useState('#ece8d9')
    const imageRef = useRef<HTMLImageElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const timerRef = useRef<NodeJS.Timeout>()

    if (!flyers || flyers.length === 0) return null

    const currentFlyer = flyers[currentFlyerIndex]

    const resetTimer = () => {
        if (!isPlaying) return;
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(() => {
            if (currentImageIndex === currentFlyer.imageUrls.length - 1) {
                setCurrentFlyerIndex((prev) => (prev + 1) % flyers.length)
                setCurrentImageIndex(0)
            } else {
                setCurrentImageIndex((prev) => prev + 1)
            }
        }, 8000)
    }

    // Function to check if a point is over a transparent area
    const checkTransparency = (x: number, y: number) => {
        if (!imageRef.current || !buttonRef.current) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size to match image
        canvas.width = imageRef.current.naturalWidth
        canvas.height = imageRef.current.naturalHeight

        // Draw the image
        ctx.drawImage(imageRef.current, 0, 0)

        // Get the pixel data at the button position
        const pixel = ctx.getImageData(x, y, 1, 1).data
        const alpha = pixel[3]

        // If alpha is less than 128 (semi-transparent), use dark color
        setButtonColor(alpha < 128 ? '#231f20' : '#ece8d9')
    }

    // Update button color when image loads or changes
    useEffect(() => {
        if (imageRef.current && buttonRef.current) {
            const updateButtonColor = () => {
                const buttonRect = buttonRef.current?.getBoundingClientRect()
                const imageRect = imageRef.current?.getBoundingClientRect()

                if (buttonRect && imageRect) {
                    // Calculate relative position
                    const x = buttonRect.left - imageRect.left
                    const y = buttonRect.top - imageRect.top

                    // Scale coordinates to match image dimensions
                    const scaledX = (x / imageRect.width) * imageRef.current!.naturalWidth
                    const scaledY = (y / imageRect.height) * imageRef.current!.naturalHeight

                    checkTransparency(scaledX, scaledY)
                }
            }

            // Update on image load and window resize
            imageRef.current.addEventListener('load', updateButtonColor)
            window.addEventListener('resize', updateButtonColor)

            return () => {
                imageRef.current?.removeEventListener('load', updateButtonColor)
                window.removeEventListener('resize', updateButtonColor)
            }
        }
    }, [currentImageIndex])

    // Auto-rotate images every 8 seconds
    useEffect(() => {
        if (!isPlaying) return;
        resetTimer()
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [currentFlyer, currentImageIndex, flyers.length, isPlaying])

    const nextImage = () => {
        if (currentImageIndex === currentFlyer.imageUrls.length - 1) {
            setCurrentFlyerIndex((prev) => (prev + 1) % flyers.length)
            setCurrentImageIndex(0)
        } else {
            setCurrentImageIndex((prev) => prev + 1)
        }
        resetTimer()
    }

    const prevImage = () => {
        if (currentImageIndex === 0) {
            setCurrentFlyerIndex((prev) => (prev - 1 + flyers.length) % flyers.length)
            setCurrentImageIndex(flyers[(currentFlyerIndex - 1 + flyers.length) % flyers.length].imageUrls.length - 1)
        } else {
            setCurrentImageIndex((prev) => prev - 1)
        }
        resetTimer()
    }

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                {currentFlyer?.title && (
                    <h1 className="text-[clamp(2.5rem,4vw,5rem)] md:text-[clamp(3.25rem,5.5vw,4.5rem)] font-[var(--font-benditos)] tracking-wide text-center mb-6">
                        {currentFlyer.title}
                    </h1>
                )}
                <div className="relative aspect-[3/4] w-full" style={{ position: "relative" }}>
                    {currentFlyer?.imageUrls?.[currentImageIndex] && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ position: "absolute" }}>
                            <div className="relative w-full h-full flex items-center justify-center" style={{ position: "relative" }}>
                                <Image
                                    ref={imageRef}
                                    src={getImageUrl(currentFlyer.imageUrls[currentImageIndex])}
                                    alt={currentFlyer.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                    quality={85}
                                    style={{ position: "absolute" }}
                                />
                                {(currentFlyer.imageUrls.length > 1 || flyers.length > 1) && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:-translate-x-1"
                                            aria-label="Previous image"
                                        >
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:translate-x-1"
                                            aria-label="Next image"
                                        >
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                        <button
                                            ref={buttonRef}
                                            onClick={togglePlayPause}
                                            className="absolute left-4 bottom-[15%] p-2 transition-colors z-10"
                                            style={{ color: buttonColor }}
                                            aria-label={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
                                        >
                                            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 