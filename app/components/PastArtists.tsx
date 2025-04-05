'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { getImageUrl } from '@/lib/sanity'

interface PastArtist {
    _id: string
    name: string
    website?: string
    imageUrl: string | null
}

export function PastArtists({ artists }: { artists: PastArtist[] }) {
    const [visibleCount, setVisibleCount] = useState(36)
    const hasMore = visibleCount < artists.length

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 36, artists.length))
    }

    return (
        <div className="py-16 -mt-40">
            <h2 className="text-[min(8vw,4rem)] font-[var(--font-benditos)] tracking-wide text-center mb-16 whitespace-nowrap">
                PAST SLUMBER-ERS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {artists.slice(0, visibleCount).map((artist, index) => (
                    <ArtistCard key={artist._id} artist={artist} index={index} />
                ))}
            </div>
            {hasMore && (
                <div className="flex justify-center mt-32">
                    <button
                        onClick={loadMore}
                        className="font-['Courier New'] text-[14px] px-8 py-4 border-2 border-[#231f20] hover:bg-[#231f20] hover:text-[#ece8d9] transition-colors"
                    >
                        LOAD MORE ARTISTS
                    </button>
                </div>
            )}
        </div>
    )
}

function ArtistCard({ artist, index }: { artist: PastArtist; index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-20%" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.3),
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className="text-center"
        >
            {artist.website ? (
                <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    {artist.imageUrl && (
                        <div className="relative aspect-square mb-4 max-w-[300px] mx-auto" style={{ position: "relative" }}>
                            <div className="absolute inset-0" style={{ position: "absolute" }}>
                                <Image
                                    src={getImageUrl(artist.imageUrl)}
                                    alt={artist.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                                    style={{ position: "absolute" }}
                                />
                            </div>
                        </div>
                    )}
                    <span className="font-['Courier New'] font-bold text-base leading-[20px] text-[#231f20] group-hover:text-[#e43720] transition-colors">
                        {artist.name}
                    </span>
                </a>
            ) : (
                <div className="block group">
                    {artist.imageUrl && (
                        <div className="relative aspect-square mb-4 max-w-[300px] mx-auto" style={{ position: "relative" }}>
                            <div className="absolute inset-0" style={{ position: "absolute" }}>
                                <Image
                                    src={getImageUrl(artist.imageUrl)}
                                    alt={artist.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                                    style={{ position: "absolute" }}
                                />
                            </div>
                        </div>
                    )}
                    <span className="font-['Courier New'] font-bold text-base leading-[20px] text-[#231f20] group-hover:text-[#e43720] transition-colors">
                        {artist.name}
                    </span>
                </div>
            )}
        </motion.div>
    )
} 