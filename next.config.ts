import type { NextConfig } from "next";

interface CustomNextConfig extends NextConfig {
  turbopack?: {
    resolveAlias?: Record<string, string | string[]>;
  };
}

const nextConfig: CustomNextConfig = {
  // Correct key name → This disables turbopack safely
  turbopack: {
    resolveAlias: {},
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
        hostname: "picsum.photos",
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
