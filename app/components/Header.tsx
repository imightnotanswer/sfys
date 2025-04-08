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
            <div className="pt-4 w-full">
                {/* Desktop Layout - Only hidden when content would overlap */}
                <div className="hidden md:grid grid-cols-[minmax(0,1fr)_auto] items-start px-4 md:px-8 w-full">
                    {/* Title and Navigation Column */}
                    <div className="flex flex-col min-w-0">
                        <Link href="/" className="block">
                            <h1 className="text-[clamp(42px,6vw,96px)] leading-[1.2] font-[RideSlow] tracking-tight text-[#231f20] hover:text-[#e43720] transition-colors pr-8">
                                SING FOR YOUR SLUMBER
                            </h1>
                        </Link>
                        {/* Navigation directly under title */}
                        <div className="mt-2">
                            <Navigation variant="desktop" />
                        </div>
                    </div>

                    {/* Logo */}
                    <a
                        href="http://singforyourslumber.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-shrink-0"
                    >
                        <Image
                            src="/radio-logo.png"
                            alt="TOURISTS Radio Logo"
                            width={220}
                            height={220}
                            className="object-contain transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(36%)_sepia(97%)_saturate(7025%)_hue-rotate(353deg)_brightness(98%)_contrast(89%)]"
                            sizes="220px"
                        />
                    </a>
                </div>

                {/* Mobile Layout - Only shown when content would overlap */}
                <div className="md:hidden w-full">
                    <div className="flex flex-col items-center px-4">
                        <a
                            href="http://singforyourslumber.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mb-4 w-full max-w-[180px]"
                        >
                            <Image
                                src="/radio-logo.png"
                                alt="TOURISTS Radio Logo"
                                width={180}
                                height={180}
                                className="object-contain transition-all duration-200 group-hover:[filter:brightness(0)_saturate(100%)_invert(36%)_sepia(97%)_saturate(7025%)_hue-rotate(353deg)_brightness(98%)_contrast(89%)]"
                                sizes="180px"
                            />
                        </a>
                        <div className="w-full overflow-visible">
                            <Link href="/" className="block w-full">
                                <h1 className="text-[clamp(32px,6vw,72px)] leading-[1.2] font-[RideSlow] tracking-tight text-[#231f20] hover:text-[#e43720] transition-colors text-center px-2">
                                    SING FOR YOUR SLUMBER
                                </h1>
                            </Link>
                        </div>
                        <Navigation variant="mobile" />
                    </div>
                </div>
            </div>
        </header>
    )
} 