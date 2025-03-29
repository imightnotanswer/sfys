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
    const imageRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number>()
    const lastScrollY = useRef(0)

    console.log('ContactPhotoCarousel props:', {
        photos,
        defaultImageUrl,
        currentPhotoIndex,
        currentImageIndex,
        currentPhotoUrls: photos?.[currentPhotoIndex]?.imageUrls,
        totalPhotos: photos?.length,
        totalImagesInCurrentPhoto: photos?.[currentPhotoIndex]?.imageUrls?.length
    }); // Debug log

    // Parallax effect with RAF for smooth animation
    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current || !containerRef.current) return;

            const container = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only apply parallax when the container is in view
            if (container.top < windowHeight && container.bottom > 0) {
                const scrollPosition = window.scrollY;
                const containerTop = container.top;
                const containerHeight = container.height;

                // Calculate how far through the container we've scrolled (0 to 1)
                const scrollProgress = Math.max(0, Math.min(1,
                    (windowHeight - containerTop) / (windowHeight + containerHeight)
                ));

                // Calculate scroll delta for smoother movement
                const scrollDelta = scrollPosition - lastScrollY.current;
                lastScrollY.current = scrollPosition;

                // Create a more dynamic parallax effect with smoother transitions
                const parallaxOffset = -(scrollPosition * 0.5 * (1 + scrollProgress));
                const rotation = (scrollProgress - 0.5) * 2; // -1 to 1

                // Use requestAnimationFrame for smooth animation
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                }

                rafRef.current = requestAnimationFrame(() => {
                    if (imageRef.current) {
                        imageRef.current.style.transform = `
                            translateY(${parallaxOffset}px)
                            rotate(${rotation}deg)
                        `;
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial position

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        if (!photos || photos.length === 0) return;

        const timer = setInterval(() => {
            if (currentImageIndex === photos[currentPhotoIndex].imageUrls.length - 1) {
                setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
                setCurrentImageIndex(0)
            } else {
                setCurrentImageIndex((prev) => prev + 1)
            }
        }, 4000)

        return () => clearInterval(timer)
    }, [currentPhotoIndex, currentImageIndex, photos])

    const nextImage = () => {
        if (currentImageIndex === photos[currentPhotoIndex].imageUrls.length - 1) {
            setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
            setCurrentImageIndex(0)
        } else {
            setCurrentImageIndex((prev) => prev + 1)
        }
    }

    const prevImage = () => {
        if (currentImageIndex === 0) {
            setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
            setCurrentImageIndex(photos[(currentPhotoIndex - 1 + photos.length) % photos.length].imageUrls.length - 1)
        } else {
            setCurrentImageIndex((prev) => prev - 1)
        }
    }

    // If no photos are available or photos array is empty, render the default image with parallax
    if (!photos || photos.length === 0 || !photos[0]?.imageUrls?.length) {
        console.log('Using default image because:', {
            noPhotos: !photos,
            emptyArray: photos?.length === 0,
            noImageUrls: photos?.[0]?.imageUrls?.length === 0
        }); // Debug log
        return (
            <div className="relative w-full overflow-hidden" ref={containerRef}>
                <div
                    ref={imageRef}
                    className="w-full will-change-transform"
                    style={{ transform: 'translateY(0)', transition: 'transform 16ms linear' }}
                >
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
            </div>
        )
    }

    const currentPhoto = photos[currentPhotoIndex]
    console.log('Current photo:', currentPhoto); // Debug log

    return (
        <div className="relative w-full overflow-hidden" ref={containerRef}>
            <div
                ref={imageRef}
                className="w-full will-change-transform"
                style={{ transform: 'translateY(0)', transition: 'transform 16ms linear' }}
            >
                <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                    <Image
                        src={currentPhoto.imageUrls[currentImageIndex]}
                        alt={currentPhoto.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            </div>
        </div>
    )
} 