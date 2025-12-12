import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {}, // 👈 Add this line

  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@components": "./src/components",
      "@lib": "./src/lib",
      "@styles": "./src/styles",
    };

    return config;
  },
};

export default nextConfig;
