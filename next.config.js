/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/**',
            },
        ],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },
    typescript: {
        // Handle type errors in development
        ignoreBuildErrors: true,
    },
    eslint: {
        // Handle eslint errors in development
        ignoreDuringBuilds: true,
    },
    experimental: {
        // Required for Sanity Studio
        esmExternals: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                crypto: false,
            }
        }
        return config
    },
}

module.exports = nextConfig 