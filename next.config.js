/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randommer.io',
        port: '',
        pathname: '/**/**/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/**/**/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
      },
    ],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.API_END_POINT,
  }
}


module.exports = nextConfig
