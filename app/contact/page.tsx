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
                <div className="editorial-layout">
                    <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl uppercase tracking-wide mb-2">Location</h2>
                                    <p className="text-base leading-relaxed">
                                        <a href="https://goo.gl/maps/KeGVsBu7MZ52" target="_blank" rel="noopener noreferrer" className="hover:text-[#e43720] transition-colors">
                                            915 State Road<br />
                                            North Adams, MA 01247
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl uppercase tracking-wide mb-2">Contact</h2>
                                    <div className="space-y-2">
                                        <p className="text-base leading-relaxed">
                                            Phone or Text: <a href="tel:413.347.4995" className="hover:text-[#e43720] transition-colors">413.347.4995</a>
                                        </p>
                                        <p className="text-base leading-relaxed">
                                            <a href="mailto:singforyourslumber@gmail.com" className="hover:text-[#e43720] transition-colors">singforyourslumber@gmail.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl uppercase tracking-wide mb-2">Social</h2>
                                    <div className="space-y-2">
                                        <p className="text-base leading-relaxed">
                                            <a href="https://www.instagram.com/touristswelcome" target="_blank" rel="noopener noreferrer" className="hover:text-[#e43720] transition-colors">Instagram</a>
                                        </p>
                                        <p className="text-base leading-relaxed">
                                            <a href="https://www.facebook.com/touristswelcome" target="_blank" rel="noopener noreferrer" className="hover:text-[#e43720] transition-colors">Facebook</a>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <ShakeText>Let&apos;s Talk</ShakeText>
                                    <p className="text-base leading-relaxed">
                                        If you are an artist interested in performing at TOURISTS, please email
                                    </p>
                                    <ShakeText as="p">
                                        <a href="mailto:eric@touristswelcome.com" className="hover:text-[#e43720] transition-colors font-bold">
                                            eric@touristswelcome.com
                                        </a>
                                    </ShakeText>
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
            </section>
        </div>
    );
} 