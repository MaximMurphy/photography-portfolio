import type { NextConfig } from "next";

const S3_BUCKET_URL = process.env.NEXT_PUBLIC_S3_BUCKET_URL;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [S3_BUCKET_URL || ""], // Add your S3 bucket domain
    unoptimized: process.env.NODE_ENV === "development", // Optional: disable optimization in development
  },
};

export default nextConfig;
