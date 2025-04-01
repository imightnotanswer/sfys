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

    return (
        <main className="min-h-screen">
            <section className="bg-[#ece8d9] text-[#231f20] py-12">
                <div className="editorial-layout">
                    <div className="col-span-12 flex flex-col gap-8">
                        {flyers.length > 0 && <FlyerCarousel flyers={flyers} />}
                        <div className="max-w-2xl mx-auto w-full">
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