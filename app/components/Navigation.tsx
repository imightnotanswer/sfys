'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="py-0">
            {/* Desktop/Tablet Navigation */}
            <div className="hidden md:block px-8">
                <div className="flex flex-wrap gap-x-8 gap-y-1 -mt-6 justify-start">
                    <Link
                        href="/"
                        className={`text-3xl lg:text-4xl font-[RideSlow] tracking-wide transition-colors ${isActive('/') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/about"
                        className={`text-3xl lg:text-4xl font-[RideSlow] tracking-wide transition-colors ${isActive('/about') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        ABOUT
                    </Link>
                    <Link
                        href="/contact"
                        className={`text-3xl lg:text-4xl font-[RideSlow] tracking-wide transition-colors ${isActive('/contact') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        CONTACT
                    </Link>
                    <a
                        href="https://touristswelcome.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl lg:text-4xl font-[RideSlow] tracking-wide hover:text-[#e43720] transition-colors"
                    >
                        HOTEL
                    </a>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex flex-wrap justify-center gap-x-8 gap-y-1 mt-4">
                <Link
                    href="/"
                    className={`text-2xl font-[RideSlow] tracking-wide transition-colors ${isActive('/') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    HOME
                </Link>
                <Link
                    href="/about"
                    className={`text-2xl font-[RideSlow] tracking-wide transition-colors ${isActive('/about') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    ABOUT
                </Link>
                <Link
                    href="/contact"
                    className={`text-2xl font-[RideSlow] tracking-wide transition-colors ${isActive('/contact') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    CONTACT
                </Link>
                <a
                    href="https://touristswelcome.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-[RideSlow] tracking-wide hover:text-[#e43720] transition-colors"
                >
                    HOTEL
                </a>
            </div>
        </nav>
    )
}