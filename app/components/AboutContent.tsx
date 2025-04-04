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
            <div className="w-full max-w-3xl mx-auto px-4">
                <div className="flex flex-col items-center" ref={ref}>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="font-['Courier New'] text-base leading-[24px] text-[#231f20] max-w-2xl text-center font-bold mb-6"
                    >
                        {paragraphs.firstParagraph.replace('benefit.', 'benefit.')}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="font-['Courier New'] text-base leading-[24px] text-[#231f20] max-w-2xl text-center font-bold mb-6"
                    >
                        {paragraphs.secondParagraph}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="font-['Courier New'] text-base leading-[24px] text-[#231f20] max-w-2xl text-center font-bold"
                    >
                        {paragraphs.thirdParagraph}
                    </motion.p>
                </div>
                <ParallaxText />
            </div>
        </section>
    )
} 