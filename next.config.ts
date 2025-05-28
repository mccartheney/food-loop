import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
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
  // ...rest of your configurations...
};

export default nextConfig;

// If you are using ES Modules (next.config.mjs):
// export default nextConfig;
