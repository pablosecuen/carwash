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
    config.module.rules.push({
      test: /pdfkit-table\/index\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'require("pdfkit")',
        replace: 'require("pdfkit").default'
      }
    })
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
