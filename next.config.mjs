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
  },
  webpack(config) {
    config.ignoreWarnings = [
      {
        module: /typeorm/,
        message: /Module not found|dependency is an expression/
      }
    ]
    return config
  }
}

export default nextConfig
