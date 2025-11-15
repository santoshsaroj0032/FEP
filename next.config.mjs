/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
    turbo: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
