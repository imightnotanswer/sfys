'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function AnimatedTitle() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    return (
        <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[min(10vw,5rem)] font-[var(--font-bartender)] tracking-wide text-center mb-8"
        >
            UPCOMING SHOWS
        </motion.h2>
    )
} 