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
                    </div>
                </div>
            </div>
        </footer>
    )
} 