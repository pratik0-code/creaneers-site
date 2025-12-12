import type { NextConfig } from "next";

interface CustomNextConfig extends NextConfig {
  turbo?: {
    resolveAlias?: Record<string, string | string[]>;
  };
}

const nextConfig: CustomNextConfig = {
  // Fixes Vercel Turbopack internal error (forces Webpack for prod build)
  turbo: {
    resolveAlias: {}, // required empty object for safety
  },

  // Enables React strict mode
  reactStrictMode: true,


  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // optional: you use this often
      },
    ],
  },

  // Optional path aliases
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
