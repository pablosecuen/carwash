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
  experimental: {
    serverComponentsExternalPackages: ['typeorm']
  },
  webpack(config) {
    config.ignoreWarnings = [
      {
        module: /typeorm/,
        message: /Module not found|dependency is an expression/
      }
    ]
    config.optimization.minimize = false
    return config
  }
}

export default nextConfig
