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
                <div className="flex justify-center items-center py-12">
                    <img
                        src="/bose.png"
                        alt="Powered by Bose"
                        className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] px-4"
                    />
                </div>
                <Footer />
            </body>
        </html>
    )
} 