import React from 'react';
import { ContactPhotoCarousel } from '../components/ContactPhotoCarousel';
import { ShakeText } from '../components/ShakeText';
import { getContactPhotos } from '@/lib/sanity';

const DEFAULT_CONTACT_IMAGE = '/Tourists_2022-24.jpg'; // Path to the original contact image

// Force dynamic rendering and no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Contact() {
    const contactPhotos = await getContactPhotos();
    console.log('Contact Photos:', contactPhotos); // Debug log

    return (
        <div className="min-h-screen bg-[#ece8d9] text-[#231f20]">
            <section className="py-16 pb-32">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-5xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8 text-center lg:text-left">
                                    <div>
                                        <ShakeText className="font-[var(--font-dumpling)] text-[min(8vw,4rem)]">Let&apos;s Talk</ShakeText>
                                        <p className="text-base leading-relaxed font-['Courier New'] font-bold">
                                            If you are an artist interested in performing at TOURISTS, please email{' '}
                                            <a href="mailto:eric@touristswelcome.com" className="hover:text-[#e43720] transition-colors">
                                                eric@touristswelcome.com
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-8 lg:sticky lg:top-8">
                                    <ContactPhotoCarousel
                                        photos={contactPhotos}
                                        defaultImageUrl={DEFAULT_CONTACT_IMAGE}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 