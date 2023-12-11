/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FE_URL: process.env.NEXT_PUBLIC_FE_URL,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "w7.pngwing.com",
      "i.ibb.co",
      "https://i.ibb.co/R4gtVhC/Vector.png",
    ],
  },
};

module.exports = nextConfig;
