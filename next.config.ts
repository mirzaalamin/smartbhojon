import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

};

module.exports = {
  images: {
    domains: ['images.pexels.com'],
    // ‑‑ or, on v14+, you can use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.pexels.com',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;
