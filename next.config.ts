import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.visitlappi.com",
      },
    ],
  },
};

export default nextConfig;
