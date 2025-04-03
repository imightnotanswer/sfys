// Force Vercel redeploy - test auto-deploy
// Testing Vercel auto-deploy connection
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SidePopout from './components/SidePopout'

const spaceMono = Space_Mono({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-space-mono',
})

// Register TAYWingman font
const wingman = localFont({
    src: '../public/fonts/TAYWingman.otf',
    variable: '--font-wingman'
})

const gothamNarrow = localFont({
    src: '../public/fonts/GothamNarrow-Black.otf',
    variable: '--font-gotham-narrow',
})

// Register TAYBartender font
const bartender = localFont({
    src: '../public/fonts/TAYBartender.otf',
    variable: '--font-bartender',
})

// Register TAYDumpling font
const dumpling = localFont({
    src: '../public/fonts/TAYDumpling.otf',
    variable: '--font-dumpling',
})

// Register TAYBea font
const bea = localFont({
    src: '../public/fonts/TAYBea.otf',
    variable: '--font-bea',
})

// Register TayManna font
const manna = localFont({
    src: '../public/fonts/TayManna.otf',
    variable: '--font-manna',
})

// Register TAYBenditos font
const benditos = localFont({
    src: '../public/fonts/TAYBenditos.otf',
    variable: '--font-benditos',
})

export const metadata: Metadata = {
    title: 'Sing For Your Slumber',
    description: 'A live music series in North Adams, MA',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${spaceMono.variable} ${wingman.variable} ${gothamNarrow.variable} ${bartender.variable} ${dumpling.variable} ${bea.variable} ${manna.variable} ${benditos.variable} font-sans antialiased bg-[#ece8d9] text-[#231f20]`}>
            <body className="min-h-screen flex flex-col">
                {/* Spotify Player Popout with TOURISTS RADIO playlist */}
                <SidePopout
                    playlistId="4l1KrbFrjYyIFjxFbB8KDH"
                    title="TOURISTS RADIO"
                    position="left"
                />

                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <div className="flex flex-col items-center py-12">
                    <img
                        src="/bose.png"
                        alt="Powered by Bose"
                        className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] px-4"
                    />
                    <div className="flex items-center gap-6 mt-4">
                        <a
                            href="https://www.facebook.com/touristswelcome"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:[&>svg]:text-[#e43720] transition-colors"
                        >
                            <svg viewBox="0 0 9 19" width="32" height="32" fill="currentColor" className="text-[#231f20] transition-colors">
                                <path d="M8.781,9.744l0.412-3.185H6.039V4.525c0-0.921,0.258-1.552,1.579-1.552h1.69V0.126   C9.013,0.085,8.013,0,6.845,0C4.414,0,2.75,1.484,2.75,4.21v2.349H0v3.185h2.75v8.172h3.289V9.744H8.781z"></path>
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/touristswelcome/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:[&>svg]:text-[#e43720] transition-colors"
                        >
                            <svg viewBox="0 -4 24 24" width="32" height="32" fill="currentColor" className="text-[#231f20] transition-colors mt-1">
                                <path d="m2.327 0h13.485c1.278 0 2.329 1.05 2.329 2.33v13.484c0 1.283-1.051 2.328-2.329 2.328h-13.485c-1.281 0-2.327-1.045-2.327-2.328v-13.484c0-1.28 1.046-2.33 2.327-2.33m10.89 2.016c-0.45 0-0.816 0.369-0.816 0.818v1.954c0 0.448 0.366 0.817 0.816 0.817h2.051c0.452 0 0.816-0.369 0.816-0.817v-1.954c0-0.449-0.364-0.818-0.816-0.818h-2.051zm2.873 5.656h-1.596c0.152 0.495 0.235 1.017 0.235 1.558 0 3.018-2.529 5.463-5.644 5.463-3.111 0-5.64-2.445-5.64-5.463 0-0.541 0.084-1.062 0.234-1.558h-1.662v7.664c0 0.398 0.324 0.723 0.72 0.723h12.633c0.4 0 0.721-0.324 0.721-0.723v-7.664zm-7.004-2.171c-2.009 0-3.641 1.583-3.641 3.532 0 1.951 1.632 3.529 3.641 3.529 2.015 0 3.645-1.578 3.645-3.529-1e-3 -1.949-1.63-3.532-3.645-3.532"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <Footer />
            </body>
        </html>
    )
} 