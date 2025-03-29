'use client'

import { useEffect } from 'react'

export function ParallaxText() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as HTMLElement
                if (entry.isIntersecting) {
                    target.style.opacity = '1'
                    if (target.classList.contains('left')) {
                        target.style.transform = 'translateX(0)'
                    } else if (target.classList.contains('right')) {
                        target.style.transform = 'translateX(0)'
                    } else {
                        target.style.transform = 'translateY(0)'
                    }
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        })

        const texts = document.querySelectorAll('.parallax-text')
        texts.forEach((text, index) => {
            const element = text as HTMLElement
            if (index === 0) {
                element.classList.add('left')
                element.style.transform = 'translateX(-200px)'
            } else if (index === 1) {
                element.classList.add('right')
                element.style.transform = 'translateX(200px)'
            } else {
                element.style.transform = 'translateY(100px)'
            }
            element.style.opacity = '0'
            observer.observe(element)
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    return null
} 