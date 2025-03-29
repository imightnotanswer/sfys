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
    mainArtist: {
        name: string
        website?: string
    }
    supportingArtists?: { name: string; website?: string }[]
}

export default async function Home() {
    const shows = await getShows()
    const flyers = await getFlyers()

    return (
        <main className="min-h-screen">
            <section className="bg-[#ece8d9] text-[#231f20] py-12">
                <div className="editorial-layout">
                    <div className="col-span-12">
                        {flyers.length > 0 && <FlyerCarousel flyers={flyers} />}
                        <div className="max-w-2xl mx-auto mb-4">
                            <AnimatedTitle />
                        </div>
                        <div className="max-w-2xl mx-auto -space-y-2">
                            {shows.map((show: Show) => (
                                <ShowCard key={show._id} show={show} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
} 