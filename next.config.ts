import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: new URL(process.env.NEXT_PUBLIC_CONVEX_URL!).hostname,
        protocol: "https",
        port: ""
      }
    ]
  }
};

export default nextConfig;
