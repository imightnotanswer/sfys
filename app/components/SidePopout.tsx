'use client'

import { useState, useEffect, useRef } from 'react'

interface SidePopoutProps {
    playlistId: string;
    title?: string;
    position?: 'left' | 'right';
}

export default function SidePopout({
    playlistId,
    title = "TOURISTS RADIO",
    position = 'left',
}: SidePopoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const initializedRef = useRef(false);

    // Run once on component mount to set initial state
    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        // Check if mobile
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);

        // Check if user has manually closed it in this session
        const manuallyClosed = localStorage.getItem('touristsRadioManuallyClosed');

        // Set initial state based on device and previous actions
        // Open on desktop by default, unless previously closed
        setIsOpen(!mobile && !manuallyClosed);

        // Set up resize handler
        const handleResize = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            // Note: We don't automatically reopen on resize
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle close with tracking in localStorage
    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('touristsRadioManuallyClosed', 'true');
    };

    // Clear the closed state when manually reopened
    const handleOpen = () => {
        setIsOpen(true);
        localStorage.removeItem('touristsRadioManuallyClosed');
    };

    return (
        <div className={`fixed bottom-0 z-50 ${position === 'left' ? 'left-0' : 'right-0'}`}>
            {/* Popout content */}
            <div
                id="side-popout"
                className={`absolute bottom-0 transform transition-all duration-500 ease-in-out ${position === 'left'
                    ? isOpen
                        ? 'translate-x-0 opacity-100 scale-100'
                        : '-translate-x-full opacity-0 scale-95 pointer-events-none'
                    : isOpen
                        ? 'translate-x-0 opacity-100 scale-100'
                        : 'translate-x-full opacity-0 scale-95 pointer-events-none'
                    }`}
                style={{
                    width: '380px',
                    background: '#121212',
                    border: '1px solid #121212',
                    transformOrigin: position === 'left' ? 'left bottom' : 'right bottom'
                }}
            >
                {/* Header row with toggle button and title - entire header clickable */}
                <div
                    className="flex border-b border-[#121212] bg-[#eceadf] cursor-pointer"
                    onClick={handleClose}
                >
                    {/* Toggle button that's part of the header */}
                    <div className="flex items-center justify-center w-10 h-10 border-r border-[#231f20] text-[#231f20] hover:bg-[#e43720] hover:text-[#eceadf] transition-colors">
                        <span className="text-lg">×</span>
                    </div>

                    {/* Title section */}
                    <div className="flex-grow flex items-center justify-center h-10 px-4">
                        <h2 className="text-center text-lg font-dumpling uppercase tracking-wide font-normal">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Main content - Spotify player with proper sizing */}
                <div style={{ height: '80px' }}>
                    <iframe
                        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            </div>

            {/* Only show standalone toggle when popout is closed */}
            {!isOpen && (
                <div
                    className={`absolute bottom-0 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                        }`}
                >
                    <button
                        id="popout-toggle"
                        onClick={handleOpen}
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