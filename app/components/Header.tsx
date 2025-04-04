'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from './Navigation'
import { getTopBannerText } from '@/lib/sanity'

export default function Header() {
    const [bannerText, setBannerText] = useState("Be in the know about upcoming shows.")

    useEffect(() => {
        const fetchBannerText = async () => {
            const text = await getTopBannerText()
            setBannerText(text)
        }
        fetchBannerText()
    }, [])

    return (
        <header className="w-full">
            {/* Notice Banner */}
            {/* <div id="notice" className="py-1.5 px-5 bg-[#1c1518]">
                <div className="text-[#eceadf] text-center italic text-[1em] leading-[1.9em] font-['prestige-elite']">
                    {bannerText}
                </div>
            </div> */}

            {/* Main header content */}
            <div className="pt-4 w-full overflow-visible">
                {/* Desktop and Tablet Layout */}
                <div className="hidden md:flex items-center justify-between gap-8 px-8 max-w-[2000px] mx-auto">
                    {/* Title */}
                    <Link href="/" className="block">
                        <h1 className="text-[clamp(48px,8.33vw,96px)] leading-[1.2] font-[RideSlow] tracking-tight text-[rgb(28, 21, 24)] hover:text-[#e43720] transition-colors">
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
                            width={220}
                            height={220}
                            className="object-contain transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(36%)_sepia(97%)_saturate(7025%)_hue-rotate(353deg)_brightness(98%)_contrast(89%)]"
                        />
                    </a>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col items-center justify-center w-full px-6">
                    <a
                        href="http://touristswelcome.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mb-6"
                    >
                        <Image
                            src="/radio-logo.png"
                            alt="TOURISTS Radio Logo"
                            width={220}
                            height={220}
                            className="object-contain transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(36%)_sepia(97%)_saturate(7025%)_hue-rotate(353deg)_brightness(98%)_contrast(89%)]"
                        />
                    </a>
                    <Link href="/" className="block w-full">
                        <h1 className="text-[clamp(42px,10vw,70px)] leading-[1.2] font-[RideSlow] tracking-tight text-[#231f20] hover:text-[#e43720] transition-colors text-center">
                            SING FOR YOUR SLUMBER
                        </h1>
                    </Link>
                </div>
            </div>

            {/* Navigation */}
            <Navigation />
        </header>
    )
} 