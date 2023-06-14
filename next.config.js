/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'cdn.discordapp.com']
  },
  experimental: {
    typedRoutes: true,
    serverActions: true,
    
  },
  // headers() { }
  // redirects() { }
  // rewrites() { }

}

module.exports = nextConfig
