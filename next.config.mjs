/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
        pathname: '**'
      }
    ]
  }
}

export default nextConfig
