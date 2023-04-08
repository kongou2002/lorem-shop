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

    ],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.API_END_POINT,
  }
}


module.exports = nextConfig
