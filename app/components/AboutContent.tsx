'use client'

import { ParallaxText } from './ParallaxText'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AboutContentProps {
    paragraphs: {
        firstParagraph: string;
        secondParagraph: string;
        thirdParagraph: string;
    } | null;
}

export function AboutContent({ paragraphs }: AboutContentProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    if (!paragraphs) {
        return null;
    }

    return (
        <section className="py-16 overflow-hidden">
            <div className="w-full">
                <div className="space-y-8 relative flex flex-col items-center" ref={ref}>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="font-['Courier New'] text-[14px] leading-[24px] text-[#231f20] w-full max-w-5xl text-center"
                    >
                        {paragraphs.firstParagraph}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="font-['Courier New'] text-[14px] leading-[24px] text-[#231f20] w-full max-w-5xl text-center"
                    >
                        {paragraphs.secondParagraph}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="font-['Courier New'] text-[14px] leading-[24px] text-[#231f20] w-full max-w-5xl text-center"
                    >
                        {paragraphs.thirdParagraph}
                    </motion.p>
                </div>
                <ParallaxText />
            </div>
        </section>
    )
} 