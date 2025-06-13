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

  // External packages for server components
  serverExternalPackages: ['socket.io'],
  // Webpack configuration for Socket.IO
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('socket.io-client');
    }
    return config;

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
