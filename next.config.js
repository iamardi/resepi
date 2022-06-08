/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'spoonacular.com',
      'images.unsplash.com'
    ]
  }
}

module.exports = nextConfig
