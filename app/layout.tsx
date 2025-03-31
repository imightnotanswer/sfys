import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'

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
        <html lang="en" className={`${spaceMono.variable} ${wingman.variable} ${gothamNarrow.variable} font-sans antialiased bg-[#ece8d9] text-[#231f20]`}>
            <body className="min-h-screen flex flex-col">
                <div className="bg-[#231f20] text-[#eceadf] flex items-center justify-center py-1 w-full">
                    <p className="font-['Prestige Elite Std'] font-bold text-[14px] leading-[20px] italic max-w-3xl mx-auto px-4">
                        BE IN THE KNOW ABOUT UPCOMING SHOWS
                    </p>
                </div>
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