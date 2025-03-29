import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Get all unprocessed shows that have already happened
        const pastShows = await client.fetch(`
            *[_type == "show" && dateTime(date) < dateTime(now()) && !processed] {
                _id,
                artistName,
                artistWebsite,
                "imageUrl": image.asset->url
            }
        `)

        for (const show of pastShows) {
            // Check if artist already exists as a past artist
            const artistExists = await client.fetch(`
                *[_type == "pastArtist" && name == $name][0]
            `, { name: show.artistName })

            // If not, create a past artist entry
            if (!artistExists) {
                await client.create({
                    _type: 'pastArtist',
                    name: show.artistName,
                    website: show.artistWebsite,
                    image: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: show.imageUrl.split('image-')[1].split('-')[0]
                        }
                    }
                })
            }

            // Mark the show as processed
            await client.patch(show._id)
                .set({ processed: true })
                .commit()
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${pastShows.length} past shows`
        })
    } catch (error) {
        console.error('Error processing past shows:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to process past shows'
        }, { status: 500 })
    }
} 