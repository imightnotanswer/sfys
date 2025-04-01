'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { useState } from 'react'

interface ShakeTextProps extends HTMLMotionProps<any> {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function ShakeText({
    children,
    as = 'h2',
    className = "uppercase tracking-wide mb-2",
    ...props
}: ShakeTextProps) {
    const [isHovered, setIsHovered] = useState(false)

    const shakeAnimation = {
        shake: {
            x: [0, -1, 1, -1, 1, -0.5, 0.5, 0],
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            }
        }
    }

    const Component = motion[as]

    return (
        <Component
            className={className}
            animate={isHovered ? "shake" : ""}
            variants={shakeAnimation}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onAnimationComplete={() => setIsHovered(false)}
            {...props}
        >
            {children}
        </Component>
    )
} 