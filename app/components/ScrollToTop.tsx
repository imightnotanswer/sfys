'use client'

import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const [buttonStyle, setButtonStyle] = useState({ bottom: '2rem' })

    useEffect(() => {
        const toggleVisibility = () => {
            // Calculate scroll percentage relative to total document height
            const scrollPercent = (window.scrollY / document.documentElement.scrollHeight) * 100
            setIsVisible(scrollPercent > 50)

            // Get footer position
            const footer = document.querySelector('footer')
            if (footer) {
                const footerRect = footer.getBoundingClientRect()
                const footerTop = footerRect.top
                const buttonBottom = window.innerHeight - footerTop + 16 // 16px offset from footer

                // If footer is in view, position button above it
                if (footerTop < window.innerHeight) {
                    setButtonStyle({ bottom: `${buttonBottom}px` })
                } else {
                    setButtonStyle({ bottom: '2rem' })
                }
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        toggleVisibility() // Initial check

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            <button
                onClick={scrollToTop}
                style={{
                    ...buttonStyle,
                    opacity: isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden'
                }}
                className="fixed right-4 text-[#231f20] p-3 hover:text-[#3a3536] transition-all duration-500 z-50"
                aria-label="Scroll to top"
            >
                <FaArrowUp className="w-8 h-8" />
            </button>
        </>
    )
} 