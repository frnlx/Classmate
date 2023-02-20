/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.discordapp.com"]
  },
  compiler: {
    styledComponents: true,
  }
}

module.exports = nextConfig
