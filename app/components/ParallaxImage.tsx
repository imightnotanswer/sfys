'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ParallaxImage() {
    const imageRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!imageRef.current || !containerRef.current) return;

            const container = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only apply parallax when the container is in view
            if (container.top < windowHeight && container.bottom > 0) {
                // Calculate how far we've scrolled
                const scrollPosition = window.scrollY;

                // Calculate a parallax offset based on scroll position
                // Increased range to 200px for more noticeable effect
                const parallaxOffset = -(scrollPosition * 0.3);

                // Apply the transform
                imageRef.current.style.transform = `translateY(${parallaxOffset}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full overflow-hidden" ref={containerRef}>
            <div
                ref={imageRef}
                className="w-full will-change-transform"
                style={{ transform: 'translateY(0)', transition: 'transform 16ms linear' }}
            >
                <div className="relative aspect-[2/3] w-full max-w-md mx-auto">
                    <Image
                        src="/Tourists_2022-24.jpg"
                        alt="TOURISTS venue"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            </div>
        </div>
    );
} 