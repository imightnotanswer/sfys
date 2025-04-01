'use client'

import { ParallaxText } from './ParallaxText'
import { motion } from 'framer-motion'

interface AboutContentProps {
    paragraphs: {
        firstParagraph: string;
        secondParagraph: string;
        thirdParagraph: string;
    } | null;
}

export function AboutContent({ paragraphs }: AboutContentProps) {
    if (!paragraphs) {
        return null;
    }

    return (
        <section className="py-16 overflow-hidden">
            <div className="editorial-layout">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
                    <div className="max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-['TayManna'] tracking-wide text-center">

                        </h2>
                    </div>
                    <div className="space-y-16 relative flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="font-['Courier New'] text-[14px] leading-[24px] text-[#231f20] max-w-xl text-center"
                        >
                            {paragraphs.firstParagraph}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="font-['Courier New'] text-[14px] leading-[24px] text-[#231f20] max-w-xl text-center"
                        >
                            {paragraphs.secondParagraph}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="font-['Courier New'] text-[14px] leading-[24px] text-[#231f20] max-w-xl text-center"
                        >
                            {paragraphs.thirdParagraph}
                        </motion.p>
                    </div>
                    <ParallaxText />
                </div>
            </div>
        </section>
    )
} 