'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Sanity Studio with no SSR
const Studio = dynamic(() => import('./Studio'), { ssr: false })

export default function StudioPage() {
    return <Studio />
} 