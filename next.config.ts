import type { NextConfig } from "next";

const S3_BUCKET_URL = "https://35mm-images.s3.us-east-2.amazonaws.com";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [S3_BUCKET_URL || ""], // Add your S3 bucket domain
    unoptimized: process.env.NODE_ENV === "development", // Optional: disable optimization in development
  },
};

export default nextConfig;
