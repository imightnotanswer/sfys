'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="py-0">
            {/* Desktop/Tablet Navigation */}
            <div className="hidden sm:block px-4 md:px-8">
                <div className="flex items-center justify-start gap-x-6 md:gap-x-8 -mt-6">
                    <Link
                        href="/"
                        className={`text-[clamp(18px,2vw,36px)] font-[RideSlow] tracking-[0.15em] transition-colors ${isActive('/') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/about"
                        className={`text-[clamp(18px,2vw,36px)] font-[RideSlow] tracking-[0.15em] transition-colors ${isActive('/about') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        ABOUT
                    </Link>
                    <Link
                        href="/contact"
                        className={`text-[clamp(18px,2vw,36px)] font-[RideSlow] tracking-[0.15em] transition-colors ${isActive('/contact') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        CONTACT
                    </Link>
                    <a
                        href="https://touristswelcome.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[clamp(18px,2vw,36px)] font-[RideSlow] tracking-[0.15em] hover:text-[#e43720] transition-colors"
                    >
                        HOTEL
                    </a>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex items-center justify-center gap-x-4 mt-4">
                <Link
                    href="/"
                    className={`text-[clamp(16px,4vw,24px)] font-[RideSlow] tracking-[0.1em] transition-colors ${isActive('/') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    HOME
                </Link>
                <Link
                    href="/about"
                    className={`text-[clamp(16px,4vw,24px)] font-[RideSlow] tracking-[0.1em] transition-colors ${isActive('/about') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    ABOUT
                </Link>
                <Link
                    href="/contact"
                    className={`text-[clamp(16px,4vw,24px)] font-[RideSlow] tracking-[0.1em] transition-colors ${isActive('/contact') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    CONTACT
                </Link>
                <a
                    href="https://touristswelcome.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[clamp(16px,4vw,24px)] font-[RideSlow] tracking-[0.1em] hover:text-[#e43720] transition-colors"
                >
                    HOTEL
                </a>
            </div>
        </nav>
    )
}