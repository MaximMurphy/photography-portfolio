import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "35mm-images.s3.us-east-2.amazonaws.com",
      },
    ],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000, // 1 year caching for images
  },
};

export default nextConfig;
