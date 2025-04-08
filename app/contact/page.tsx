import { getContactPhotos, getContactContent } from '@/lib/sanity'
import { ContactPhotoCarousel } from '@/app/components/ContactPhotoCarousel'
import { ShakeText } from '@/app/components/ShakeText'
import { DEFAULT_CONTACT_IMAGE } from '@/lib/constants'

// Force dynamic rendering and no caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Contact() {
    const contactPhotos = await getContactPhotos();
    const contactContent = await getContactContent();
    const defaultContent = {
        title: "Let's Talk",
        content: "If you are an artist interested in performing at TOURISTS, please email",
        email: "eric@touristswelcome.com"
    };

    // Use fallback content if no active content is found
    const { title, content, email } = contactContent || defaultContent;

    return (
        <div className="min-h-screen bg-[#ece8d9] text-[#231f20]">
            <section className="py-8 md:py-16 pb-16 md:pb-32">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-5xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                                <div className="flex flex-col items-center md:items-start">
                                    <ShakeText className="font-[var(--font-dumpling)] text-[min(8vw,4rem)]">
                                        {title}
                                    </ShakeText>
                                    <p className="text-base leading-relaxed font-['Courier New'] font-bold text-center md:text-left mt-4">
                                        {content}{' '}
                                        <a href={`mailto:${email}`} className="hover:text-[#e43720] transition-colors">
                                            {email}
                                        </a>
                                    </p>
                                </div>

                                <div className="flex justify-center md:justify-start mt-4 md:mt-0">
                                    <div className="w-full max-w-md">
                                        <ContactPhotoCarousel
                                            photos={contactPhotos}
                                            defaultImageUrl={DEFAULT_CONTACT_IMAGE}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
} 