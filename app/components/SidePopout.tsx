'use client'

import { useState, useEffect } from 'react'

interface SidePopoutProps {
    playlistId: string;
    title?: string;
    position?: 'left' | 'right';
}

export default function SidePopout({
    playlistId,
    title = "TOURISTS ALL DAY",
    position = 'left',
}: SidePopoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    // Initialize based on screen size and handle resize
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768; // Standard md breakpoint
            setIsMobile(mobile);
            // Set initial state based on screen size (open on desktop, closed on mobile)
            setIsOpen(!mobile);
        };

        // Check on initial load
        checkScreenSize();

        // Listen for window resize events
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const popout = document.getElementById('side-popout');
            const toggleButton = document.getElementById('popout-toggle');

            if (popout && !popout.contains(e.target as Node) &&
                toggleButton && !toggleButton.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="fixed top-1/3 z-50 transform -translate-y-1/2">
            {/* Popout content */}
            <div
                id="side-popout"
                className={`absolute top-0 transform transition-transform duration-300 ${position === 'left'
                    ? `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full opacity-0 pointer-events-none'}`
                    : `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full opacity-0 pointer-events-none'}`
                    }`}
                style={{ width: '300px', background: '#121212', border: '1px solid #121212' }}
            >
                {/* Header row with toggle button and title - entire header clickable */}
                <div
                    className="flex border-b border-[#121212] bg-[#eceadf] cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Toggle button that's part of the header */}
                    <div className="flex items-center justify-center w-10 h-10 border-r border-[#231f20] text-[#231f20] hover:bg-[#e43720] hover:text-[#eceadf] transition-colors">
                        <span className="text-lg">×</span>
                    </div>

                    {/* Title section */}
                    <div className="flex-grow flex items-center justify-center h-10 px-4">
                        <h2 className="text-center text-sm font-['Gotham Narrow'] uppercase tracking-wider font-bold">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Main content - Spotify player with proper sizing */}
                <div style={{ height: '380px' }}>
                    <iframe
                        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="380"
                        style={{ border: 0 }}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Only show standalone toggle when popout is closed */}
            {!isOpen && (
                <div className={`${position === 'left' ? 'left-0' : 'right-0'} absolute`}>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center justify-center w-10 h-10 bg-[#eceadf] border border-[#231f20] text-[#231f20] hover:bg-[#e43720] hover:text-[#eceadf] transition-colors"
                        aria-label="Open Spotify Player"
                    >
                        <span className="text-lg">+</span>
                    </button>
                </div>
            )}
        </div>
    )
} 