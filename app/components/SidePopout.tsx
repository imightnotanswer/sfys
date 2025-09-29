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
    const [popoutBottom, setPopoutBottom] = useState(0);
    const initializedRef = useRef(false);

    // Function to calculate optimal bottom position for the + button
    const calculateBottomPosition = (forceMobile = null) => {
        const mobileCheck = forceMobile !== null ? forceMobile : isMobile;
        if (mobileCheck) {
            setPopoutBottom(0);
            return;
        }

        // Find the footer element
        const footer = document.querySelector('footer');
        if (!footer) {
            setPopoutBottom(0);
            return;
        }

        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const footerTop = footerRect.top;

        // If footer is visible, position the + button at the top edge of the footer
        if (footerTop < viewportHeight && footerTop > 0) {
            // Position the + button exactly at the top edge of the footer
            const newBottom = viewportHeight - footerTop;
            setPopoutBottom(newBottom);
        } else {
            // Footer not in view, stick to bottom
            setPopoutBottom(0);
        }
    };

    // Run once on component mount to set initial state
    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        // Check if mobile - use a more reliable detection
        const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(mobile);

        // Check if user has manually closed it in this session
        const manuallyClosed = localStorage.getItem('touristsRadioManuallyClosed');

        // Set initial state based on device and previous actions
        // Open on desktop by default, unless previously closed
        setIsOpen(!mobile && !manuallyClosed);

        // Calculate initial position
        setTimeout(() => calculateBottomPosition(mobile), 100);
    }, []);

    // Separate useEffect for scroll and resize events
    useEffect(() => {
        if (isMobile) return;

        const handleScroll = () => {
            calculateBottomPosition();
        };

        const handleResize = () => {
            const isMobileView = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(isMobileView);
            if (!isMobileView) {
                calculateBottomPosition();
            }
        };

        document.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Also recalculate on a timer to catch any missed updates
        const interval = setInterval(() => {
            if (!isMobile) {
                calculateBottomPosition();
            }
        }, 100);

        return () => {
            document.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, [isMobile]);

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
        <div className={`fixed z-50 ${position === 'left' ? 'left-0' : 'right-0'}`} style={{ bottom: `${popoutBottom}px` }}>
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
                    maxHeight: 'calc(100vh - 320px)', // Leave space for header and footer
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
                <div style={{ height: '80px', overflow: 'hidden' }}>
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