import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://media.dodostatic.net/image/**')],
  }
};

export default nextConfig;
