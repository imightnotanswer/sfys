'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
    variant: 'desktop' | 'mobile'
}

export default function Navigation({ variant }: NavigationProps) {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    if (variant === 'desktop') {
        return (
            <nav>
                <div className="flex items-start gap-x-6 md:gap-x-8">
                    <Link
                        href="/"
                        className={`text-[clamp(20px,2.5vw,28px)] font-[RideSlow] tracking-[0.15em] transition-colors ${isActive('/') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        HOME
                    </Link>
                    <Link
                        href="/about"
                        className={`text-[clamp(20px,2.5vw,28px)] font-[RideSlow] tracking-[0.15em] transition-colors ${isActive('/about') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        ABOUT
                    </Link>
                    <Link
                        href="/contact"
                        className={`text-[clamp(20px,2.5vw,28px)] font-[RideSlow] tracking-[0.15em] transition-colors ${isActive('/contact') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                    >
                        CONTACT
                    </Link>
                    <a
                        href="https://touristswelcome.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[clamp(20px,2.5vw,28px)] font-[RideSlow] tracking-[0.15em] hover:text-[#e43720] transition-colors"
                    >
                        HOTEL
                    </a>
                </div>
            </nav>
        )
    }

    return (
        <nav className="w-full mt-4">
            <div className="flex items-center justify-center gap-x-4">
                <Link
                    href="/"
                    className={`text-[clamp(18px,2.5vw,24px)] font-[RideSlow] tracking-[0.1em] transition-colors ${isActive('/') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    HOME
                </Link>
                <Link
                    href="/about"
                    className={`text-[clamp(18px,2.5vw,24px)] font-[RideSlow] tracking-[0.1em] transition-colors ${isActive('/about') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    ABOUT
                </Link>
                <Link
                    href="/contact"
                    className={`text-[clamp(18px,2.5vw,24px)] font-[RideSlow] tracking-[0.1em] transition-colors ${isActive('/contact') ? 'text-[#e43720]' : 'hover:text-[#e43720]'}`}
                >
                    CONTACT
                </Link>
                <a
                    href="https://touristswelcome.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[clamp(18px,2.5vw,24px)] font-[RideSlow] tracking-[0.1em] hover:text-[#e43720] transition-colors"
                >
                    HOTEL
                </a>
            </div>
        </nav>
    )
}