/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      "lions.edu.pk",
      "encrypted-tbn0.gstatic.com",
      "images.unsplash.com",
    ],
  },
};
