/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 2400000,
};

module.exports = {
  images: {
    domains: [
      "lions.edu.pk",
      "encrypted-tbn0.gstatic.com",
      "images.unsplash.com",
      "images.pexels.com",
    ],
  },
};
