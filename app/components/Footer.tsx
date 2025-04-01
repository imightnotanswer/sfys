'use client'

import Link from 'next/link'
import MailingListSignup from './MailingListSignup'

export default function Footer() {
    return (
        <footer className="mt-auto bg-[#231f20] text-[#eceadf] py-4">
            <div className="px-8">
                {/* Desktop Layout */}
                <div className="hidden lg:block text-sm font-['Gotham Narrow']">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6 overflow-hidden min-w-0">
                            <a
                                href="https://goo.gl/maps/KeGVsBu7MZ52"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#e43720] transition-colors whitespace-nowrap"
                            >
                                915 STATE ROAD, NORTH ADAMS, MA 01247
                            </a>
                            <span className="whitespace-nowrap">
                                PHONE OR TEXT: <a
                                    href="tel:413.347.4995"
                                    className="hover:text-[#e43720] transition-colors"
                                >
                                    413.347.4995
                                </a>
                            </span>
                            <a
                                href="mailto:stay@touristswelcome.com"
                                className="hover:text-[#e43720] transition-colors whitespace-nowrap"
                            >
                                stay@touristswelcome.com
                            </a>
                            {/* Links only show on top row at 2xl breakpoint or larger */}
                            <a
                                href="mailto:press@touristswelcome.com"
                                className="hidden 2xl:inline hover:text-[#e43720] transition-colors whitespace-nowrap"
                            >
                                PRESS
                            </a>
                            <a
                                href="https://www.touristswelcome.com/page/faq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden 2xl:inline hover:text-[#e43720] transition-colors whitespace-nowrap"
                            >
                                FAQ
                            </a>
                            <a
                                href="https://www.touristswelcome.com/page/jobs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden 2xl:inline hover:text-[#e43720] transition-colors whitespace-nowrap"
                            >
                                JOBS
                            </a>
                            <a
                                href="https://www.touristswelcome.com/page/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden 2xl:inline hover:text-[#e43720] transition-colors whitespace-nowrap"
                            >
                                PRIVACY POLICY
                            </a>
                        </div>
                        <div className="flex items-center gap-8 ml-8 flex-shrink-0">
                            <div className="w-[200px] flex-shrink-0">
                                <MailingListSignup isFooter={true} />
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <a
                                    href="https://www.facebook.com/touristswelcome"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:[&>svg]:text-[#e43720] transition-colors mt-[-2px]"
                                >
                                    <svg viewBox="0 0 9.309 17.916" width="8" height="16" fill="currentColor" className="text-[#eceadf] transition-colors">
                                        <path d="M8.781,9.744l0.412-3.185H6.039V4.525c0-0.921,0.258-1.552,1.579-1.552h1.69V0.126   C9.013,0.085,8.013,0,6.845,0C4.414,0,2.75,1.484,2.75,4.21v2.349H0v3.185h2.75v8.172h3.289V9.744H8.781z"></path>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.instagram.com/touristswelcome/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:[&>svg]:text-[#e43720] transition-colors mt-[2px]"
                                >
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#eceadf] transition-colors">
                                        <path d="m2.327 0h13.485c1.278 0 2.329 1.05 2.329 2.33v13.484c0 1.283-1.051 2.328-2.329 2.328h-13.485c-1.281 0-2.327-1.045-2.327-2.328v-13.484c0-1.28 1.046-2.33 2.327-2.33m10.89 2.016c-0.45 0-0.816 0.369-0.816 0.818v1.954c0 0.448 0.366 0.817 0.816 0.817h2.051c0.452 0 0.816-0.369 0.816-0.817v-1.954c0-0.449-0.364-0.818-0.816-0.818h-2.051zm2.873 5.656h-1.596c0.152 0.495 0.235 1.017 0.235 1.558 0 3.018-2.529 5.463-5.644 5.463-3.111 0-5.64-2.445-5.64-5.463 0-0.541 0.084-1.062 0.234-1.558h-1.662v7.664c0 0.398 0.324 0.723 0.72 0.723h12.633c0.4 0 0.721-0.324 0.721-0.723v-7.664zm-7.004-2.171c-2.009 0-3.641 1.583-3.641 3.532 0 1.951 1.632 3.529 3.641 3.529 2.015 0 3.645-1.578 3.645-3.529-1e-3 -1.949-1.63-3.532-3.645-3.532"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Links on bottom row whenever not 2xl (meaning at sizes lg through xl) */}
                    <div className="mt-2 flex gap-6 lg:flex 2xl:hidden">
                        <a
                            href="mailto:press@touristswelcome.com"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            PRESS
                        </a>
                        <a
                            href="https://www.touristswelcome.com/page/faq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            FAQ
                        </a>
                        <a
                            href="https://www.touristswelcome.com/page/jobs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            JOBS
                        </a>
                        <a
                            href="https://www.touristswelcome.com/page/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            PRIVACY POLICY
                        </a>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex flex-col gap-6">
                    {/* Top row - address */}
                    <div className="flex flex-col items-center gap-2 text-sm">
                        <a
                            href="https://goo.gl/maps/KeGVsBu7MZ52"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors text-center"
                        >
                            915 STATE ROAD, NORTH ADAMS, MA 01247
                        </a>
                        <div className="text-center">
                            PHONE OR TEXT: <a
                                href="tel:413.347.4995"
                                className="hover:text-[#e43720] transition-colors"
                            >
                                413.347.4995
                            </a>
                        </div>
                        <a
                            href="mailto:stay@touristswelcome.com"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            stay@touristswelcome.com
                        </a>
                    </div>

                    {/* Middle row - links */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                        <a
                            href="mailto:press@touristswelcome.com"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            PRESS
                        </a>
                        <a
                            href="https://www.touristswelcome.com/page/faq"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            FAQ
                        </a>
                        <a
                            href="https://www.touristswelcome.com/page/jobs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            JOBS
                        </a>
                        <a
                            href="https://www.touristswelcome.com/page/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors"
                        >
                            PRIVACY POLICY
                        </a>
                    </div>

                    {/* Bottom row - mailing list and social */}
                    <div className="flex justify-center items-center gap-6">
                        <div className="w-[200px]">
                            <MailingListSignup isFooter={true} />
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.facebook.com/touristswelcome"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:[&>svg]:text-[#e43720] transition-colors mt-[-2px]"
                            >
                                <svg viewBox="0 0 9.309 17.916" width="8" height="16" fill="currentColor" className="text-[#eceadf] transition-colors">
                                    <path d="M8.781,9.744l0.412-3.185H6.039V4.525c0-0.921,0.258-1.552,1.579-1.552h1.69V0.126   C9.013,0.085,8.013,0,6.845,0C4.414,0,2.75,1.484,2.75,4.21v2.349H0v3.185h2.75v8.172h3.289V9.744H8.781z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/touristswelcome/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:[&>svg]:text-[#e43720] transition-colors mt-[2px]"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#eceadf] transition-colors">
                                    <path d="m2.327 0h13.485c1.278 0 2.329 1.05 2.329 2.33v13.484c0 1.283-1.051 2.328-2.329 2.328h-13.485c-1.281 0-2.327-1.045-2.327-2.328v-13.484c0-1.28 1.046-2.33 2.327-2.33m10.89 2.016c-0.45 0-0.816 0.369-0.816 0.818v1.954c0 0.448 0.366 0.817 0.816 0.817h2.051c0.452 0 0.816-0.369 0.816-0.817v-1.954c0-0.449-0.364-0.818-0.816-0.818h-2.051zm2.873 5.656h-1.596c0.152 0.495 0.235 1.017 0.235 1.558 0 3.018-2.529 5.463-5.644 5.463-3.111 0-5.64-2.445-5.64-5.463 0-0.541 0.084-1.062 0.234-1.558h-1.662v7.664c0 0.398 0.324 0.723 0.72 0.723h12.633c0.4 0 0.721-0.324 0.721-0.723v-7.664zm-7.004-2.171c-2.009 0-3.641 1.583-3.641 3.532 0 1.951 1.632 3.529 3.641 3.529 2.015 0 3.645-1.578 3.645-3.529-1e-3 -1.949-1.63-3.532-3.645-3.532"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
} 