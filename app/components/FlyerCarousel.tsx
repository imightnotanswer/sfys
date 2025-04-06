'use client'

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { getImageUrl } from '@/lib/sanity'

interface Flyer {
    _id: string
    title: string
    imageUrls: string[]
}

interface FlyerCarouselProps {
    flyers: Flyer[]
}

// Custom hook for carousel rotation
function useCarouselRotation(
    currentImageIndex: number,
    currentFlyerIndex: number,
    totalImages: number,
    totalFlyers: number,
    onRotate: (nextFlyerIndex: number, nextImageIndex: number) => void
) {
    const timerRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        const rotate = () => {
            if (currentImageIndex === totalImages - 1) {
                onRotate((currentFlyerIndex + 1) % totalFlyers, 0)
            } else {
                onRotate(currentFlyerIndex, currentImageIndex + 1)
            }
        }

        timerRef.current = setInterval(rotate, 8000)

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [currentImageIndex, currentFlyerIndex, totalImages, totalFlyers, onRotate])

    return timerRef
}

// Memoized navigation buttons component
const NavigationButtons = memo(function NavigationButtons({
    onPrev,
    onNext
}: {
    onPrev: () => void
    onNext: () => void
}) {
    return (
        <>
            <button
                onClick={onPrev}
                className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:-translate-x-1 transform-gpu"
                aria-label="Previous image"
            >
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={onNext}
                className="absolute right-[5%] top-1/2 -translate-y-1/2 text-[#ece8d9] hover:text-[#231f20] transition-all active:scale-90 active:translate-x-1 transform-gpu"
                aria-label="Next image"
            >
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </>
    )
})

export function FlyerCarousel({ flyers }: FlyerCarouselProps) {
    const [state, setState] = useState({
        flyerIndex: 0,
        imageIndex: 0
    })
    const imageRef = useRef<HTMLImageElement>(null)

    if (!flyers || flyers.length === 0) return null

    const currentFlyer = useMemo(() => flyers[state.flyerIndex], [flyers, state.flyerIndex])
    const showNavigation = useMemo(() =>
        currentFlyer.imageUrls.length > 1 || flyers.length > 1,
        [currentFlyer.imageUrls.length, flyers.length]
    )

    const handleRotate = useCallback((nextFlyerIndex: number, nextImageIndex: number) => {
        setState({ flyerIndex: nextFlyerIndex, imageIndex: nextImageIndex })
    }, [])

    useCarouselRotation(
        state.imageIndex,
        state.flyerIndex,
        currentFlyer.imageUrls.length,
        flyers.length,
        handleRotate
    )

    const handleNext = useCallback(() => {
        setState(prev => {
            if (prev.imageIndex === currentFlyer.imageUrls.length - 1) {
                return {
                    flyerIndex: (prev.flyerIndex + 1) % flyers.length,
                    imageIndex: 0
                }
            }
            return {
                ...prev,
                imageIndex: prev.imageIndex + 1
            }
        })
    }, [currentFlyer.imageUrls.length, flyers.length])

    const handlePrev = useCallback(() => {
        setState(prev => {
            if (prev.imageIndex === 0) {
                const newFlyerIndex = (prev.flyerIndex - 1 + flyers.length) % flyers.length
                return {
                    flyerIndex: newFlyerIndex,
                    imageIndex: flyers[newFlyerIndex].imageUrls.length - 1
                }
            }
            return {
                ...prev,
                imageIndex: prev.imageIndex - 1
            }
        })
    }, [flyers])

    return (
        <div className="w-full">
            <div className="flex flex-col items-center">
                {currentFlyer?.title && (
                    <h1 className="text-[clamp(2.5rem,4vw,5rem)] md:text-[clamp(3.25rem,5.5vw,4.5rem)] font-[var(--font-benditos)] tracking-wide text-center mb-6">
                        {currentFlyer.title}
                    </h1>
                )}
                <div className="relative aspect-[3/4] w-full max-w-4xl mx-auto">
                    {currentFlyer?.imageUrls?.[state.imageIndex] && (
                        <>
                            <Image
                                ref={imageRef}
                                src={currentFlyer.imageUrls[state.imageIndex]}
                                alt={currentFlyer.title}
                                fill
                                className="object-contain will-change-transform"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                quality={85}
                                priority={state.flyerIndex === 0 && state.imageIndex === 0}
                                loading={state.flyerIndex === 0 && state.imageIndex === 0 ? 'eager' : 'lazy'}
                            />
                            {showNavigation && (
                                <NavigationButtons
                                    onPrev={handlePrev}
                                    onNext={handleNext}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
} 