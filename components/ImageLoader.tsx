"use client";

import { useEffect } from "react";
import type { ImageLoaderProps } from "@/types/portfolio";

export default function ImageLoader({
  photos,
  onLoadComplete,
  onError,
}: ImageLoaderProps) {
  useEffect(() => {
    let mounted = true;

    const preloadImages = async () => {
      const imagePromises = photos.map((photo) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();

          img.onload = () => {
            console.log(`Successfully loaded: ${photo.src}`);
            resolve(img);
          };

          img.onerror = (e) => {
            console.error(`Failed to load image ${photo.src}:`, e);
            reject(new Error(`Failed to load ${photo.src}`));
          };

          // Set crossOrigin to allow loading from S3
          img.crossOrigin = "anonymous";
          img.src = photo.src;
        });
      });

      try {
        await Promise.all(imagePromises);
        if (mounted) {
          console.log("All images loaded successfully");
          onLoadComplete();
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Unknown error loading images";
        console.error("Failed to load images:", errorMessage);
        if (mounted) {
          onError(errorMessage);
        }
      }
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, [photos, onLoadComplete, onError]);

  return null;
}
