import { getShows } from '@/lib/sanity'
import { getFlyers } from '@/lib/sanity'
import { ShowCard } from './components/ShowCard'
import { FlyerCarousel } from './components/FlyerCarousel'
import { AnimatedTitle } from './components/AnimatedTitle'

// Force dynamic rendering and no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Show {
    _id: string
    title: string
    date: string
    description: string
    imageUrls: string[]
    spotifyLink?: string
}

export default async function Home() {
    const shows = await getShows()
    const flyers = await getFlyers()

    // Check if any flyer has images
    const hasImages = flyers.some(flyer => flyer.imageUrls && flyer.imageUrls.length > 0)

    return (
        <main className="min-h-screen">
            <section className="bg-[#ece8d9] text-[#231f20] py-12">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className={`flex flex-col items-center ${hasImages ? 'gap-8' : 'gap-4'}`}>
                        {hasImages && (
                            <div className="w-full max-w-[800px]">
                                <FlyerCarousel flyers={flyers} />
                            </div>
                        )}
                        <div className={`w-full max-w-2xl ${!hasImages ? 'mt-8' : ''}`}>
                            <AnimatedTitle />
                            <div className="-space-y-2">
                                {shows.length > 0 ? (
                                    shows.map((show: Show) => (
                                        <ShowCard key={show._id} show={show} />
                                    ))
                                ) : (
                                    <p className="text-center font-[var(--font-dumpling)] text-[min(3vw,1.5rem)] mt-8">
                                        No upcoming shows at the moment. Check back soon!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} 