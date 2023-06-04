/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.discordapp.com']
  },
  experimental: {
    typedRoutes: true,
  },

}

module.exports = nextConfig
