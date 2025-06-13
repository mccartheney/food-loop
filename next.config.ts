import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows any hostname
      },
      {
        protocol: "http",
        hostname: "**", // This allows any hostname for http as well, if needed
      },
    ],
  },
  typescript: {
    // Ignora erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  // ...rest of your configurations...
};

export default nextConfig;

// If you are using ES Modules (next.config.mjs):
// export default nextConfig;
