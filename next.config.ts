import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["jsonwebtoken"],
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "images.unsplash.com", // Unsplash
      "localhost",
    ],
  },
};

export default nextConfig;
