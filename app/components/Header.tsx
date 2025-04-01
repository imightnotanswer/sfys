'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navigation from './Navigation'

export default function Header() {
    return (
        <header className="w-full">
            {/* Main header content */}
            <div className="py-4 pb-0 w-full overflow-x-hidden">
                {/* Desktop and Tablet Layout */}
                <div className="hidden md:flex items-center justify-between gap-8 px-8 max-w-[2000px] mx-auto">
                    {/* Title */}
                    <Link href="/" className="block shrink-0 -mt-4">
                        <h1 className="text-[clamp(48px,5vw,84px)] leading-[0.9] font-[RideSlow] tracking-tight text-[rgb(28, 21, 24)] hover:text-[#e43720] transition-colors whitespace-normal">
                            SING FOR YOUR SLUMBER
                        </h1>
                    </Link>

                    {/* Logo */}
                    <a
                        href="http://touristswelcome.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <Image
                            src="/radio-logo.png"
                            alt="TOURISTS Radio Logo"
                            width={210}
                            height={210}
                            className="object-contain shrink-0 transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(36%)_sepia(97%)_saturate(7025%)_hue-rotate(353deg)_brightness(98%)_contrast(89%)]"
                        />
                    </a>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col items-center gap-4 px-4">
                    <a
                        href="http://touristswelcome.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                    >
                        <Image
                            src="/radio-logo.png"
                            alt="TOURISTS Radio Logo"
                            width={150}
                            height={150}
                            className="object-contain transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(36%)_sepia(97%)_saturate(7025%)_hue-rotate(353deg)_brightness(98%)_contrast(89%)]"
                        />
                    </a>
                    <Link href="/" className="block text-center -mt-4">
                        <h1 className="text-[clamp(36px,8vw,60px)] leading-[0.9] font-[RideSlow] tracking-tight text-[#231f20] hover:text-[#e43720] transition-colors">
                            SING FOR YOUR SLUMBER
                        </h1>
                    </Link>
                </div>
            </div>

            {/* Navigation - responsive styles handled in Navigation component */}
            <div className="mt-0">
                <Navigation />
            </div>
        </header>
    )
} 