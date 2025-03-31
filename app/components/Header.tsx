'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navigation from './Navigation'
import MailingListSignup from './MailingListSignup'

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

                    {/* Contact Info (only visible when enough space) */}
                    <div className="text-base space-y-1 font-['Gotham Narrow'] text-center min-[1400px]:block hidden whitespace-normal shrink-0 text-[rgb(93,93,91)]">
                        <a
                            href="https://goo.gl/maps/KeGVsBu7MZ52"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#e43720] transition-colors block"
                        >
                            915 STATE ROAD, NORTH ADAMS, MA 01247
                        </a>
                        <div>
                            PHONE OR TEXT: <a
                                href="tel:413.347.4995"
                                className="hover:text-[#e43720] transition-colors"
                            >
                                413.347.4995
                            </a>
                        </div>
                        <a
                            href="mailto:SINGFORYOURSLUMBER@GMAIL.COM"
                            className="hover:text-[#e43720] transition-colors block"
                        >
                            SINGFORYOURSLUMBER@GMAIL.COM
                        </a>
                    </div>

                    {/* TOURISTS Radio and Mailing List */}
                    <div className="flex flex-col w-[200px] shrink-0 min-[1300px]:block hidden">
                        <div className="w-full flex justify-end">
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <a
                                    href="https://open.spotify.com/user/59e35uquka5jra1pj969r2j4c?si=9486ca3e2e0149fc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] leading-[32px] hover:text-[#e43720] transition-colors font-['Gotham Narrow'] font-[600] tracking-[0.15em] uppercase"
                                >
                                    Tourists Radio
                                </a>
                                <svg viewBox="0 0 80 34" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m8.911 3.76c-0.311 0.151-0.574-0.178-0.843-0.07-0.128 0.375 6e-3 0.804 0.106 1.299 0.062 0.306 0.363 1.067-0.034 1.156-0.514 0.117-0.591-1.156-0.668-1.542-0.133-0.677-0.349-1.271-0.174-1.79 0.293-0.151 0.56 0.146 0.806 0.036 0.19-0.929-0.705-1.898-0.385-2.842 0.626-0.118 0.74 1.268 0.876 1.789 0.199 0.76 0.533 1.437 0.316 1.964" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    <path d="m3.475 7.513c0.227 0.289 0.78 0.323 1.191 0.422 0.283 0.067 1.105 0.122 1.087 0.526-0.023 0.556-1.382 0.036-1.683-0.035-0.414-0.098-1.613-0.219-1.683-0.596-0.059-0.299 0.393-0.499 0.35-0.701-0.058-0.289-1.082-0.322-1.437-0.387-0.433-0.078-1.29-0.094-1.3-0.492-0.01-0.506 0.773-0.228 1.265-0.14 0.666 0.12 1.249 0.196 1.894 0.315 0.288 0.053 0.697 0.133 0.737 0.352 0.069 0.38-0.306 0.276-0.421 0.736" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    <path d="m13.12 8.741c-0.192-0.211 0.07-0.689-0.105-0.876-0.43 7e-3 -0.791 0.196-1.264 0.385-0.241 0.098-1.057 0.578-1.157 0.106-0.096-0.46 1.14-0.744 1.475-0.877 0.598-0.238 1.101-0.585 1.683-0.491 0.226 0.176-0.045 0.632 0.14 0.842 0.788-0.193 1.664-0.726 2.351-1.017 0.176-0.076 0.406 0.132 0.421 0.245 0.04 0.312-0.499 0.469-0.771 0.596-0.608 0.284-1.221 0.558-1.824 0.842-0.29 0.136-0.592 0.421-0.949 0.245" clip-rule="evenodd" fill-rule="evenodd"></path>
                                    <path d="m8.595 21.298c-0.297 0.375-0.176 1.078-0.176 1.684v3.684c0 0.51 0.15 1.52-0.315 1.508-0.459-0.01-0.316-1.018-0.316-1.543v-3.719c0-0.604 0.082-1.246-0.104-1.717-0.792 0.293-1.476 0.76-2.246 1.227-0.298 0.182-0.717 0.41-1.087 0.631-0.358 0.215-0.849 0.43-1.052 0.668-0.238 0.277-0.328 0.875-0.49 1.367-0.079 0.236-0.284 1.262-0.738 1.123-0.388-0.119 0.013-0.914 0.07-1.088 0.411-1.242 0.738-2.203 1.123-3.367 1.419-4.289 2.746-7.958 4.244-12.207 0.065-0.187 0.26-1.209 0.561-1.157 0.556 0.095 0.75 1.539 0.911 2.069 1.527 4.949 2.921 9.605 4.49 14.697 0.079 0.252 0.371 0.959 0 1.053-0.454 0.113-0.614-0.877-0.7-1.158-0.171-0.557-0.219-1.098-0.421-1.402-0.159-0.24-0.58-0.426-0.913-0.633-0.958-0.595-1.838-1.214-2.841-1.72" clip-rule="evenodd" fill-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="w-[200px]">
                                <MailingListSignup />
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 justify-end">
                            <a
                                href="https://facebook.com/touristswelcome"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#e43720] transition-colors"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com/touristswelcome"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#e43720] transition-colors"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="m2.327 0h13.485c1.278 0 2.329 1.05 2.329 2.33v13.484c0 1.283-1.051 2.328-2.329 2.328h-13.485c-1.281 0-2.327-1.045-2.327-2.328v-13.484c0-1.28 1.046-2.33 2.327-2.33m10.89 2.016c-0.45 0-0.816 0.369-0.816 0.818v1.954c0 0.448 0.366 0.817 0.816 0.817h2.051c0.452 0 0.816-0.369 0.816-0.817v-1.954c0-0.449-0.364-0.818-0.816-0.818h-2.051zm2.873 5.656h-1.596c0.152 0.495 0.235 1.017 0.235 1.558 0 3.018-2.529 5.463-5.644 5.463-3.111 0-5.64-2.445-5.64-5.463 0-0.541 0.084-1.062 0.234-1.558h-1.662v7.664c0 0.398 0.324 0.723 0.72 0.723h12.633c0.4 0 0.721-0.324 0.721-0.723v-7.664zm-7.004-2.171c-2.009 0-3.641 1.583-3.641 3.532 0 1.951 1.632 3.529 3.641 3.529 2.015 0 3.645-1.578 3.645-3.529-1e-3 -1.949-1.63-3.532-3.645-3.532"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
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