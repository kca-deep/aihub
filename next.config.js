/** @type {import('next').NextConfig} */
const nextConfig = {
  // appDir is now the default in Next.js 14, so we don't need to specify it
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 