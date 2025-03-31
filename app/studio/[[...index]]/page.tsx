'use client'

import dynamic from 'next/dynamic'

// Dynamically import the Sanity Studio
const Studio = dynamic(() => import('./Studio'), { ssr: false })

export default function StudioPage() {
    return <Studio />
} 